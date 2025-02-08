import { NavLink } from "react-router-dom";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiHome,
  FiPackage,
  FiSun,
  FiMoon,
  FiX,
  FiMenu,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-8 mt-8 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo and About */}
          <div>
            <img
              src="https://i.ibb.co/qYsh2d3q/image-removebg-preview-1.png"
              alt="Your Company Logo"
              className="h-12 mx-auto md:mx-0 mb-3 drop-shadow-lg"
            />
            <p className="text-sm font-light">
              Your one-stop shop for amazing products. Discover, shop, and
              enjoy!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 decoration-white">
              Quick Links
            </h3>
            <div className="space-y-2 ">
              <NavLink to="/products" className="   flex items-center">
                <FiPackage className="mr-2" /> Products
              </NavLink>
              <NavLink to="/wishlist" className="   flex items-center">
                <FiHeart className="mr-2" /> Wishlist
              </NavLink>
              <NavLink to="/cart" className="   flex items-center">
                <FiShoppingCart className="mr-2" /> Cart
              </NavLink>
              <NavLink to="/orders" className="   flex items-center">
                <FiPackage className="mr-2" /> Orders
              </NavLink>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4  decoration-white">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                aria-label="Facebook"
                className="hover:text-blue-200"
              >
                <FiFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                aria-label="Instagram"
                className="hover:text-yellow-200"
              >
                <FiInstagram size={24} />
              </a>
              <a
                href="https://www.x.com/"
                target="_blank"
                aria-label="X"
                className="hover:text-blue-400"
              >
                <FaXTwitter size={24} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                aria-label="YouTube"
                className="hover:text-red-400"
              >
                <FiYoutube size={24} />
              </a>
            </div>
            <div className="lg:mt-8 lg:w-3/4 lg:block hidden">
              <img
                src="https://user-images.githubusercontent.com/52581/44384465-5e312780-a570-11e8-9336-7b54978a9e64.png"
                alt=""
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/40 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">Vendora</span>. Built with ❤️ for
          awesome people.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
