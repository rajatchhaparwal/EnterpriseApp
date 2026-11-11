import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
  FaLock,
  FaWhatsapp,
  FaPhoneAlt,
  FaBolt
} from "react-icons/fa";
import shraddhaEnterpriseLogo from "./navbar/shraddhaEnterpriseLogo.png";
import { useCart } from "../context/CartContext";

function Footer() {
  const { setActiveCategory, setActivePlatform } = useCart();

  const handleCat = (cat) => {
    setActiveCategory(cat);
    const el = document.getElementById("shop-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlat = (plat) => {
    setActivePlatform(plat);
    const el = document.getElementById("shop-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-stone-900 text-gray-300 pt-16 pb-24 md:pb-12 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Column 1: Brand & Affiliate Disclosure */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={shraddhaEnterpriseLogo}
                alt="Shraddha Enterprise"
                className="h-10 w-auto bg-white/95 p-1 rounded-lg"
              />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Shraddha Enterprise curates the highest-rated beauty and cosmetics deals across Amazon and Flipkart. We bring you direct discounted links with verified seller authenticity.
            </p>
            <div className="text-[11px] text-gray-500 border border-stone-800 p-2.5 rounded-xl bg-stone-950/40">
              <strong>Affiliate Disclosure:</strong> As an affiliate partner, we may earn a commission on qualifying purchases made through our links, at no extra cost to you.
            </div>
          </div>

          {/* Column 2: Top Stores & Deals */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-rose-500 pl-2.5">
              Top Stores
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <button onClick={() => handlePlat("Amazon")} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <FaBolt className="text-amber-500 text-xs" /> Amazon Beauty Deals
                </button>
              </li>
              <li>
                <button onClick={() => handlePlat("Flipkart")} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <FaBolt className="text-blue-500 text-xs" /> Flipkart Super Deals
                </button>
              </li>
              <li>
                <button onClick={() => handleCat("Lipstick")} className="hover:text-rose-400 transition-colors">
                  Top Rated Lipsticks
                </button>
              </li>
              <li>
                <button onClick={() => handleCat("Mascara")} className="hover:text-rose-400 transition-colors">
                  Waterproof Mascaras
                </button>
              </li>
              <li>
                <button onClick={() => handleCat("Skincare")} className="hover:text-rose-400 transition-colors">
                  Trending Skincare Serums
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-rose-500 pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-rose-400 transition-colors">
                  Home Deals
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-rose-400 hover:text-rose-300 font-bold transition-colors">
                  Admin Panel (Add Products)
                </Link>
              </li>
              <li>
                <span className="hover:text-rose-400 transition-colors cursor-pointer">
                  How We Pick Deals
                </span>
              </li>
              <li>
                <span className="hover:text-rose-400 transition-colors cursor-pointer">
                  Privacy Policy & Terms
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-rose-500 pl-2.5">
              Contact & Social
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-gray-400 mb-4">
              <a
                href="mailto:contact@shraddhaenterprise.com"
                className="flex items-center gap-2 hover:text-rose-400 transition-colors"
              >
                <FaEnvelope className="text-rose-500" /> rajatchhaparwal12@gmail.com
              </a>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-rose-500" /> +91 9406775552
              </div>
            </div>

            <p className="text-xs font-semibold text-gray-400 mb-2">Connect with our team:</p>
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <FaInstagram className="text-base" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="text-base" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <FaWhatsapp className="text-base" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="flex items-center gap-1 text-center md:text-left">
            © {new Date().getFullYear()} Shraddha Enterprise
          </p>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-stone-800 text-amber-400 px-2.5 py-1 rounded font-bold">Amazon Partner</span>
            <span className="bg-stone-800 text-blue-400 px-2.5 py-1 rounded font-bold">Flipkart Affiliate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
