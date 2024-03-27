const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    timeTaken: {
      type: Number,
      required: true,
    },
  },
  { _id: false } // This option prevents MongoDB from generating separate IDs for test cases
);

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    statement: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    testCases: [testCaseSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
