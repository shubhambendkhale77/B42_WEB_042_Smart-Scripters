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
  X,
  ArrowUpDown,
  Eye
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

  const maxPrice = Math.max(...getAllProduct.map(product => product.price));

  // State for filters and sorting
  const [filteredProducts, setFilteredProducts] = useState(getAllProduct);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: maxPrice
  });
  const [minDiscount, setMinDiscount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [imageError, setImageError] = useState({});

  const categories = ["all", ...new Set(getAllProduct.map((item) => item.category))];

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-desc", label: "Rating: High to Low" },
    { value: "rating-asc", label: "Rating: Low to High" }
  ];

  const handleImageError = (id) => {
    setImageError(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  // Filter and sort products
  useEffect(() => {
    let result = [...getAllProduct];
    
    // Apply filters
    if (selectedCategory !== "all") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (selectedRating > 0) {
      result = result.filter((item) => item.rating >= selectedRating);
    }

    result = result.filter(
      (item) => item.price >= priceRange.min && item.price <= priceRange.max
    );

    if (minDiscount > 0) {
      result = result.filter((item) => (item.discount || 0) >= minDiscount);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [getAllProduct, selectedCategory, selectedRating, priceRange, minDiscount, sortOption]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedRating(0);
    setPriceRange({
      min: 0,
      max: maxPrice
    });
    setMinDiscount(0);
    setSortOption("default");
  };

  // Cart and wishlist functions
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  const handleAddToWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);
    if (exists) {
      toast.error("Already in wishlist");
    } else {
      const serializedProduct = {
        ...product,
        time: {
          seconds: product.time.seconds,
          nanoseconds: product.time.nanoseconds,
        },
      };
      dispatch(addToWishlist(serializedProduct));
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Categories at the top */}
      <div className="mb-8">
        <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium
                transition-all duration-200 transform hover:scale-105
                ${selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-400"}
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg 
                     shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors duration-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Sort Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 
                                  rounded-lg hover:border-blue-400 transition-colors duration-200">
              <ArrowUpDown className="w-4 h-4" />
              Sort by
              <ChevronDown className="w-4 h-4" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 focus:outline-none z-10 overflow-hidden">
                <div className="p-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.value}>
                      {({ active }) => (
                        <button
                          onClick={() => setSortOption(option.value)}
                          className={`${
                            active ? 'bg-blue-50' : ''
                          } ${
                            sortOption === option.value ? 'text-blue-600 font-medium' : 'text-gray-700'
                          } group flex w-full items-center rounded-lg px-4 py-2.5 text-sm transition-colors duration-200`}
                        >
                          {option.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Clear Filters */}
        {(selectedCategory !== "all" || selectedRating > 0 || minDiscount > 0 || 
          priceRange.min > 0 || priceRange.max < maxPrice ||
          sortOption !== "default") && (
          <button 
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800
                     transition-colors duration-200"
          >
            Clear All <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <Transition
        show={isFilterOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div className="bg-white p-6 rounded-xl shadow-xl mb-8 border border-gray-100">
          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-800">Minimum Rating</h3>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200
                    ${selectedRating === rating
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                >
                  {rating === 0 ? "All" : (
                    <>
                      {rating} <Star className="w-4 h-4 fill-current" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-800">Price Range</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange.min.toLocaleString()}</span>
                <span>₹{priceRange.max.toLocaleString()}</span>
              </div>
              <div className="space-y-4">
                <input
                  type="range"
                  name="min"
                  min={0}
                  max={maxPrice}
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                           [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg"
                />
                <input
                  type="range"
                  name="max"
                  min={0}
                  max={maxPrice}
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                           [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Discount Filter */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">Minimum Discount</h3>
            <div className="flex gap-2">
              {[0, 10, 20, 30, 50].map((discount) => (
                <button
                  key={discount}
                  onClick={() => setMinDiscount(discount)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200
                    ${minDiscount === discount
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                >
                  {discount === 0 ? "All" : `${discount}%+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Transition>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item, index) => {
          const { id, title, price, productImageUrl, discount, rating } = item;
          const isInCart = cartItems.some((p) => p.id === item.id);
          return (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                       overflow-hidden group relative"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative aspect-square overflow-hidden">
                {!imageError[id] ? (
                  <>
                    <img 
                      src={productImageUrl} 
                      alt={title} 
                      onError={() => handleImageError(id)}
                      className="w-full h-full object-cover group-hover:blur-sm transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full
                                 text-blue-600 font-medium transform hover:scale-105 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    Image not available
                  </div>
                )}
              </div>

              {/* Discount and Rating Badge */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                {discount > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium
                                shadow-lg shadow-red-500/30">
                    {discount}% OFF
                  </span>
                )}
                <div className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full 
                            shadow-lg text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">{title}</h2>
                <span className="text-xl font-bold text-blue-600">₹{price.toLocaleString()}</span>
                
                {/* Actions */}
                <div className="flex justify-between gap-2 mt-4">
                  {isInCart ? (
                    <button 
                      onClick={() => deleteCart(item)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 
                               text-white rounded-lg hover:bg-red-600 flex-grow transition-colors
                               shadow-lg shadow-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  ) : (
                    <button 
                      onClick={() => addCart(item)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 
                               text-white rounded-lg hover:bg-blue-700 flex-grow transition-colors
                               shadow-lg shadow-blue-500/30"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  )}
                  <button 
                    onClick={() => handleAddToWishlist(item)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;