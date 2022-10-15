const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: Number, required: true },
    level_range: { type: [Number], required: true },
    enemy_type: { type: [Number], required: true },
    enemy_count: { type: Number, required: true },
    random_zone: { type: Boolean, default: true },
    random_count: { type: Number, required: true }, // How many zone pictures are there
  },
  { timestamps: true }
);
const Zones = mongoose.model("Zones", zoneSchema);
module.exports = Zones;
