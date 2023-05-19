import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goal/goalSlice";
import { toast } from "react-toastify";

function GoalForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      toast.warn("Please enter something...");
    } else {
      dispatch(createGoal({ text }));
      toast.success("Goal added successfully");
      setText("");
    }
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group  goalLable">
          <label htmlFor="text">Enter goal here</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your goals..."
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
