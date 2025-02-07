import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductDetail from "../components/admin/ProductDetail";
import OrderDetail from "../components/admin/OrderDetail";
import UserDetail from "../components/admin/UserDetail";
import { useEffect, useState } from "react";
import { db } from "../assets/Auth/firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch Admin Details
  useEffect(() => {
    setAdmin({
      email: localStorage.getItem("adminEmail") || "Aayush.admin.gmail.com",
      name: localStorage.getItem("adminName") || "Aayush Pandey",
    });
  }, []);

  // Fetch Total Number of Products
  useEffect(() => {
    const fetchProductsCount = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        const newTotalProducts = productsSnapshot.size;
  
        // Prevent unnecessary state updates
        setTotalProducts((prev) => (prev !== newTotalProducts ? newTotalProducts : prev));
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProductsCount();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className="top mb-5 px-5 mt-5">
        <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg">
          <h1 className="text-center text-2xl font-bold text-pink-500">
            Admin Dashboard
          </h1>
        </div>
      </div>

      <div className="px-5">
        {/* Admin Profile Section */}
        <div className="mid mb-5">
          <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt="Admin"
              />
            </div>
            <div className="text-center">
              <h1 className="text-lg text-pink-500">
                <span className="font-bold">Name :</span> {admin.name}
              </h1>
              <h1 className="text-lg text-pink-500">
                <span className="font-bold">Email :</span> {admin.email}
              </h1>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div>
          <Tabs>
            <TabList className="flex flex-wrap -m-4 text-center justify-center">
              {/* Total Products Tab */}
              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer react-tabs__tab">
                <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                  <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                    🛒
                  </div>
                  <h2 className="title-font font-medium text-3xl text-pink-400">
                    {totalProducts}
                  </h2>
                  <p className="text-pink-500 font-bold">Total Products</p>
                </div>
              </Tab>

              {/* Total Orders Tab */}
              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer react-tabs__tab">
                <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                  <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                    📦
                  </div>
                  <h2 className="title-font font-medium text-3xl text-pink-400">
                    10
                  </h2>
                  <p className="text-pink-500 font-bold">Total Orders</p>
                </div>
              </Tab>

              {/* Total Users Tab */}
              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer react-tabs__tab">
                <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                  <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                    👥
                  </div>
                  <h2 className="title-font font-medium text-3xl text-pink-400">
                    10
                  </h2>
                  <p className="text-pink-500 font-bold">Total Users</p>
                </div>
              </Tab>
            </TabList>

            {/* Tab Panels */}
            <TabPanel>
              <ProductDetail />
            </TabPanel>
            <TabPanel>
              <OrderDetail />
            </TabPanel>
            <TabPanel>
              <UserDetail />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
