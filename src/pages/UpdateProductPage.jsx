import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/useAuth";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../assets/Auth/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Save, Image, Tag, Percent, Star, List } from "lucide-react";

const categoryList = [
    { name: 'fashion' },
    { name: 'shirt' },
    { name: 'jacket' },
    { name: 'mobile' },
    { name: 'laptop' },
    { name: 'shoes' },
    { name: 'home' },
    { name: 'books' },
    { name: 'electronics' },
    { name: 'grocery' },
    { name: 'kitchen' },
    { name: 'beauty' }
];

const UpdateProductPage = () => {
    const context = useContext(AuthContext);
    const { getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();
    
    // Loading state
    const [loading, setLoading] = useState(true);

    // Product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: "",
        discount: "",
        rating: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    // Fetch single product data
    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(db, "products", id));
            const productData = productTemp.data();
            if (productData) {
                setProduct({
                    title: productData.title || "",
                    price: productData.price || "",
                    productImageUrl: productData.productImageUrl || "",
                    category: productData.category || "",
                    description: productData.description || "",
                    quantity: productData.quantity || "",
                    discount: productData.discount || "",
                    rating: productData.rating || "",
                    time: productData.time || Timestamp.now(),
                    date: productData.date || new Date().toLocaleString(),
                });
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            toast.error("Failed to fetch product data. Please try again.");
        }
        setLoading(false);
    };

    // Update product
    const updateProduct = async () => {
        if (!product.title || !product.price || !product.productImageUrl) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            await setDoc(doc(db, "products", id), product);
            toast.success("Product Updated Successfully");
            getAllProductFunction();
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product. Please try again.");
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    useEffect(() => {
        console.log("Updated Product State:", product);
    }, [product]);

    if (loading) {
        return <h2 className="text-center text-2xl font-semibold mt-10">Loading product data...</h2>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                <h2 className="text-2xl font-bold mb-6">Update Product</h2>

                <div className="space-y-6">
                    {/* Product Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <Tag className="w-4 h-4 mr-2" />
                            Product Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={product.title || ""}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder="Enter product title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Product Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <Tag className="w-4 h-4 mr-2" />
                            Product Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price || ""}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            placeholder="Enter product price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Product Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <Image className="w-4 h-4 mr-2" />
                            Product Image URL
                        </label>
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl || ""}
                            onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                            placeholder="Enter product image URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Product Discount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <Percent className="w-4 h-4 mr-2" />
                            Product Discount (%)
                        </label>
                        <input
                            type="text"
                            name="discount"
                            value={product.discount || ""}
                            onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                            placeholder="Enter product discount"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Product Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <Star className="w-4 h-4 mr-2" />
                            Product Rating (1-5)
                        </label>
                        <input
                            type="number"
                            name="rating"
                            value={product.rating || ""}
                            onChange={(e) => setProduct({ ...product, rating: e.target.value })}
                            placeholder="Enter product rating"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Product Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <List className="w-4 h-4 mr-2" />
                            Product Description
                        </label>
                        <textarea
                            value={product.description || ""}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            placeholder="Enter product description"
                            rows="5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Update Button */}
                    <button
                        onClick={updateProduct}
                        type="button"
                        className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <Save className="w-5 h-5 mr-2" />
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;