import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import axiosClient from "../api/axiosClient";

const Checkout = () => {
  const { items, totals, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    paymentMethod: "Cash on Delivery"
  });

  const handleChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    const orderItems = items.map((i) => ({
      product: i._id,
      name: i.name,
      qty: i.qty,
      price: i.price,
      image: i.image
    }));

    const payload = {
      orderItems,
      shippingAddress: {
        fullName: form.fullName,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        phone: form.phone
      },
      paymentMethod: form.paymentMethod,
      itemsPrice: totals.itemsPrice,
      shippingPrice: totals.shippingPrice,
      totalPrice: totals.totalPrice
    };

    try {
      await axiosClient.post("/orders", payload);
      clearCart();
      navigate("/profile", { state: { orderPlaced: true } }); 
    } catch (err) {
      console.error("Order placement failed:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Empty Cart State ---
  if (!items.length) {
    return (
      <main className="min-h-screen pt-20 flex justify-center p-6">
        <div className="text-center p-10 bg-gray-50 rounded-xl shadow-lg mt-10">
          <p className="text-xl text-gray-700 font-medium">Your cart is empty. Add items before checkout.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition">
            Go to Shop
          </Link>
        </div>
      </main>
    );
  }

  // --- Checkout Content ---
  return (
    <main className="min-h-screen bg-gray-50 pt-20 p-4 sm:p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Secure Checkout</h1>

        {error && (
          <div className="p-3 mb-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <section className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">1. Shipping Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Full Name</span>
                <input 
                  type="text"
                  name="fullName" 
                  value={form.fullName} 
                  onChange={handleChange} 
                  required 
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter recipient's full name"
                />
              </label>

              {/* Address */}
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Address</span>
                <input 
                  type="text"
                  name="address" 
                  value={form.address} 
                  onChange={handleChange} 
                  required 
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Street address, house/apartment number"
                />
              </label>

              {/* City and State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">City</span>
                  <input 
                    type="text"
                    name="city" 
                    value={form.city} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="e.g., Mumbai"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">State / Province</span>
                  <input 
                    type="text"
                    name="state" 
                    value={form.state} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="e.g., Maharashtra"
                  />
                </label>
              </div>
              
              {/* Pincode and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Pincode</span>
                  <input 
                    type="text"
                    name="pincode" 
                    value={form.pincode} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="e.g., 400001"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Phone Number</span>
                  <input 
                    type="tel"
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="e.g., 9876543210"
                  />
                </label>
              </div>

              {/* Payment Method */}
              <div className="pt-4 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Payment Method</h2>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Select Option</span>
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
                  >
                    <option>Cash on Delivery</option>
                    <option>UPI / Wallet</option>
                    <option>Credit / Debit Card</option>
                  </select>
                </label>
              </div>

              {/* Place Order Button */}
              <button 
                type="submit" 
                disabled={isProcessing || !items.length}
                className={`w-full flex items-center justify-center py-3 mt-8 text-xl font-bold rounded-lg shadow-xl transition duration-300 ${
                  isProcessing 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </form>
          </section>

          {/* Order Summary */}
          <section className="space-y-6 lg:sticky lg:top-20 self-start">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Order Summary</h2>
              
              <div className="space-y-3 text-gray-700">
                {/* Items Total */}
                <div className="flex justify-between">
                  <span>Items total ({items.length})</span>
                  <span className="font-semibold">₹{totals.itemsPrice.toFixed(2)}</span>
                </div>
                
                {/* Shipping */}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={`font-semibold ${totals.shippingPrice === 0 ? 'text-green-600' : ''}`}>
                    {totals.shippingPrice === 0 ? "Free" : `₹${totals.shippingPrice.toFixed(2)}`}
                  </span>
                </div>
                
                {/* Total */}
                <div className="flex justify-between pt-4 text-xl font-bold text-gray-900 border-t border-gray-200">
                  <span>Total Payable</span>
                  <span>₹{totals.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Summary of Items */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Items in Order</h3>
                <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
                    {items.map(item => (
                        <li key={item._id} className="flex justify-between text-gray-600">
                            <span className="truncate pr-2">{item.name} (x{item.qty})</span>
                            <span className="font-medium">₹{(item.price * item.qty).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>

          </section>
        </div>
      </div>
    </main>
  );
};

export default Checkout;