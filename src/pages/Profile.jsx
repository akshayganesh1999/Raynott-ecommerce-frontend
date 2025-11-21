import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/ui/Loader.jsx";
import { User, ShoppingBag, Truck } from 'lucide-react'; // Using lucide-react for icons

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoadingOrders(true);
      setError(null);
      try {
        const { data } = await axiosClient.get("/orders/my");
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load order history.");
      } finally {
        setLoadingOrders(false);
      }
    };
    loadOrders();
  }, []);

  // --- Utility Functions/Components ---

  const getStatusClasses = (isDelivered) => {
    return isDelivered
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Order Card Component
  const OrderCard = ({ order }) => (
    <div className="bg-white p-5 border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3 border-b pb-3">
        <div className="text-sm font-medium text-gray-500">
          <p>Order ID: <span className="text-gray-900 font-mono text-xs block sm:inline">{order._id.substring(0, 10)}...</span></p>
          <p className="mt-1">Placed On: {formatDate(order.createdAt)}</p>
        </div>
        <span 
          className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClasses(order.isDelivered)}`}
        >
          {order.isDelivered ? "Delivered" : "Processing"}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-gray-600">Total Items:</span>
          <span className="text-gray-900">{order.orderItems.reduce((sum, item) => sum + item.qty, 0)}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-gray-700">Total Paid:</span>
          <span className="text-blue-700">₹{order.totalPrice.toFixed(2)}</span>
        </div>
      </div>
      
      {order.orderItems.length > 0 && (
          <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500">Products:</span>
              <div className="flex -space-x-2 overflow-hidden">
                {order.orderItems.slice(0, 3).map((item, index) => (
                    <img key={index} 
                         className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                         src={item.image} 
                         alt={item.name} 
                         title={item.name}
                    />
                ))}
                {order.orderItems.length > 3 && (
                    <span className="inline-block h-8 w-8 rounded-full bg-gray-200 text-center text-xs font-medium pt-2 ring-2 ring-white">
                        +{order.orderItems.length - 3}
                    </span>
                )}
              </div>
          </div>
      )}
    </div>
  );

  // --- Main Component Render ---
  return (
    <main className="min-h-screen bg-gray-50 pt-20 p-4 sm:p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Profile Header and Details */}
        <section className="bg-white p-8 rounded-xl shadow-2xl border border-blue-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            
            {/* Avatar */}
            <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full bg-blue-600 text-white text-3xl font-bold shadow-lg">
              {user.name[0].toUpperCase()}
            </div>
            
            {/* User Info */}
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
              <p className="text-md text-gray-600 mt-1">{user.email}</p>
              
              {user.isAdmin && (
                <div className="mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600 border border-red-200">
                  <User size={14} className="inline mr-1" /> Admin Access
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Orders Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <ShoppingBag size={24} className="text-blue-600" />
            <span>Your Order History</span>
          </h2>
          
          {loadingOrders ? (
            <div className="flex justify-center p-10">
              <Loader />
            </div>
          ) : error ? (
            <div className="p-4 text-center bg-red-50 border border-red-300 text-red-700 rounded-lg">
              <p>{error}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <Truck size={36} className="text-gray-400 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-700">No orders yet.</p>
              <p className="text-sm text-gray-500 mt-1">Time to build your setup!</p>
            </div>
          ) : (
            <div className="order-list space-y-4">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </section>
        
      </div>
    </main>
  );
};

export default Profile;