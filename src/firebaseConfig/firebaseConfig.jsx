// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCISDiIAy435aDpU5e4uZ1bwSn6bSL3UdU",
  authDomain: "mychat-393cb.firebaseapp.com",
  projectId: "mychat-393cb",
  storageBucket: "mychat-393cb.appspot.com",
  messagingSenderId: "1024810938855",
  appId: "1:1024810938855:web:96b3e9b263f216a0bd8d42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig