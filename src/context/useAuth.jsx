import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { auth, db } from "../assets/Auth/firebase";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [getAllOrder, setGetAllOrder] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);

  // ✅ Fetch Users Function (Handles Missing "time" Field)
  const getAllUserFunction = async () => {
    setLoading(true);
    try {
      console.log("🔍 Fetching Users from Firestore...");
  
      // 🔥 Updated to "Users" (Case-Sensitive)
      const q = query(collection(db, "Users")); 
      const data = onSnapshot(q, (QuerySnapshot) => {
        console.log("📩 Query Snapshot Received:", QuerySnapshot.size);
  
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          console.log("📜 User Doc:", doc.data()); 
          userArray.push({ ...doc.data(), id: doc.id });
        });
  
        setGetAllUser(userArray);
        console.log("🔥 Fetched Users:", userArray);
        setLoading(false);
      });
  
      return () => data;
    } catch (error) {
      console.error("❌ Error fetching users:", error);
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
        console.log("✅ Fetched Products:", productArray);
        setGetAllProduct(productArray);
      });

      return unsubscribe;
    } catch (error) {
      console.error("🚨 Error fetching products:", error);
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
        console.log("✅ Fetched Orders:", orderArray);
        setGetAllOrder(orderArray);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("🚨 Error fetching orders:", error);
      setLoading(false);
      return () => {};
    }
  }, []);

  const deleteOrder = async (id) => {
    if (!id) {
        toast.error("Invalid Order ID");
        return;
    }
    setLoading(true);
    try {
        console.log("🗑️ Deleting Order ID:", id);
        await deleteDoc(doc(db, 'order', id));
        toast.success("Order Deleted Successfully");
        getAllOrderFunction();
    } catch (error) {
        console.error("❌ Error Deleting Order:", error);
        toast.error("Failed to Delete Order");
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("🔄 User State Updated:", user);
      setLoading(false);
    });

    const productUnsubscribe = fetchProducts();
    const orderUnsubscribe = fetchOrders();
    getAllUserFunction(); // Fetch users

    return () => {
      authUnsubscribe();
      productUnsubscribe();
      orderUnsubscribe();
    };
  }, [fetchProducts, fetchOrders]);

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
