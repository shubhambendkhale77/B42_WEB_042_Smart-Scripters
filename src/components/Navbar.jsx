import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Product</NavLink>

      </nav>

    </div>
  );
};

export default Navbar;
