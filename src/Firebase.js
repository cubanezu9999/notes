import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDqBECDnhqS_CfQtlMcVzS_YVK-9fbqKM",
  authDomain: "assessment-17b36.firebaseapp.com",
  projectId: "assessment-17b36",
  storageBucket: "assessment-17b36.appspot.com",
  messagingSenderId: "697314819006",
  appId: "1:697314819006:web:694cc53ba0c21eb3d917ef",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const auth = getAuth(app);
export default firestore;
