
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyDdlor2WNlE16h7Ad1_72qAOhkCL5TCCJY",
  authDomain: "beverageshop-9691c.firebaseapp.com",
  projectId: "beverageshop-9691c",
  storageBucket: "beverageshop-9691c.firebasestorage.app",
  messagingSenderId: "846683734647",
  appId: "1:846683734647:web:5c5aadd0bcd2f34828bc72"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);