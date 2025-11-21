import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const isInStock = product.countInStock > 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isInStock) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
      
      <Link to={`/products/${product._id}`}>
        {/* Image Wrapper */}
        <div className="relative aspect-square overflow-hidden">
          {/* Product Image */}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = `https://placehold.co/400x400/eeeeee/333333?text=${product.name.substring(0, 1) + product.brand.substring(0, 1)}`;
            }}
          />
          
          {/* Featured Badge */}
          {product.isFeatured && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
              Featured
            </span>
          )}
        </div>
      </Link>

      {/* Product Body (Details) */}
      <div className="p-4 space-y-1">
        <Link to={`/products/${product._id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-700 transition duration-150">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-xl font-bold text-blue-700 pt-1">
          ₹{product.price}
        </p>
      </div>

      {/* Product Actions */}
      <div className="p-4 pt-2 flex flex-col gap-2">
        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart} 
          disabled={!isInStock}
          className={`w-full py-2.5 font-medium rounded-lg transition-colors duration-200 shadow-sm ${
            isInStock 
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isInStock ? "Add to Cart" : "Out of Stock"}
        </button>
        
        {/* View Details Link */}
        <Link 
          to={`/products/${product._id}`} 
          className="w-full text-center py-2.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;