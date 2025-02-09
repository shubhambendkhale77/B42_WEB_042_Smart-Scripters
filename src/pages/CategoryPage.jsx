import { useNavigate, useParams } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/useAuth";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../redux/CartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistReducer";
import { Heart, ShoppingCart, Trash2, Star, Sparkles } from "lucide-react";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { getAllProduct, loading } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart) || [];
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems) || [];
  
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageError, setImageError] = useState({});

  // Filter products by category
  const filteredProducts = getAllProduct.filter((obj) => obj.category.includes(categoryname));

  // Handle image error
  const handleImageError = (id) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  // Add to cart
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart", { icon: "🛍️", style: toastStyle });
  };

  // Remove from cart
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart", { icon: "🗑️", style: toastStyle });
  };

  // Toggle Wishlist
  const toggleWishlist = (item) => {
    if (wishlistItems.some((p) => p.id === item.id)) {
      dispatch(removeFromWishlist(item.id));
      toast.success("Removed from wishlist", { icon: "💔", style: toastStyle });
    } else {
      dispatch(addToWishlist(item));
      toast.success("Added to wishlist", { icon: "❤️", style: toastStyle });
    }
  };

  // Toast Style
  const toastStyle = {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  };

  return (
    <div className="mt-15 px-4 md:px-8">
      {/* Heading */}
      <h1 className="text-center text-3xl font-semibold first-letter:uppercase text-gray-800 mb-6">
        {categoryname}
      </h1>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <section className="text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((item) => {
              const { id, title, price, productImageUrl, discount, rating } = item;
              const isInCart = cartItems.some((p) => p.id === id);
              const isInWishlist = wishlistItems.some((p) => p.id === id);
              const isHovered = hoveredProduct === id;

              return (
                <div 
                  key={id} 
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
                    
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1.5 shadow-lg">
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
                        onClick={() => toggleWishlist(item)}
                        className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-110 group"
                      >
                        <Heart className={`h-5 w-5 transition-colors duration-300 ${
                          isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400 group-hover:text-red-500'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default CategoryPage;
