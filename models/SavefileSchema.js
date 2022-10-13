const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavefileSchema = new Schema(
  {
    players: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Players",
        },
      ],
    },
    gold: { type: Number, default: 0 },
    items: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Items",
        },
      ],
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zones",
    },
  },
  { timestamps: true }
);
const Savefile = mongoose.model("Savefile", SavefileSchema);
module.exports = Savefile;
