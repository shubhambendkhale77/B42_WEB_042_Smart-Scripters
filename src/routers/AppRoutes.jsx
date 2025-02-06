import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Login from "../assets/Auth/Login";
import Register from "../assets/Auth/register"; // Ensure correct import path
import PrivateRoute from "../Private/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/products" element={<PrivateRoute element={<Product />} />} />
    </Routes>
  );
};

export default AppRoutes;
