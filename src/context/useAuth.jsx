import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { auth } from "../assets/Auth/firebase";
import { db } from "../assets/Auth/firebase";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getAllProduct, setGetAllProduct] = useState([]);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  
  const getAllProductFunction = useCallback(() => {
    setLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let productArray = [];
        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    const unsubscribe = getAllProductFunction();
    return () => unsubscribe && unsubscribe();
  }, [getAllProductFunction]);

  const value = {
    currentUser,
    loading,
    getAllProduct,
    getAllProductFunction,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
