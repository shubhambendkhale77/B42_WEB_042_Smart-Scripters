import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {FiSearch,FiUser,FiShoppingCart,FiHeart,FiHome,FiPackage,FiSun,FiMoon,FiX,FiMenu,
} from "react-icons/fi";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const navLinks = [
    { path: "/", name: "Home", icon: <FiHome /> },
    { path: "/products", name: "Products", icon: <FiPackage /> },
    { path: "/wishlist", name: "Wishlist", icon: <FiHeart /> },
    { path: "/cart", name: "Cart", icon: <FiShoppingCart /> },
    { path: "/orders", name: "Orders", icon: <FiPackage /> },
    { path: "/login", name: "Login", icon: <FiUser /> },
    { path: "/register", name: "Register", icon: <FiUser /> },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      {/* Desktop/Tablet Navigation */}
      <nav className="hidden md:flex items-center justify-between p-4 bg-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg sticky top-0 z-50">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-4"
        >
          <img
            src="https://i.ibb.co/qYsh2d3q/image-removebg-preview-1.png"
            alt="Logo"
            className="h-8 w-auto hover:rotate-12 transition-transform"
          />
        </motion.div>

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
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 bg-blue-900 dark:bg-blue-900 rounded-lg pr-4"
                      transition={{
                        type: "spring",
                        stiffness: 400,
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

          {/* <motion.button
            onClick={toggleTheme}
            whileHover={{ rotate: 180 }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDark ? (
              <FiMoon className="text-yellow-400" />
            ) : (
              <FiSun className="text-gray-600" />
            )}
          </motion.button> */}
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
              {({ isActive }) => (
                <>
                  {link.icon}
                  {isActive && (
                    <motion.span
                      layoutId="mobile-highlight"
                      className="absolute inset-0 border-2 border-blue-500 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
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
          <div>
          <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="absolute bottom-0 w-full bg-white dark:bg-gray-900 rounded-t-2xl p-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile menu content */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
      </nav>
    </>
  );
};

export default Navbar;