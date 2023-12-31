const ethers = require("ethers");
const { USER, COURSE } = require("../db/index");
const express = require("express");
const { userAuthentication, secret } = require("../middlewares/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  getBalance,
  addBalance,
  createWallet,
  getTransactionHistory,
  burnBalance,
} = require("../contracts/index");

const router = express.Router();

router.post("/getBalance", userAuthentication, async (req, res) => {
  const balance = await getBalance(req.user.walletAddress);

  res.status(200).send({ balance });
});

router.post("/signup", async (req, res) => {
  // logic to sign up user
  const username = req.body.username;
  const password = req.body.password;

  const user = await USER.exists({ username, password });

  if (user) {
    res.status(400).send({ message: "Account already created. Please log in" });
  } else {
    const walletAddress = await createWallet();
    const newUser = new USER({
      username,
      password,
      walletAddress,
      purchasedCourses: [],
    });

    await newUser.save();

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

router.get("/me", userAuthentication, async (req, res) => {
  const balance = await getBalance(req.user.walletAddress);
  res.status(200).send({ username: req.user.username, balance });
});

router.get("/courses", async (req, res) => {
  // logic to list all published courses
  res.json({ courses: await COURSE.find({ published: true }) });
});

router.post("/transactionHistory", userAuthentication, async (req, res) => {
  const history = await getTransactionHistory(req.user.walletAddress);
  res.status(200).json({ history });
});

router.get("/products/:productId", userAuthentication, async (req, res) => {
  // logic to get product from Id
  const productId = req.params.productId;
  const product = await COURSE.findOne({
    _id: new mongoose.Types.ObjectId(`${productId}`),
    published: true,
  });
  if (product) {
    if (req.user.purchasedCourses.includes(productId)) {
      return res.json({ ...product.toObject(), isPurchased: true });
    } else {
      return res.json({ ...product.toObject(), isPurchased: false });
    }
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.post("/products/:productId", userAuthentication, async (req, res) => {
  // logic to purchase a product
  const productId = req.params.productId;
  const address = req.user.walletAddress;
  const product = await COURSE.findOne({
    _id: new mongoose.Types.ObjectId(`${productId}`),
  });

  if (product) {
    if (req.user.purchasedCourses.includes(productId)) {
      res.status(201).json({ message: "Product already purchased" });
    } else if (product.published) {
      //Make payment logic
      req.user.purchasedCourses.push(productId);
      await req.user.save();
      await addBalance(address, 10);
      res.json({ message: "Product purchased successfully" });
    }
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.post("/useBalance/:productId", userAuthentication, async (req, res) => {
  // logic to purchase a product
  const productId = req.params.productId;
  const address = req.user.walletAddress;
  const product = await COURSE.findOne({
    _id: new mongoose.Types.ObjectId(`${productId}`),
  });

  if (product) {
    if (req.user.purchasedCourses.includes(productId)) {
      res.status(201).json({ message: "Product already purchased" });
      return;
    }
    const balance = await getBalance(req.user.walletAddress);
    if (balance < parseInt(product.price / 100)) {
      res.status(201).json({ message: "Not enough FlipCoins!" });
    } else if (product.published) {
      //Make payment logic
      req.user.purchasedCourses.push(productId);
      await req.user.save();
      await burnBalance();
      res.json({ message: "Product purchased successfully" });
    }
  } else {
    res.status(404).json({ message: "Product not found" });
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
  const address = req.user.walletAddress;

  if (req.user.purchasedCourses.includes(productId)) {
    const product = await COURSE.findOne({
      _id: new mongoose.Types.ObjectId(`${productId}`),
    });
    product.reviews.push({
      body: req.body.body,
      description: req.body.description,
      rating: Number(req.body.rating),
      by: req.user.username,
    });
    await product.save();
    await addBalance(address, 10);
    res.json({ message: "Comment added sucessfully" });
  } else {
    res
      .status(401)
      .json({ message: "Cannot Comment without purchasing the course" });
  }
});

module.exports = router;
