import React, { useState, useEffect } from "react";
import img1 from '../../assets/Carousel/1.jpg';
import img2 from '../../assets/Carousel/2.jpg';
import img3 from '../../assets/Carousel/3.jpg';
import img4 from '../../assets/Carousel/4.jpg';
import img5 from '../../assets/Carousel/5.jpg';
import img6 from '../../assets/Carousel/6.jpg';
import img7 from '../../assets/Carousel/7.jpg';


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Images array
  const images = [img1, img2, img3, img4, img5, img6, img7];

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide effect using setInterval
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen  overflow-hidden mt-[60px] rounded-2xl ">
      {/* Image Wrapper */}
      <div className="w-full h-full ">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-screen h-full object-cover flex-shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 text-white p-2 bg-black/40 bg-opacity-50 rounded-full transform -translate-y-1/2"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-8 text-white p-2 bg-black/40 bg-opacity-50 rounded-full transform -translate-y-1/2"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
