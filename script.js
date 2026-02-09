import { doc } from "./firebase.js";

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


const sortInput = document.querySelector(".sortproduct");

function applyFilters() {
    let filteredData = [...allProducts];

  
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredData = filteredData.filter(product => 
            product.title.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    const categoryValue = select.value;
    if (categoryValue !== "") {
        filteredData = filteredData.filter(p => p.category === categoryValue);
    }

    const sortValue = sortInput.value;
    if (sortValue === "highTolow") {
        filteredData.sort((a, b) => b.price - a.price);
    } else if (sortValue === "lowTohigh") {
        filteredData.sort((a, b) => a.price - b.price);
    }

    displayProducts(filteredData);
}
sortInput.addEventListener("change", applyFilters);
select.addEventListener('change', applyFilters);
searchButton.addEventListener('click', applyFilters);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') applyFilters();
});

fetchProducts();
