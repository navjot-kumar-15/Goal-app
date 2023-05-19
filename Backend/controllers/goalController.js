const Goal = require("../model/goalModel");
const asyncHandler = require("express-async-handler");

// @ desc   GET goals
//@  route  api/goals
//@  access Private
const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.find({ user: req.user.id });
  res.status(200).json(goal);
});

// @ desc   POST goal
//@  route  api/setgoals
//@  access Private
const setGoal = asyncHandler(async (req, res) => {
  const user = await Goal(req.body);
  if (!user) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  // const goal = await Goal.create({
  //   text: req.body.text,
  //   user: req.user.id,
  // });
  const saveGoal = new Goal({
    user: req.user.id,
    text: req.body.text,
  });
  await saveGoal.save();
  res.status(200).json(saveGoal);
});

// @ desc   PUT goals
//@  route  api/update
//@  access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.send(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @ desc   DELETE goal
//@  route  api/delete
//@  access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoal, setGoal, updateGoal, deleteGoal };
