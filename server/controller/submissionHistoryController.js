const submissionModel = require("../model/SubmissionModel");

const fetchSubmissions = async (req, res) => {
  try {
    const submissions = await submissionModel.find();
    res.json({ data: submissions });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {fetchSubmissions};