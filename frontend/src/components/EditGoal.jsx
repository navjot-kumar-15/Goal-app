import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { updateGoalData } from "../features/goal/goalSlice";
import Spinner from "./Spinner";
function EditGoal() {
  const { id } = useParams();
  const { goals, isLoading } = useSelector((state) => state.goals);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.length == data.length) {
      toast.warn("Please do some changes to update");
    } else {
      dispatch(updateGoalData(data));
      navigate("/");
      toast.success("Goal updated successfully");
    }
  };

  const onHandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      const singleUser = goals.filter((ele) => ele._id === id);
      setData(singleUser[0]);
    }
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="goal">
        <div>{new Date(data?.createdAt).toLocaleString("en-us")}</div>
        <input
          type="text"
          value={data?.text}
          name="text"
          style={{
            padding: ".5rem",
            marginBottom: ".6rem",
            marginTop: ".6rem",
            fontSize: "1.2rem",
            outline: "none",
            border: "none",
            width: "25vw",
          }}
          onChange={onHandleChange}
        />

        <div
          className="button "
          style={{ display: "flex", gap: ".5rem", justifyContent: "center" }}
        >
          <Link>
            <button
              className="btn"
              style={{ margin: "0 auto" }}
              onClick={handleSubmit}
            >
              Update
            </button>
          </Link>

          <Link to="/">
            <button
              className="btn "
              style={{
                margin: "0 auto",
                backgroundColor: "green",
                border: "none",
                outline: "none",
              }}
            >
              Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default EditGoal;
