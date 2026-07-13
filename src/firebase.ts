import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbqqyrMmvCJnlQir1T8uMaO8HHfdVLC5o",
  authDomain: "glintfi.firebaseapp.com",
  projectId: "glintfi",
  storageBucket: "glintfi.firebasestorage.app",
  messagingSenderId: "255911590999",
  appId: "1:255911590999:web:3dc65ef70ecc3bd60ab712"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
