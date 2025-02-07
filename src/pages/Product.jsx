import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/useAuth';
import { addToCart, deleteFromCart } from '../redux/CartSlice';
import { addToWishlist } from '../redux/wishlistReducer';
import toast from 'react-hot-toast';

const AllProducts = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success('Added to cart');
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Deleted from cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToWishlist = (product) => {
    const serializedProduct = {
      ...product,
      time: {
        seconds: product.time.seconds,
        nanoseconds: product.time.nanoseconds,
      },
    };
    dispatch(addToWishlist(serializedProduct));
    toast.success('Added to wishlist');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
        <p className="text-gray-500 mt-2">Discover our amazing collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getAllProduct.map((item, index) => {
          const { id, title, price, productImageUrl } = item;
          const isInCart = cartItems.some((p) => p.id === item.id);

          return (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={productImageUrl}
                  alt={title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => navigate(`/productinfo/${id}`)}
                />
                <span className="absolute top-2 right-2 bg-white/80 text-black text-xs px-2 py-1 rounded-full">
                  E-bharat
                </span>
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {title}
                </h2>
                <p className="mt-2 text-2xl font-bold text-gray-900">₹{price}</p>
              </div>

              <div className="p-4 pt-0 space-y-2">
                <div className="h-px bg-gray-200 mb-4" />
                
                {isInCart ? (
                  <button 
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    onClick={() => deleteCart(item)}
                  >
                    <Trash2 size={16} />
                    Remove from Cart
                  </button>
                ) : (
                  <button 
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    onClick={() => addCart(item)}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                )}

                <button 
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg font-semibold transition-colors"
                  onClick={() => handleAddToWishlist(item)}
                >
                  <Heart size={16} />
                  Add to Wishlist
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;