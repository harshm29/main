const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const commonMethod = require("../utility/common");
module.exports = function (passport) {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: Get the index page
   *     description: Retrieves the index page with the title "Online Live Polling System"
   *     responses:
   *       '200':
   *         description: Successful response with the index page rendered
   *         content:
   *           text/html:
   *             schema:
   *               type: string
   *       '404':
   *         description: Not Found - The requested resource is not found
   */

  router.get("/", function (req, res, next) {
    res.render("index", { title: "Online Live Polling System" });
  });

  const isUser = async (req, res, next) => {
    let token = req.headers["authorization"];
    var decoded = await commonMethod.userTokenValidate(token);
    if ("isSuccess" in decoded) {
      res.send(decoded);
      return;
    } else {
      next();
    }
  };
  /**
   * @swagger
   * /poll-info:
   *   get:
   *     summary: Get poll information with nominees and vote status
   *     description: Retrieve detailed information about a poll, including its nominees and whether the user has voted.
   *     tags:
   *       - Votes
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       '200':
   *         description: Successful response. Returns the poll data, nominees, and vote status.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   description: Poll information.
   *                 nominees:
   *                   type: array
   *                   description: List of nominees for the poll.
   *                   items:
   *                     type: object
   *                     properties:
   *                       _id:
   *                         type: string
   *                         description: Nominee ID.
   *                       name:
   *                         type: string
   *                         description: Nominee name.
   *                 hasVoted:
   *                   type: boolean
   *                   description: Indicates if the user has already voted in this poll.
  
   */

  router.get("/poll-info", isUser, voteController.viewPollWithNomineesAndVote);
  /**
   * @swagger
   * /create-vote:
   *   post:
   *     summary: Vote in a poll
   *     description: Vote in a poll by providing the poll ID, nominee ID, and authentication token.
   *     tags:
   *       - Votes
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               poll_id:
   *                 type: string
   *                 description: The ID of the poll to vote in.
   *               nominee_id:
   *                 type: string
   *                 description: The ID of the nominee to vote for.
   *     responses:
   *       '200':
   *         description: Successful vote. Returns a success message.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Indicates if the vote was successful.
   *                 message:
   *                   type: string
   *                   description: A success message indicating the vote was successful.
  
   */

  router.post("/create-vote", isUser, voteController.votePoll);

  return router;
};
