import React, { useEffect, useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import Loader from "../components/ui/Loader.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";

const CATEGORIES = [
  "All", 
  "Audio", 
  "Gaming", 
  "Smartwatch", 
  "Accessories"
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 99999 },
  { label: "$0 - $100", min: 0, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "$500+", min: 500, max: 99999 },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (selectedCategory !== "All") params.append("category", selectedCategory);
    
    if (priceRange.min > 0 || priceRange.max < 99999) {
      params.append("price_min", priceRange.min);
      params.append("price_max", priceRange.max);
    }
    
    try {
      const { data } = await axiosClient.get(`/products?${params.toString()}`);
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Could not load products. Please check API connection.");
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, priceRange]); 

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [fetchProducts]); 

  const handlePriceChange = (e) => {
    const rangeLabel = e.target.value;
    const range = PRICE_RANGES.find(r => r.label === rangeLabel) || PRICE_RANGES[0];
    setPriceRange(range);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  }

  return (
    <main className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-8 py-10 lg:py-16 mb-12 bg-gray-50 rounded-xl shadow-lg overflow-hidden">
        
        {/* Hero Content (Left) */}
        <div className="lg:w-1/2 p-6 lg:p-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Raynott <span className="text-blue-700">E-Tech</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-lg">
            Discover curated tech – earbuds, gaming gear, smart accessories – all in one
            modern, minimal store.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center text-sm font-medium">⚡ <span className="ml-2">2–4 day delivery in major cities</span></li>
            <li className="flex items-center text-sm font-medium">🔒 <span className="ml-2">Secure checkout & COD available</span></li>
            <li className="flex items-center text-sm font-medium">⭐ <span className="ml-2">Handpicked gadgets with real-world performance</span></li>
          </ul>
        </div>
        
        {/* Hero Card (Right) */}
        <div className="lg:w-1/2 p-6 lg:p-12 flex justify-center lg:justify-end">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Trending Now</h2>
            <p className="text-sm text-gray-500 mb-6">Upgrade your everyday carry with Raynott audio & accessories.</p>
            <div className="flex justify-between space-x-4">
              <div className="text-center flex-1 p-3 bg-blue-50 rounded-lg">
                <h3 className="text-3xl font-extrabold text-blue-700">50K+</h3>
                <p className="text-xs text-gray-500 mt-1">Happy customers</p>
              </div>
              <div className="text-center flex-1 p-3 bg-blue-50 rounded-lg">
                <h3 className="text-3xl font-extrabold text-blue-700">4.8★</h3>
                <p className="text-xs text-gray-500 mt-1">Store rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Filtering Section --- */}
      <section className="product-filters my-12 p-6 bg-blue-50 rounded-xl shadow-inner border border-blue-100">
        <h2 className="text-2xl font-semibold mb-6 text-blue-900">🔍 Shop Filters</h2>
        
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4 items-end flex-wrap">
          
          {/* 1. Search Bar */}
          <div className="flex-grow w-full sm:w-auto">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Products</label>
            <input
              id="search"
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm transition duration-150"
            />
          </div>

          {/* 2. Shop by Category (Dropdown) */}
          <div className="w-full sm:w-auto">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none transition duration-150"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Filter by Price Range (Dropdown) */}
          <div className="w-full sm:w-auto">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <select
              id="price"
              value={priceRange.label}
              onChange={handlePriceChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none transition duration-150"
            >
              {PRICE_RANGES.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Apply Filters Button (Added submit type for form) */}
          <button 
            type="submit" 
            className="w-full sm:w-auto self-center py-2.5 px-6 rounded-lg font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-md disabled:bg-gray-400"
            disabled={loading}
          >
            Apply Filters
          </button>
          
          {/* Clear Filters Button */}
          <button 
            type="button" 
            onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setPriceRange(PRICE_RANGES[0]);
            }} 
            className="w-full sm:w-auto self-center py-2.5 px-6 text-sm text-gray-600 hover:text-blue-700 transition-colors border border-transparent hover:border-blue-200 rounded-lg"
          >
            Clear
          </button>

        </form>
      </section>

      {/* --- Product Display Section --- */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Featured Electronics</h2>
          <p className="text-md text-gray-500 mt-1">Minimal design, maximum performance.</p>
        </div>
        
        {/* Error/Loading State */}
        {error && <div className="p-4 my-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">{error}</div>}
        {loading ? (
          <div className="flex justify-center py-10">
             <Loader />
          </div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center text-gray-500 bg-gray-100 rounded-lg">
            No products found matching your criteria. Try adjusting the filters.
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </main>
  );
};

export default Home;