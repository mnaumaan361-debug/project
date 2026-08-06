import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "onecart-9558c.firebaseapp.com",
  projectId: "onecart-9558c",
  storageBucket: "onecart-9558c.firebasestorage.app",
  messagingSenderId: "78989572010",
  appId: "1:78989572010:web:5a842532fc32f357f81dd3",
  measurementId: "G-GJJJE15N39",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };