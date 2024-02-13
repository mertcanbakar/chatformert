
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbWxOVp232Q9DVwHqLPA0VxHM76ACLcao",
  authDomain: "chatapp2-488ae.firebaseapp.com",
  projectId: "chatapp2-488ae",
  storageBucket: "chatapp2-488ae.appspot.com",
  messagingSenderId: "950536047885",
  appId: "1:950536047885:web:459198c8d8593eeea33444"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()