const express = require("express");
const router = express.Router();
const authCheck = require("../middleware/authCheck");

const Mods = require("../models/ModSchema");

router.post("/all", authCheck, async (req, res) => {
  console.log("Trying to call mongodb");
  try {
    const allmods = await Mods.find(
      { $or: [{ author: req.body.username }, { private: false }] },
      "_id name author likes"
    ).exec();
    console.log(allmods);
    res.status(200).send({ status: 200, payload: allmods });
  } catch (error) {
    res.status(500).send({ status: 500, payload: error });
  }
});

router.post("/name", async (req, res) => {
  console.log("Finding by specific");
  try {
    const mod = await Mods.find({ _id: req.body.id }).exec();
    if (!mod)
      return res.status(401).send({ status: 401, payload: "Mod not found" });
    res.status(200).send({ status: 200, payload: mod });
  } catch (error) {
    res.status(500).send({ status: 500, payload: error });
  }
});

router.post("/create", async (req, res) => {
  console.log("Doing a create");
  try {
    const mod = await Mods.find({ name: req.body.mod?.name }).exec();
    if (!mod || mod.length >= 1)
      return res
        .status(400)
        .send({ status: 406, payload: "Mod Name Issue" });

    Mods.create(req.body.mod);
    res.status(201).send({ status: 201, payload: "Mod Created" });
  } catch (error) {
    res.status(500).send({ status: 500, payload: error });
  }
});

router.post("/edit", async (req, res) => {
  console.log("Doing an edit");
  console.dir(req.body);
  try {
    const mod = await Mods.find({ _id: req.body.id });
    console.dir(mod);
    if (mod.length == 0) {
      return res.status(401).send({ status: 401, payload: "Mod not found" });
    }
    // Mods.deleteOne({ name: req.body.mod.name });
    Mods.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          name: req.body.mod.name,
          private: req.body.mod.private,
          player: req.body.mod?.player,
          skills_list: req.body.mod?.skills_list,
          items: req.body.mod?.items,
          monsters: req.body.mod?.monsters,
          zones: req.body.mod?.zones,
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
    res.status(200).send({ status: 200, payload: "Mod Updated" });
  } catch (error) {
    res.status(500).send({ status: 500, payload: error });
  }
});

router.post("/delete", async (req, res) => {
  console.log("Doing a deletion");
  try {
    const mod = await Mods.find({ _id: req.body.id }).exec();
    if (mod.length == 0) {
      return res.status(401).send({ status: 401, payload: "Mod not found" });
    }

    Mods.findByIdAndDelete(req.body.id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted :", docs);
      }
    });
    res.status(200).send({ status: 200, payload: "Mod Deleted" });
  } catch (error) {
    res.status(500).send({ status: 500, payload: error });
  }
});

module.exports = router;
