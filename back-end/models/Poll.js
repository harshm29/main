const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
  },
  { timestamps: true }
);

const Poll = mongoose.model("polls", pollSchema);

module.exports = Poll;
