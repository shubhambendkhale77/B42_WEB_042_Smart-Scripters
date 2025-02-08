import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../assets/Auth/firebase";
import { AuthContext } from "../context/useAuth";
import { addToCart, deleteFromCart } from "../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Heart, Share2, Truck, ShoppingCart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ProductInfo = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { id } = useParams();

  const getProductData = async () => {
    if (!id) return;
    try {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        setProduct(productData);
      } else {
        console.error("No such product found!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getProductData();
  }, [id]);

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart", {
      icon: "🛍️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart", {
      icon: "🗑️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      {
        icon: isWishlisted ? "💔" : "❤️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-15 h-15 text-gray-600" />
        {/* <p className="text-lg text-gray-600">Loading.....</p> */}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image section */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-square rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={product.productImageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleWishlist}
            className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg"
          >
            <Heart
              className={`w-6 h-6 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </motion.button>
        </div>

        {/* Product info */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-900">Product Price</h2>
            <p className="text-3xl font-bold text-blue-600">
              ₹{product.price.toLocaleString()}
            </p>
            {product.discount && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.rating} / 5)
              </span>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center space-x-6 py-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Truck className="w-5 h-5" />
              <span>Free Delivery</span>
            </div>
            <button className="flex items-center space-x-2 text-gray-600">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          <motion.div whileTap={{ scale: 0.95 }} className="pt-4">
            {cartItems.some((p) => p.id === product.id) ? (
              <button
                onClick={() => deleteCart(product)}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Remove from Cart</span>
              </button>
            ) : (
              <button
                onClick={() => addCart(product)}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
