const mongoose = require("mongoose");

const nomineeSchema = new mongoose.Schema(
  {
    poll_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "polls",
      required: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Nominees = mongoose.model("nominees", nomineeSchema);

module.exports = Nominees;
