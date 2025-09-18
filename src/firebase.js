// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyCZkMaMeg8sHxTUwi0uYmr3jAwYxNXnvAs",
    authDomain: "dsa-tracker-680b8.firebaseapp.com",
    projectId: "dsa-tracker-680b8",
    storageBucket: "dsa-tracker-680b8.firebasestorage.app",
    messagingSenderId: "197721272362",
    appId: "1:197721272362:web:42753dcb0d4f60eb04d353",
    measurementId: "G-LW1BB2QGF0"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
