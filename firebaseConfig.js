// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWDCcGr0ORt4QiVjpwnoWghBuqyru9A1A",
  authDomain: "juntemonos-df03f.firebaseapp.com",
  databaseURL: "https://juntemonos-df03f-default-rtdb.firebaseio.com",
  projectId: "juntemonos-df03f",
  storageBucket: "juntemonos-df03f.appspot.com",
  messagingSenderId: "884600211688",
  appId: "1:884600211688:web:5d011d28fc4baeee6ba15d",
  measurementId: "G-4BY4FY2XPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);