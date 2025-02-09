import React, { useState } from 'react';
import { ShoppingCart, X, CreditCard, User, Home, Phone } from "lucide-react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(!open);

  const validateForm = () => {
    const newErrors = {};
    if (!addressInfo.name) newErrors.name = "Name is required";
    if (!addressInfo.address) newErrors.address = "Address is required";
    if (!addressInfo.pincode) newErrors.pincode = "Pincode is required";
    if (!addressInfo.mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(addressInfo.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      buyNowFunction();
      handleOpen();
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 font-semibold"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Proceed to Checkout</span>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Shipping Details</h2>
              <button
                onClick={handleOpen}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
                  value={addressInfo.name}
                  onChange={(e) => setAddressInfo({ ...addressInfo, name: e.target.value })}
                  placeholder="Enter Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Home className="w-4 h-4 inline mr-2" />
                  Address
                </label>
                <textarea
                  className={`w-full px-4 py-2 border ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
                  value={addressInfo.address}
                  onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
                  placeholder="Enter your complete address"
                  rows={3}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2 border ${
                      errors.pincode ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
                    value={addressInfo.pincode}
                    onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
                    placeholder="123456"
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className={`w-full px-4 py-2 border ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
                    value={addressInfo.mobileNumber}
                    onChange={(e) => setAddressInfo({ ...addressInfo, mobileNumber: e.target.value })}
                    placeholder="1234567890"
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 font-semibold"
              >
                <CreditCard className="w-5 h-5" />
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNowModal;