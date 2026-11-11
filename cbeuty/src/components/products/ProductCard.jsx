import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaExternalLinkAlt, FaTag } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

export default function ProductCard(props) {
  const { redirectToAffiliate } = useCart();

  const price = props.price || 799;
  const originalPrice = props.originalPrice || Math.round(price * 1.25);
  const discount = props.discount || `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`;
  const rating = props.rating || 4.7;
  const reviewsCount = props.reviewsCount || 1250;
  const brand = props.brand || props.name || "Shraddha Beauty";
  const platform = props.platform || (props.affiliateUrl?.includes('flipkart') ? 'Flipkart' : 'Amazon');

  // Handle direct click redirect to Flipkart/Amazon
  const handleAffiliateClick = (e) => {
    e.preventDefault();
    redirectToAffiliate(props);
  };

  const isFlipkart = platform.toLowerCase() === 'flipkart';

  return (
    <div
      onClick={handleAffiliateClick}
      className="group relative w-64 sm:w-72 shrink-0 bg-white rounded-3xl border border-rose-100/70 p-3.5 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between m-2 cursor-pointer"
    >
      {/* Product Image & Platform Badges */}
      <div className="relative w-full aspect-square bg-stone-50 rounded-2xl overflow-hidden mb-3">
        <img
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          src={props.imageUrl}
          alt={props.subname}
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {/* Platform Badge */}
          <span
            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 ${
              isFlipkart
                ? "bg-blue-600 text-white"
                : "bg-amber-500 text-black"
            }`}
          >
            {isFlipkart ? "Flipkart" : "Amazon"}
          </span>

          {/* Discount Badge */}
          <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
            {discount}
          </span>
        </div>

        {/* Verified Deal Pill top right */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="bg-white/90 backdrop-blur-xs text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-gray-100">
            Verified Deal
          </span>
        </div>

        {/* Floating "View Deal" button on hover */}
        <div className="absolute inset-x-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <div
            className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg transition-colors ${
              isFlipkart
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-amber-500 text-black hover:bg-amber-400"
            }`}
          >
            <span>Buy on {platform}</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between px-1">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-rose-700 uppercase tracking-wider text-[11px]">
              {brand}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-amber-800 text-[11px] font-bold">
              <FaStar className="text-amber-500 text-[10px]" />
              <span>{rating}</span>
              <span className="text-gray-400 font-normal">
                ({reviewsCount > 999 ? `${(reviewsCount / 1000).toFixed(1)}k` : reviewsCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-sm font-semibold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug mb-2"
            title={props.subname}
          >
            {props.subname}
          </h3>
        </div>

        {/* Pricing & Redirect CTA */}
        <div>
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-lg font-extrabold text-gray-900">
              ₹{price}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{originalPrice}
            </span>
            <span className="text-[11px] font-bold text-emerald-600">
              Save ₹{originalPrice - price}
            </span>
          </div>

          {/* Direct Buy Redirect Button */}
          <button
            type="button"
            onClick={handleAffiliateClick}
            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm ${
              isFlipkart
                ? "bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200"
                : "bg-amber-50 hover:bg-amber-500 text-amber-900 hover:text-black border border-amber-300"
            }`}
          >
            <span>Buy on {platform}</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
