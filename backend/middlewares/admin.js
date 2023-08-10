const jwt = require("jsonwebtoken");
const { ADMIN } = require("../db/index");
const secret = "helloworld";

async function adminAuthentication(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, async (err, admin) => {
    if (err) {
      return res.sendStatus(403);
    }
    admin = await ADMIN.findOne({
      username: admin.username,
      password: admin.password,
    });

    if (admin) {
      req.admin = admin;
      next();
    } else {
      res.status(404).send({ message: "Unauthorized" });
    }
  });
}

module.exports = {adminAuthentication, secret};