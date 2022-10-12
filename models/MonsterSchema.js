const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monsterSchema = new Schema(
  {
    name: { type: String, required: true },
    id: { type: Number, required: true },
    level: { type: Number, required: true },
    health: { type: Number, required: true },
    health_max: { type: Number, required: true },
    mana: { type: Number, default: 0 },
    mana_max: { type: Number, default: 0 },
    armor: { type: Number, default: 0 },
    damage: { type: Number, required: true },
    damage_spill: { type: Number, required: true },
    crit_chance: { type: Number, default: 0 },
    strength: { type: Number, required: true },
    agility: { type: Number, required: true },
    intelligence: { type: Number, required: true },
    scaling_str: { type: Number, default: 0 },
    scaling_agi: { type: Number, default: 0 },
    scaling_int: { type: Number, default: 0 },
    skills: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skills",
        },
      ],
      default: [],
    },
    // status: [],    //  Future addition with buffs / debuffs
    img_src: { type: String, required: true }, //  Reference which sheet to be used
    img_size: { type: [String], required: true }, //  Div Size
    sprite_pos: { type: [String], required: true }, //  Spritesheet position
    scale: { type: [Number], default: [1, 1] }, //  Image size
    img_translate: { type: [String], default: ["0%", "0%"] }, //  Img adjustment
  },
  { timestamps: true }
);
const Monsters = mongoose.model("Monsters", monsterSchema);
module.exports = Monsters;
