import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Check, Lock, User, UserPlus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";



const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: data.firstName,
          lastName: data.lastName,
          createdAt: new Date().toISOString(),
        });

        toast.success("Registration Successful!", {
          position: "top-right",
        });

        reset();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Decorative Section */}
      <div className="lg:flex-1 bg-gradient-to-br from-purple-600 to-pink-600 p-8 lg:p-12 hidden lg:flex lg:flex-col lg:justify-between text-white">
        <div>
          <h1 className="text-4xl font-bold mb-6">Welcome to ShopSmart</h1>
          <p className="text-lg text-purple-100">
            Create an account and join our vibrant shopping community today.
          </p>
        </div>
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <p className="flex-1">
              Simplify your shopping experience with intuitive account controls.
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <p className="flex-1">
              Your information is protected with industry-leading security
              measures.
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <p className="flex-1">
              Our support team is here for you 24/7, ready to assist with any
              queries or concerns.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Back Button */}
          <div className="lg:hidden">
            <button
              onClick={() => window.history.back()}
              className=" cursor-pointer flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="cursor-pointer w-5 h-5 mr-2" />
              Back
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
              Create Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    {...register("firstName")}
                    placeholder="First Name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-purple-500"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Last Name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-purple-500"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className=" cursor-pointer w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 hover:shadow-lg"
              >
                {isSubmitting ? (
                  <div className="cursor-pointer animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
                ) : (
                  <>
                    <UserPlus className="cursor-pointer w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>By creating an account, you agree to our</p>
            <div className="space-x-2">
              <a
                href="/terms"
                className="text-purple-600 hover:text-purple-700 hover:underline"
              >
                Terms of Service
              </a>
              <span>&</span>
              <a
                href="/privacy"
                className="text-purple-600 hover:text-purple-700 hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
