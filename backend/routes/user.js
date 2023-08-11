const { USER, COURSE } = require("../db/index");
const express = require("express");
const { userAuthentication, secret } = require("../middlewares/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // logic to sign up user
  const username = req.body.username;
  const password = req.body.password;

  const user = await USER.exists({ username, password });

  if (user) {
    res.status(400).send({ message: "Account already created. Please log in" });
  } else {
    const newUser = new USER({
      username,
      password,
      purchasedCourses: [],
    });

    newUser.save();

    res.status(200).send({ message: "User created successfully" });
  }
});

router.post("/login", async (req, res) => {
  // logic to log in user
  const username = req.headers.username;
  const password = req.headers.password;

  const user = await USER.exists({ username, password });

  if (user) {
    const token = jwt.sign({ username, password }, secret);
    res.status(200).send({ message: "Logged in successfully", token });
  } else {
    res.status(400).send({ message: "Login Failed" });
  }
});

router.get("/courses", async (req, res) => {
  // logic to list all published courses
  res.json({ courses: await COURSE.find({ published: true }) });
});

router.get("/products/:productId", async (req, res) => {
  // logic to get product from Id
  const productId = req.params.productId;
  const product = await COURSE.findOne({
    _id: new mongoose.Types.ObjectId(`${productId}`),
    published: true,
  });
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.post("/courses/:courseId", userAuthentication, async (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;
  const course = await COURSE.findOne({
    _id: new mongoose.Types.ObjectId(`${courseId}`),
  });

  if (course) {
    if (req.user.purchasedCourses.includes(courseId)) {
      res.json({ message: "Course already purchased" });
    } else if (course.published) {
      //Make payment logic
      req.user.purchasedCourses.push(courseId);
      await req.user.save();
      res.json({ message: "Course purchased successfully" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/purchasedCourses", userAuthentication, async (req, res) => {
  // logic to view purchased courses
  const user = await USER.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.post("/addComment/:productId", userAuthentication, async (req, res) => {
  const productId = req.params.productId;

  if (req.user.purchasedCourses.includes(productId)) {
    const product = await COURSE.findOne({
      _id: new mongoose.Types.ObjectId(`${productId}`),
    });
    console.log(req.body.rating);
    product.reviews.push({
      body: req.body.body,
      description: req.body.description,
      rating: Number(req.body.rating),
      by: new mongoose.Types.ObjectId(`${req.user._id}`),
    });
    await product.save();
    res.json({ message: "Comment added sucessfully" });
  } else {
    res
      .status(401)
      .json({ message: "Cannot Comment without purchasing the course" });
  }
});

module.exports = router;
