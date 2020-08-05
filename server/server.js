//required packages
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const config = require("./config/config").get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));
const { auth } = require("./Middlewares/auth");

app.use(express.static("client/build"));

//Models
const User = require("./Models/user");
const Book = require("./Models/book");

// Connect MongoDB at default port 27017.
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/bookShelf",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

//GET

app.get("/api/auth", auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastname,
  });
});

app.get("/api/user/logout", auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err)
      res
        .status(400)
        .json({ success: false, error: "Could not logout. Please try again" });
    req.cookies.auth = null;
    res.status(200).json({ success: true, user });
  });
});

app.get("/api/getbook", (req, res) => {
  let id = req.query.id;

  Book.findById(id, (err, book) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(book);
  });
});

app.get("/api/books", (req, res) => {
  //?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  Book.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, books) => {
      if (err) return res.status(400).send(err);
      res.send(books);
    });
});

app.get("/api/getReviewer", (req, res) => {
  let id = req.query.id;

  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      name: doc.name,
      lastname: doc.lastname,
    });
  });
});

app.get("/api/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

app.get("/api/user_posts", (req, res) => {
  let id = req.query.id;

  Book.find({ ownerId: id }).exec((err, docs) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(docs);
  });
});

//POST
app.post("/api/book", (req, res) => {
  User.findByToken(req.cookies.auth, (err, user) => {
    if (err) return res.status(400).send(err);

    const book = new Book({ ...req.body, ownerId: user._id });

    book.save((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        post: true,
        bookId: doc._id,
      });
    });
  });
});

app.post("/api/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(200).json({
        success: false,
        errorMessage: "Something went wrong. Please try again",
      });
    if (user)
      return res.status(200).json({
        success: false,
        errorMessage: "Email already exists",
      });
    else {
      const user = new User(req.body);

      user.generateAuthToken((err, user) => {
        if (err)
          return res.status(200).json({
            success: false,
            errorMessage: "Something went wrong. Please try again",
          });
        res.status(200).json({ success: true, user });
      });
    }
  });
});

app.post("/api/user/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).send(err);
    if (!user)
      return res
        .status(200)
        .json({ isAuth: false, message: "Auth failed, email not found!" });

    user.comparePasswords(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res
          .status(200)
          .json({ isAuth: false, message: "Wrong Passwords" });
      user.generateAuthToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token);
        res.status(200).json({ isAuth: true, id: user._id, email: user.email });
      });
    });
  });
});

//UPDATE
app.post("/api/book_update", (req, res) => {
  Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      edit: true,
      bookId: doc._id,
    });
  });
});

//DELETE
app.delete("/api/delete_book", (req, res) => {
  let id = req.query.id;

  Book.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      delete: true,
      doc,
    });
  });
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log("Server Running");
});
