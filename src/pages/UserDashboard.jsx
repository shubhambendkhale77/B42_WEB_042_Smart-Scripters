import React, { useContext } from "react";
import { AuthContext } from "../context/useAuth";
import { User, Package, Calendar, Mail, Star, CreditCard, ShoppingBag } from "lucide-react";
import { auth, db } from "../assets/Auth/firebase";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { loading, getAllOrder, currentUser } = useContext(AuthContext);
  const userId = user?.uid || currentUser?.uid;
  const filteredOrders = getAllOrder.filter((obj) => obj.userid === userId);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        {/* User Profile Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-indigo-800">Profile Information</h2>
            <div className="px-4 py-2 bg-indigo-100 rounded-lg text-indigo-600 font-medium">
              {user?.role || "User"}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 p-1 flex-shrink-0">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full bg-white"
              />
            </div>
            <div className="space-y-4 flex-grow">
              <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                <User className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-800">
                  {user?.firstName || currentUser?.displayName}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Mail className="w-5 h-5 text-purple-600" />
                <span className="text-gray-800">{user?.email || currentUser?.email}</span>
              </div>
              {/* <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-gray-800">{user?.date || "N/A"}</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-indigo-800">Order History</h2>
            <ShoppingBag className="w-6 h-6 text-indigo-600" />
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-indigo-600">Loading your orders...</p>
            </div>
          )}

          {!loading && filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-indigo-50 rounded-xl">
              <Package className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
              <p className="text-indigo-600 font-medium">No orders found.</p>
            </div>
          )}

          <div className="space-y-6">
            {filteredOrders.map((order) =>
              order.cartItems.map((item, index) => (
                <div
                  onClick={() => navigate("/OrderTracker")}
                  key={index}
                  className="bg-gradient-to-r from-white to-indigo-50 rounded-xl border border-indigo-100 p-6 space-y-4 hover:shadow-lg transition-all duration-300"
                 >
                  {/* Order Header */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-indigo-600 font-medium">Order ID</p>
                      <p className="font-bold text-gray-800">#{item.id}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-purple-600 font-medium">Date</p>
                      <p className="font-bold text-gray-800">{item.date}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-blue-600 font-medium">Total Amount</p>
                      <p className="font-bold text-gray-800">₹ {item.price * item.quantity}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-green-600 font-medium">Status</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 pt-4 border-t border-indigo-100">
                    <div className="w-24 h-24 bg-white rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={item.productImageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-lg text-indigo-800">{item.title}</h3>
                      <p className="text-indigo-600">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm bg-indigo-100 px-3 py-1 rounded-full text-indigo-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="font-bold text-lg text-indigo-800">₹ {item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;