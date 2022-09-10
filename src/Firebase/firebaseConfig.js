import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCC71kCEjmdwl4WvZcchkPs2Lvhlo2qYMc",
    authDomain: "qraccessvalidator.firebaseapp.com",
    projectId: "qraccessvalidator",
    storageBucket: "qraccessvalidator.appspot.com",
    messagingSenderId: "428609806118",
    appId: "1:428609806118:web:fdb3eb47e952a6cec3ebe7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;