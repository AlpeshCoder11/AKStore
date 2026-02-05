
let cartItems = [];

const productContainer = document.querySelector(".main");

productContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const card = event.target.closest(".product-card");
        const productName = card.querySelector(".name").innerText;

       
        const productToAdd = allProducts.find(p => p.title === productName);

        if (productToAdd) {
            cartItems.push(productToAdd);
            console.log("Added to cart:", productToAdd.title);
            displayCartProducts(); 
        }
    }
});

const cartBtn = document.querySelector(".cart");
const cartActive = document.querySelector(".cartbar");

cartBtn.addEventListener("click", () => {
    cartActive.classList.toggle("active");
});


function removeFromCart(index) {
    cartItems.splice(index, 1);
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