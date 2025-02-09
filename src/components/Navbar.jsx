import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion ,AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiHome,
  FiPackage,
  FiMenu,
} from "react-icons/fi";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import SearchBar from "../components/SearchBar"

// Custom Hook
import useLogout from "../../hooks/useLogout";
import CategorySearch from "./Home/CategorySearch";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const logout = useLogout();
  const navigate = useNavigate();

  // Check authentication & admin status
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isAuthenticated =
    localStorage.getItem("userToken") || localStorage.getItem("adminToken");

  // Define navigation links based on authentication status
  const getNavLinks = () => {
    const commonLinks = [
      { path: "/", name: "Home", icon: <FiHome /> },
      { path: "/products", name: "Products", icon: <FiPackage /> },
      { path: "/wishlist", name: "Wishlist", icon: <FiHeart /> },
      { path: "/cart", name: "Cart", icon: <FiShoppingCart /> },
    ];

    if (isAdmin) {
      return [
        ...commonLinks,
        { path: "/admin-dashboard", name: "Admin", icon: <FaRegUser /> },
        { path: "#", name: "Logout", icon: <FaSignOutAlt />, onClick: logout },
      ];
    } else if (isAuthenticated) {
      return [
        ...commonLinks,
        { path: "/orders", name: "Orders", icon: <FiPackage /> },
        { path: "/user-dashboard", name: "Profile", icon: <FaRegUser /> },
        { path: "#", name: "Logout", icon: <FaSignOutAlt />, onClick: logout },
      ];
    } else {
      return [
        ...commonLinks,
        { path: "/login", name: "Login", icon: <FiUser /> },
        { path: "/register", name: "Register", icon: <FiUser /> },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      {/* Desktop/Tablet Navigation */}
      <nav className="hidden md:flex items-center justify-between p-2 bg-gradient-to-r from-purple-700 to-blue-500 shadow-lg sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <img
            src="https://i.ibb.co/WN7vgHrT/Shop-Smart1.png"
            alt="Shop-Smart"
            onClick={() => navigate("/")} 
            className="h-10 w-auto hover:scale-110 transition-transform"
          />
        </div>
        <SearchBar/>

        <div className="relative flex items-center space-x-6">
          {navLinks.map((link) => (
           <NavLink
  key={link.path}
  to={link.path}
  className={({ isActive }) =>
    `relative flex items-center space-x-2 p-2 rounded-lg transition-colors ${
      isActive
        ? "text-blue-600 dark:text-white"
        : "text-gray-600 dark:text-white"
    }`
  }
  onClick={link.onClick}
>
  {({ isActive }) => (
    <>
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 bg-blue-900 dark:bg-purple-600 rounded-lg"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
      <span className="relative flex items-center space-x-2 z-10 pr-4">
        {link.icon}
        <span className="hidden lg:inline">{link.name}</span>
      </span>
    </>
  )}
</NavLink>

          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 w-full bg-gradient-to-r from-purple-700 to-blue-500 border-t border-gray-200 dark:border-gray-800 z-50">
        <div className="relative flex justify-around items-center p-2">
          {navLinks.slice(0, 4).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative p-3 rounded-full ${
                  isActive
                    ? "text-blue-600 dark:text-white"
                    : "text-gray-600 dark:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavMobile"
                      className="absolute inset-0   rounded-full opacity-100 border-2 border-blue-600 dark:border-blue-400"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.icon}
                </>
              )}
            </NavLink>
          ))}

          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-3 text-gray-600 dark:text-gray-300"
          >
            <FiMenu />
          </button>
        </div>

        <AnimatePresence>
  {isMenuOpen && (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-50"
      onClick={() => setIsMenuOpen(false)}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 w-full bg-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-t-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-4 ${
                isActive
                  ? "text-blue-600 dark:text-white"
                  : "text-gray-600 dark:text-white"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </motion.div>
    </div>
  )}
</AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
