import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
//Credenciales de prueba

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBkN3AteSVVcdtbTPdGaVwu23Oq-49k7U",
  authDomain: "loginprueba-fc62f.firebaseapp.com",
  databaseURL: "https://loginprueba-fc62f-default-rtdb.firebaseio.com",
  projectId: "loginprueba-fc62f",
  storageBucket: "loginprueba-fc62f.appspot.com",
  messagingSenderId: "620762279554",
  appId: "1:620762279554:web:9524442fe5b3cc74b48e9b"
};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

export { firebase, db, auth };
//const analytics = getAnalytics(app);


//Credenciales buenas

// const firebaseConfig = {
//   apiKey: "AIzaSyAWDCcGr0ORt4QiVjpwnoWghBuqyru9A1A",
//   authDomain: "juntemonos-df03f.firebaseapp.com",
//   databaseURL: "https://juntemonos-df03f-default-rtdb.firebaseio.com",
//   projectId: "juntemonos-df03f",
//   storageBucket: "juntemonos-df03f.appspot.com",
//   messagingSenderId: "884600211688",
//   appId: "1:884600211688:web:5d011d28fc4baeee6ba15d",
//   measurementId: "G-4BY4FY2XPX"
// };