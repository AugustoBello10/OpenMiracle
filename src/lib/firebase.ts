import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "planar-summit-1sx2c",
  appId: "1:963159904796:web:320125974522f28df8c5d9",
  apiKey: "AIzaSyBfm4dS-8WWNcUli-dDcnNZLt0NZ9SDW6w",
  authDomain: "planar-summit-1sx2c.firebaseapp.com",
  storageBucket: "planar-summit-1sx2c.firebasestorage.app",
  messagingSenderId: "963159904796",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, "ai-studio-miraclewikitools-9828ad46-ba44-40d1-84f3-3a57a43ffdc3");
