const problemModel = require("../model/problemModel");

const addProblem = async (req, res) => {
  const { title, statement, difficulty, testCases } = req.body;
  const createdBy = req.user._id;

  try {
    const problem = await problemModel.findOne({ title });

    if (problem) {
      res.json({ message: "Problem exists already" });
    } else {
      const problem = await problemModel.create({
        title,
        statement,
        difficulty,
        testCases,
        createdBy,
      });
      res.json({ message: "Problem created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchProblems = async (req, res) => {
  try {
    const problems = await problemModel.find();
    res.json({ data: problems });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProblem = async (req, res) => {
  try {
    const problem = await problemModel.findById(req.params.problemId);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProblem = async (req, res) => {
  const { title, statement, difficulty, testCases } = req.body;
  try {
    const problem = await problemModel.findByIdAndUpdate(
      req.params.problemId,
      { title, statement, difficulty, testCases },
      { new: true }
    );
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json({ message: "Problem edited successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProblem = async (req, res) => {
  const problem = await problemModel.findByIdAndDelete(req.params.problemId);
  try {
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addProblem,
  fetchProblems,
  getProblem,
  updateProblem,
  deleteProblem,
};
