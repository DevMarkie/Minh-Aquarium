// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI-c_HDkJIxgTN5xTg_EA0kbTAWMzOLUw",
  authDomain: "minh-aquarium.firebaseapp.com",
  projectId: "minh-aquarium",
  storageBucket: "minh-aquarium.firebasestorage.app",
  messagingSenderId: "340492499732",
  appId: "1:340492499732:web:d6d30168d8d27e1618a001",
  measurementId: "G-ZWFZJCQJ3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Analytics chỉ bật trên production HTTPS để tránh lỗi network khi dev/test local.
let analytics = null;
const canUseAnalytics =
  typeof window !== "undefined" &&
  window.location.protocol === "https:" &&
  !["localhost", "127.0.0.1"].includes(window.location.hostname);

if (canUseAnalytics) {
  isSupported()
    .then((supported) => {
      if (supported) analytics = getAnalytics(app);
    })
    .catch(() => {});
}

export { app, analytics, db, auth };
