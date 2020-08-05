const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    author: { type: String, required: true },
    review: { type: String, default: "n/a" },
    pages: { type: String, default: "n/a" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    price: { type: String, default: "n/a" },
    ownerId: { type: String },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Book", bookSchema);
