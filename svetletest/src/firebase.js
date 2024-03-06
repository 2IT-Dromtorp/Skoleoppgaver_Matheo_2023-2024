// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH_HpwxbyELkYcrbkjYeAdOdM3kagIlMA",
  authDomain: "sveltetest-2d8a5.firebaseapp.com",
  projectId: "sveltetest-2d8a5",
  storageBucket: "sveltetest-2d8a5.appspot.com",
  messagingSenderId: "417678743399",
  appId: "1:417678743399:web:2b9fb51e78017ba6af41c2",
  measurementId: "G-Q8XLZDQF5H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);