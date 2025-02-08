import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/useAuth";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { addToWishlist,removeFromWishlist } from "../../redux/wishlistReducer"; 
import { Heart } from "lucide-react";

const PageProductCard = () => {
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart) || [];
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems) || [];
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Product Added to Cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Product Removed from Cart");
  };

  const toggleWishlist = (item) => {
    if (wishlistItems.some((p) => p.id === item.id)) {
      dispatch(removeFromWishlist(item.id));
      toast.success("Removed from Wishlist");
    } else {
      dispatch(addToWishlist(item));
      toast.success("Added to Wishlist");
    }
  };

  useEffect(() => {
    console.log("homePageproduct component rendered");
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10 px-6">
      {/* Heading */}
      <h1 className="text-center mb-6 text-3xl font-bold text-gray-900">
        Bestselling Products
      </h1>

      {/* Product List */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getAllProduct?.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              const isWishlisted = wishlistItems.some((p) => p.id === id);
              return (
                <div key={index} className="p-4 relative">
                  <div className="h-full border border-gray-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white">
                    {/* Wishlist Heart Icon */}
                    <div
                      className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation on click
                        toggleWishlist(item);
                      }}
                    >
                      <Heart fill={isWishlisted ? "red" : "none"} stroke={isWishlisted ? "red" : "black"} size={24} />
                    </div>
                    
                    <div className="h-80 flex justify-center items-center bg-gray-100">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="h-full w-full object-contain p-4 "
                        src={productImageUrl}
                        alt="product"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h1 className="text-lg font-semibold text-gray-900 truncate">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="text-xl font-bold text-gray-600 mt-1">
                        ₹{price}
                      </h1>
                      <div className="mt-3">
                        {cartItems.some((p) => p.id === item.id) ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className="w-full mt-3 py-2 bg-red-700 text-white rounded-bl-2xl font-semibold transition-all duration-300 hover:bg-red-600 active:scale-95"
                          >
                            Remove From Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className="w-full mt-3 py-2 bg-purple-700 text-white rounded-bl-2xl font-semibold transition-all duration-300 hover:bg-pink-600 active:scale-95"
                          >
                            Add To Cart
                          </button>
                          
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageProductCard;
