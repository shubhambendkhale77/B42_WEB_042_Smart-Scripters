import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart, deleteFromCart } from '../../redux/CartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistReducer';
import { Heart, ShoppingCart, Trash2, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthContext } from '../../context/useAuth';

const TrendingProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(AuthContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart) || [];
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems) || [];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageError, setImageError] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get only first 8 products (for 2 slides of 4 cards each)
  const trendingProducts = getAllProduct.slice(5, 25);

  // Calculate slides based on screen size
  const getProductsPerView = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  };

  const [productsPerView, setProductsPerView] = useState(getProductsPerView());

  useEffect(() => {
    const handleResize = () => {
      setProductsPerView(getProductsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(trendingProducts.length / productsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-sliding
  useEffect(() => {
    let interval;
    if (isAutoPlaying && totalSlides > 1) {
      interval = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const handleImageError = (id) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

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
    <div className="mt-8 px-4 sm:px-6 md:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Trending Now</h1>
        {/* <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div> */}
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {trendingProducts.map((item) => {
            const { id, title, price, productImageUrl, discount, rating } = item;
            const isInCart = cartItems.some((p) => p.id === id);
            const isInWishlist = wishlistItems.some((p) => p.id === id);
            const isHovered = hoveredProduct === id;

            return (
              <div 
                key={id}
                className={`flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2`}
              >
                <div 
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  onMouseEnter={() => {
                    setHoveredProduct(id);
                    setIsAutoPlaying(false);
                  }}
                  onMouseLeave={() => {
                    setHoveredProduct(null);
                    setIsAutoPlaying(true);
                  }}
                >
                  <div 
                    className="relative aspect-square overflow-hidden rounded-t-xl cursor-pointer"
                    onClick={() => navigate(`/productinfo/${id}`)}
                  >
                    {!imageError[id] ? (
                      <img
                        src={productImageUrl}
                        alt={title}
                        onError={() => handleImageError(id)}
                        className={`w-full h-full object-contain bg-white transition-all duration-500 ${
                          isHovered ? 'scale-110 brightness-90' : 'scale-100'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">Image not available</span>
                      </div>
                    )}
                    
                    {discount && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
                        {discount}% OFF
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      {rating}
                    </div>

                    {/* Hover overlay */}
                    <div 
                      className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="text-white flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        <span>View Details</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-sm sm:text-base font-semibold mb-2 flex-1 line-clamp-2">{title}</h2>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg sm:text-xl font-bold text-indigo-600">₹{price.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex gap-3">
                        {isInCart ? (
                          <button 
                            onClick={() => deleteCart(item)}
                            className="flex-1 flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-xs sm:text-sm">Remove</span>
                          </button>
                        ) : (
                          <button 
                            onClick={() => addCart(item)}
                            className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span className="text-xs sm:text-sm">Add to Cart</span>
                          </button>
                        )}
                        <button 
                          onClick={() => toggleWishlist(item)}
                          className="p-3 border rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <Heart 
                            className={`h-5 w-5  ${
                              isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-4 bg-indigo-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;