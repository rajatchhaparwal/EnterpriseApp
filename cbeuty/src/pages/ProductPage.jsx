import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { useLocation, useParams, Link } from "react-router-dom";
import ProductDetails from '../components/products/ProductDetails';
import Footer from '../components/Footer';
import BottomNavigation from '../components/bottomNavigation/BottomNavigation';
import { useCart } from '../context/CartContext';
import { FaArrowLeft } from 'react-icons/fa';

function ProductPage() {
  const { state } = useLocation();
  const { subname } = useParams();
  const { products } = useCart();

  // Try finding product from router state, else search products list by slug/subname
  let product = state?.product;
  if (!product && subname) {
    const decoded = decodeURIComponent(subname).toLowerCase();
    product = products.find(
      (p) =>
        p.subname.toLowerCase() === decoded ||
        decoded.includes(p.subname.toLowerCase()) ||
        p.subname.toLowerCase().includes(decoded)
    );
    if (!product) {
      product = products[0];
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f7] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-rose-600 transition-colors"
          >
            <FaArrowLeft className="text-[11px]" /> Back to all deals
          </Link>
        </div>

        {product ? (
          <ProductDetails product={product} />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-rose-100 shadow-soft">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Deal Not Found</h2>
            <p className="text-sm text-gray-500 mb-6">The product deal you are looking for has expired or is unavailable.</p>
            <Link
              to="/"
              className="bg-rose-600 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-rose-700 shadow-md transition-colors"
            >
              Browse Active Deals
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}

export default ProductPage;
