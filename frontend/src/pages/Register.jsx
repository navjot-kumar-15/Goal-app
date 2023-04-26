import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = form;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }

    if (isLoading) {
      return <Spinner />;
    }
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
          <p>Please create an account</p>
        </h1>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="password2"
                value={password2}
                placeholder="Confirm your password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default Register;
