// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCeNFCNo5TQdy2sfbZntWrV4UaK3V9eV9Q",
  authDomain: "geomory-8e7e9.firebaseapp.com",
  projectId: "geomory-8e7e9",
  storageBucket: "geomory-8e7e9.firebasestorage.app",
  messagingSenderId: "862776604182",
  appId: "1:862776604182:web:3b921afcce485c33236737"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Use getAuth, DO NOT use initializeAuth in Expo Go
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth }; // Export auth for use in other parts of the app
export const db = getFirestore(app);
export const storage = getStorage(app);
