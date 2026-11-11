import React from 'react';
import { FaHome, FaStore, FaBolt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function BottomNavigation() {
  const { setActivePlatform } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleFilter = (plat) => {
    setActivePlatform(plat);
    const section = document.getElementById("shop-products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-rose-100 md:hidden shadow-lg z-50">
      <div className="flex justify-around items-center h-16 px-2">
        
        {/* Home */}
        <Link
          to="/"
          onClick={() => setActivePlatform("All")}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium transition-colors ${
            isActive('/') ? 'text-rose-600 font-bold' : 'text-gray-500 hover:text-rose-500'
          }`}
        >
          <FaHome className="text-lg mb-1" />
          <span>Home</span>
        </Link>

        {/* Amazon Deals */}
        <button
          onClick={() => handleFilter("Amazon")}
          className="flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
        >
          <FaBolt className="text-lg mb-1 text-amber-500" />
          <span>Amazon</span>
        </button>

        {/* Flipkart Deals */}
        <button
          onClick={() => handleFilter("Flipkart")}
          className="flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <FaBolt className="text-lg mb-1 text-blue-600" />
          <span>Flipkart</span>
        </button>

        {/* Admin Portal */}
        <Link
          to="/admin"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium transition-colors ${
            isActive('/admin') ? 'text-rose-600 font-bold' : 'text-gray-500 hover:text-rose-500'
          }`}
        >
          <FaStore className="text-lg mb-1" />
          <span>Admin</span>
        </Link>
      </div>
    </nav>
  );
}
