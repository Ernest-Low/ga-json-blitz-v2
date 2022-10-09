const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      default: [],
    },
    items: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      default: [],
    },
    skills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skills",
      default: [],
    },
    // status: [],  //  Future addition, for buffs / debuffs
    // img_src: 'image_data/players/Arms_Warrior.png',  Depreciated, using position in sprite sheet
    x_pos: { type: Number, required: true }, //  Position in sprite sheet
    y_pos: { type: Number, required: true }, //  Position in sprite sheet
    img_size: { type: [String], required: true }, // Div size ["X%", "Y%"]
    scale: { type: [Number], default: [1, 1] }, // Image size
  },
  // {
  //   name: { type: String, required: true },
  //   id: { type: Number, required: true },
  //   drop_level: { type: Number, required: true },
  //   rarity: { type: String, required: true },
  //   damage: { type: Number, required: true },
  //   damage_spill: { type: Number, required: true },
  //   attributes: { type: [Number], default: [0, 0, 0, 0, 0] },
  //   scaling: { type: [Number], required: true },
  //   type: { type: String, required: true },
  //   // img_src: "image_data/icons/weapons/sword/sword_1.png",  Depreciated, using position in sprite sheet
  //   x_pos: { type: [Number], required: true },  //  Position in sprite sheet
  //   y_pos: { type: [Number], required: true },  //  Position in sprite sheet
  //   value: { type: Number, required: true },
  // },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
