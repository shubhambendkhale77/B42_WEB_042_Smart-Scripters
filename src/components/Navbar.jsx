import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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

// add custom Hook
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const logout = useLogout();

  // Check if user is admin
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
      <nav className="hidden md:flex items-center justify-between p-4 bg-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <img
            src="https://i.ibb.co/qYsh2d3q/image-removebg-preview-1.png"
            alt="Logo"
            className="h-8 w-auto hover:rotate-12 transition-transform"
          />
        </div>

        <div className="flex-1 mx-8 max-w-2xl relative">
          <div className="flex items-center bg-gray-100 dark:bg-transparent rounded-lg px-4 py-2">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="ml-2 bg-transparent outline-none w-full h-10 px-2 rounded-lg dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              {/* Auto-suggest items here */}
            </div>
          )}
        </div>

        <div className="relative flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative flex items-center space-x-2 p-2 rounded-lg transition-colors
                ${
                  isActive
                    ? "text-blue-600 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300"
                }`
              }
              onClick={link.onClick}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-900 dark:bg-blue-900 rounded-lg pr-4" />
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
      <nav className="md:hidden fixed bottom-0 w-full bg-gradient-to-r from-gray-900 to-gray-600 border-t border-gray-200 dark:border-gray-800 z-50">
        <div className="relative flex justify-around items-center p-2">
          {navLinks.slice(0, 4).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative p-3 rounded-full ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300"
                }`
              }
            >
              {link.icon}
            </NavLink>
          ))}

          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-3 text-gray-600 dark:text-gray-300"
          >
            <FiMenu />
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="absolute bottom-0 w-full bg-white dark:bg-gray-900 rounded-t-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.slice(4).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-4 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
