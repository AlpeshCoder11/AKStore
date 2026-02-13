
import { saveCartToFirebase, cartItems, setUpdateDelegate } from "./cart_db.js";
import { allProducts } from "./script.js";
import { auth } from "./firebase.js";
setUpdateDelegate(displayCartProducts);

const productContainer = document.querySelector(".main");

productContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const card = event.target.closest(".product-card");
        const productName = card.querySelector(".name").innerText;

       
        const productToAdd = allProducts.find(p => p.title === productName);

        if (productToAdd) {

            if (!auth.currentUser) {
                alert("Login first to add cart");
                return;
            }
        const existingItem = cartItems.find(item => item.id === productToAdd.id);

    if (existingItem) {
       
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        
        cartItems.push({ ...productToAdd, quantity: 1 });
    }
            saveCartToFirebase(cartItems);
            displayCartProducts();
        }
    }
});

const cartBtn = document.querySelector(".cart");
const cartActive = document.querySelector(".cartbar");

cartBtn.addEventListener("click", () => {
    cartActive.classList.toggle("active");
});


window.removeFromCart = function(index) {
    cartItems.splice(index, 1); 
    saveCartToFirebase(cartItems); 
    displayCartProducts(); 
}
window.increaseQuantity = function(index) {
    
    cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
    
   
    saveCartToFirebase(cartItems);
    
    displayCartProducts();
};
window.decreaseQuantity = function(index) {
    
    cartItems[index].quantity = (cartItems[index].quantity || 1) - 1;
    
   
    saveCartToFirebase(cartItems);
    
    displayCartProducts();
};
window.orderSubmit = function(event) {
    
    if (event) event.preventDefault();
    
   
   
    const checkoutPopup = document.querySelector(".popup");
    const successPopup = document.querySelector(".order-popup");
    const doneBtn=document.querySelector(".btn-done");
    if (checkoutPopup && successPopup) {
        checkoutPopup.style.display = "none";
        successPopup.style.display = "flex";
        
        
        const icon = successPopup.querySelector(".icon-check");
        if (icon) icon.style.display = "flex";
    }
 
}


function displayCartProducts() {
    const cartContainer = document.querySelector('.cartbar');
 
    
  
    cartContainer.innerHTML = `
        <div class="cart-header">
            <h3>Your Cart (${cartItems.length})</h3>
        </div>
    `; 
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML += '<p class="empty-msg">Your cart is currently empty.</p>';
        return;
    }

    cartItems.forEach((product, index) => {
           console.log("i am ac");
        const item = document.createElement('div');
        item.classList.add('cart-item'); 
        item.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="cart-item-details">
                <p class="cart-item-name">${product.title}</p>
              
                
            <p class="cart-item-price">$${product.price} 
            <button class="quantityIN" onclick="decreaseQuantity(${index})">-</button>
            ${product.quantity || 1}
            <button class="quantityIN" onclick="increaseQuantity(${index})">+</button></p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
        `;
        cartContainer.appendChild(item);
    });



const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);    
    const footer = document.createElement('div');
    footer.classList.add('cart-footer');
    footer.innerHTML = `
        <div class="total">Total: $${total.toFixed(2)}</div>
        <button class="checkout-btn">Proceed to Checkout</button>
    `;
    cartContainer.appendChild(footer);
    
    const hide = document.querySelector(".hide");
    
    const checkModel = document.querySelector(".checkout-form");
    
    const checkoutBtn = footer.querySelector(".checkout-btn");



window.onkeydown = (event) => {
    if (event.key === "Escape") {
        hide.classList.add("hide");
    }
};
    
    checkoutBtn.addEventListener("click", () => {
        
   checkModel.innerHTML=`
    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" required placeholder="John Doe">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" required placeholder="john@example.com">
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" required placeholder="123 Main St">
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" required placeholder="New York">
                    </div>
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" required placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="cart-summary">
                        <div class="summary-row total">
                            <span>Total Amount:</span>
                            <span>$${total.toFixed(2)}</span>
                        </div>
                   
         
    </div>
              <button type="button" class="popsubtn" onclick="orderSubmit(event)">Complete Purchase</button>
   `




        if (hide) {
            hide.classList.remove("hide"); 
            hide.classList.add("overlay1")
            cartActive.classList.remove("active");
            console.log("Checkout modal opened");
        }



    });
    const successPopup = document.querySelector(".order-popup");
    const doneBtn=document.querySelector(".btn-done");

    const closeBtn = document.querySelector(".closebtn");
closeBtn.addEventListener("click",()=>{
    hide.classList.remove("overlay1")
   hide.classList.add("hide"); 
   
});

doneBtn.addEventListener("click", () => {
    successPopup.style.display = "none";
    
    
    const checkoutPopup = document.querySelector(".popup");
    if (checkoutPopup) {
        checkoutPopup.style.display = "block"; 
    }

    hide.classList.remove("overlay1");
    hide.classList.add("hide"); 
});
}

