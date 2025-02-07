import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/useAuth";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/slice/wishlistReducer";

const AllProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(AuthContext);
  const { getAllProduct } = context;

  const handleAddToWishlist = (product) => {
    const serializedProduct = {
      ...product,
      time: {
        seconds: product.time.seconds,
        nanoseconds: product.time.nanoseconds
      }
    };
    dispatch(addToWishlist(serializedProduct));
  };

  return (
    <div className="py-8">
      {/* Heading */}
      <div className="">
        <h1 className="text-center mb-5 text-2xl font-semibold">All Products</h1>
      </div>

      {/* main */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 lg:px-0 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {getAllProduct.map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      onClick={() => navigate("/productinfo")}
                      className="lg:h-80 h-96 w-full"
                      src={productImageUrl}
                      alt="blog"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        E-bharat
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ₹{price}
                      </h1>

                      <div className="flex justify-center">
                        <button
                          className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          onClick={() => handleAddToWishlist(item)}
                        >
                          Add To Wishlist
                        </button>
                      </div>

                      <div className="flex justify-center">
                        <button className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                          Add To Cart
                        </button>
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

export default AllProduct;
