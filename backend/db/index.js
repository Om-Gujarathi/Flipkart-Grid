const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
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
const COURSE = mongoose.model("Courses", courseSchema);
const USER = mongoose.model("User", userSchema);
const ADMIN = mongoose.model("Admin", adminSchema);

module.exports =  { COURSE, USER, ADMIN };
