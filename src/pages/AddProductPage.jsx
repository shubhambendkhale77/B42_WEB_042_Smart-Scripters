import React, { useState } from 'react';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { db } from '../assets/Auth/firebase';
import toast from 'react-hot-toast';
import { Image, IndianRupee , Tag, FileText, Plus } from 'lucide-react';

const categoryList = [
    { name: 'fashion' },
    { name: 'shirt' },
    { name: 'jacket' },
    { name: 'mobile' },
    { name: 'laptop' },
    { name: 'shoes' },
    { name: 'home' },
    { name: 'books' }
];

const AddProductPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState({
        title: '',
        price: '',
        productImageUrl: '',
        category: '',
        description: '',
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        })
    });

    const addProductFunction = async () => {
        if (!product.title || !product.price || !product.productImageUrl || !product.category || !product.description) {
            return toast.error('All fields are required');
        }

        setLoading(true);
        try {
            const productRef = collection(db, 'products');
            await addDoc(productRef, product);
            toast.success('Product added successfully');
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            toast.error('Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Plus className="w-6 h-6" />
                            Add New Product
                        </h2>
                        <p className="text-blue-100 mt-1">Fill in the information below to add a new product</p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-6 space-y-6">
                        {/* Title Input */}
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

                        {/* Price & Category Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Price Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <IndianRupee  className="w-4 h-4" />
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

                            {/* Category Select */}
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

                        {/* Image URL Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Image className="w-4 h-4" />
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="productImageUrl"
                                value={product.productImageUrl}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter image URL"
                            />
                        </div>

                        {/* Description Textarea */}
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

                        {/* Submit Button */}
                        <button
                            onClick={addProductFunction}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span>Adding Product...</span>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Add Product
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;