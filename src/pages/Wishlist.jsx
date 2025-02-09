import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistReducer";
import { addToCart } from "../redux/CartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    toast.success("Added to cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 pt-[64px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 ">
          <Link
            to="/"
            className="flex items-center text-red-500 hover:text-red-500 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1 " />
            <span className="text-sm font-medium">Continue Shopping</span>
          </Link>
        </div>

        {/* Wishlist Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <h1 className="text-xl font-bold text-gray-800">
              My Wishlist ({wishlist.length})
            </h1>
          </div>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-purple-100">
            <Heart className="w-12 h-12 text-purple-200 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Discover and save your favorite items
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition w-full h-[320px] flex flex-col"
              >
                <div className="relative w-full h-[200px] bg-gray-50">
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <img
                      src={item.productImageUrl}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                </div>

                <div className="p-3 flex flex-col flex-grow bg-white">
                  <p className="text-xs text-yellow-700 font-medium mb-1">
                    Shop-Smart
                  </p>
                  <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 flex-grow">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-base font-bold text-gray-900">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-full text-white bg-red-400 hover:bg-red-500 transition-colors"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
