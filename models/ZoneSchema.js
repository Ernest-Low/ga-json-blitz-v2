const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    name2: { type: String, required: true },  //  Look through code to find out where this was used?!
    id:  {type: Number, required: true },
    level_range: { type: [Number], required: true },
    enemy_type: { type: [Number], required: true },
    enemy_count: {type: Number, required: true },
    random_zone: {type: Boolean, default: true },
    random_count: {type: Number, required: true },  // How many zone pictures are there
    img_src: { type: String, required: true },  //  URL of image - client will go through stored sprite sheet of backgrounds
    x_pos: { type: Number, required: true }, //  Position in sprite sheet
    y_pos: { type: Number, required: true }, //  Position in sprite sheet
  },
  { timestamps: true }
);
const Zones = mongoose.model("Zones", zoneSchema);
module.exports = Zones;
