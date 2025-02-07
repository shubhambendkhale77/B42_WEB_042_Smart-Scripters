import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/useAuth";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../redux/CartSlice";

const HomePageProductCard = () => {
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
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10">
      {/* Heading */}
      <div className="">
        <h1 className="text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
      </div>

      {/* Product List */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {getAllProduct?.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="lg:h-80 h-96 w-full"
                      src={productImageUrl}
                      alt="product"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        ShopSmart
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ₹{price}
                      </h1>
                      <div className="flex justify-center">
                        {cartItems.length > 0 && cartItems.some((p) => p.id === item.id) ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Remove From Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
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

export default HomePageProductCard;
