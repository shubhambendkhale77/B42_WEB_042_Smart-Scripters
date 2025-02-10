import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart, deleteFromCart } from '../../redux/CartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistReducer';
import { Heart, ShoppingCart, Trash2, Star, Timer } from 'lucide-react';

const DealOfDay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart) || [];
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems) || [];
  
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Sample deal products data
  const dealProducts = [
    {
      id: 'deal1',
      title: 'Premium Wireless Headphones',
      price: 15999,
      originalPrice: 24999,
      productImageUrl: 'https://m.media-amazon.com/images/I/71ITkeoYiTL._SL1500_.jpg',
      discount: 36,
      rating: 4.8,
      endTime: '2024-02-10T23:59:59'
    },
    {
      id: 'deal2',
      title: 'Smart Fitness Watch Pro',
      price: 8999,
      originalPrice: 14999,
      productImageUrl: 'https://m.media-amazon.com/images/I/61bV6L9yhYL._SL1500_.jpg',
      discount: 40,
      rating: 4.6,
      endTime: '2024-02-10T23:59:59'
    },
    {
      id: 'deal3',
      title: 'Ultra HD 4K Action Camera',
      price: 19999,
      originalPrice: 29999,
      productImageUrl: 'https://m.media-amazon.com/images/I/81oCYjQqhwL._SL1500_.jpg',
      discount: 33,
      rating: 4.7,
      endTime: '2024-02-10T23:59:59'
    }
  ];

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart", { icon: "🛍️" });
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart", { icon: "🗑️" });
  };

  const toggleWishlist = (item) => {
    if (wishlistItems.some((p) => p.id === item.id)) {
      dispatch(removeFromWishlist(item.id));
      toast.success("Removed from wishlist", { icon: "💔" });
    } else {
      dispatch(addToWishlist(item));
      toast.success("Added to wishlist", { icon: "❤️" });
    }
  };

  return (
    <div className="mt-12 px-4 sm:px-6 md:px-8">
      <div className="flex items-center justify-between mb-8">
        <div className="relative overflow-hidden py-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 animate-fade-in">
              Deal of the Day
            </h1>
            <Timer className="h-8 w-8 text-red-500 animate-pulse" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600 animate-slide" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dealProducts.map((item) => {
          const { id, title, price, originalPrice, productImageUrl, discount, rating } = item;
          const isInCart = cartItems.some((p) => p.id === id);
          const isInWishlist = wishlistItems.some((p) => p.id === id);
          const isHovered = hoveredProduct === id;

          return (
            <div 
              key={id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredProduct(id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div 
                className="relative aspect-[4/3] overflow-hidden rounded-t-2xl cursor-pointer"
                onClick={() => navigate(`/productinfo/${id}`)}
              >
                <img
                  src={productImageUrl}
                  alt={title}
                  className={`w-full h-full object-contain bg-white transition-all duration-500 ${
                    isHovered ? 'scale-110 brightness-90' : 'scale-100'
                  }`}
                />
                
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-base font-semibold transform rotate-3 shadow-md">
                  {discount}% OFF
                </div>
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 shadow-md">
                  <Star className="h-5 w-5 fill-current" />
                  {rating}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 flex-1 line-clamp-2 hover:text-indigo-600 transition-colors">
                  {title}
                </h2>
                <div className="mt-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-indigo-600">₹{price.toLocaleString()}</span>
                    <span className="text-base text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
                    <span className="text-sm text-green-600 font-medium">
                      Save ₹{(originalPrice - price).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    {isInCart ? (
                      <button 
                        onClick={() => deleteCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="text-sm sm:text-base font-medium">Remove</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => addCart(item)}
                        className="cursor-pointer flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="text-sm sm:text-base font-medium">Add to Cart</span>
                      </button>
                    )}
                    <button 
                      onClick={() => toggleWishlist(item)}
                      className="cursor-pointer p-3 border-2 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <Heart 
                        className={`h-6 w-6 ${
                          isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx="true">{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-slide {
          animation: slide 2s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DealOfDay;
