import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAyPlMICgScEPHCXga8ZsEHQcPF3lvVaoE",
  authDomain: "school-chat-app-53924.firebaseapp.com",
  projectId: "school-chat-app-53924",
  storageBucket: "school-chat-app-53924.appspot.com",
  messagingSenderId: "861008654634",
  appId: "1:861008654634:web:add70a835d780e6aa8ae53"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export default firebaseConfig;