import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { getGoals } from "../features/goal/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

function Dashboad() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isError, message, isLoading } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      console.log(message);
    }

    dispatch(getGoals());
  }, [user, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1 className="tracking-in-contract">Welcome {user && user.name} </h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />

      <section className="content">
        <h2>Your Goals</h2>
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem goal={goal} key={goal._id} />
            ))}
          </div>
        ) : (
          <h3>You dont have any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboad;
