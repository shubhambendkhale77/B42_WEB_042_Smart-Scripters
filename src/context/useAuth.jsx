import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { auth, db } from "../assets/Auth/firebase";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getAllProduct, setGetAllProduct] = useState([]);

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    const productUnsubscribe = fetchProducts();

    return () => {
      authUnsubscribe();
      productUnsubscribe();
    };
  }, []);

  const fetchProducts = useCallback(() => {
    try {
      const q = query(collection(db, "products"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const productArray = querySnapshot.docs.map(doc => ({
          ...doc.data(), 
          id: doc.id 
        }));
        setGetAllProduct(productArray);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching products:", error);
      return () => {};
    }
  }, []);

  const [getAllOrder, setGetAllOrder] = useState([]);

  const getAllOrderFunction = async () => {
    try {
      
      const q = query(collection(db, "orders"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) =>{
        let orderArray = []
        QuerySnapshot.forEach((doc) => {
          orderArray.push({
            ...doc.data(),
            id: doc.id
          })
        })
        setGetAllOrder(orderArray)
        setLoading(false)
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false)
      }
    };

    useEffect(() => {
      getAllOrderFunction()
    }, [])
    // console.log(getAllOrder)

  const value = useMemo(() => ({
    currentUser,
    loading,
    setLoading,
    getAllProduct,
    getAllProductFunction: fetchProducts,getAllOrder
  }), [currentUser, loading, getAllProduct, fetchProducts]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};