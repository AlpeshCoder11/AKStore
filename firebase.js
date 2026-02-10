
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { getFirestore, collection, addDoc, query, where,setDoc, onSnapshot, deleteDoc, doc,getDocs, getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBdVID_K0sTLMqsRGDA_bU4nWyTUDPaY04",
    authDomain: "akstore-36abd.firebaseapp.com",
    projectId: "akstore-36abd",
    storageBucket: "akstore-36abd.firebasestorage.app",
    messagingSenderId: "146356230253",
    appId: "1:146356230253:web:d80a073a686056444b4764"
  };





  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();



async function loginGoogle() {
    console.log("Button Clicked. Attempting Popup...");
    try {
        const result = await signInWithPopup(auth, provider);

    
        window.location.href = "index.html";

    } catch (error) {
       
        console.error("Login Error:", error);
        alert("Error: " + error.message);
    }
}


async function logoutUser() {
    try {
        await signOut(auth);
        window.location.href = "login.html"; 
    } catch (error) {
        console.error("Logout Failed", error);
    }
}


window.loginGoogle = loginGoogle;
window.logoutUser = logoutUser;


export { auth, db, onAuthStateChanged, collection, addDoc, query, where, setDoc,onSnapshot ,getDocs , getDoc , doc, updateDoc, deleteDoc};