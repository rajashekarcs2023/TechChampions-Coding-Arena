const express = require("express");

const {
  fetchSubmissions,
} = require("../controller/submissionHistoryController");
const { fetchScores } = require("../controller/LeaderBoardController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/submissions/history", auth, fetchSubmissions);
router.get("/submissions/leaderBoard", auth, fetchScores);

module.exports = router;
