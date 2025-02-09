import React from "react";
import { useNavigate } from "react-router-dom";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3 text-2xl">
      <p className="capitalize text-black font-medium">
        {text1} <span className="text-gray-500 ">{text2} </span>
      </p>
    </div>
  );
};

const FeaturedCategories = () => {
  const navigate = useNavigate();
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

  function handleFeaturedCategory(pathName) {
    navigate("/category/" + pathName);
  }

  return (
    <div className="mt-12 px-8 mr-8 ml-8 bg-gradient-to-b from-blue-100 to-purple-800 rounded-2xl py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-8 ml-8">
        <Title text1={"Featured Categories"} text2={""} />
      </h2>

      {/* Wrapper with extra padding and scroll improvement */}
      <div className="overflow-hidden ">
        {/* Draggable Scroll Container */}
        <div
          className="flex gap-4   cursor-grab active:cursor-grabbing overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseDown={(e) => {
            const container = e.currentTarget;
            let startX = e.pageX - container.offsetLeft;
            let scrollLeft = container.scrollLeft;

            const onMouseMove = (event) => {
              const x = event.pageX - container.offsetLeft;
              const walk = (x - startX) * 1.5; // Speed multiplier
              container.scrollLeft = scrollLeft - walk;
            };

            const onMouseUp = () => {
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleFeaturedCategory(category.path)}
              className="flex flex-col items-center p-4 w-40 h-40 cursor-pointer gap-2"
            >
              <div className="flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:translate-y-[-5px] hover:shadow-lg text-4xl w-20 h-20 rounded-full bg-green-100">
                {category.icon}
              </div>
              <p className="text-sm font-medium text-gray-700">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
