import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../assets/Auth/firebase";
import { AuthContext } from "../context/useAuth";
import toast from 'react-hot-toast';
import { Image, IndianRupee, Tag, FileText, Plus, Star, Percent } from 'lucide-react';

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
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        rating: "",
        discount: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(db, "products", id));
            const productData = productTemp.data();
            if (productData) {
                setProduct(prev => ({
                    ...prev,
                    ...productData
                }));
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            toast.error("Failed to load product");
        }
        setLoading(false);
    };

    const updateProduct = async () => {
        if (!product.title || !product.price || !product.productImageUrl || !product.category || !product.description || !product.rating || !product.discount) {
            return toast.error('All fields are required');
        }

        // Validate image URL
        try {
            new URL(product.productImageUrl);
        } catch (error) {
            return toast.error('Please enter a valid image URL');
        }

        setSaving(true);
        try {
            await setDoc(doc(db, "products", id), product);
            toast.success("Product Updated Successfully");
            navigate("/admin-dashboard");
            getAllProductFunction();
          
        } catch (error) {
            console.error("Error updating product:", error);
            // toast.error("Failed to update product");
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
                <div className="text-xl text-blue-600 font-semibold">Loading product data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Plus className="w-6 h-6" />
                            Update Product
                        </h2>
                        <p className="text-blue-100 mt-1">Update the product information below</p>
                    </div>

                    <div className="px-8 py-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Product Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={product.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter product title"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Image className="w-4 h-4" />
                                Product Image URL
                            </label>
                            <input
                                type="url"
                                name="productImageUrl"
                                value={product.productImageUrl}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter image URL"
                            />
                            {product.productImageUrl && (
                                <div className="mt-2 relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                                    <img
                                        src={product.productImageUrl}
                                        alt="Product preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/api/placeholder/128/128';
                                            toast.error('Failed to load image');
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <IndianRupee className="w-4 h-4" />
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter price"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={product.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors capitalize"
                                >
                                    <option value="">Select Category</option>
                                    {categoryList.map(({ name }, index) => (
                                        <option key={index} value={name} className="capitalize">
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                placeholder="Enter product description"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={product.rating}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter rating"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Percent className="w-4 h-4" />
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={product.discount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter discount"
                                />
                            </div>
                        </div>

                        <button
                            onClick={updateProduct}
                            disabled={saving}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <span>Updating Product...</span>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Update Product
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;