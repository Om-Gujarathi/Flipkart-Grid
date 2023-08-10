const { ADMIN, COURSE } = require("../db/index");
const express = require("express");
const { adminAuthentication, secret } = require("../middlewares/admin");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const router = express.Router();

// Admin routes
router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username);

  if (username === "" || password === "") {
    res.status(400).send({ message: "Username/Password cannot be empty!" });
  }

  const admin = await ADMIN.exists({ username });

  if (admin) {
    res.status(400).send({ message: "Account already created. Please log in" });
  } else {
    const newAdmin = new ADMIN({
      username,
      password,
    });

    newAdmin.save();

    res.status(200).send({ message: "Admin created successfully" });
  }
});

router.post("/login", async (req, res) => {
  // logic to log in admin
  const username = req.headers.username;
  const password = req.headers.password;

  const admin = await ADMIN.exists({ username, password });

  if (admin) {
    const token = jwt.sign({ username, password }, secret);
    res.status(200).send({ message: "Logged in successfully", token });
  } else {
    res.status(400).send({ message: "Login Failed" });
  }
});

router.get("/me", adminAuthentication, (req, res) => {
  // logic to log in admin
  res.status(200).send({ username: req.admin.username });
});

router.post("/courses", adminAuthentication, async (req, res) => {
  // logic to add a course
  const course = new COURSE(req.body);

  await course.save();

  res
    .status(200)
    .send({ message: "Course created successfully", courseId: `${course.id}` });
});

router.put("/courses/:courseId", adminAuthentication, async (req, res) => {
  // logic to edit a course
  const courseId = req.params.courseId;
  await COURSE.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(`${courseId}`) },
    req.body
  );
  res.json({ message: "Course updated successfully" });
});

router.get("/courses", adminAuthentication, async (req, res) => {
  // logic to get all courses
  res.json({ courses: await COURSE.find() });
});

router.get("/courses/:courseId", adminAuthentication, async (req, res) => {
  // logic to get course from Id
  const courseId = req.params.courseId;
  const course = await COURSE.findOne({
    _id: new mongoose.Types.ObjectId(`${courseId}`),
  });
  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.delete("/courses/:courseId", adminAuthentication, async (req, res) => {
  // logic to get course from Id
  const courseId = req.params.courseId;
  const course = await COURSE.findOne({
    _id: new mongoose.Types.ObjectId(`${courseId}`),
  });
  if (course) {
    await COURSE.deleteOne({ _id: new mongoose.Types.ObjectId(`${courseId}`) });
    res.json({ message: "Course deleted Sucessfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

module.exports = router;
