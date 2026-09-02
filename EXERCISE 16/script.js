// Elements
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const sortProducts = document.querySelector("#sortProducts");
const favoriteFilter = document.querySelector("#favoriteFilter");
const productList = document.querySelector("#productList");
const loading = document.querySelector("#loading");
const emptyMessage = document.querySelector("#emptyMessage");
const errorMessage = document.querySelector("#errorMessage");
const errorText = document.querySelector("#errorText");
const retryButton = document.querySelector("#retryButton");
const totalProducts = document.querySelector("#totalProducts");
const showingProducts = document.querySelector("#showingProducts");
const favoriteCount = document.querySelector("#favoriteCount");
const message = document.querySelector("#message");
const messageText = document.querySelector("#messageText");
const closeMessage = document.querySelector("#closeMessage");

// Data
let products = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let messageTimeout;

// Fetch products
async function loadProducts() {
    showLoading();

    try {
        const response = await fetch(
            "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
            throw new Error(
                `Request failed with status ${response.status}`
            );
        }

        const data = await response.json();

        products = data.products;

        createCategories();

        renderProducts();

    } catch (error) {

        showError(error.message);

    } finally {

        loading.style.display = "none";

    }
}

// Loading
function showLoading() {
    loading.style.display = "flex";
    productList.style.display = "none";
    emptyMessage.style.display = "none";
    errorMessage.style.display = "none";
}

// Error
function showError(error) {
    productList.style.display = "none";
    emptyMessage.style.display = "none";
    errorMessage.style.display = "block";

    errorText.textContent = error;
}

// Message
function showMessage(text) {
    clearTimeout(messageTimeout);

    messageText.textContent = text;

    message.className = "message success";

    messageTimeout = setTimeout(() => {
        hideMessage();
    }, 3000);
}

function hideMessage() {
    message.className = "message";
}

// Categories
function createCategories() {
    const categories = [
        ...new Set(
            products.map(product => product.category)
        )
    ];

    categories.sort();

    categoryFilter.innerHTML =
        '<option value="All">All Categories</option>';

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;

        option.textContent = formatCategory(category);

        categoryFilter.appendChild(option);
    });
}

function formatCategory(category) {
    return category
        .split("-")
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ");
}

// Favorites
function saveFavorites() {
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {

        favorites = favorites.filter(
            favoriteId => favoriteId !== id
        );

        showMessage("Removed from favorites.");

    } else {

        favorites.push(id);

        showMessage("Added to favorites.");

    }

    saveFavorites();

    renderProducts();
}

// Filter
function getFilteredProducts() {
    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    const selectedCategory = categoryFilter.value;

    let filteredProducts = products.filter(product => {

        const matchesSearch =
            product.title
                .toLowerCase()
                .includes(searchValue) ||
            product.description
                .toLowerCase()
                .includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesFavorite =
            favoriteFilter.value === "All" ||
            favorites.includes(product.id);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesFavorite
        );
    });

    filteredProducts = [...filteredProducts];

    if (sortProducts.value === "nameAsc") {

        filteredProducts.sort(
            (a, b) =>
                a.title.localeCompare(b.title)
        );

    }

    if (sortProducts.value === "nameDesc") {

        filteredProducts.sort(
            (a, b) =>
                b.title.localeCompare(a.title)
        );

    }

    if (sortProducts.value === "priceLow") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }

    if (sortProducts.value === "priceHigh") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }

    if (sortProducts.value === "ratingHigh") {

        filteredProducts.sort(
            (a, b) => b.rating - a.rating
        );

    }

    return filteredProducts;
}

// Summary
function updateSummary(filteredProducts) {
    totalProducts.textContent = products.length;

    showingProducts.textContent =
        filteredProducts.length;

    favoriteCount.textContent =
        favorites.length;
}

// Render
function renderProducts() {
    productList.innerHTML = "";

    errorMessage.style.display = "none";

    const filteredProducts =
        getFilteredProducts();

    updateSummary(filteredProducts);

    if (filteredProducts.length === 0) {
        productList.style.display = "none";
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    productList.style.display = "grid";

    filteredProducts.forEach(product => {

        const productCard =
            document.createElement("article");

        productCard.className = "product-card";

        const imageContainer =
            document.createElement("div");

        imageContainer.className =
            "product-image-container";

        const image =
            document.createElement("img");

        image.className = "product-image";

        image.src = product.thumbnail;

        image.alt = product.title;

        const favoriteButton =
            document.createElement("button");

        favoriteButton.className =
            "favorite-button";

        favoriteButton.dataset.id = product.id;

        favoriteButton.dataset.action = "favorite";

        favoriteButton.textContent = "♡";

        if (favorites.includes(product.id)) {
            favoriteButton.classList.add("active");
            favoriteButton.textContent = "♥";
        }

        imageContainer.appendChild(image);
        imageContainer.appendChild(favoriteButton);

        const content =
            document.createElement("div");

        content.className = "product-content";

        const category =
            document.createElement("span");

        category.className = "product-category";

        category.textContent =
            formatCategory(product.category);

        const title =
            document.createElement("h2");

        title.className = "product-title";

        title.textContent = product.title;

        const description =
            document.createElement("p");

        description.className =
            "product-description";

        description.textContent =
            product.description;

        const productBottom =
            document.createElement("div");

        productBottom.className =
            "product-bottom";

        const price =
            document.createElement("span");

        price.className = "product-price";

        price.textContent =
            `$${product.price.toFixed(2)}`;

        const rating =
            document.createElement("span");

        rating.className = "product-rating";

        rating.textContent =
            `★ ${product.rating.toFixed(1)}`;

        productBottom.appendChild(price);
        productBottom.appendChild(rating);

        content.appendChild(category);
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(productBottom);

        productCard.appendChild(imageContainer);
        productCard.appendChild(content);

        productList.appendChild(productCard);
    });
}

// Product events
productList.addEventListener("click", event => {

    const button = event.target.closest(
        "[data-action='favorite']"
    );

    if (!button) {
        return;
    }

    const productId =
        Number(button.dataset.id);

    toggleFavorite(productId);
});

// Events
searchInput.addEventListener(
    "input",
    renderProducts
);

categoryFilter.addEventListener(
    "change",
    renderProducts
);

sortProducts.addEventListener(
    "change",
    renderProducts
);

favoriteFilter.addEventListener(
    "change",
    renderProducts
);

retryButton.addEventListener(
    "click",
    loadProducts
);

closeMessage.addEventListener(
    "click",
    hideMessage
);

// Start
loadProducts();