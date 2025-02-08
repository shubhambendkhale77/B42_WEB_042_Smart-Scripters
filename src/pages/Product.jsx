import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from '@headlessui/react';
import {
  Heart,
  ShoppingCart,
  Trash2,
  SlidersHorizontal,
  Star,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { AuthContext } from "../context/useAuth";
import { addToCart, deleteFromCart } from "../redux/CartSlice";
import { addToWishlist } from "../redux/wishlistReducer";
import toast from "react-hot-toast";

const AllProducts = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState(getAllProduct);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [imageError, setImageError] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const categories = [
    "all",
    ...new Set(getAllProduct.map((item) => item.category)),
  ];

  const handleImageError = (id) => {
    setImageError(prev => ({
      ...prev,
      [id]: true
    }));
  };

  useEffect(() => {
    let result = [...getAllProduct];

    if (selectedCategory !== "all") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [getAllProduct, selectedCategory, sortOption]);

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart", {
      icon: '🛍️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart", {
      icon: '🗑️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleAddToWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);
    if (exists) {
      toast.error("Already in wishlist", {
        icon: '💔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      const serializedProduct = {
        ...product,
        time: {
          seconds: product.time.seconds,
          nanoseconds: product.time.nanoseconds,
        },
      };
      dispatch(addToWishlist(serializedProduct));
      toast.success("Added to wishlist", {
        icon: '❤️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'bg-emerald-500';
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 3.5) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="mb-8 backdrop-blur-md bg-white/80 rounded-2xl shadow-lg p-6 top-4 z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-xl capitalize transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-white hover:bg-gray-50 shadow-sm hover:shadow border border-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300">
                <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                Sort by
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Menu.Button>
              <Transition
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-150 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl p-2 z-10">
                  {['default', 'price-asc', 'price-desc', 'rating'].map((option) => (
                    <Menu.Item key={option}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                          } group flex w-full items-center rounded-lg px-4 py-3 text-sm capitalize transition-colors duration-200`}
                          onClick={() => setSortOption(option)}
                        >
                          {option.replace('-', ' ')}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((item, index) => {
            const { id, title, price, productImageUrl, discount, rating } = item;
            const isInCart = cartItems.some((p) => p.id === item.id);
            const isHovered = hoveredProduct === id;

            return (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredProduct(id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div 
                  className="relative h-72 cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/productinfo/${id}`)}
                >
                  {!imageError[id] ? (
                    <img
                      src={productImageUrl}
                      alt={title}
                      onError={() => handleImageError(id)}
                      className={`w-full h-full object-cover object-center transition-all duration-700 ${
                        isHovered ? 'scale-110 blur-sm brightness-75' : 'scale-100'
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">Image not available</span>
                    </div>
                  )}
                  
                  {/* Animated overlay on hover */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="text-white text-lg font-medium flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      View Details
                    </div>
                  </div>

                  {discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium transform rotate-3 shadow-lg">
                      {discount}% OFF
                    </div>
                  )}
                  
                  <div className={`absolute top-4 left-4 ${getRatingColor(rating)} text-white px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1.5 shadow-lg`}>
                    <Star className="h-4 w-4 fill-current" />
                    {rating}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-3 text-gray-800 line-clamp-2 min-h-[3.5rem]">
                    {title}
                  </h2>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ₹{price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    {isInCart ? (
                      <button 
                        onClick={() => deleteCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    ) : (
                      <button 
                        onClick={() => addCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    )}

                    <button
                      onClick={() => handleAddToWishlist(item)}
                      className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-110 group"
                    >
                      <Heart className={`h-5 w-5 transition-colors duration-300 ${
                        wishlistItems.some(wishlistItem => wishlistItem.id === item.id)
                          ? 'text-red-500 fill-red-500'
                          : 'text-gray-400 group-hover:text-red-500'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;