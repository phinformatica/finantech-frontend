import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Adicione isso

const firebaseConfig = {
  apiKey: "AIzaSyDOyhGYvfziS40uYlnZ-mYeaJ4W0IHAso8",
  authDomain: "finantech-3fd28.firebaseapp.com",
  projectId: "finantech-3fd28",
  storageBucket: "finantech-3fd28.appspot.com",
  messagingSenderId: "664295808800",
  appId: "1:664295808800:web:425deba858dc8295110145",
  measurementId: "G-M5RW0YPMNS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Exporte o auth
