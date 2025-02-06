import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/useAuth";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../assets/Auth/firebase";
import { toast } from "react-toastify";

const categoryList = [
    { name: 'fashion' }, { name: 'shirt' }, { name: 'jacket' }, { name: 'mobile' },
    { name: 'laptop' }, { name: 'shoes' }, { name: 'home' }, { name: 'books' }
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
                    time: productData.time || Timestamp.now(),
                    date: productData.date || new Date().toLocaleString(),
                });
            }
        } catch (error) {
            console.error("Error fetching product:", error);
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
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    useEffect(() => {
        console.log("Updated Product State:", product);
    }, [product]);

    if (loading) {
        return <h2 className="text-center text-pink-500">Loading product data...</h2>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                <h2 className="text-center text-2xl font-bold text-pink-500 mb-5">Update Product</h2>

                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        value={product.title || ""}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                        placeholder="Product Title"
                        className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        name="price"
                        value={product.price || ""}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        placeholder="Product Price"
                        className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="productImageUrl"
                        value={product.productImageUrl || ""}
                        onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                        placeholder="Product Image Url"
                        className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
                    />
                </div>

                <div className="mb-3">
                    <select
                        value={product.category || ""}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
                    >
                        <option disabled>Select Product Category</option>
                        {categoryList.map((value, index) => (
                            <option key={index} value={value.name} className="first-letter:uppercase">
                                {value.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <textarea
                        value={product.description || ""}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        placeholder="Product Description"
                        rows="5"
                        className="w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300"
                    />
                </div>

                <button
                    onClick={updateProduct}
                    type="button"
                    className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
                >
                    Update Product
                </button>
            </div>
        </div>
    );
};

export default UpdateProductPage;
