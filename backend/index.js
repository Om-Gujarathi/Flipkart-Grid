const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();
const port = 3000;
const { mongoUrl } = require("./config");

app.use(cors());
app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

//Connect to MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
