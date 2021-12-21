// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAECFLYsjn9yQlp64FrQlkW6c6VoXjyZ0c",
  authDomain: "messenger-app-f781f.firebaseapp.com",
  projectId: "messenger-app-f781f",
  storageBucket: "messenger-app-f781f.appspot.com",
  messagingSenderId: "1061785420044",
  appId: "1:1061785420044:web:d7338640760fbf74238929",
  measurementId: "G-4JV3DEGH58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
