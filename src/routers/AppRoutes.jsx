import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Login from "../assets/Auth/Login";
import Register from "../assets/Auth/Register"; // Ensure correct import path
import PrivateRoute from "../Private/PrivateRoute";
import ProductInfo from "../pages/ProductInfo";
import CartPage from "../pages/CartPage";
import UserDashBoard from "../pages/UserDashBoard";
import AdminDashboard from "../pages/AdminDashboard";
import AddProductPage from "../pages/AddProductPage";
import UpdateProductPage from "../pages/UpdateProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Product />}/>
      <Route path="/productinfo" element={<ProductInfo />} />
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="admin-dashboard" element={<AdminDashboard/>}/>
      <Route path="/user-dashboard" element={<UserDashBoard/>}/>
      <Route path="addproduct" element={<AddProductPage/>}/>
      <Route path="updateproduct/:id" element={<UpdateProductPage/>}/>
    </Routes>
  );
};

export default AppRoutes;
