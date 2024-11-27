
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth } from "firebase/auth";
// import { getReactNativePersistence } from "firebase/auth/react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp8xWjEipRVBbCXhLJAN89T4sm7LY-J5I",
  authDomain: "hydratechoficial.firebaseapp.com",
  projectId: "hydratechoficial",
  storageBucket: "hydratechoficial.firebasestorage.app",
  messagingSenderId: "180184152268",
  appId: "1:180184152268:web:efd66c36545bc45aafaa69",
  measurementId: "G-ZBTWEFY48N",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const firestore = getFirestore(app);

export { app, analytics, firestore };
export const auth = initializeAuth(app, { persistence:  getReactNativePersistence(AsyncStorage)})
