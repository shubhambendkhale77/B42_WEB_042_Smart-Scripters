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
<<<<<<< HEAD
import CategoryPage from "../pages/CategoryPage";
=======
import Wishlist from "../pages/Wishlist";
import OrderTracker from "../pages/OrderTracker";
>>>>>>> 45733279c524ec94846221ea38918ec3cf64209f

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<PrivateRoute element={<Product />}/>} />
<<<<<<< HEAD
      <Route path="/productinfo/:id" element={<ProductInfo />} />
=======
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/productinfo" element={<ProductInfo />} />
>>>>>>> 45733279c524ec94846221ea38918ec3cf64209f
      <Route path="/cart" element={<CartPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user-dashboard" element={<UserDashBoard />} />
      <Route path="/addproduct"  element={<AddProductPage />}  />
      <Route path="/tracker"  element={<OrderTracker/>}  />
      <Route path="/updateproduct/:id"element={<UpdateProductPage />} />
      <Route path="/category/:categoryname" element={<CategoryPage/>}/>
    </Routes>
  );
};

export default AppRoutes;
