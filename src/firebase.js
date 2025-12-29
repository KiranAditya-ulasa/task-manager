import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxdUQUBZRSAKhZRBmxOljJSHvQ7RYZoa4",
  authDomain: "task-manager-c5e3c.firebaseapp.com",
  projectId: "task-manager-c5e3c",
  storageBucket: "task-manager-c5e3c.firebasestorage.app",
  messagingSenderId: "534601798368",
  appId: "1:534601798368:web:81201f15c151dfb7357685"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);