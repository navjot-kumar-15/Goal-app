import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goal/goalSlice";
import { Link } from "react-router-dom";
function GoalItem({ goal }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-us")}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
      <Link to={`/${goal._id}`}>
        <button className="btn" style={{ margin: "0 auto" }}>
          Edit
        </button>
      </Link>
    </div>
  );
}

export default GoalItem;
