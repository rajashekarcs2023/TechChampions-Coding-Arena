const express = require("express");
 
const { submitProblem } = require("../controller/submitController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();
 
router.post("/problem/submit", auth, submitProblem);

module.exports = router;
