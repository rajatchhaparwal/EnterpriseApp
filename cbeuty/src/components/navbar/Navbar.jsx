import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import shraddhaEnterpriseLogo from "./shraddhaEnterpriseLogo.png";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaTag,
  FaChevronRight,
  FaStore,
  FaExternalLinkAlt,
  FaBolt
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activePlatform,
    setActivePlatform,
    redirectToAffiliate
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const results = products.filter(
        (p) =>
          p.subname.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.platform && p.platform.toLowerCase().includes(q))
      );
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  // Click outside search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = ["All", "Lipstick", "Lip Liner", "Mascara", "Foundation", "Skincare"];

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    navigate('/');
    setMobileMenuOpen(false);
    const section = document.getElementById("shop-products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePlatformClick = (platform) => {
    setActivePlatform(platform);
    navigate('/');
    setMobileMenuOpen(false);
    const section = document.getElementById("shop-products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="w-full fixed top-0 z-50 transition-all duration-300">
        {/* Top Announcement Bar */}
        {announcementVisible && (
          <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 text-white text-xs py-1.5 px-4 font-medium tracking-wide">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 mx-auto text-center">
                <span className="hidden sm:inline bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  🔥 Deals Hub
                </span>
                <span>
                  Verified Best Prices from <strong>Amazon</strong> & <strong>Flipkart</strong> — Direct Discount Links & Lowest Deals
                </span>
              </div>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="text-white/80 hover:text-white ml-2 text-xs"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Main Navbar */}
        <nav className="bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <img
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
                  src={shraddhaEnterpriseLogo}
                  alt="Shraddha Enterprise"
                />
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-rose-700">Deals & Beauty</span>
                  <span className="text-[10px] text-gray-400 font-medium">Affiliate Recommendations</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-semibold text-gray-700">
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    setActiveCategory('All');
                    setActivePlatform('All');
                  }}
                  className="px-3 py-2 rounded-full hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  All Deals
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handlePlatformClick("Amazon")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 border ${activePlatform === "Amazon"
                      ? "bg-amber-500 text-black border-amber-600 shadow-xs"
                      : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
                    }`}
                >
                  <FaBolt className="text-[10px] text-amber-700" /> Amazon Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePlatformClick("Flipkart")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 border ${activePlatform === "Flipkart"
                      ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                      : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
                    }`}
                >
                  <FaBolt className="text-[10px] text-blue-600" /> Flipkart Deals
                </button>
              </li>
            </ul>

            {/* Live Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-sm mx-2 relative" ref={searchRef}>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products, Amazon, Flipkart..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 text-xs bg-stone-50 border border-gray-200 rounded-full focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all shadow-inner"
                />
                <FaSearch className="absolute left-3.5 top-2.5 text-gray-400 text-xs" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-700 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-11 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-2 border-b border-gray-100 bg-rose-50/50 flex justify-between items-center text-xs text-gray-500 font-medium">
                    <span>Products matching "{searchQuery}"</span>
                    <span className="text-rose-600 font-bold">{searchResults.length} found</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between gap-3 p-3 hover:bg-rose-50/70 transition-colors group cursor-pointer"
                        onClick={() => {
                          setSearchResults([]);
                          setSearchQuery("");
                          redirectToAffiliate(product);
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.imageUrl}
                            alt=""
                            className="w-10 h-10 object-cover rounded-lg border border-gray-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded ${product.platform === 'Flipkart' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-900'
                                }`}>
                                {product.platform || 'Amazon'}
                              </span>
                              <span className="text-xs font-bold text-gray-900 truncate">
                                ₹{product.price}
                              </span>
                            </div>
                            <p className="text-xs text-gray-700 truncate">{product.subname}</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-rose-600 shrink-0 flex items-center gap-1">
                          Buy Now <FaExternalLinkAlt className="text-[9px]" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Action Icons: Admin Portal Button */}
            <div className="flex items-center space-x-2">
              <Link
                to="/admin"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-stone-900 text-white hover:bg-rose-600 transition-colors shadow-xs"
                title="Admin Dashboard"
              >
                <FaStore className="text-xs" /> Admin
              </Link>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-rose-600 rounded-full hover:bg-rose-50"
                aria-label="Search"
              >
                <FaSearch className="text-base" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="md:hidden px-4 pb-3 pt-1 border-t border-gray-100 bg-white" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Amazon / Flipkart products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-9 py-2 text-xs bg-stone-50 border border-gray-200 rounded-full focus:outline-none focus:border-rose-500"
                />
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
              </div>
            </div>
          )}

          {/* Category & Platform Filter Bar */}
          <div className="bg-stone-50/90 border-t border-b border-gray-100 overflow-x-auto no-scrollbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 text-xs font-medium">
              <span className="text-gray-400 flex items-center gap-1 font-semibold uppercase text-[11px] tracking-wider shrink-0 mr-1">
                <FaTag className="text-rose-500 text-xs" /> Platform:
              </span>

              {/* Platform Pills */}
              <button
                onClick={() => handlePlatformClick("All")}
                className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 ${activePlatform === "All"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                  }`}
              >
                All Platforms
              </button>
              <button
                onClick={() => handlePlatformClick("Amazon")}
                className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 flex items-center gap-1 ${activePlatform === "Amazon"
                    ? "bg-amber-500 text-black shadow-xs"
                    : "bg-white text-amber-900 border border-amber-200 hover:bg-amber-50"
                  }`}
              >
                Amazon
              </button>
              <button
                onClick={() => handlePlatformClick("Flipkart")}
                className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 flex items-center gap-1 ${activePlatform === "Flipkart"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-blue-900 border border-blue-200 hover:bg-blue-50"
                  }`}
              >
                Flipkart
              </button>

              <div className="h-4 w-px bg-gray-300 mx-1 shrink-0" />

              <span className="text-gray-400 uppercase text-[11px] font-semibold shrink-0">Categories:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3 py-1 rounded-full transition-all shrink-0 ${activeCategory === cat
                      ? "bg-rose-600 text-white font-bold shadow-xs"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-rose-400"
                    }`}
                >
                  {cat === "All" ? "✨ All" : cat}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50">
              <img src={shraddhaEnterpriseLogo} alt="Logo" className="h-8 object-contain" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-800"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Navigation</p>
                <div className="space-y-1">
                  <Link
                    to="/"
                    onClick={() => {
                      setActiveCategory('All');
                      setActivePlatform('All');
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-sm font-medium text-gray-800 rounded-lg hover:bg-rose-50"
                  >
                    All Deals
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-bold text-rose-700 bg-rose-50 rounded-lg"
                  >
                    Store Admin (Add / Manage Products)
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Platforms</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handlePlatformClick("Amazon")}
                    className="px-3 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs text-left"
                  >
                    Amazon Deals
                  </button>
                  <button
                    onClick={() => handlePlatformClick("Flipkart")}
                    className="px-3 py-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 font-bold text-xs text-left"
                  >
                    Flipkart Deals
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className={`text-left text-xs font-medium px-3 py-2 rounded-lg border ${activeCategory === cat
                          ? "bg-rose-600 text-white border-rose-600"
                          : "border-gray-200 text-gray-700 hover:bg-rose-50"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} Shraddha Enterprise Affiliate Hub
            </div>
          </div>
        </div>
      )}
    </>
  );
}
