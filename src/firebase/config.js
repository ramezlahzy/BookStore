import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAs3fvkOnUorMYVLkQo9JNL8alqTaiI3ZU",
  authDomain: "book-store-19f57.firebaseapp.com",
  projectId: "book-store-19f57",
  storageBucket: "book-store-19f57.firebasestorage.app",
  messagingSenderId: "267775855380",
  appId: "1:267775855380:web:5b5bdc96d3d3269dca5001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };