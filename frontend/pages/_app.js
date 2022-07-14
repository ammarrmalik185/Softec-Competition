import '../styles/globals.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMjDfrebeLRnsIzRKkbpvKzeahjeZ3p-g",
  authDomain: "softec-triple-a.firebaseapp.com",
  databaseURL: "https://softec-triple-a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "softec-triple-a",
  storageBucket: "softec-triple-a.appspot.com",
  messagingSenderId: "49701831981",
  appId: "1:49701831981:web:67d22444bad92a15db7fa4"
};

// Initialize Firebase
initializeApp(firebaseConfig);
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
