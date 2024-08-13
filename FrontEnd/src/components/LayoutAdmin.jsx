import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav/Nav";
import Sidebar from "./Nav/Sidebar";
import { useSelector } from "react-redux";

const LayoutAdmin = () => {
  const auth = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.role !== "admin" && auth?.role !== "nhanvien") {
      window.location.href = "/";
    }
  }, [auth, navigate]);

  if (auth?.role !== "admin" && auth?.role !== "nhanvien") {
    return null;
  }

  return (
    <div className="wrapper">
      <Nav />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default LayoutAdmin;
