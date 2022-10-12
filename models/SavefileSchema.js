const mongoose = require("mongoose");

const SavefileSchema = new mongoose.Schema(
  {
    players: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Players",
        },
      ],
      default: [],
    },
    gold: { type: Number, default: 0 },
    items: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Items",
        },
      ],
      default: [],
    },
    monsters: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Monsters",
        },
      ],
      default: [],
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zones",
      default: {},
    },
  },
  { timestamps: true }
);
const Savefile = mongoose.model("Savefile", SavefileSchema);
module.exports = Savefile;
