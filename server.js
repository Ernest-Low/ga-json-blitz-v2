require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const loginController = require("./controllers/LoginController");
const registerController = require("./controllers/RegisterController");
const getmodsController = require("./controllers/GetModsController");
const accesscontroller = require("./controllers/AccessController");

const Mods = require("./models/ModSchema");

//configuration
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI ?? "";
mongoose.connect(MONGO_URI);
mongoose.connection.once("open", () => {
  console.log(`connected to mongo at ${MONGO_URI}`);
});

const app = express();

app.use(express.static("./client/dist/"));

//middleware
// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/login", loginController);
app.use("/api/register", registerController);
app.use("/api/mods/", getmodsController);
app.use("/api/refresh/", accesscontroller);

app.get("/api/seed", async (req, res) => {
  console.log("seeding");
  Mods.create([
    {
      name: "Modtest",
      author: "Radian",
    },
    {
      name: "Modtest2",
      author: "Radian",
    },
    {
      name: "Modtest3",
      author: "tester",
    },
    {
      name: "Modtest4",
      author: "test",
    },
    {
      name: "Modtest5",
      author: "tester",
    },
  ]);
});

// app.post("/api/login", async (req, res) => {
//   res.status(200).send({ status: 200, payload: "Login api" });
// });

// app.post("/api/register", async (req, res) => {
//   res.status(200).send({ status: 200, payload: "Register api" });
// });

app.listen(PORT, () => {
  console.log(`Express listing on ${PORT}`);
});
