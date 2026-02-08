export let allProducts = []; 
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        allProducts = await response.json(); 
        displayProducts(allProducts); 
        selectElement(allProducts);
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
const select = document.querySelector('.search-select');
function selectElement(products) {


    select.innerHTML = '<option value="">All Categories</option>';   

    let categories = [];

    products.forEach(product => {
        if (product.category && !categories.includes(product.category)) {
            categories.push(product.category);

            const option = document.createElement('option');   
            option.value = product.category;
            option.textContent = product.category;

            select.appendChild(option);
        }
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
select.addEventListener('change', () => {
    const value = select.value;

    if(value === ""){
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === value);
        displayProducts(filtered);
    }
});
fetchProducts();
