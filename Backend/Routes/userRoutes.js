const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userControllers.js");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
