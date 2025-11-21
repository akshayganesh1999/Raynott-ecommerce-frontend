import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Loader from "../components/ui/Loader.jsx";
import { useCart } from "../context/CartContext.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axiosClient.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product data could not be loaded.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };


  if (loading) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Loader />
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen p-6 pt-20 text-center">
      <p className="text-xl text-red-600 font-medium">{error}</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen p-6 pt-20 text-center">
      <p className="text-xl text-gray-700 font-medium">Product not found.</p>
    </div>
  );

  const isInStock = product.countInStock > 0;
  const stockMessage = isInStock ? "In stock" : "Out of stock";

  return (
    <main className="min-h-screen bg-white p-4 sm:p-6 lg:p-12 pt-20">
      <div className="max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-10 p-6 sm:p-10">
        
        {/* Product Image Section */}
        <div className="lg:sticky lg:top-8 self-start mb-8 lg:mb-0">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>
        
        {/* Product Details Section */}
        <div className="detail-info space-y-6">
          
          {/* Title and Brand */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>
            <p className="text-md text-gray-500 font-medium mt-1">{product.brand}</p>
          </div>

          {/* Price */}
          <p className="text-4xl font-bold text-blue-700">
            ${product.price ? product.price.toFixed(2) : "N/A"}
          </p>

          <hr className="border-gray-200" />

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Details</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description || "No description available for this product."}
            </p>
          </div>

          <hr className="border-gray-200" />
          
          {/* Stock Status */}
          <p className={`text-lg font-bold ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
            {stockMessage}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <button
              className={`w-full sm:w-auto flex items-center justify-center py-3 px-8 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md 
                ${isInStock 
                  ? (isAdded 
                      ? 'bg-green-500 text-white cursor-default' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300')
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              disabled={!isInStock || isAdded}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                 <>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   Added!
                 </>
              ) : (
                stockMessage === "Out of stock" ? "Out of stock" : "Add to cart"
              )}
            </button>
            
            {isAdded && (
              <p className="text-sm text-green-700 font-medium sm:hidden">Item added to cart!</p>
            )}
          </div>

        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-8 p-4 text-center text-sm text-gray-400">
        <p>Product ID: {id}</p>
      </div>

    </main>
  );
};

export default ProductDetail;