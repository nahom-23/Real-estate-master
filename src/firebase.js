// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2xmjuuysGTgWVni6-zb0T0Kms53DFGMU",
  authDomain: "noah-real-estate.firebaseapp.com",
  projectId: "noah-real-estate",
  storageBucket: "noah-real-estate.appspot.com",
  messagingSenderId: "956048560226",
  appId: "1:956048560226:web:4ffeef58aa5f2b1708c13b",
  measurementId: "G-9D39F3HWS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export default db;
