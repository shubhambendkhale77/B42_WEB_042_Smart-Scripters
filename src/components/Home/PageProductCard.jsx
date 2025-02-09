import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistReducer";
import { Heart, ShoppingCart, Trash2, Star, Sparkles } from "lucide-react";
import { AuthContext } from "../../context/useAuth";

const PageProductCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(AuthContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart) || [];
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems) || [];
  
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageError, setImageError] = useState({});

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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-10 xl:px-16">
      <h1 className="text-center mb-6 text-3xl font-bold text-gray-900">Bestselling Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {getAllProduct.slice(0, 4).map((item) => {
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
              <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 cursor-pointer overflow-hidden" onClick={() => navigate(`/productinfo/${id}`)}>
                {!imageError[id] ? (
                  <img
                    src={productImageUrl}
                    alt={title}
                    onError={() => handleImageError(id)}
                    className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 blur-sm brightness-75' : 'scale-100'}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">Image not available</span>
                  </div>
                )}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-white text-lg font-medium flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    View Details
                  </div>
                </div>
                {discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
                    {discount}% OFF
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-current" />
                  {rating}
                </div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-lg font-semibold mb-3 text-gray-800 line-clamp-2 min-h-[3.5rem]">{title}</h2>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹{price.toLocaleString()}</span>
                </div>
                <div className="flex gap-3">
                  {isInCart ? (
                    <button onClick={() => deleteCart(item)} className="flex-1 flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600">
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  ) : (
                    <button onClick={() => addCart(item)} className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700">
                      <ShoppingCart className="h-4 w-4" /> Add to Cart
                    </button>
                  )}
                  <button onClick={() => toggleWishlist(item)} className="p-3 border rounded-xl hover:bg-gray-50">
                    <Heart className={`h-5 w-5 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`} />
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

export default PageProductCard;
