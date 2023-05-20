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

  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    let updateBtn = document.querySelector(".update");
    if (data.text.length !== data.text.length) {
      dispatch(updateGoalData(data));
      updateBtn.style.backgroundColor = "green";
      navigate("/");
      toast.success("Goal updated successfully");
    } else {
      toast.warn("Please do some changes to update");
      updateBtn.style.backgroundColor = "red";
    }
  };

  // onHandleChange function
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
      <div className="EditGoal">
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
              className="btn update"
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
