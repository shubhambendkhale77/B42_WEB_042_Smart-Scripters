import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../assets/Auth/firebase";
import { AuthContext } from "../context/useAuth";
import { addToCart, deleteFromCart } from "../redux/CartSlice";
import { addToWishlist } from '../redux/wishlistReducer';
import { useDispatch, useSelector } from "react-redux";
import { Heart, Share2, Truck, Package, RefreshCw, Shield } from "lucide-react";
import toast from 'react-hot-toast';

const ProductInfo = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const { id } = useParams();

  const randomDiscount = Math.floor(Math.random() * 26) + 5;
  const randomRating = (Math.random() * 1.5 + 3.5).toFixed(1);

  const getProductData = async () => {
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
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const addCart = (item) => {
    setIsCartAnimating(true);
    dispatch(addToCart(item));
    toast.success("Added to cart");
    setTimeout(() => setIsCartAnimating(false), 500);
  };

  const deleteCart = (item) => {
    setIsCartAnimating(true);
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
    setTimeout(() => setIsCartAnimating(false), 500);
  };

  const addToWishList = (item) => {
    setIsWishlistAnimating(true);
    const exists = wishlistItems.find(wishlistItem => wishlistItem.id === item.id);
    if (exists) {
      toast.error('Product already exists in wishlist');
    } else {
      const serializedProduct = {
        ...item,
        time: {
          seconds: item.time.seconds,
          nanoseconds: item.time.nanoseconds,
        },
      };
      dispatch(addToWishlist(serializedProduct));
      toast.success('Added to wishlist');
    }
    setTimeout(() => setIsWishlistAnimating(false), 500);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  if (!id) return null;

  const isInWishlist = wishlistItems.some(item => item.id === product?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <nav className="flex items-center space-x-4 mb-8 text-sm">
        <a href="/" className="text-gray-600 hover:text-gray-900">
          Home
        </a>
        <span className="text-gray-400">/</span>
        <a href="/products" className="text-gray-600 hover:text-gray-900">
          Back to Products
        </a>
      </nav>

      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-xl font-semibold">Loading...</div>
          </div>
        ) : product ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image section */}
            <div className="relative">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product?.productImageUrl}
                  alt={product?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {randomDiscount}% OFF
                </div>
                <button
                  onClick={() => addToWishList(product)}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                  } shadow-lg hover:scale-110 transition-transform duration-200`}
                >
                  <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Product info */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                Official Store
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                {product?.title}
              </h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 font-medium">{randomRating}/5</span>
                </div>
                <span className="text-gray-400">|</span>
                <p className="text-gray-600">
                  Based on {Math.floor(Math.random() * 1000 + 100)} reviews
                </p>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-900">Price</h2>
                <div className="flex items-baseline space-x-4">
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{Math.floor(product?.price * (1 - randomDiscount/100))}
                  </p>
                  <p className="text-lg text-gray-500 line-through">
                    ₹{product?.price}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <div className="text-gray-600 leading-relaxed">
                  {product?.description}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Package className="w-5 h-5" />
                  <span>Secure Packaging</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <RefreshCw className="w-5 h-5" />
                  <span>7-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>Warranty</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <Share2 className="w-5 h-5" />
                <span>Share Product</span>
              </div>

              {/* Add to cart */}
              <div className="pt-4">
                {cartItems.some((p) => p.id === product?.id) ? (
                  <button
                    onClick={() => deleteCart(product)}
                    className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addCart(product)}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <p className="text-xl font-semibold text-gray-600">Product not found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;