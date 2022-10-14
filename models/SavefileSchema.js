const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavefileSchema = new Schema({
  name: {type: String, required: true},
  players: [{}],
  gold: { type: Number, default: 0 },
  items: [{}],
  zone: {},
});
const Savefile = mongoose.model("Savefile", SavefileSchema);
module.exports = Savefile;
