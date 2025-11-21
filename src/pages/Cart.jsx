import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQty, totals } = useCart();
  const navigate = useNavigate();

  const handleQtyChange = (itemId, value) => {
    const newQty = Math.max(1, parseInt(value, 10) || 1);
    updateQty(itemId, newQty);
  };

  // --- Empty Cart State ---
  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-20 p-4 sm:p-6 lg:p-8 flex justify-center items-start">
        <EmptyState
          title="Your cart is empty 🛍️"
          subtitle="Start exploring Raynott gadgets and build your setup."
          action={
            <Link 
              to="/" 
              className="py-2.5 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
            >
              Browse Products
            </Link>
          }
        />
      </main>
    );
  }
  

  // --- Cart Content ---
  return (
    <main className="min-h-screen bg-gray-50 pt-20 p-4 sm:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart ({items.length} Items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List*/}
          <section className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item._id} 
                className="flex items-center bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                {/* Item Image */}
                <Link to={`/products/${item._id}`} className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 mr-4 rounded-lg overflow-hidden border border-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </Link>
                
                {/* Item Details and Controls */}
                <div className="flex-grow min-w-0 pr-4 sm:pr-8">
                  <Link to={`/products/${item._id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-700 transition duration-150 truncate block">
                    {item.name}
                  </Link>
                  <p className="text-md font-medium text-gray-700">
                    ₹{item.price ? item.price.toFixed(2) : 'N/A'}
                  </p>

                  <div className="flex items-center space-x-4 mt-2">
                    {/* Quantity Input */}
                    <label className="flex items-center text-sm font-medium text-gray-600">
                      Qty:
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleQtyChange(item._id, e.target.value)}
                        className="w-16 ml-2 p-1 border border-gray-300 rounded-md text-center focus:ring-blue-500 focus:border-blue-500"
                      />
                    </label>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition duration-150 flex items-center"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
                
                {/* Item Subtotal */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Subtotal</p>
                </div>
              </div>
            ))}
          </section>

          {/* Cart Summary*/}
          <section className="space-y-6 lg:sticky lg:top-20 self-start">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-gray-700">
                {/* Items Total */}
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span>Items total</span>
                  <span className="font-semibold">₹{totals.itemsPrice.toFixed(2)}</span>
                </div>
                
                {/* Shipping */}
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span>Shipping</span>
                  <span className={`font-semibold ${totals.shippingPrice === 0 ? 'text-green-600' : ''}`}>
                    {totals.shippingPrice === 0 ? "Free" : `₹${totals.shippingPrice.toFixed(2)}`}
                  </span>
                </div>
                
                {/* Total */}
                <div className="flex justify-between pt-3 text-lg font-bold text-gray-900">
                  <span>Total (Incl. Taxes)</span>
                  <span>₹{totals.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg focus:ring-4 focus:ring-blue-300" 
                onClick={() => navigate("/checkout")}
              >
                Proceed to checkout
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Cart;