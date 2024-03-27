const express = require("express");

const { getUser, createUser } = require("../controller/userController");
const {
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

const router = express.Router();

router.post("/user/signIn", getUser);
router.post("/user/signUp", createUser);

router.post("/user/forgotPassword", forgotPassword);
router.put("/user/resetPassword", resetPassword);

module.exports = router;
