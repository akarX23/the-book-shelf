const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config").get(process.env.NODE_ENV);
const salt_i = 10;

// Declare the Schema of the Mongo model
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  lastname: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(salt_i, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.generateAuthToken = function (cb) {
  let user = this;
  let token = jwt.sign({ _id: user._id }, config.SECRET);
  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.methods.comparePasswords = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.deleteToken = function (token, cb) {
  let user = this;

  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;
  jwt.verify(token, config.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

//Export the model
module.exports = mongoose.model("User", userSchema);
