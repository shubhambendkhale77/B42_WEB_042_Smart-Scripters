import { useNavigate } from "react-router";
import { AuthContext } from "../context/useAuth";
<<<<<<< HEAD
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../redux/CartSlice";


=======
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/slice/wishlistReducer";
>>>>>>> 45733279c524ec94846221ea38918ec3cf64209f

const AllProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(AuthContext);
  const { getAllProduct } = context;

<<<<<<< HEAD
    const context = useContext(AuthContext)
    const {getAllProduct} = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    // console.log(cartItems)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    return (
        <>
=======
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
>>>>>>> 45733279c524ec94846221ea38918ec3cf64209f
    <div className="py-8">
      {/* Heading */}
      <div className="">
        <h1 className="text-center mb-5 text-2xl font-semibold">All Products</h1>
      </div>

<<<<<<< HEAD
            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 lg:px-0 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                    {getAllProduct.map((item, index) => {
                            const { id, title, price, productImageUrl } = item
                            return (
                                <div key={index} className="p-4 w-full md:w-1/4">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                        <img
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="lg:h-80  h-96 w-full"
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

                                            <div
                                                className="flex justify-center ">
                                                {cartItems.some((p)=> p.id === item.id) 
                                                
                                                ?
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                    Delete To Cart
                                                </button>

                                                : 

                                                <button
                                                    onClick={() => addCart(item)}
                                                    className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                    Add To Cart
                                                </button>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
=======
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
>>>>>>> 45733279c524ec94846221ea38918ec3cf64209f
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
