import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { ShoppingBag, Menu, X, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const activeLinkClass = "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 transition duration-150";
  const defaultLinkClass = "text-gray-700 hover:text-blue-600 transition duration-150";

  return (
    <header className="relative top-0 left-0 w-full z-30 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Main Nav */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-1 text-xl font-bold text-gray-900 transition duration-150 hover:text-blue-700">
              <span className="text-blue-700 text-2xl font-extrabold">R</span>
              <span>
                Raynott <span className="text-blue-600">E-Tech</span>
              </span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex ml-10 space-x-6">
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}
              >
                Home
              </NavLink>
              <NavLink 
                to="/products" 
                className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}
              >
                Shop
              </NavLink>
              {/* Admin Link */}
              {user?.isAdmin && (
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) => 
                    `font-medium transition border-b-2 ${isActive ? 'text-red-600 border-red-600' : 'text-gray-500 hover:text-red-500 hover:border-red-500/50'}`
                  }
                >
                  Admin Panel
                </NavLink>
              )}
            </nav>
          </div>

          {/* Cart, Auth, and Mobile Menu Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Cart Badge */}
            <NavLink to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition duration-150 text-gray-700 hover:text-blue-700">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </NavLink>

            {/* Auth/User Info */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* User Profile Link/Button */}
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 p-1 rounded-full bg-blue-100 cursor-pointer hover:bg-blue-200 transition"
                  >
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white text-sm font-semibold">
                      {user.name[0].toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-700 pr-2 hidden lg:inline">{user.name}</span>
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition"
                  >
                    <LogOut size={16} className="mr-1 hidden sm:inline" /> Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition">
                    Login
                  </Link>
                  <Link to="/register" className="py-1.5 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-md">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100`}
        onClick={() => setIsMenuOpen(false)}
      >
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/products" 
          className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          Shop
        </NavLink>
        <NavLink 
          to="/cart" 
          className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          Cart
        </NavLink>
        {user?.isAdmin && (
          <NavLink 
            to="/admin" 
            className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Admin Panel
          </NavLink>
        )}

        {/* Mobile Auth Links */}
        <div className="pt-4 border-t border-gray-100">
          {user ? (
            <div className="space-y-2">
              <Link to="/profile" className="flex items-center px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-md">
                <User size={18} className="mr-2 text-blue-600" />
                {user.name} (Profile)
              </Link>
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600"
              >
                <LogOut size={18} className="mr-2" /> Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/login" className="block w-full text-center py-2 px-4 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                Login
              </Link>
              <Link to="/register" className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md text-base font-medium hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;