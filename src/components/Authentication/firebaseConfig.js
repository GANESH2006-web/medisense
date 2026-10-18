// src/components/Authentication/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "medisense-57a43.firebaseapp.com",
    projectId: "medisense-57a43",
    storageBucket: "medisense-57a43.firebasestorage.app",
    messagingSenderId: "493067881880",
    appId: "1:493067881880:web:5dcdff16aeb523db0d2fed",
    measurementId: "G-8VYPSLV9FD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
export default app;
