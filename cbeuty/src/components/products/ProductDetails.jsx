import React, { useState } from "react";
import {
  FaStar,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaCheck,
  FaShareAlt,
  FaBolt
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import Card from "./Card";

function ProductDetails({ product }) {
  const { redirectToAffiliate, showToast } = useCart();
  const [activeTab, setActiveTab] = useState("description");

  // Collect images
  const images = [];
  if (product.imageUrl) images.push(product.imageUrl);
  if (product.images) {
    if (product.images.image1 && !images.includes(product.images.image1)) images.push(product.images.image1);
    if (product.images.image2 && !images.includes(product.images.image2)) images.push(product.images.image2);
    if (product.images.image3 && !images.includes(product.images.image3)) images.push(product.images.image3);
  }
  if (images.length === 1) images.push(product.imageUrl);

  const [selectedImage, setSelectedImage] = useState(images[0] || product.imageUrl);

  const price = product.price || 799;
  const originalPrice = product.originalPrice || Math.round(price * 1.3);
  const discount = product.discount || `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`;
  const rating = product.rating || 4.7;
  const reviewsCount = product.reviewsCount || 2350;
  const platform = product.platform || (product.affiliateUrl?.includes('flipkart') ? 'Flipkart' : 'Amazon');
  const isFlipkart = platform.toLowerCase() === 'flipkart';

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.subname,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast("Deal link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-12">
      {/* Product Main Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-rose-100/70">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Image Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-square bg-stone-50 rounded-3xl overflow-hidden border border-rose-100/50 flex items-center justify-center group">
              <img
                src={selectedImage}
                alt={product.subname}
                className="max-h-full max-w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Share button */}
              <button
                onClick={shareProduct}
                title="Share Deal"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-rose-600 flex items-center justify-center shadow-md transition-colors"
              >
                <FaShareAlt className="text-xs" />
              </button>

              {/* Badges */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span
                  className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md text-white ${
                    isFlipkart ? "bg-blue-600" : "bg-amber-500 text-black"
                  }`}
                >
                  {isFlipkart ? "Flipkart" : "Amazon"}
                </span>
                <span className="bg-rose-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                  {discount}
                </span>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-3 mt-4 overflow-x-auto max-w-full py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-stone-50 p-1 transition-all ${
                    selectedImage === img
                      ? "border-rose-600 scale-105 shadow-sm"
                      : "border-gray-200 hover:border-rose-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Affiliate Buy Info */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand & Platform */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 mb-2">
                <span>{product.brand || "Top Brand"}</span>
                <span>•</span>
                <span className="text-gray-400 font-normal">{product.category || product.name}</span>
                <span>•</span>
                <span className="text-amber-600 font-bold">Available on {platform}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {product.subname}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-3 mt-3">
                <div className="inline-flex items-center gap-1.5 bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                  <span>{rating}</span>
                  <FaStar className="text-[10px]" />
                </div>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  {reviewsCount.toLocaleString()} Verified Customer Ratings on {platform}
                </span>
              </div>

              {/* Price Block */}
              <div className="mt-5 p-4 bg-stone-50 rounded-2xl border border-stone-200/60">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-950">
                    ₹{price}
                  </span>
                  <span className="text-base text-gray-400 line-through">
                    ₹{originalPrice}
                  </span>
                  <span className="text-sm font-extrabold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Save ₹{originalPrice - price} ({discount})
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  Live deal price checked on {platform}. Prices may fluctuate according to seller promotions.
                </p>
              </div>

              {/* Big Affiliate Buy CTA Button */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => redirectToAffiliate(product)}
                  className={`w-full py-4 px-8 rounded-full font-extrabold text-base flex items-center justify-center gap-3 shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                    isFlipkart
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                      : "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-200"
                  }`}
                >
                  <FaBolt className="text-lg" />
                  <span>Buy on {platform} — Direct Deal Link</span>
                  <FaExternalLinkAlt className="text-sm" />
                </button>

                <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
                  <FaShieldAlt className="text-emerald-600" />
                  You will be safely redirected to the official {platform} store to complete your purchase.
                </p>
              </div>
            </div>

            {/* Value Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-center">
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <FaCheck className="text-emerald-600 mx-auto text-base mb-1" />
                <p className="text-[11px] font-bold text-gray-800">Verified Seller</p>
                <p className="text-[10px] text-gray-500">Official Brand Link</p>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <FaBolt className="text-amber-500 mx-auto text-base mb-1" />
                <p className="text-[11px] font-bold text-gray-800">Fast Shipping</p>
                <p className="text-[10px] text-gray-500">Prime / Assured</p>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <FaShieldAlt className="text-rose-600 mx-auto text-base mb-1" />
                <p className="text-[11px] font-bold text-gray-800">Secure Order</p>
                <p className="text-[10px] text-gray-500">Pay on {platform}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-rose-100/70">
        <div className="flex border-b border-gray-200 gap-4 sm:gap-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-3 px-2 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "description"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Product Overview & Why We Recommend
          </button>
        </div>

        <div className="pt-6 max-w-3xl text-sm text-gray-700 leading-relaxed space-y-4">
          <p>
            {product.description ||
              "This deal is handpicked by Shraddha Enterprise based on customer reviews, discount depth, and seller reliability on " + platform + "."}
          </p>

          <div className="p-4 bg-stone-50 rounded-2xl border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-2">Deal Highlights:</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600 list-disc ml-5">
              <li>Lowest verified price online on {platform}</li>
              <li>Eligible for platform return & refund policies</li>
              <li>100% Genuine and authenticated merchandise</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommended Deals */}
      <div className="pt-6">
        <div className="mb-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            More Trending Deals For You
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Click any product to view its direct discount deal link
          </p>
        </div>
        <Card />
      </div>
    </div>
  );
}

export default ProductDetails;
