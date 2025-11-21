import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16 p-8 sm:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Links and Brand Info */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
          
          {/* Brand/Slogan Area */}
          <div className="w-full md:w-1/3 space-y-3">
            <h3 className="text-2xl font-bold text-blue-700">Raynott E-Tech</h3>
            <p className="text-gray-600">
              Smart gadgets, fast delivery, and trusted support across India.
            </p>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-6 md:w-2/3">
            {/* Column 1: Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/shop" className="text-gray-600 hover:text-blue-700 transition">All Products</Link></li>
                <li><Link to="/category/audio" className="text-gray-600 hover:text-blue-700 transition">Audio</Link></li>
                <li><Link to="/category/gaming" className="text-gray-600 hover:text-blue-700 transition">Gaming</Link></li>
              </ul>
            </div>
            
            {/* Column 2: Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Company</h4>
              <ul className="space-y-3 text-sm">
                {links.slice(0, 2).map(link => (
                  <li key={link.name}><Link to={link.path} className="text-gray-600 hover:text-blue-700 transition">{link.name}</Link></li>
                ))}
              </ul>
            </div>
            
            {/* Column 3: Legal */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-3 text-sm">
                {links.slice(2, 4).map(link => (
                  <li key={link.name}><Link to={link.path} className="text-gray-600 hover:text-blue-700 transition">{link.name}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Connect</h4>
              <div className="flex space-x-4 text-gray-600">
                <span className="hover:text-blue-700 cursor-pointer transition">FB</span>
                <span className="hover:text-blue-700 cursor-pointer transition">IG</span>
                <span className="hover:text-blue-700 cursor-pointer transition">TW</span>
              </div>
            </div>

          </div>
        </div>

        <hr className="border-gray-300 my-8" />

        {/* Bottom Section: Copyright */}
        <div className="text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} Raynott E-Tech. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Proudly serving the future of tech since 2023.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;