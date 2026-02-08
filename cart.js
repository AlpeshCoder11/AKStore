
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

            cartItems.push(productToAdd);
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
                <p class="cart-item-price">$${product.price}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
        `;
        cartContainer.appendChild(item);
    });


    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const footer = document.createElement('div');
    footer.classList.add('cart-footer');
    footer.innerHTML = `
        <div class="total">Total: $${total.toFixed(2)}</div>
        <button class="checkout-btn">Proceed to Checkout</button>
    `;
    cartContainer.appendChild(footer);
}