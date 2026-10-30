import React, { createContext, useContext, useState, useEffect } from 'react';
import { fallbackProducts } from '../data/mockData';

const ProductContext = createContext();

export function CartProvider({ children }) {
  // Load products from localStorage or fall back to fallbackProducts
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('shraddha_affiliate_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return fallbackProducts;
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePlatform, setActivePlatform] = useState('All'); // 'All' | 'Amazon' | 'Flipkart'

  // Sync with backend API if available
  useEffect(() => {
    const fetchBackendProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/productData');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts((prev) => {
              // Combine backend products with any local ones, preferring backend
              localStorage.setItem('shraddha_affiliate_products', JSON.stringify(data));
              return data;
            });
          }
        }
      } catch (err) {
        // Backend not running, local storage / fallback works seamlessly
      }
    };
    fetchBackendProducts();
  }, []);

  // Save to localStorage whenever products change
  const persistProducts = (updated) => {
    setProducts(updated);
    try {
      localStorage.setItem('shraddha_affiliate_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3200);
  };

  // Add new affiliate product
  const addProduct = async (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || Date.now(),
      rating: newProduct.rating || 4.8,
      reviewsCount: newProduct.reviewsCount || Math.floor(Math.random() * 800 + 100),
      badge: newProduct.badge || (newProduct.platform === 'Flipkart' ? 'Flipkart Assured' : "Amazon's Choice"),
      affiliateUrl: newProduct.affiliateUrl || (newProduct.platform === 'Flipkart' ? 'https://www.flipkart.com/' : 'https://www.amazon.in/'),
      inStock: true
    };

    const updated = [productWithId, ...products];
    persistProducts(updated);
    showToast(`✨ Product "${productWithId.subname.slice(0, 25)}..." added to store!`);

    // Also push to backend if available
    try {
      await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productWithId)
      });
    } catch (e) {
      // Offline / sandboxed fallback already saved in localStorage
    }
    return productWithId;
  };

  // Delete product
  const deleteProduct = async (id) => {
    const updated = products.filter((p) => p.id !== id);
    persistProducts(updated);
    showToast('Product removed from catalog', 'info');

    try {
      await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      // Handled locally
    }
  };

  // Redirect to affiliate URL
  const redirectToAffiliate = (product) => {
    const targetUrl = product.affiliateUrl || (product.platform === 'Flipkart' ? 'https://www.flipkart.com/' : 'https://www.amazon.in/');
    showToast(`Redirecting to ${product.platform || 'store'}... 🚀`);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        redirectToAffiliate,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        activePlatform,
        setActivePlatform,
        toast,
        showToast
      }}
    >
      {children}
      {/* Global Toast */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[9999] transition-all duration-300">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold border ${
              toast.type === 'error'
                ? 'bg-red-900/90 text-white border-red-500'
                : toast.type === 'info'
                ? 'bg-gray-900/90 text-white border-gray-700'
                : 'bg-stone-900/95 text-white border-rose-500 backdrop-blur-md'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </ProductContext.Provider>
  );
}

export function useCart() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

export function useProducts() {
  return useCart();
}
