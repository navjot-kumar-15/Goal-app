import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboad from "./pages/Dashboad";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import EditGoal from "./components/EditGoal";

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboad />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:id" element={<EditGoal />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
