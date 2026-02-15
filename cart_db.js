import { db, auth, doc, setDoc, getDoc, onAuthStateChanged } from "./firebase.js";

let currentUser = null;
let updateUIDelegate = null;
export function setUpdateDelegate(fn) {
    updateUIDelegate = fn;
}
export let cartItems = [];
onAuthStateChanged(auth, async (user) => {
    if (user) {
       const fullName = user.displayName;
        
        
        const firstName = fullName.split(" ")[0];

        
        const userBtn = document.querySelector(".userbtn");
        if (userBtn) {
            userBtn.innerHTML = `${firstName} &#8595;`;
        }
        currentUser = user;


        await loadCartFromFirebase();
    }
    else{
       window.location.href = "login.html";
    }
});


export async function saveCartToFirebase(cartItems) {
    console.log("Trying to save cart. CurrentUser =", currentUser);

    if (!currentUser) {
        alert("Please login first to save cart");
        return;
    }

    await setDoc(doc(db, "carts", currentUser.uid), {
        uid: currentUser.uid,
        items: cartItems
    });

    console.log("Cart saved to firebase!");
}

export async function loadCartFromFirebase() {
    if (!currentUser) return;

    const ref = doc(db, "carts", currentUser.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
     cartItems.splice(0, cartItems.length, ...(snap.data().items || []));
        
        
        if (updateUIDelegate) updateUIDelegate();
    }
}

