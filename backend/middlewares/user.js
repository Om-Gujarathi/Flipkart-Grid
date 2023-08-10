const jwt = require("jsonwebtoken");
const { USER } = require("../db/index");
const secret = "helloworld";

//Usermiddleware
async function userAuthentication(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    user = await USER.findOne({
      username: user.username,
      password: user.password,
    });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).send({ message: "Unauthorized" });
    }
  });
}

module.exports = {userAuthentication, secret};
