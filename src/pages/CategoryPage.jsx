import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/useAuth";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../redux/CartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistReducer";
import { Heart } from "lucide-react";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { getAllProduct, loading } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart) || [];
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems) || [];

  // Filter products by category
  const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));

  // Add to cart
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Product Added to Cart");
  };

  // Remove from cart
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Product Removed from Cart");
  };

  // Toggle Wishlist
  const toggleWishlist = (item) => {
    if (wishlistItems.some((p) => p.id === item.id)) {
      dispatch(removeFromWishlist(item.id));
      toast.success("Removed from Wishlist");
    } else {
      dispatch(addToWishlist(item));
      toast.success("Added to Wishlist");
    }
  };

  return (
    <div className="mt-10 px-4 md:px-8">
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
          <div className="container mx-auto py-6">
            {/* Grid layout for responsiveness */}
            {filterProduct.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filterProduct.map((item, index) => {
                  const { id, title, price, productImageUrl } = item;
                  const isWishlisted = wishlistItems.some((p) => p.id === id);
                  return (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer border border-gray-200 relative"
                    >
                      {/* Wishlist Icon */}
                      <div
                        className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item);
                        }}
                      >
                        <Heart fill={isWishlisted ? "red" : "none"} stroke={isWishlisted ? "red" : "black"} size={24} />
                      </div>

                      {/* Product Image */}
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="w-full h-56 object-center"
                        src={productImageUrl}
                        alt={title}
                      />
                      <div className="p-4">
                        <h1 className="text-lg font-medium text-gray-900 mb-2 ml-4 truncate">
                          {title.substring(0, 25)}
                        </h1>
                        <p className="text-lg font-semibold text-pink-600 ml-4">₹{price}</p>

                        {/* Add/Remove from Cart Button */}
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
                  );
                })}
              </div>
            ) : (
              // No Products Found
              <div className="flex flex-col items-center mt-10">
                <img
                  className="w-24 mb-3"
                  src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                  alt="No Products"
                />
                <h1 className="text-xl text-gray-800">No {categoryname} products found</h1>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default CategoryPage;
