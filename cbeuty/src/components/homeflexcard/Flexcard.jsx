import React from "react";
import { promoCategories } from "../../data/mockData";
import { FaArrowRight, FaMagic } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

export default function Flexcard() {
  const { setActiveCategory, setActivePlatform } = useCart();

  const handleCardClick = (item) => {
    if (item.categoryFilter) {
      setActiveCategory(item.categoryFilter);
    }
    if (item.platformFilter) {
      setActivePlatform(item.platformFilter);
    }
    const section = document.getElementById("shop-products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
        <div>
          <span className="text-rose-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <FaMagic /> Verified Affiliate Deals
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Curated Store Spotlights
          </h2>
        </div>
        <p className="text-sm text-gray-500 mt-1 sm:mt-0 max-w-sm">
          Browse top-rated deals directly on Amazon and Flipkart at discounted prices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promoCategories.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg cursor-pointer transition-all duration-300 border border-rose-100/60"
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-transparent group-hover:from-gray-950 transition-colors duration-300" />

            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-rose-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                {item.discount}
              </span>
            </div>

            {/* Card Content at bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-white space-y-2">
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                {item.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                {item.subtitle}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-white/95 hover:bg-white text-gray-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg group-hover:bg-rose-600 group-hover:text-white transition-all duration-200"
                >
                  View Deals <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
