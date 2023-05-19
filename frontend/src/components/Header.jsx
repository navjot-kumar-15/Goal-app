import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success("User logout successfully");
    navigate("/login");
  };
  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/" className="header-heading">
            GoalSetter
          </Link>
        </div>
        <ul>
          {user && (
            <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              <div className="userName">
                <span style={{ marginRight: ".5rem", fontSize: "1.5rem" }}>
                  Hey
                </span>
                <span style={{ fontSize: "1.5rem" }}>
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </span>
              </div>
            </span>
          )}
          {user ? (
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
}

export default Header;
