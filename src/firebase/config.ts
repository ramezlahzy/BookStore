// import { initializeApp } from 'firebase/app';
// import { getAuth, initializeAuth } from 'firebase/auth';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, query, where, doc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  onAuthStateChanged,
  signInAnonymously,
  getReactNativePersistence
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  initializeAuth,
} from "firebase/auth";
import 'firebase/compat/auth';
import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs3fvkOnUorMYVLkQo9JNL8alqTaiI3ZU",
  authDomain: "book-store-19f57.firebaseapp.com",
  projectId: "book-store-19f57",
  storageBucket: "book-store-19f57.firebasestorage.app",
  messagingSenderId: "267775855380",
  appId: "1:267775855380:web:5b5bdc96d3d3269dca5001"
};
const app = initializeApp(firebaseConfig);

// Initialize Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);
const firestore = getFirestore(app);

export {
  app, db, auth, collection, firestore, getDocs, query, updateDoc, where,doc,addDoc
};