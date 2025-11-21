import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import Loader from "../../components/ui/Loader.jsx"; 
import { Package, Plus, Trash2, Edit } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching Logic ---
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosClient.get("/products");
      const sortedProducts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sortedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Unable to load products. API connection error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // --- Action Handlers ---
  const handleCreateSampleProduct = async () => {
    try {
      setLoading(true);
      await axiosClient.post("/products"); 
      await loadProducts(); 
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("Failed to create sample product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true);
        await axiosClient.delete(`/products/${id}`);
        await loadProducts(); 
      } catch (err) {
        console.error("Failed to delete product:", err);
        setError("Failed to delete product. Check permissions.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditProduct = (id) => {
    console.log(`Maps to edit page for product: ${id}`);
    navigate(`/admin/product/${id}/edit`);
  };

  // --- Render States ---
  if (loading && products.length === 0) {
    return (
      <main className="min-h-screen pt-20 flex justify-center p-12 bg-gray-50">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen pt-20 p-4 sm:p-12 bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 bg-red-50 border border-red-300 text-red-700 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-3">Product Error</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  // --- Main Component Render ---
  return (
    <main className="min-h-screen bg-gray-50 pt-20 p-4 sm:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Actions */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center space-x-3">
            <Package size={32} className="text-blue-600" />
            <span>Product List ({products.length})</span>
          </h1>

          <button
            className="flex items-center space-x-2 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleCreateSampleProduct}
            disabled={loading}
          >
            <Plus size={20} />
            <span>Add Sample Product</span>
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID / Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-blue-50 transition duration-150">
                  
                  {/* ID / Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">{p._id.substring(0, 8)}...</div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-blue-700">₹{p.price?.toFixed(2) || 'N/A'}</div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="text-xs text-gray-600 capitalize">{p.category || 'Uncategorized'}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition duration-150"
                      onClick={() => handleEditProduct(p._id)}
                      title="Edit Product"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150"
                      onClick={() => handleDeleteProduct(p._id)}
                      title="Delete Product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State*/}
        {products.length === 0 && !loading && (
          <div className="text-center p-10 mt-10 bg-white rounded-xl shadow-lg border border-gray-100">
            <Package size={48} className="text-gray-400 mx-auto mb-3" />
            <p className="text-xl font-semibold text-gray-700">No Products Found</p>
            <p className="text-sm text-gray-500 mt-1">Use the "Add Sample Product" button to start building your inventory.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminProducts;