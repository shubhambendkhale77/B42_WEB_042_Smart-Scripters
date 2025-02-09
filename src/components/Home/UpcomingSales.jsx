import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Timer, Star, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { addToCart, deleteFromCart } from '../../redux/CartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistReducer';
import { AuthContext } from '../../context/useAuth';

const UpcomingSales = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(AuthContext);
  const { getAllProduct } = context;

  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  const PRODUCTS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(0);

  // Simulate getting high-rated products (rating >= 4.5)
  const highRatedProducts = getAllProduct
    .filter(product => product.rating >= 3)
    .slice(0, 12);

  const totalPages = Math.ceil(highRatedProducts.length / PRODUCTS_PER_PAGE);
  const cartItems = useSelector((state) => state.cart) || [];
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems) || [];
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Auto-sliding effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(slideInterval);
  }, [totalPages]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
        
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCartAction = (product) => {
    const isInCart = cartItems.some(item => item.id === product.id);
    if (isInCart) {
      dispatch(deleteFromCart(product));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleWishlistAction = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const currentProducts = highRatedProducts.slice(
    currentPage * PRODUCTS_PER_PAGE,
    (currentPage + 1) * PRODUCTS_PER_PAGE
  );

  return (
    <div className="mt-8 mx-4 sm:mx-6 md:mx-8 bg-white rounded-xl shadow-lg p-6">
      <div className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Upcoming Flash Sale
          </h2>
          <div className="flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-lg">
            <Timer className="h-5 w-5 text-indigo-600" />
            <span className="font-mono font-bold text-indigo-600">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => {
            const isInCart = cartItems.some(item => item.id === product.id);
            const isInWishlist = wishlistItems.some(item => item.id === product.id);
            const isHovered = hoveredProduct === product.id;
            const { discount } = product;
            let dis = Number(discount);

            return (
              <div
                key={product.id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square">
                  <img
                    src={product.productImageUrl}
                    alt={product.title}
                    className={`w-full h-full object-contain rounded-t-xl transition-all duration-300 ${
                      isHovered ? 'scale-110 brightness-90' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      {product.rating}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
                      {dis+10}% OFF
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-indigo-600">
                      ₹{Math.floor(product.price * 0.9).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCartAction(product)}
                      className={`flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 ${
                        isInCart
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isInCart ? (
                        <>
                          <Trash2 className="h-4 w-4" />
                          <span className="text-xs sm:text-sm">Remove</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          <span className="text-xs sm:text-sm">Add to Cart</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleWishlistAction(product)}
                      className="p-1.5 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === index 
                  ? 'bg-indigo-600 w-4' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingSales;