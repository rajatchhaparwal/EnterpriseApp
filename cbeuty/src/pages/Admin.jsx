import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import BottomNavigation from '../components/bottomNavigation/BottomNavigation';
import { useCart } from '../context/CartContext';
import {
  FaBoxOpen,
  FaPlus,
  FaSearch,
  FaTrash,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaTag,
  FaBolt,
  FaCheckCircle
} from 'react-icons/fa';

export default function Admin() {
  const { products, addProduct, deleteProduct, showToast, redirectToAffiliate } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    subname: '',
    brand: '',
    category: 'Lipstick',
    platform: 'Amazon',
    affiliateUrl: '',
    price: '',
    originalPrice: '',
    imageUrl: 'https://images-static.nykaa.com/media/catalog/product/d/8/d8af9fc71249343326_1.jpg?tr=w-500,h-500,cm-pad_resize',
    badge: "Amazon's Choice",
    description: ''
  });

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!formData.subname.trim()) {
      showToast('Please provide a product title', 'error');
      return;
    }
    if (!formData.price) {
      showToast('Please provide the selling/deal price', 'error');
      return;
    }
    if (!formData.affiliateUrl.trim()) {
      showToast('Please provide the Amazon or Flipkart affiliate link', 'error');
      return;
    }

    const priceNum = Number(formData.price);
    const originalPriceNum = Number(formData.originalPrice || priceNum * 1.25);
    const discountCalc = originalPriceNum > priceNum
      ? `${Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)}% OFF`
      : 'Special Deal';

    const newProduct = {
      id: Date.now(),
      name: formData.category,
      subname: formData.subname,
      brand: formData.brand || 'Featured Brand',
      category: formData.category,
      platform: formData.platform,
      affiliateUrl: formData.affiliateUrl,
      price: priceNum,
      originalPrice: originalPriceNum,
      discount: discountCalc,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
      badge: formData.badge || (formData.platform === 'Flipkart' ? 'Flipkart Assured' : "Amazon's Choice"),
      description: formData.description || `Handpicked deal on ${formData.platform}. Instant redirect to discounted listing.`,
      rating: 4.8,
      reviewsCount: 150
    };

    await addProduct(newProduct);
    setShowAddModal(false);
    // Reset form
    setFormData({
      subname: '',
      brand: '',
      category: 'Lipstick',
      platform: 'Amazon',
      affiliateUrl: '',
      price: '',
      originalPrice: '',
      imageUrl: 'https://images-static.nykaa.com/media/catalog/product/d/8/d8af9fc71249343326_1.jpg?tr=w-500,h-500,cm-pad_resize',
      badge: "Amazon's Choice",
      description: ''
    });
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.subname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.platform && p.platform.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesPlatform = platformFilter === 'All' || p.platform === platformFilter;

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const amazonCount = products.filter((p) => (p.platform || '').toLowerCase() === 'amazon').length;
  const flipkartCount = products.filter((p) => (p.platform || '').toLowerCase() === 'flipkart').length;

  return (
    <div className="min-h-screen bg-[#faf8f7] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-rose-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
              <span>Admin Management Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Affiliate Product Manager
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Add products with your Amazon / Flipkart affiliate links. When users click on the frontend, they will be redirected directly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2.5 rounded-full transition-colors shadow-xs"
            >
              <FaArrowLeft className="text-[10px]" /> View Frontend
            </Link>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-5 py-2.5 rounded-full shadow-md shadow-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              <FaPlus /> Add Affiliate Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">Total Products</span>
              <div className="p-2 bg-rose-50 rounded-xl text-rose-600 text-sm"><FaBoxOpen /></div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{products.length}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">● Visible on frontend</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-800 uppercase">Amazon Products</span>
              <div className="p-2 bg-amber-50 rounded-xl text-amber-600 text-sm"><FaBolt /></div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{amazonCount}</p>
            <p className="text-[11px] text-gray-500 mt-1">Redirecting to Amazon</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-800 uppercase">Flipkart Products</span>
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600 text-sm"><FaBolt /></div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{flipkartCount}</p>
            <p className="text-[11px] text-gray-500 mt-1">Redirecting to Flipkart</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 uppercase">Status</span>
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 text-sm"><FaCheckCircle /></div>
            </div>
            <p className="text-2xl font-extrabold text-emerald-600">Active</p>
            <p className="text-[11px] text-gray-400 mt-1">Direct redirection enabled</p>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-soft mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by title, brand, or store..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-gray-200 rounded-full focus:outline-none focus:border-rose-500"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {/* Platform filter pills */}
            <span className="text-[11px] font-bold text-gray-400 uppercase">Store:</span>
            {['All', 'Amazon', 'Flipkart'].map((store) => (
              <button
                key={store}
                onClick={() => setPlatformFilter(store)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  platformFilter === store
                    ? 'bg-gray-900 text-white'
                    : 'bg-stone-50 text-gray-700 hover:bg-stone-100'
                }`}
              >
                {store}
              </button>
            ))}

            <div className="h-4 w-px bg-gray-200 mx-1" />

            {/* Category filter pills */}
            {['All', 'Lipstick', 'Lip Liner', 'Mascara', 'Foundation', 'Skincare'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-rose-600 text-white font-bold'
                    : 'bg-stone-50 text-gray-700 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-rose-100/70 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4">Product Info</th>
                  <th className="py-3.5 px-4">Store Platform</th>
                  <th className="py-3.5 px-4">Price / MRP</th>
                  <th className="py-3.5 px-4">Affiliate Redirect Link</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-rose-50/20 transition-colors">
                    {/* Product Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-12 h-12 object-cover rounded-xl border border-gray-100 shrink-0"
                        />
                        <div className="min-w-0 max-w-xs sm:max-w-md">
                          <p className="font-bold text-gray-900 truncate">{item.subname}</p>
                          <div className="flex items-center gap-2 text-[11px] text-gray-500">
                            <span className="font-semibold text-rose-700">{item.brand || 'Brand'}</span>
                            <span>•</span>
                            <span>{item.category || item.name}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Platform Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                          (item.platform || '').toLowerCase() === 'flipkart'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {item.platform || 'Amazon'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-semibold">
                      <span className="text-gray-900 text-sm font-extrabold">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-gray-400 line-through ml-1.5 text-xs">
                          ₹{item.originalPrice}
                        </span>
                      )}
                      <p className="text-[10px] text-emerald-600 font-bold">{item.discount || 'Special'}</p>
                    </td>

                    {/* Affiliate Link Preview */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 truncate block max-w-[200px] font-mono">
                          {item.affiliateUrl || 'No link set'}
                        </span>
                        <button
                          type="button"
                          onClick={() => redirectToAffiliate(item)}
                          className="text-rose-600 hover:text-rose-800 p-1 font-bold"
                          title="Test Redirect"
                        >
                          <FaExternalLinkAlt className="text-xs" />
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => redirectToAffiliate(item)}
                          className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-gray-800 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          Test <FaExternalLinkAlt className="text-[9px]" />
                        </button>
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Product"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto animate-scaleUp">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Add New Affiliate Product</h3>
                <p className="text-xs text-gray-500">Provide product details and your Amazon / Flipkart affiliate link</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              {/* Product Title */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maybelline New York Lash Sensational Sky High Waterproof Mascara"
                  value={formData.subname}
                  onChange={(e) => setFormData({ ...formData, subname: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Platform & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Store / Platform *</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => {
                      const plat = e.target.value;
                      setFormData({
                        ...formData,
                        platform: plat,
                        badge: plat === 'Flipkart' ? 'Flipkart Assured' : "Amazon's Choice"
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 font-semibold"
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Nykaa">Nykaa</option>
                    <option value="Myntra">Myntra</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500"
                  >
                    <option value="Lipstick">Lipstick</option>
                    <option value="Lip Liner">Lip Liner</option>
                    <option value="Mascara">Mascara</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Haircare">Haircare</option>
                  </select>
                </div>
              </div>

              {/* Affiliate URL */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Affiliate / Destination URL * (Amazon or Flipkart link)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.amazon.in/dp/... or https://dl.flipkart.com/..."
                  value={formData.affiliateUrl}
                  onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 font-mono text-[11px]"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Users clicking on the product will be redirected to this exact affiliate link.
                </p>
              </div>

              {/* Brand & Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Maybelline, Kay Beauty"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Highlight Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. Amazon's Choice, Flipkart Assured"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Price & MRP */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Deal Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 799"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 999"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images-static.nykaa.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 text-[11px]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Brief Description (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Key highlight or why you recommend this deal..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-full text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <FaPlus /> Save Product & Publish to Frontend
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <BottomNavigation />
    </div>
  );
}
