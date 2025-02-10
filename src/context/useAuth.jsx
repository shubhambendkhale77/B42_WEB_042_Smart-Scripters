import { onAuthStateChanged } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { auth, db } from "../assets/Auth/firebase";
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [getAllOrder, setGetAllOrder] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);

  // ✅ Fetch Users Function
  const getAllUserFunction = async () => {
    setLoading(true);
    try {
      // console.log("🔍 Fetching Users from Firestore...");
      const q = query(collection(db, "Users")); 
      const data = onSnapshot(q, (QuerySnapshot) => {
        // console.log("📩 Query Snapshot Received:", QuerySnapshot.size);
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          // console.log("📜 User Doc:", doc.data()); 
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUser(userArray);
        // console.log("🔥 Fetched Users:", userArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      // console.error("❌ Error fetching users:", error);
      setLoading(false);
    }
  };

  // ✅ Fetch Products Function
  const fetchProducts = useCallback(() => {
    try {
      const q = query(collection(db, "products"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const productArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log("✅ Fetched Products:", productArray);
        setGetAllProduct(productArray);
      });
      return unsubscribe;
    } catch (error) {
      // console.error("🚨 Error fetching products:", error);
      return () => {};
    }
  }, []);

  // ✅ Fetch Orders Function
  const fetchOrders = useCallback(() => {
    try {
      const q = query(collection(db, "order"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const orderArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log("✅ Fetched Orders:", orderArray);
        setGetAllOrder(orderArray);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      // console.error("🚨 Error fetching orders:", error);
      setLoading(false);
      return () => {};
    }
  }, []);

  const deleteOrder = async (id) => {
    if (!id) {
      toast.error("❌ Invalid Order ID");
      // console.error("❌ Invalid Order ID");
      return;
    }
    setLoading(true);
    try {
      // console.log("🗑️ Deleting Order ID:", id);
      await deleteDoc(doc(db, 'order', id));
      // console.log("✅ Order Deleted Successfully");
      toast.success("✅ Order Deleted Successfully");
      fetchOrders();  
    } catch (error) {
      // console.error("❌ Error Deleting Order:", error);
      toast.error("❌ Error Deleting Order");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Check Authentication Status
  const updateAuthState = useCallback((user) => {
    // Check for admin login
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminToken = localStorage.getItem('adminToken');

    if (isAdmin && adminToken === 'admin-token-123') {
      // Admin is logged in
      setCurrentUser({
        email: 'shubham@admin.com',
        isAdmin: true,
        adminToken
      });
    } else if (user) {
      // Regular user is logged in via Firebase
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setCurrentUser({
        ...user,
        ...userData,
        isAdmin: false
      });
    } else {
      // No user is logged in
      setCurrentUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, updateAuthState);
    const productUnsubscribe = fetchProducts();
    const orderUnsubscribe = fetchOrders();
    getAllUserFunction();

    return () => {
      authUnsubscribe();
      productUnsubscribe();
      orderUnsubscribe();
    };
  }, [fetchProducts, fetchOrders, updateAuthState]);

  // ✅ Context Value
  const value = useMemo(
    () => ({
      currentUser,
      loading,
      getAllProduct,
      getAllOrder,
      getAllUser,
      deleteOrder,
    }),
    [currentUser, loading, getAllProduct, getAllOrder, getAllUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};