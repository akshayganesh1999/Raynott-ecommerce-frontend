import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import Loader from "../../components/ui/Loader.jsx";
import { ListOrdered, TrendingUp, DollarSign } from 'lucide-react'; 

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axiosClient.get("/orders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch all orders:", err);
        setError("Unable to load orders. Please check the API connection.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (order) => {
    if (order.isDelivered) {
      return (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-200">
          Delivered
        </span>
      );
    }
    if (order.isPaid) {
      return (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
          Paid / Processing
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
        Awaiting Payment
      </span>
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-20 flex justify-center p-12">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen pt-20 p-4 sm:p-12">
        <div className="max-w-4xl mx-auto p-6 bg-red-50 border border-red-300 text-red-700 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-3">Order Load Error</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }
  
  if (orders.length === 0) {
    return (
      <main className="min-h-screen pt-20 p-4 sm:p-12 flex justify-center">
        <div className="text-center p-10 mt-10 bg-white rounded-xl shadow-lg border border-gray-100">
          <ListOrdered size={48} className="text-gray-400 mx-auto mb-3" />
          <p className="text-xl font-semibold text-gray-700">No Orders Placed Yet</p>
          <p className="text-sm text-gray-500 mt-1">The store is waiting for its first customer!</p>
        </div>
      </main>
    );
  }


  // --- Main Component Render ---
  return (
    <main className="min-h-screen bg-gray-50 pt-20 p-4 sm:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center space-x-3">
          <ListOrdered size={32} className="text-blue-600" />
          <span>All Customer Orders ({orders.length})</span>
        </h1>
        
        {/* Order List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Order Header: ID, Date, Status */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 mb-3">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">
                    Order ID: <span className="text-gray-900 font-mono">{order._id}</span>
                  </span>
                  <span className="text-xs font-medium text-gray-500 mt-1">
                    Placed On: {formatDate(order.createdAt)}
                  </span>
                </div>
                {getStatusBadge(order)}
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                
                {/* Customer */}
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                  <TrendingUp size={16} className="text-blue-500" />
                  <p>
                    <strong className="text-gray-700">Customer:</strong> <span className="text-gray-600">{order.user?.name}</span>
                  </p>
                </div>
                
                {/* Email */}
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg truncate">
                  <p>
                    <strong className="text-gray-700">Email:</strong> <span className="text-gray-600">{order.user?.email}</span>
                  </p>
                </div>

                {/* Total Price */}
                <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg font-bold">
                  <DollarSign size={16} className="text-blue-700" />
                  <p>
                    <strong className="text-blue-800">Total:</strong> <span className="text-blue-800">₹{order.totalPrice.toFixed(2)}</span>
                  </p>
                </div>
                
                {/* Payment Method */}
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                  <p>
                    <strong className="text-gray-700">Payment:</strong> <span className="text-gray-600">{order.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Items List  */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm border-t border-gray-200">
                <p className="font-semibold text-gray-700 mb-2">Order Items:</p>
                <p className="text-gray-600 leading-relaxed break-words">
                  {order.orderItems.map((i) => `${i.name} (x${i.qty})`).join(" | ")}
                </p>
              </div>
              
              {/* Shipping Address*/}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 border-t border-gray-200">
                  <p><strong>Shipping To:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.pincode}</p>
              </div>
              
              <div className="mt-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details & Edit Status</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminOrders;