import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "planar-summit-1sx2c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "planar-summit-1sx2c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "planar-summit-1sx2c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "963159904796",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:963159904796:web:320125974522f28df8c5d9",
};

const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || "ai-studio-miraclewikitools-9828ad46-ba44-40d1-84f3-3a57a43ffdc3";

if (!firebaseConfig.apiKey) {
  console.warn('[OpenMiracle] VITE_FIREBASE_API_KEY não foi configurada no arquivo .env.');
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db: Firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, databaseId);
