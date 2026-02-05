let allProducts = []; 

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        allProducts = await response.json(); 
        displayProducts(allProducts); 
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

function displayProducts(products) {
    const productContainer = document.querySelector('.main');
    productContainer.innerHTML = ''; 

    products.forEach(product => {
        
        
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <div class="proimg"><img src="${product.image}" alt=""></div>
            <div class="des">
                <p class="name">${product.title}</p>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

function doSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filtered = allProducts.filter(product => {
        
        return product.title.toLowerCase().includes(searchTerm) || 
               product.category.toLowerCase().includes(searchTerm);
    });

    displayProducts(filtered);
}


searchButton.addEventListener('click', doSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') doSearch();
});
fetchProducts();
