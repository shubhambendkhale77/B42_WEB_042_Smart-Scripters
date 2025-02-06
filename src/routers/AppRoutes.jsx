import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Login from "../assets/Auth/Login";
import Register from "../assets/Auth/register";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/products" element={<Product/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
    </Routes>
  );
};

export default AppRoutes;
