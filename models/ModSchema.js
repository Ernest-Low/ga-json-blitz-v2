const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    likes: { type: [String] },
    private: { type: Boolean, default: false },
    player: [{}],
    skills_list: [{}],
    items: [{}],
    monsters: [{}],
    zones: [{}],
  },
  { timestamps: true }
);
const Mods = mongoose.model("Mods", modSchema);
module.exports = Mods;
