const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    body: String,
    description: String,
    by: String,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  rating: Number,
  price: Number,
  imageLink: String,
  published: Boolean,
  reviews: [commentSchema],
});

//Defining Schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//Defining models from schemas
//These are basically collections
const COURSE = mongoose.model("Courses", productSchema);
const USER = mongoose.model("User", userSchema);
const ADMIN = mongoose.model("Admin", adminSchema);

module.exports = { COURSE, USER, ADMIN };
