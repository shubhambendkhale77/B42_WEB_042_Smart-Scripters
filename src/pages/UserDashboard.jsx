import { useContext } from "react";
import { AuthContext } from "../context/useAuth";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from LocalStorage:", user); // ✅ Debugging

  const { loading, getAllOrder, currentUser } = useContext(AuthContext);
  const userId = user?.uid || currentUser?.uid; // Fallback if localStorage is empty
  console.log("Current User ID:", userId); // ✅ Debugging

  const filteredOrders = getAllOrder.filter((obj) => obj.userid === userId);
  console.log("Filtered Orders for User:", filteredOrders); // ✅ Debugging

  return (
    <>
      <div className="container mx-auto px-4 py-5 lg:py-8">
        {/* User Details */}
        <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
          <div className="flex justify-center">
            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold">Name: {user?.firstName || currentUser?.displayName}</h1>
            <h1 className="text-lg">Email: {user?.email || currentUser?.email}</h1>
            <h1 className="text-lg">Date: {user?.date || "N/A"}</h1>
            <h1 className="text-lg">Role: {user?.role || "User"}</h1>
          </div>
        </div>

        {/* Order Details */}
        <div className="my-6 max-w-6xl px-2">
          <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>

          {loading && <p>Loading orders...</p>}

          {!loading && filteredOrders.length === 0 && <p className="text-gray-500 mt-4">No orders found.</p>}

          {filteredOrders.map((order) =>
            order.cartItems.map((item, index) => (
              <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row">
                {/* Order Info */}
                <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs p-8">
                  <div className="text-sm font-semibold text-black">Order Id</div>
                  <div className="text-sm font-medium text-gray-900">#{item.id}</div>

                  <div className="text-sm font-semibold">Date</div>
                  <div className="text-sm font-medium text-gray-900">{item.date}</div>

                  <div className="text-sm font-semibold">Total Amount</div>
                  <div className="text-sm font-medium text-gray-900">₹ {item.price * item.quantity}</div>

                  <div className="text-sm font-semibold">Order Status</div>
                  <div className="text-sm font-medium text-green-800 capitalize">{order.status}</div>
                </div>

                {/* Product Info */}
                <div className="flex-1 p-8">
                  <div className="flex items-start space-x-5">
                    <img className="h-40 w-40 rounded-lg border object-contain" src={item.productImageUrl} alt={item.title} />
                    <div className="ml-5">
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="mt-1 text-sm font-medium text-gray-500">{item.category}</p>
                      <p className="mt-4 text-sm font-medium text-gray-500">x {item.quantity}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-sm font-bold">₹ {item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
