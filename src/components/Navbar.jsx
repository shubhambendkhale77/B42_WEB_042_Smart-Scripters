import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Product</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">SignUp</NavLink>

      </nav>

    </div>
  );
};

export default Navbar;
