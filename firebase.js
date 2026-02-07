
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc,getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBdVID_K0sTLMqsRGDA_bU4nWyTUDPaY04",
    authDomain: "akstore-36abd.firebaseapp.com",
    projectId: "akstore-36abd",
    storageBucket: "akstore-36abd.firebasestorage.app",
    messagingSenderId: "146356230253",
    appId: "1:146356230253:web:d80a073a686056444b4764"
  };


// ... Keep the rest of your code the same (const firebaseConfig = ...)
  // Your web app's Firebase configuration
;

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

// 3. Login Function (We call this when user clicks "Login")

async function loginGoogle() {
    console.log("Button Clicked. Attempting Popup...");
    try {
        const result = await signInWithPopup(auth, provider);

        // If we get here, IT WORKED!
        console.log("SUCCESS! User:", result.user.displayName);
        alert("Login Success! Welcome " + result.user.displayName);
        window.location.href = "index.html";

    } catch (error) {
        // If we get here, it actually failed.
        console.error("Login Error:", error);
        alert("Error: " + error.message);
    }
}

  const logoutBtn = document.querySelector(".logout");

  // ONLY attach if button exists
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          console.log("Logout Clicked");
          logoutUser();
      });
  }

// 4. Logout Function
async function logoutUser() {
    try {
        await signOut(auth);
        window.location.href = "login.html"; // Send them back to login
    } catch (error) {
        console.error("Logout Failed", error);
    }
}

// 5. Make these functions available to your HTML buttons
window.loginGoogle = loginGoogle;
window.logoutUser = logoutUser;

// 6. Export tools for other files
export { auth, db, onAuthStateChanged, collection, addDoc, query, where, onSnapshot ,getDocs , doc, updateDoc, deleteDoc};