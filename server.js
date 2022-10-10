require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

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
app.use(cors(corsOptions));
app.use(express.json());


//? Do not copy whole objects in for post/put - only the required fields (to prevent unauthorized editing of data)


//* Test / Homepage - show popular deals default
app.get("/", async (req, res) => {
  res.status(200).send({status: 200, payload: "Hello"})
});

// app.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const searchDeal = await Deals.find({
//       title: { $regex: id, $options: "i" },

//       submittedStatus: "Approve",
//     });
//     res.status(201).send(searchDeal);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

// app.get("/profile/:username", async (req, res) => {
//   const { username } = req.params;
//   console.log(username, "test");
//   try {
//     const publicProfile = await Deals.find(
//       {
//         submittedBy: username,
//         submittedStatus: "Approve",
//       },
//       { img: 1, title: 1, submittedBy: 1 }
//     );
//     res.status(201).send(publicProfile);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

app.listen(PORT, () => {
  console.log(`Express listing on ${PORT}`);
});
