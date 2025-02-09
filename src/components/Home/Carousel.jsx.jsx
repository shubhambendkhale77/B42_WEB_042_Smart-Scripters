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
    <div className="relative w-screen overflow-hidden mt-[60px] rounded-2xl">
      {/* Outer Container with Padding */}
      <div className="px-6 sm:px-16">
        {/* Inner Carousel Container */}
        <div className="w-full h-full overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-1500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-8 text-black/50 p-2 bg-black/0 bg-opacity-50 rounded-full transform -translate-y-1/2"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-8 text-black/50 p-2 bg-black/0 bg-opacity-50 rounded-full transform -translate-y-1/2"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
  {images.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${
        index === currentIndex ? 'bg-white' : 'bg-gray-500'
      } sm:w-[6px] sm:h-[6px] xs:w-[4px] xs:h-[4px]`}
    />
  ))}
</div>
    </div>
  );
};

export default Carousel;