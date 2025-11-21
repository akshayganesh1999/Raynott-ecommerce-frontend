import React from "react";
import ProductCard from "./ProductCard.jsx";

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg">
        <p className="text-lg font-medium">No products found.</p>
        <p className="text-sm mt-1">Check back later or try clearing your filters.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;