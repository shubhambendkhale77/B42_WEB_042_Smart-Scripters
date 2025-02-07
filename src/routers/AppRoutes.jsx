import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Login from "../assets/Auth/Login";
import Register from "../assets/Auth/Register";
import ProductInfo from "../pages/ProductInfo";
import CartPage from "../pages/CartPage";
import UserDashBoard from "../pages/UserDashBoard";
import AdminDashboard from "../pages/AdminDashboard";
import AddProductPage from "../pages/AddProductPage";
import UpdateProductPage from "../pages/UpdateProductPage";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user") || "{}");
  return admin?.user?.email === "admin@gmail.com" ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Product />} />
      <Route path="/productinfo" element={<ProductInfo />} />
      <Route path="/cart" element={<CartPage />} />
      
      {/* User Protected Routes */}
      <Route path="/user-dashboard" element={
        <ProtectedRoute>
          <UserDashBoard />
        </ProtectedRoute>
      } />
      
      {/* Admin Protected Routes */}
      <Route path="/admin-dashboard" element={
        <ProtectedRouteForAdmin>
          <AdminDashboard />
        </ProtectedRouteForAdmin>
      } />
      <Route path="/addproduct" element={
        <ProtectedRouteForAdmin>
          <AddProductPage />
        </ProtectedRouteForAdmin>
      } />
      <Route path="/updateproduct/:id" element={
        <ProtectedRouteForAdmin>
          <UpdateProductPage />
        </ProtectedRouteForAdmin>
      } />
    </Routes>
  );
};

export default AppRoutes;
