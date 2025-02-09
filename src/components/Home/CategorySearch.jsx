import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Laptop", icon: "💻", path: "laptop" },
  { name: "Mobile", icon: "📱", path: "mobile" },
  { name: "Electronics", icon: "🔌", path: "electronics" },
  { name: "Sports", icon: "⚽", path: "sports" },
  { name: "Shirt", icon: "👕", path: "shirt" },
  { name: "Fashion", icon: "👗", path: "fashion" },
  { name: "Home", icon: "🏠", path: "home" },
  { name: "Shoes", icon: "👟", path: "shoes" },
  { name: "Grocery", icon: "🛒", path: "grocery" },
  { name: "Books", icon: "📚", path: "books" },
  { name: "Jacket", icon: "🧥", path: "jacket" },
];

const CategorySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const filteredCategories = searchQuery
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories; // Show all if search is empty

  const handleSelectCategory = (path) => {
    setSearchQuery(""); // Clear search
    setShowDropdown(false); // Hide dropdown
    navigate(`/category/${path}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <div
        className="flex items-center bg-gray-100 dark:bg-transparent rounded-lg px-4 py-2"
        onClick={() => setShowDropdown(true)}
      >
        <FiSearch className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for Category"
          className="ml-2 bg-transparent outline-none w-full h-10 px-2 rounded-lg dark:text-white"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true); // Keep dropdown open
          }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Close on blur after a short delay
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-2 py-2 z-50"
        >
          {filteredCategories.map((category) => (
            <div
              key={category.path}
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all"
              onClick={() => handleSelectCategory(category.path)}
            >
              <span className="mr-3 text-lg">{category.icon}</span>
              <span className="text-gray-800 dark:text-white">{category.name}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CategorySearch;
