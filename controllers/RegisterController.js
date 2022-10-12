const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const bcrypt = require("bcrypt");

//*  Register User
//? No Auth required - Remember to not copy entire object!
router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const { username } = newUser;
    const user = await User.find({ username: username });
    const check = () => {
      if (user.length > 0) {
        return res
          .status(400)
          .send({ status: 400, payload: "Please use a unique username" });
      } else {
        const newUserPasswordIsHash = {
          ...newUser,
          password: bcrypt.hashSync(newUser.password, 10),
        };
        User.create(newUserPasswordIsHash, (error, user) => {
          res.status(201).send({ status: 201, payload: user });
        });
      }
    };
    check();
  } catch (error) {
    res.status(400).send({ status: 400, payload: error });
  }
});

module.exports = router;
