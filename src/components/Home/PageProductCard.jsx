import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/useAuth";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/CartSlice"; 

const PageProductCard = () => {
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart) || []; // Ensure it's always an array
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Product Added to Cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Product Removed from Cart");
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
          return (
            <div key={index} className="p-4">
              <div className="h-full border border-gray-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white">
                <div className="h-80 flex justify-center items-center bg-gray-100">
                  <img
                    onClick={() => navigate(`/productinfo/${id}`)}
                    className="h-full w-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                    src={productImageUrl}
                    alt="product"
                  />
                </div>
                <div className="p-4 text-center">
                  <h1 className="text-lg font-semibold text-gray-900 truncate">
                    {title.substring(0, 25)}
                  </h1>
                  <h1 className="text-xl font-bold text-gray-600 mt-1">₹{price}</h1>
                  <div className="mt-3">
                    {cartItems.length > 0 &&
                    cartItems.some((p) => p.id === item.id) ? (
                      <button
                        onClick={() => deleteCart(item)}
                        className="bg-red-600 hover:bg-red-700 w-50 text-white py-1 text-sm rounded-lg font-bold transition duration-300"
                      >
                        Remove From Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addCart(item)}
                        className="bg-gray-500 hover:bg-gray-600 w-50 mb-4 text-white py-1 text-sm rounded-lg font-bold transition duration-300"
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
