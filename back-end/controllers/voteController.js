const Poll = require("../models/Poll");
const Nominees = require("../models/Nominees");
const Vote = require("../models/Votes");
/* utility */

const commonMethod = require("../utility/common");
exports.viewPollWithNomineesAndVote = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    var decoded = await commonMethod.userTokenValidate(token);
    if ("isSuccess" in decoded) {
      res.send(decoded);
      return;
    }
    const user_id = decoded.id;

    const existingVote = await Vote.find({ user_id });
    const pollIds = existingVote.map((vote) => vote.poll_id);

    // Find the poll by ID where ID is not in pollIds array
    const poll = await Poll.findOne({ _id: { $nin: pollIds } }).sort({
      createdAt: 1,
    });
    if (!poll) {
      return res
        .status(200)
        .json({ isSuccess: false, message: "Poll not found" });
    }

    // Find the nominees for the poll
    const nominees = await Nominees.find({ poll_id: poll._id });

    // Check if the user has already voted in this poll
    const hasVoted = existingVote.some((vote) => vote.poll_id.equals(poll._id));

    res.status(200).json({
      isSuccess: true,
      data: {
        poll,
        nominees,
        hasVoted, // Indicates if the user has already voted in this poll
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal server error" });
    console.error("Error processing vote:", err);
  }
};

exports.votePoll = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    var decoded = await commonMethod.userTokenValidate(token);
    if ("isSuccess" in decoded) {
      res.send(decoded);
      return;
    }
    const user_id = decoded.id;
    const { poll_id, nominee_id } = req.body;

    // Check if the user has already voted for this poll
    const existingVote = await Vote.findOne({ user_id, poll_id });
    if (existingVote) {
      return res.status(400).json({
        isSuccess: false,
        message: "You have already voted in this poll",
      });
    }

    // Create a new vote
    const vote = await Vote.create({ user_id, poll_id, nominee_id });

    res.status(201).json({
      isSuccess: true,
      data: vote,
      message: "your vote successfully submitted!!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal server error" });
    console.error("Error voting in poll:", err);
  }
};
