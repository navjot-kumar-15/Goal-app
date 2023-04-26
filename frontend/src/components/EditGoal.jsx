import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";

function EditGoal() {
  const [goal, setGoal] = useState({ text: "" });
  const { text } = goal;

  const { goals, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.goals
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (isSuccess) {
      // dispatch(updateGoal(id, goals, goal));
    }
    navigate("/");
    setGoal("");
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={(e) => onChange(e)}
              placeholder="Enter your goals..."
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Update Goal
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditGoal;
