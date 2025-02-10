import { NavLink } from "react-router-dom";
import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  ShoppingBag, // Added for brand icon
  Leaf // Added for decorative element
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const footerLinks = {
    company: [
      { name: "About Us" },
      { name: "Delivery Information"},
      { name: "Privacy Policy" },
      { name: "Terms & Conditions"},
   
    ],
    account: [
      { name: "My Account"},
      { name: "Order History"},
      { name: "Shopping Cart"},
      { name: "Wishlist"},
    
    ],
    corporate: [
      { name: "Investor Relations"},
      { name: "Partnerships"},
      { name: "Sustainability"},
      { name: "Press Releases"},

    ],
    popular: [
      { name: "Featured Products" },
      { name: "Weekly Deals"},
      { name: "Seasonal Offers"},
      { name: "Gift Cards"},
      
    ]
  };

  return (
    <footer className="bg-white">
      {/* Brand Section - New Addition */}
      {/* <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-8 h-8 text-emerald-500" />
              <Leaf className="w-6 h-6 text-emerald-400 absolute ml-6 mt-4" />
              <span className="text-2xl font-bold text-gray-800">Nest</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Your go-to destination for fresh groceries and daily essentials. 
              Quality products delivered to your doorstep.
            </p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold">100K+</span>
                <span className="text-gray-600 text-sm">Products</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2 text-emerald-600">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">50K+</span>
                <span className="text-gray-600 text-sm">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Newsletter Section */}
      <div className="bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Stay home & get your daily needs
              </h3>
              <p className="text-gray-600">
                Subscribe to our newsletter and get 10% off your first purchase
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full md:w-80 px-4 py-3 rounded-l-lg border-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start space-x-3">
              <MapPin className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Address</h4>
                <p className="text-gray-600 text-sm">Incubex HSR21, 5th Main Rd, Sector 6, HSR Layout Bengaluru, Karnataka - 560068, Bengaluru, Karnataka 560034</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Call Us</h4>
                <p className="text-gray-600 text-sm">(+91) - 0123456789</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-gray-600 text-sm">ShopSmart.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Hours</h4>
                <p className="text-gray-600 text-sm">10:00 - 18:00, Mon - Sat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-bold text-gray-800 mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to="#"
                      className="text-gray-600 hover:text-emerald-500 transition-colors flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © 2024 Nest. All rights reserved
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;