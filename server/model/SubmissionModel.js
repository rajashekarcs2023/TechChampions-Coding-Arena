const mongoose = require("mongoose");

const codeSubmissionSchema = new mongoose.Schema({
  code: { type: String, required: true },
  user: { type: String, required: true },
  problem: { type: String, required: true },
  language: { type: String, required: true },
  submittedAt: { type: String, required: true },
  status: { type: String, required: true },
}); 

const CodeSubmission = mongoose.model("CodeSubmission", codeSubmissionSchema);

module.exports = CodeSubmission;
