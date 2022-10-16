const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavefileSchema = new Schema({
  name: { type: String, required: true },
  active: { type: Boolean, default: false },
  date: { type: String },
  modpack: { type: String, default: "" },
  players: [{}],
  gold: { type: Number, default: 0 },
  items: [{}],
  zone: {},
});

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    savefiles: [{ type: SavefileSchema }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
