import React from "react";
import { useNavigate } from "react-router-dom";


const Title = ({text1,text2}) => {
    return (
      <div className='inline-flex gap-2 items-center mb-3 text-2xl'>
          <p className='capitalize text-gray-700 font-medium'>{text1} <span className='text-gray-500 '>{text2} </span></p>
          
      </div>
    )
  }

const FeaturedCategories = () => {
  const navigate=useNavigate()
  const categories = [
    { "name": "Fashion", "icon": "👗", "path": "fashion" },
    { "name": "Shirt", "icon": "👕", "path": "shirt" },
    { "name": "Jacket", "icon": "🧥", "path": "jacket" },
    { "name": "Mobile", "icon": "📱", "path": "mobile" },
    { "name": "Laptop", "icon": "💻", "path": "laptop" },
    { "name": "Shoes", "icon": "👟", "path": "shoes" },
    { "name": "Home", "icon": "🏠", "path": "home" },
    { "name": "Books", "icon": "📚", "path": "books" }
  ]
  ;
  function handleFeaturedCategory(pathName){
    navigate("/category/"+pathName)
  }

  return (
    <div className="mt-10 px-8 mr-8 ml-8  bg-gradient-to-b from-blue-100 to-purple-800 rounded-2xl">
  <h2 className="text-xl md:text-2xl font-bold mb-6  ml-6">
    <Title text1={"Featured"} text2={"Categories"} />
  </h2>

  {/* Wrapper with extra padding and overflow fix */}
  <div className="overflow-visible pt-6">
    {/* Horizontal Scroll Container */}
    <div className="flex overflow-x-auto md:px-16 sm:px-8 pb-6 " style={{
    scrollbarWidth: "thin", 
    scrollbarColor: "purple white", 
  }} >
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => handleFeaturedCategory(category.path)}
          className="flex flex-col items-center p-4 mr-2 w-40 h-40 cursor-pointer gap-2"
        >
          <div className="flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:translate-y-[-5px] hover:shadow-lg text-4xl w-20 h-20 rounded-full bg-green-100">
            {category.icon}
          </div>
          <p className="text-sm font-medium text-gray-700">{category.name}</p>
        </div>
      ))}
    </div>
  </div>
</div>


  );
};

export default FeaturedCategories;