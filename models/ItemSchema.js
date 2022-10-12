const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: Number, required: true },
    drop_level: { type: Number, required: true },
    rarity: { type: String, required: true },
    damage: { type: Number },
    damage_spill: { type: Number },
    potency: { type: Number }, // For potions and other effects
    strength: { type: Number },
    agility: { type: Number },
    intelligence: { type: Number },
    health: { type: Number },
    mana: { type: Number },
    scaling_str: { type: Number },
    scaling_agi: { type: Number },
    scaling_int: { type: Number },
    type: { type: String, required: true },
    img_src: { type: String, required: true }, //  Link to spritesheet
    sprite_pos: { type: [Number], required: true }, // Spritesheet Position
    gold_value: { type: Number, required: true },
  },
  { timestamps: true }
);
const Items = mongoose.model("Items", itemSchema);
module.exports = Items;
