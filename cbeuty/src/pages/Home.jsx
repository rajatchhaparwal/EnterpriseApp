import React from "react";
import Navbar from "../components/navbar/Navbar";
import Mycarousel from "../components/carousel-on-home/Mycarousel";
import TrustBar from "../components/home/TrustBar";
import Flexcard from "../components/homeflexcard/Flexcard";
import ProductSection from "../components/products/ProductSection";
import BeautyClubBanner from "../components/home/BeautyClubBanner";
import Footer from "../components/Footer";
import BottomNavigation from "../components/bottomNavigation/BottomNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f7] flex flex-col">
      <Navbar />

      {/* Hero Carousel */}
      <main className="flex-1">
        <Mycarousel />

        {/* Brand Trust Perks */}
        <TrustBar />

        {/* Promo Spotlights */}
        <Flexcard />

        {/* Featured Products */}
        <div id="shop-products" className="scroll-mt-36">
          <ProductSection Poducttype="futured Product" />
        </div>

        {/* Mid-page Editorial Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="relative rounded-3xl overflow-hidden shadow-soft border border-rose-100 group">
            <img
              className="w-full h-44 sm:h-64 lg:h-80 object-cover object-center group-hover:scale-102 transition-transform duration-700"
              src="https://images-static.nykaa.com/uploads/dd133d2a-9b0e-411d-ab27-f189fab8cfa0.jpg?tr=cm-pad_resize,w-1400"
              alt="Luxury Beauty Spotlight"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-950/80 via-rose-950/40 to-transparent flex items-center p-6 sm:p-12">
              <div className="max-w-md text-white space-y-2">
                <span className="bg-white/20 backdrop-blur-md text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                  Spotlight of the Week
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold leading-tight">
                  The Velvet Matte Lip Revolution
                </h3>
                <p className="text-xs sm:text-sm text-rose-100 hidden sm:block">
                  Discover bold, transfer-resistant pigments designed for Indian skin tones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Suggested For You */}
        <ProductSection Poducttype="Suggested For You" />

        {/* VIP Beauty Club Subscription */}
        <BeautyClubBanner />

        {/* New Arrivals */}
        <ProductSection Poducttype="New Arrival" />
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}
