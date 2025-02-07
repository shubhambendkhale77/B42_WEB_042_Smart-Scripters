import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash, Plus, Minus, ShoppingCart, CheckCircle } from 'lucide-react';
import toast from "react-hot-toast";
import { 
    decrementQuantity, 
    deleteFromCart, 
    incrementQuantity 
} from "../redux/CartSlice";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart", {
            icon: '🗑️',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        });
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center mb-8 space-x-4">
                    <ShoppingCart className="w-10 h-10 text-indigo-600" />
                    <h1 className="text-4xl font-bold text-gray-800">
                        Your Shopping Cart
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center bg-white shadow-md rounded-lg p-12">
                        <img 
                            src="/empty-cart.svg" 
                            alt="Empty Cart" 
                            className="mx-auto mb-6 w-64 h-64"
                        />
                        <p className="text-2xl text-gray-500">
                            Your cart is empty
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="md:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 flex items-center"
                                >
                                    <img 
                                        src={item.productImageUrl} 
                                        alt={item.title} 
                                        className="w-24 h-24 object-cover rounded-md mr-6"
                                    />
                                    
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-500 mb-2">
                                            {item.category}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-indigo-600 font-bold">
                                                ₹{item.price}
                                            </p>
                                            
                                            <div className="flex items-center space-x-3">
                                                <button 
                                                    onClick={() => handleDecrement(item.id)}
                                                    className="bg-gray-100 p-1 rounded-full"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-lg font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button 
                                                    onClick={() => handleIncrement(item.id)}
                                                    className="bg-gray-100 p-1 rounded-full"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => deleteCart(item)}
                                        className="ml-4 text-red-500 hover:bg-red-50 p-2 rounded-full"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                                <CheckCircle className="mr-3 text-green-500" />
                                Order Summary
                            </h3>

                            <div className="space-y-4 border-b pb-4 mb-4">
                                <div className="flex justify-between">
                                    <span>Price ({cartItemTotal} items)</span>
                                    <span className="font-semibold">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xl font-bold mb-6">
                                <span>Total Amount</span>
                                <span>₹{cartTotal}</span>
                            </div>

                            <button 
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg 
                                           hover:bg-indigo-700 transition-colors 
                                           flex items-center justify-center space-x-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>Proceed to Checkout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;