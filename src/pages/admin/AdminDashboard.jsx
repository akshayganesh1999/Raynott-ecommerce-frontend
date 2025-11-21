import React from "react";
import { Link } from "react-router-dom";
import { Box, Package, Users, ShoppingBag } from 'lucide-react';

const AdminDashboard = () => {
  
  const adminSections = [
    { 
      title: "Manage Products", 
      path: "/admin/products", 
      icon: Box, 
      description: "Add, edit, or delete store products and update inventory." 
    },
    { 
      title: "View Orders", 
      path: "/admin/orders", 
      icon: ShoppingBag, 
      description: "Review, process, and update the status of customer orders." 
    },
    { 
      title: "Manage Users", 
      path: "/admin/users", 
      icon: Users, 
      description: "Manage user accounts, roles, and permissions." 
    },
    { 
      title: "Shipping & Returns", 
      path: "/admin/shipping", 
      icon: Package, 
      description: "Configure shipping rates and handle returns/exchanges." 
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-20 p-4 sm:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>Admin Dashboard</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-10">
          Welcome back! Quickly navigate to key administrative sections below.
        </p>

        {/* Admin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {adminSections.map((section) => (
            <Link 
              key={section.title} 
              to={section.path} 
              className="group flex flex-col items-start bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
            >
              {/* Icon */}
              <section.icon 
                size={36} 
                className="text-blue-600 group-hover:text-blue-700 transition duration-300 mb-4" 
              />
              
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition mb-2">
                {section.title}
              </h2>
              
              {/* Description */}
              <p className="text-sm text-gray-500">
                {section.description}
              </p>
              
              {/* Arrow Indicator */}
              <span className="mt-4 text-sm font-semibold text-blue-600 group-hover:underline transition duration-300 flex items-center">
                Go to Section
                <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;