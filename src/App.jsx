import React from 'react';
import { Toaster } from 'react-hot-toast'; 
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
      <Toaster /> {/* Apply Toaster */}
    </>
  );
}

export default App;
