const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: Number, required: true },
    drop_level: { type: Number, required: true },
    rarity: { type: String, required: true },
    damage: { type: Number, required: true },
    damage_spill: { type: Number, required: true },
    attributes: { type: [Number], default: [0, 0, 0, 0, 0] },
    scaling: { type: [Number], required: true },
    type: { type: String, required: true },
    // img_src: "image_data/icons/weapons/sword/sword_1.png",  Depreciated, using position in sprite sheet
    x_pos: { type: Number, required: true },  //  Position in sprite sheet
    y_pos: { type: Number, required: true },  //  Position in sprite sheet
    value: { type: Number, required: true },
  },
  { timestamps: true }
);
const Items = mongoose.model("Items", itemSchema);
module.exports = Items;
