import { useState, useEffect } from "react";
import slide1 from "../assets/images/groceryshop.png";
import slide2 from "../assets/images/shop.png";
import slide3 from "../assets/images/shopping3.png";
import slide4 from "../assets/images/shopping4.png";
import slide5 from "../assets/images/shopping.png";
import slide6 from "../assets/images/shopping4.png";

const images = [slide1, slide2, slide3, slide4, slide5, slide6];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full min-h-[300px] overflow-hidden">
      {}
      <div className="w-full h-[500px]">
        <img
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
        />
      </div>

      {}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md opacity-70 hover:opacity-100"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md opacity-70 hover:opacity-100"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
};

export default HeroSection;
