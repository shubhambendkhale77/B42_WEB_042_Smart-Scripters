import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, ShoppingCart, Heart, ChevronLeft } from 'lucide-react';
import { removeFromWishlist } from '../redux/wishlistReducer';
import { addToCart } from '../redux/CartSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
    toast.success('Item removed from wishlist');
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    toast.success('Added to cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
            <h1 className="text-xl font-semibold text-gray-900">My Wishlist ({wishlist.length})</h1>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center bg-white rounded-lg shadow-sm p-6">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-900 font-medium">Your wishlist is empty</h3>
            <p className="text-sm text-gray-500 mt-1">Discover and save your favorite items</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlist.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative aspect-square">
                  <img
                    src={item.productImageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center rounded-t-lg"
                  />
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-0.5">E-bharat</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-1 bg-gray-900 hover:bg-gray-800 text-white px-2 py-1.5 rounded-full text-xs font-medium"
                    >
                      <ShoppingCart className="w-3 h-3" />
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