import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { useCart } from "../../context/CartContext";

function Card({ filterCategory }) {
  const { products, activeCategory, activePlatform, searchQuery } = useCart();
  const scrollRef = useRef(null);
  const scrollAmount = 400;

  const prevSlide = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const categoryToUse = filterCategory || activeCategory;

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      !categoryToUse ||
      categoryToUse === "All" ||
      (item.category && item.category.toLowerCase() === categoryToUse.toLowerCase()) ||
      (item.name && item.name.toLowerCase().includes(categoryToUse.toLowerCase()));

    const matchesPlatform =
      !activePlatform ||
      activePlatform === "All" ||
      (item.platform && item.platform.toLowerCase() === activePlatform.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      item.subname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.platform?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPlatform && matchesSearch;
  });

  return (
    <div className="relative group/slider my-2">
      {/* Scroll Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Scroll Left"
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-gray-800 items-center justify-center shadow-lg border border-gray-100 hover:bg-rose-50 hover:text-rose-600 transition-all opacity-0 group-hover/slider:opacity-100 hover:scale-110 active:scale-95"
      >
        <FaChevronLeft className="text-sm" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Scroll Right"
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-gray-800 items-center justify-center shadow-lg border border-gray-100 hover:bg-rose-50 hover:text-rose-600 transition-all opacity-0 group-hover/slider:opacity-100 hover:scale-110 active:scale-95"
      >
        <FaChevronRight className="text-sm" />
      </button>

      {/* Product cards list */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth gap-1 pb-4 pt-2 -mx-2 px-2"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((data, index) => (
            <ProductCard key={data.id || index} {...data} />
          ))
        ) : (
          <div className="w-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">
              No products found matching your current filter. Try selecting "All Platforms" or another category!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
