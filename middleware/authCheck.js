const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const authCheck = async (req, res, next) => {
  const token = req.body?.accessToken;
  console.log(`Token: ${token}`);
  if (!token)
    return res
      .status(401)
      .send({ status: 401, payload: "Access token missing" });
  const username = req.body?.username;
  const foundUser = await User.findOne({ username: username }).exec();
  //Forbidden
  if (!foundUser)
    return res
      .status(401)
      .send({ status: 401, payload: "Missing username verification" });
  console.log(foundUser);

  // evaluate jwt
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(`Decoded: ${decoded}`);
    console.log(
      `Found user: ${foundUser?.username} and decoded user: ${decoded?.username}`
    );
    if (err || foundUser.username !== decoded.username) {
      console.log("Wrong user detected from token");
      return res
        .status(403)
        .send({ status: 403, payload: "Access token does not match user" });
    } else {
      // req.body.user = foundUser;
      next();
    }
  });
};

module.exports = authCheck;
