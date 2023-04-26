const express = require("express");
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getGoal).post(protect, setGoal);
router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

// router.get("/goals", getGoal);
// router.post("/setgoal", setGoal);
// router.put("/update/:id", updateGoal);
// router.delete("/delete/:id", deleteGoal);

module.exports = router;
