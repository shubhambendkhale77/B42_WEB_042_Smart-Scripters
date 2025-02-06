// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX8ZDXyl0iZWDglUSQvOev597sUhiSKjk",
  authDomain: "login-auth-ee1b5.firebaseapp.com",
  projectId: "login-auth-ee1b5",
  storageBucket: "login-auth-ee1b5.firebasestorage.app",
  messagingSenderId: "140724604788",
  appId: "1:140724604788:web:4ccde4050364de6996a621",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db=getFirestore(app)
export default app;