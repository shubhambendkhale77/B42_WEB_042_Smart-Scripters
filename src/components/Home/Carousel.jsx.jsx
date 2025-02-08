import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Images array
  const images1 = [
    "https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg",
    "https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg",
    "https://api.spicezgold.com/download/file_1734524893797_NewProject(13).jpg",
    "https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg",
    "https://api.spicezgold.com/download/file_1734524958576_NewProject(10).jpg",
    "https://api.spicezgold.com/download/file_1734525002307_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg",
    "https://api.spicezgold.com/download/file_1734525014348_NewProject(7).jpg",
  ];
  const images = [
    "https://i.ibb.co/9mTpCZrG/1.jpg",
    "https://i.ibb.co/dwv4z6Nq/2.jpg",
    "https://i.ibb.co/JFWjGF0W/3.jpg",
    "https://i.ibb.co/jPWLHBZJ/4.jpg",
    "https://i.ibb.co/js2YLpw/5.jpg",
    "https://i.ibb.co/ccVHB1rG/6.jpg"
  ];
  

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-slide effect using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="  ">
    <div className="relative  mr-8 ml-8 mt-10 rounded-2xl">
      {/* Image Wrapper */}
      <div className="overflow-x-hidden">
        <div
          className="flex transition-transform duration-500 rounded-2xl "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="min-h-48 object-cover rounded-2xl"
              
            />
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4  text-black p-2 bg-gray-100 opacity-50 rounded-2xl"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4  text-black p-2 bg-gray-100 opacity-50 rounded-2xl"
      >
        ❯
      </button>
    </div>
    </div>
  );
};

export default Carousel;
