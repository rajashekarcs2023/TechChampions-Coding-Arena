const user = require("../model/userModel");

const fetchScores = async (req, res) => {
  try {
    const userScores = await user.find();

    const extractedData = userScores.map((user) => ({
      _id: user._id,
      name: user.name,
      score: user.score,
      solvedProblemsCount: user.solvedProblems.length,
    }));

    extractedData.sort((a, b) => b.score - a.score);

    res.json({ data: extractedData });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching scores" });
  }
};

module.exports = { fetchScores };
