import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../assets/Auth/firebase";
import { AuthContext } from "../context/useAuth";
import { addToCart, deleteFromCart } from "../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductInfo = () => {
    const { loading, setLoading } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    
    console.log("Product ID:", id);
    
    if (!id) return;

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
    }, [id]); // <-- Added dependency array to avoid missing dependency warning

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
            {loading ? (
                <div className="flex justify-center items-center">
                    {/* Add a Loader Component if needed */}
                    <p>Loading...</p>
                </div>
            ) : product ? (
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex flex-wrap mb-24 -mx-4">
                        <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                            <img
                                className="w-full lg:h-[39em] rounded-lg"
                                src={product?.productImageUrl}
                                alt={product?.title || "Product Image"}
                            />
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                            <div className="lg:pl-20">
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                                    {product?.title}
                                </h2>
                                <p className="text-xl font-semibold text-gray-700 dark:text-gray-400">
                                    ₹ {product?.price}
                                </p>
                                <p>{product?.description}</p>

                                <div className="flex flex-wrap items-center mb-6">
                                    {cartItems.some((p) => p.id === product?.id) ? (
                                        <button
                                            onClick={() => deleteCart(product)}
                                            className="w-full px-4 py-3 text-white bg-red-500 rounded-xl hover:bg-red-600"
                                        >
                                            Remove from Cart
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => addCart(product)}
                                            className="w-full px-4 py-3 text-pink-600 bg-pink-100 border border-pink-600 rounded-xl hover:bg-pink-600 hover:text-white"
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-red-500">Product not found.</p>
            )}
        </section>
    );
};

export default ProductInfo;
