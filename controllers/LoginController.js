const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

//* Login - get JWT token
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .send({ status: 400, payload: "Username and password are required." });
  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser)
    return res.status(401).send({ status: 401, payload: "User not found" }); //Unauthorized
  //* Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //* Create JWTs
    const userobj = {
      username: foundUser.username,
    };
    const accessToken = jwt.sign(userobj, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    console.log(accessToken);
    //* Send authorized user data and access token to user
    res.status(200).send({
      status: 200,
      payload: { accessToken, savefiles: foundUser.savefiles },
    });
  } else {
    res
      .status(401)
      .send({ status: 401, payload: "Wrong username or password" });
  }
});

module.exports = router;
