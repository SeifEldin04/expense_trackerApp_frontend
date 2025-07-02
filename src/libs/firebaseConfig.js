// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHlJfvVbuuIHp8dhztAiY0GauLw1ZA8fU",
    authDomain: "expense-tracker-dc435.firebaseapp.com",
    projectId: "expense-tracker-dc435",
    storageBucket: "expense-tracker-dc435.firebasestorage.app",
    messagingSenderId: "1030675702116",
    appId: "1:1030675702116:web:172e23807be2942bf41a71",
    measurementId: "G-6L9DYLHY88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };