import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { heroCarouselData } from "../../data/mockData";

function Mycarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = heroCarouselData.length;

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [totalSlides]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-28 lg:mt-32 group">
      {/* Sleek Floating Next / Prev Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <FaChevronLeft className="text-sm sm:text-base text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <FaChevronRight className="text-sm sm:text-base text-gray-700" />
      </button>

      <Carousel currentSlide={currentSlide} onSelectSlide={setCurrentSlide} />
    </div>
  );
}

export default Mycarousel;
