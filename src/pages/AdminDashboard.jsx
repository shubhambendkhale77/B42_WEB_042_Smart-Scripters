import React, { useEffect, useState, useMemo } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { 
  ShoppingCart, 
  Package, 
  Users, 
  ChevronRight 
} from "lucide-react";
import ProductDetail from "../components/admin/ProductDetail";
import OrderDetail from "../components/admin/OrderDetail";
import UserDetail from "../components/admin/UserDetail";
import { db } from "../assets/Auth/firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem("adminEmail") || "aayush@admin.com";
    const storedName = localStorage.getItem("adminName") || "Aayush Pandey";
    
    setAdmin({ email: storedEmail, name: storedName });
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productsSnapshot, usersSnapshot, ordersSnapshot] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "users")),
          getDocs(collection(db, "orders"))
        ]);

        setTotalProducts(productsSnapshot.size);
        setTotalUsers(usersSnapshot.size);
        setTotalOrders(ordersSnapshot.size);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const tabData = useMemo(() => [
    { 
      icon: <ShoppingCart className="w-10 h-10 text-indigo-600" />, 
      count: totalProducts, 
      label: 'Total Products',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    { 
      icon: <Package className="w-10 h-10 text-green-600" />, 
      count: totalOrders, 
      label: 'Total Orders',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      icon: <Users className="w-10 h-10 text-purple-600" />, 
      count: totalUsers, 
      label: 'Total Users',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ], [totalProducts, totalOrders, totalUsers]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <header className="bg-white shadow-md rounded-lg mb-6 p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Admin Dashboard
          </h1>
        </header>

        {/* Admin Profile */}
        <div className="bg-white shadow-md rounded-lg mb-6 p-6 flex items-center space-x-6">
          <img 
            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" 
            alt="Admin" 
            className="w-24 h-24 rounded-full border-4 border-indigo-200"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {admin.name}
            </h2>
            <p className="text-gray-500">
              {admin.email}
            </p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {tabData.map((tab, index) => (
            <div 
              key={index} 
              className={`${tab.bgColor} rounded-lg p-6 shadow-md transform transition-all hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div>
                  {tab.icon}
                  <h3 className={`text-2xl font-bold mt-4 ${tab.textColor}`}>
                    {tab.count}
                  </h3>
                  <p className={`mt-2 ${tab.textColor} font-medium`}>
                    {tab.label}
                  </p>
                </div>
                <ChevronRight className={`w-8 h-8 ${tab.textColor}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Section */}
        <Tabs>
          <TabList className="flex space-x-4 mb-6 bg-white shadow-md rounded-lg p-2">
            {["Products", "Orders", "Users"].map((tab, index) => (
              <Tab 
                key={index} 
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                selectedClassName="bg-indigo-100 text-indigo-700 font-semibold"
              >
                {tab}
              </Tab>
            ))}
          </TabList>

          <div className="bg-white shadow-md rounded-lg">
            <TabPanel>
              <ProductDetail />
            </TabPanel>
            <TabPanel>
              <OrderDetail />
            </TabPanel>
            <TabPanel>
              <UserDetail />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;