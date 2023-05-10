import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateGoalData } from "../features/goal/goalSlice";
function EditGoal() {
  const { id } = useParams();
  const { goals, isSuccess } = useSelector((state) => state.goals);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(updateGoalData(data));
    navigate("/");
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

        <Link>
          <button
            className="btn"
            style={{ margin: "0 auto" }}
            onClick={handleSubmit}
          >
            Update
          </button>
        </Link>
      </div>
    </>
  );
}

export default EditGoal;
