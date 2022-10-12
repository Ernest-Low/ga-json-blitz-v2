const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    savefiles: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Savefile",
        },
      ],
      default: [],
    },
  },

  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
