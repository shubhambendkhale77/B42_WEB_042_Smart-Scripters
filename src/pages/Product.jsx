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
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
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
    const exists = wishlistItems.find(item => item.id === product.id);
    if (exists) {
      toast.error('Product already exists in wishlist');
    } else {
      const serializedProduct = {
        ...product,
        time: {
          seconds: product.time.seconds,
          nanoseconds: product.time.nanoseconds,
        },
      };
      dispatch(addToWishlist(serializedProduct));
      toast.success('Added to wishlist');
    }
  };

  return (
    <div>
      <div>
        <div>
          <h1>All Products</h1>
          <p>Discover our amazing collection</p>
        </div>
      </div>

      <div>
        {getAllProduct.map((item, index) => {
          const { id, title, price, productImageUrl } = item;
          const isInCart = cartItems.some((p) => p.id === item.id);

          return (
            <div key={index}>
              <div>
                <img
                  src={productImageUrl}
                  alt={title}
                  onClick={() => navigate(`/productinfo/${id}`)}
                />
                <span>
                  E-bharat
                </span>
              </div>

              <div>
                <h2>
                  {title}
                </h2>
                <p>₹{price}</p>
              </div>

              <div>
                {isInCart ? (
                  <button
                    onClick={() => deleteCart(item)}
                  >
                    <Trash2 size={16} />
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addCart(item)}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                )}

                <button
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
