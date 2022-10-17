const express = require("express");
const router = express.Router();
const authCheck = require("../middleware/authCheck");

const User = require("../models/UserSchema");

router.post("/", authCheck, async (req, res) => {
  console.log("Updating user savefile");
  console.dir(req.body);
  try {
    const mod = await User.find({ _id: req.body.id });
    console.dir(mod[0]);
    if (mod.length == 0) {
      return res.status(401).send({ status: 401, payload: "User not found" });
    }
    User.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          savefiles: req.body.savefiles,
        },
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
        }
      }
    );
    // Mods.create(req.body.mod);
    res.status(200).send({ status: 200, payload: "Savefile Updated" });
  } catch (error) {
    res.status(500).send({ status: 500, payload: error });
  }
});

module.exports = router;
