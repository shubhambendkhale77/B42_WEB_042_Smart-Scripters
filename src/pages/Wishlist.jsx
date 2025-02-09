import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistReducer";
import { addToCart } from "../redux/CartSlice";
import { 
  Heart, 
  ShoppingCart, 
  ArrowLeftCircle, 
  Trash2, 
  Star, 
  Tag, 
  Store,
  CheckCircle,
  XCircle
} from "lucide-react";

// Custom Toast component
const Toast = ({ message, type }) => {
  return (
    <div className={`
      flex items-center gap-3 py-3 px-4 rounded-lg shadow-lg
      ${type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
      }
      transform transition-all duration-300 ease-in-out
    `}>
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <XCircle className="h-5 w-5" />
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

// Toast Container component
const ToastContainer = ({ toasts }) => {
  return (
<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2">
{toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-toast-slide-up"
        >
          <Toast message={toast.message} type={toast.type} />
        </div>
      ))}
    </div>
  );
};

// Rest of the components remain the same
const BackToShopping = () => (
  <div className="mb-8">
    <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300">
      <ArrowLeftCircle className="w-5 h-5" />
      <Store className="w-5 h-5" />
      <span className="font-medium">Continue Shopping</span>
    </a>
  </div>
);

const AnimatedRating = ({ rating }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center gap-1 transition-transform duration-300 ${
        isHovered ? "scale-110" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Star className="w-4 h-4 text-yellow-400" />
      <span className="text-sm font-medium">{rating}</span>
    </div>
  );
};

const AnimatedDiscount = ({ discount }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center gap-1 transition-transform duration-300 ${
        isHovered ? "scale-110" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tag className="w-4 h-4 text-green-500" />
      <span className="text-sm font-medium text-green-500">{discount}</span>
    </div>
  );
};

const WishlistHeader = ({ itemCount }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3">
      <Heart className="w-6 h-6 text-red-500" />
      <h1 className="text-2xl font-bold">My Wishlist ({itemCount})</h1>
    </div>
  </div>
);

const EmptyWishlist = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <Heart className="w-16 h-16 text-gray-300 mb-4" />
    <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
    <p className="text-gray-500 mb-6">Discover and save your favorite items</p>
    <a
      href="/"
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
    >
      Start Shopping
    </a>
  </div>
);

const WishlistItem = ({ item, onRemove, onAddToCart }) => (
  <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="relative aspect-square">
      <img
        src={item.productImageUrl}
        alt={item.title}
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => onRemove(item.id)}
        className="cursor-pointer absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-red-50 transition-colors duration-300"
      >
        <Trash2 className="w-5 h-5 text-red-500" />
      </button>
    </div>

    <div className="p-4">
      <p className="text-sm text-gray-500 mb-1">Shop-Smart</p>
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
      <div className="flex items-center gap-4 mb-4">
        <AnimatedRating rating={item.rating} />
        <AnimatedDiscount discount={item.discount} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl text-blue-700 font-bold">₹{item.price.toLocaleString("en-IN")}</span>
        <button
          onClick={() => onAddToCart(item)}
          className="cursor-pointer flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
        >
          <ShoppingCart className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  </div>
);

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(currentToasts => [...currentToasts, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id) => {
    setToasts(currentToasts => 
      currentToasts.filter(toast => toast.id !== id)
    );
  };

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
    addToast('Item removed from wishlist', 'error');
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    addToast('Item added to cart successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <BackToShopping />
        <WishlistHeader itemCount={wishlist.length} />

        {wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                onRemove={handleRemoveFromWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default Wishlist;