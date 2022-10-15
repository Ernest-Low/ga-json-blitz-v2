const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: { type: String, required: true },
    id: { type: Number, required: true },
    level: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    exp_req: { type: Number, required: true },
    health: { type: Number, required: true },
    health_max: { type: Number, required: true },
    mana: { type: Number, required: true },
    mana_max: { type: Number, required: true },
    crit_chance: { type: Number, required: true },
    armor: { type: Number, required: true },
    strength: { type: Number, required: true },
    agility: { type: Number, required: true },
    intelligence: { type: Number, required: true },
    equipment: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Items",
        },
      ],
    },
    skills: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skills",
        },
      ],
    },
    // status: [],  //  Future addition, for buffs / debuffs
    img_src: { type: String, required: true }, //  Reference which sheet to be used
    img_size: { type: [String], required: true }, //  Div Size
    sprite_pos: { type: [String], required: true }, //  Spritesheet position
    scale: { type: [Number], default: [1, 1] }, //  Image size
    img_translate: { type: [String], default: ["0%", "0%"] }, //  Img adjustment
  },
  { timestamps: true }
);
const Players = mongoose.model("Players", playerSchema);
module.exports = Players;
