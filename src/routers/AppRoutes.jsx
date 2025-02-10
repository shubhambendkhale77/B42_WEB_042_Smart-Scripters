import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Login from "../assets/Auth/Login";
import Register from "../assets/Auth/Register";
import PrivateRoute from "../Private/PrivateRoute";
import ProductInfo from "../pages/ProductInfo";
import CartPage from "../pages/CartPage";
import UserDashBoard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AddProductPage from "../pages/AddProductPage";
import UpdateProductPage from "../pages/UpdateProductPage";
import CategoryPage from "../pages/CategoryPage";
import Wishlist from "../pages/Wishlist";
import OrderTracker from "../pages/OrderTracker";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Product />} />
      <Route path="/productinfo/:id" element={<ProductInfo />} />
      <Route
        path="/wishlist"
        element={<PrivateRoute element={<Wishlist />} />}
      />
      <Route path="/productinfo" element={<ProductInfo />} />
      <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
      <Route
        path="/admin-dashboard"
        element={<PrivateRoute element={<AdminDashboard />} />}
      />
      <Route
        path="/user-dashboard"
        element={<PrivateRoute element={<UserDashBoard />} />}
      />
      <Route
        path="/addproduct"
        element={<PrivateRoute element={<AddProductPage />} />}
      />
      <Route
        path="/tracker"
        element={<PrivateRoute element={<OrderTracker />} />}
      />
      <Route
        path="/updateproduct/:id"
        element={<PrivateRoute element={<UpdateProductPage />} />}
      />
      <Route path="/category/:categoryname" element={<CategoryPage />} />
      <Route
        path="/OrderTracker"
        element={<PrivateRoute element={<OrderTracker />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
