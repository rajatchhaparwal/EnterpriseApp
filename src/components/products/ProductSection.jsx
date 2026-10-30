import React from 'react';
import Card from './Card';
import { FaMagic, FaArrowRight, FaFire, FaGem } from "react-icons/fa";
import { Link } from 'react-router-dom';

function ProductSection(props) {
  const getHeaderDetails = (type) => {
    switch (type) {
      case 'futured Product':
      case 'Featured Products':
        return {
          title: "Featured Beauty Picks",
          subtitle: "Trending glam essentials adored by makeup artists & beauty lovers",
          badge: "Editor's Choice",
          icon: <FaMagic className="text-rose-500" />
        };
      case 'Suggested For You':
        return {
          title: "Recommended For You",
          subtitle: "Tailored to your skincare and makeup preferences",
          badge: "Personalized",
          icon: <FaGem className="text-amber-500" />
        };
      case 'New Arrival':
      case 'New Arrivals':
        return {
          title: "Fresh New Arrivals",
          subtitle: "Discover the latest formulations and seasonal shades",
          badge: "Just Landed",
          icon: <FaFire className="text-rose-600" />
        };
      default:
        return {
          title: props.Poducttype || "Popular Products",
          subtitle: "Premium cosmetics and beauty essentials",
          badge: "Exclusive",
          icon: <FaMagic className="text-rose-500" />
        };
    }
  };

  const details = getHeaderDetails(props.Poducttype);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-rose-100/60">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase tracking-widest bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 mb-2">
            {details.icon} {details.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {details.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-lg">
            {details.subtitle}
          </p>
        </div>

        <Link
          to="/admin"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 px-4 py-2 rounded-full transition-colors shadow-xs"
        >
          View Full Catalog <FaArrowRight className="text-xs" />
        </Link>
      </div>

      {/* Product Slider Cards */}
      <Card filterCategory={props.category} />
    </section>
  );
}

export default ProductSection;
