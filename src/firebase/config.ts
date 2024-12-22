import { initializeApp } from "firebase/app";
import { getFirestore, query, where, doc, updateDoc } from "firebase/firestore";
import {
  getReactNativePersistence
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getStorage } from "firebase/storage";

import {
  initializeAuth,
} from "firebase/auth";
import 'firebase/compat/auth';
import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4R9IZzxNFrWYjtBKY41iDTm9en57KElA",
  authDomain: "book-store-16651.firebaseapp.com",
  projectId: "book-store-16651",
  storageBucket: "book-store-16651.firebasestorage.app",
  messagingSenderId: "806469254277",
  appId: "1:806469254277:web:e6cddc9e31b6e41f607dec",
  measurementId: "G-395W7SYN06"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);
const firestore = getFirestore(app);

export {
  app, db, auth, collection, firestore, getDocs, query, updateDoc, where, doc, addDoc, storage
};