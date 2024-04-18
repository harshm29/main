// controllers/pollController.js
const mongoose = require("mongoose");
const Poll = require("../models/Poll");
const Nominees = require("../models/Nominees");
const Votes = require("../models/Votes");
const Validator = require("validatorjs");

exports.createPoll = async (req, res) => {
  try {
    const userInfo = req.body;
    const rules = {
      nominees: "required",
      question: "required",
    };
    const validation = new Validator(userInfo, rules);

    if (validation.fails()) {
      return res.status(400).json({
        isSuccess: false,
        message: validation.errors.all(),
      });
    }
    const { question, nominees } = req.body;

    // Check if nominees array length is valid
    if (nominees.length < 2 || nominees.length > 5) {
      return res.status(200).json({
        isSuccess: false,
        message: "Nominees count should be between 2 and 5",
      });
    }

    // Create the poll
    const poll = await Poll.create({ question });

    // Check if poll creation was successful
    if (!poll) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Failed to create poll" });
    }

    // Create nominees for the poll
    const createdNominees = await Nominees.insertMany(
      nominees.map((nominee) => ({ poll_id: poll._id, name: nominee }))
    );

    // Check if nominees creation was successful
    if (!createdNominees || createdNominees.length !== nominees.length) {
      await Poll.findByIdAndDelete(poll._id); // Rollback if nominees creation failed
      return res
        .status(400)
        .json({ isSuccess: false, message: "Failed to create nominees" });
    }

    res.status(201).json({
      isSuccess: true,
      data: { poll, nominees: createdNominees },
      message: "Poll Created Successfully!!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal server error" });
    console.error("Error creating poll:", err);
  }
};

exports.listPolls = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPolls = await Poll.countDocuments();
    const totalPages = Math.ceil(totalPolls / limit);

    const polls = await Poll.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (polls.length === 0) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "No polls found" });
    }

    res.status(200).json({
      isSuccess: true,
      data: { polls, totalPages, currentPage: page },
      message: "polls found Successfully",
    });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: err.message });
  }
};

exports.updatePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { question } = req.body;

    // Validate input
    if (!question) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Question is required" });
    }

    const updatedPoll = await Poll.findByIdAndUpdate(
      id,
      { question },
      { new: true }
    );

    if (!updatedPoll) {
      return res.status(404).json({
        isSuccess: false,
        message: "Poll not found or failed to update",
      });
    }

    res.status(200).json({
      isSuccess: true,
      data: updatedPoll,
      message: "Poll updated Successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal server error" });
    console.error("Error updating poll:", err);
  }
};

exports.viewPollById = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id);
    if (!poll) {
      return res
        .status(404)
        .json({ isSuccess: false, error: "Poll not found" });
    }

    const nominees = await Nominees.find({ poll_id: id });

    res.status(200).json({ isSuccess: true, data: { poll, nominees } });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: err.message });
  }
};

exports.createNominee = async (req, res) => {
  try {
    const { pollId, name } = req.body;

    const pollExists = await Poll.exists({ _id: pollId });
    if (!pollExists) {
      return res.status(404).json({
        isSuccess: false,
        message: "Poll not found",
      });
    }

    const newNominee = new Nominees({ poll_id: pollId, name });
    const createdNominee = await newNominee.save();

    res.status(201).json({ isSuccess: true, data: createdNominee });
  } catch (err) {
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal server error" });
    console.error("Error creating nominee:", err);
  }
};

exports.updateNominees = async (req, res) => {
  try {
    const { id, name } = req.body;

    const updatedNominee = await Nominees.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedNominee) {
      return res.status(404).json({
        isSuccess: false,
        message: "Nominee not found or failed to update",
      });
    }

    res.status(200).json({ isSuccess: true, data: updatedNominee });
  } catch (err) {
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal server error" });
    console.error("Error updating nominee:", err);
  }
};
exports.deleteNominee = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ isSuccess: false, message: "Invalid ID" });
    }

    // Find and delete the nominee by ID
    const deletedNominee = await Nominees.findByIdAndDelete(id);

    // Check if nominee was found and deleted
    if (!deletedNominee) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Nominee not found" });
    }

    res.status(200).json({ isSuccess: true, data: deletedNominee });
  } catch (err) {
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal server error" });
    console.error("Error deleting nominee:", err);
  }
};

exports.getNomineesChart = async (req, res) => {
  try {
    // Find the last created poll
    const lastPoll = await Poll.findOne().sort({ createdAt: -1 });
    if (!lastPoll) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "No polls found" });
    }

    const { _id: pollId } = lastPoll;

    // Find the poll's nominees
    const nominees = await Nominees.find({ poll_id: pollId });
    if (nominees.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "No nominees found for the last poll",
      });
    }

    // Fetch vote counts for each nominee in parallel
    const voteCountPromises = nominees.map(async (nominee) => {
      const votesCount = await Votes.countDocuments({
        poll_id: pollId,
        nominee_id: nominee._id,
      });
      return { nominee: nominee.name, votes: votesCount };
    });

    const nomineesData = await Promise.all(voteCountPromises);

    const totalVotes = nomineesData.reduce((acc, curr) => acc + curr.votes, 0);

    // Generate chart data
    const chartData = {
      labels: nomineesData.map((item) => item.nominee),
      datasets: [
        {
          label: "Votes",
          data: nomineesData.map((item) => item.votes),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    res
      .status(200)
      .json({ isSuccess: true, data: chartData, total_votes: totalVotes });
  } catch (err) {
    console.error("Error generating nominees chart data:", err);
    res
      .status(500)
      .json({ isSuccess: false, message: "Failed to generate chart data" });
  }
};

exports.getNomineesChartbyid = async (req, res) => {
  try {
    const { id: pollId } = req.params; // Extract the pollId from request parameters

    // Find the poll's nominees
    const nominees = await Nominees.find({ poll_id: pollId });
    if (nominees.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "No nominees found for the specified poll",
      });
    }

    // Fetch vote counts for each nominee in parallel
    const voteCountPromises = nominees.map(async (nominee) => {
      const votesCount = await Votes.countDocuments({
        poll_id: pollId,
        nominee_id: nominee._id,
      });
      return { nominee: nominee.name, votes: votesCount };
    });

    const nomineesData = await Promise.all(voteCountPromises);

    // Generate chart data
    const chartData = {
      labels: nomineesData.map((item) => item.nominee),
      datasets: [
        {
          label: "Votes",
          data: nomineesData.map((item) => item.votes),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    res.status(200).json({ isSuccess: true, data: chartData });
  } catch (err) {
    console.error("Error generating nominees chart data:", err);
    res
      .status(500)
      .json({ isSuccess: false, message: "Failed to generate chart data" });
  }
};
