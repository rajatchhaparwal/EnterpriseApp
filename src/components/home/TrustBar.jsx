import React from "react";
import { FaBolt, FaCheckCircle, FaShieldAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function TrustBar() {
  const perks = [
    {
      icon: <FaBolt className="text-xl sm:text-2xl text-amber-500" />,
      title: "Direct Store Redirects",
      subtitle: "Shop safely on Amazon & Flipkart"
    },
    {
      icon: <FaCheckCircle className="text-xl sm:text-2xl text-rose-600" />,
      title: "Verified Lowest Prices",
      subtitle: "Handpicked deals & coupons"
    },
    {
      icon: <FaShieldAlt className="text-xl sm:text-2xl text-blue-600" />,
      title: "100% Genuine Listings",
      subtitle: "From brand official flagship stores"
    },
    {
      icon: <FaExternalLinkAlt className="text-xl sm:text-2xl text-emerald-600" />,
      title: "Official Return Policy",
      subtitle: "Standard Amazon/Flipkart guarantee"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-white rounded-2xl border border-rose-100/80 shadow-soft">
        {perks.map((perk, index) => (
          <div key={index} className="flex items-center gap-3.5 p-2">
            <div className="p-3 bg-stone-50 rounded-xl shrink-0 border border-gray-100">
              {perk.icon}
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                {perk.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-snug">
                {perk.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
