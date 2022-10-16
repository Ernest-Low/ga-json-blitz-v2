const express = require("express");
const router = express.Router();
const authCheck = require("../middleware/authCheck");
const jwt = require("jsonwebtoken");

router.post("/", authCheck, async (req, res) => {
  console.log("Accesstoken Still valid, refreshing");
  const foundUser = req.body.user;
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
    payload: { id: foundUser._id, accessToken, savefiles: foundUser.savefiles },
  });
});

module.exports = router;
