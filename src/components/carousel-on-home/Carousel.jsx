import React, { useEffect, useState } from "react";
import { heroCarouselData } from "../../data/mockData";
import { FaTag, FaArrowRight } from "react-icons/fa";

function Carousel({ currentSlide, onSelectSlide }) {
  const [carousel, setCarousel] = useState(heroCarouselData);

  useEffect(() => {
    const fetchCarouselImage = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/homeCarouseldata");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            // Merge backend data with rich metadata
            const merged = data.map((item, index) => {
              const defaultSlide = heroCarouselData[index % heroCarouselData.length];
              return {
                id: item.id || index + 1,
                title: item.title || defaultSlide.title,
                subtitle: item.subtitle || defaultSlide.subtitle,
                tag: item.tag || defaultSlide.tag,
                code: item.code || defaultSlide.code,
                buttonText: defaultSlide.buttonText,
                image: item.image || defaultSlide.image,
              };
            });
            setCarousel(merged);
          }
        }
      } catch (error) {
        // graceful fallback to heroCarouselData
      }
    };

    fetchCarouselImage();
  }, []);

  const slideTo = (index) => {
    onSelectSlide(index);
  };

  const handleShopClick = () => {
    const el = document.getElementById("shop-products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border border-rose-100/60 bg-white">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carousel.map((item, idx) => (
          <div key={item.id || idx} className="w-full shrink-0 relative min-h-[260px] sm:min-h-[380px] lg:min-h-[440px] flex items-center">
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title || "Beauty Banner"}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex items-center" />

            {/* Slide Content */}
            <div className="relative z-10 max-w-xl p-6 sm:p-10 lg:p-14 text-white space-y-3 sm:space-y-4">
              {item.tag && (
                <div className="inline-flex items-center gap-1.5 bg-rose-600/90 backdrop-blur-xs text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  <FaTag className="text-[11px]" /> {item.tag}
                </div>
              )}
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
                {item.title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-rose-100/90 font-medium line-clamp-2 drop-shadow-xs max-w-md">
                {item.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleShopClick}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm shadow-lg shadow-rose-900/40 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  {item.buttonText || "Shop Collection"} <FaArrowRight className="text-xs" />
                </button>

                {item.code && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-white/90 bg-white/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/20">
                    Use code: <strong className="text-amber-300 font-mono tracking-wider">{item.code}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
        {carousel.map((_, idx) => (
          <button
            key={idx}
            onClick={() => slideTo(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx
                ? "w-6 h-2 bg-rose-500"
                : "w-2 h-2 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
