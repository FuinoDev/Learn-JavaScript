// ===============================
// Store all products
// ===============================

let products = [];


// ===============================
// Get HTML Elements
// ===============================

const productNameInput = document.querySelector("#productNameInput");
const priceInput = document.querySelector("#priceInput");
const quantityInput = document.querySelector("#quantityInput");
const categoryInput = document.querySelector("#categoryInput");

const addProductButton = document.querySelector("#addProductButton");

const searchInput = document.querySelector("#searchInput");
const filterCategory = document.querySelector("#filterCategory");

const productList = document.querySelector("#productList");

const productCount = document.querySelector("#productCount");
const totalQuantity = document.querySelector("#totalQuantity");
const inventoryValue = document.querySelector("#inventoryValue");


// ===============================
// Error Elements
// ===============================

const errorElement = document.querySelector("#error-message");
const errorText = document.querySelector("#error-text");
const exitButton = document.querySelector("#exit-message");


// Hide error initially

errorElement.style.display = "none";


// ===============================
// Show Error
// ===============================

function showError(message) {

    errorText.textContent = message;
    errorElement.style.display = "block";

    setTimeout(function () {
        errorElement.style.display = "none";
    }, 1500);

}


// ===============================
// Hide Error
// ===============================

exitButton.addEventListener("click", function () {

    errorElement.style.display = "none";

});


// ===============================
// Add Product
// ===============================

function addProduct() {

    // Get input values

    const name = productNameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    const category = categoryInput.value;


    // Remove previous error classes

    productNameInput.classList.remove("input-error");
    priceInput.classList.remove("input-error");
    quantityInput.classList.remove("input-error");
    categoryInput.classList.remove("input-error");


    // ===============================
    // Validation
    // ===============================

    if (name === "") {
        productNameInput.classList.add("input-error");
    }

    if (price <= 0 || isNaN(price)) {
        priceInput.classList.add("input-error");
    }

    if (quantity <= 0 || isNaN(quantity)) {
        quantityInput.classList.add("input-error");
    }

    if (category === "") {
        categoryInput.classList.add("input-error");
    }


    // Stop if there is an error

    if (
        name === "" ||
        price <= 0 ||
        isNaN(price) ||
        quantity <= 0 ||
        isNaN(quantity) ||
        category === ""
    ) {

        showError("Please complete all fields.");
        return;

    }


    // ===============================
    // Create Product Object
    // ===============================

    const product = {

        id: Date.now(),

        name: name,

        price: price,

        quantity: quantity,

        category: category

    };


    // Add product to array

    products.push(product);


    // ===============================
    // Clear Inputs
    // ===============================

    productNameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
    categoryInput.value = "";


    // ===============================
    // Update Application
    // ===============================

    displayProducts();
    updateProductCount();
    updateTotalQuantity();
    updateInventoryValue();

}


// ===============================
// Display Products
// ===============================

function displayProducts() {

    // Clear current list

    productList.innerHTML = "";


    // Get search value

    const searchText = searchInput.value
        .trim()
        .toLowerCase();


    // Get selected category

    const selectedCategory = filterCategory.value;


    // Start with all products

    let filteredProducts = products;


    // ===============================
    // Search Filter
    // ===============================

    if (searchText !== "") {

        filteredProducts = filteredProducts.filter(function (product) {

            return product.name
                .toLowerCase()
                .includes(searchText);

        });

    }


    // ===============================
    // Category Filter
    // ===============================

    if (selectedCategory !== "All") {

        filteredProducts = filteredProducts.filter(function (product) {

            return product.category === selectedCategory;

        });

    }


    // ===============================
    // Display Each Product
    // ===============================

    filteredProducts.forEach(function (product) {

        const listItem = document.createElement("li");


        listItem.innerHTML = `

            <div class="product-info">

                <span class="product-name">
                    ${product.name}
                </span>

                <span class="product-category">
                    Category: ${product.category}
                </span>

                <span class="product-price">
                    ₱${product.price.toFixed(2)}
                </span>

                <span class="product-quantity">
                    Quantity: ${product.quantity}
                </span>

            </div>

            <button
                class="delete-button"
                data-id="${product.id}">
                Delete
            </button>

        `;


        // Add product to list

        productList.appendChild(listItem);

    });

}


// ===============================
// Delete Product
// ===============================

function deleteProduct(id) {

    products = products.filter(function (product) {

        return product.id !== id;

    });


    // Update application

    displayProducts();
    updateProductCount();
    updateTotalQuantity();
    updateInventoryValue();

}


// ===============================
// Update Product Count
// ===============================

function updateProductCount() {

    productCount.textContent = products.length;

}


// ===============================
// Update Total Quantity
// ===============================

function updateTotalQuantity() {

    const total = products.reduce(function (sum, product) {

        return sum + product.quantity;

    }, 0);


    totalQuantity.textContent = total;

}


// ===============================
// Update Inventory Value
// ===============================

function updateInventoryValue() {

    const total = products.reduce(function (sum, product) {

        return sum + (product.price * product.quantity);

    }, 0);


    inventoryValue.textContent = total.toFixed(2);

}


// ===============================
// Add Product Button
// ===============================

addProductButton.addEventListener("click", function () {

    addProduct();

});


// ===============================
// Search
// ===============================

searchInput.addEventListener("input", function () {

    displayProducts();

});


// ===============================
// Category Filter
// ===============================

filterCategory.addEventListener("change", function () {

    displayProducts();

});


// ===============================
// Delete Button Event
// ===============================

productList.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-button")) {

        const id = Number(event.target.dataset.id);

        deleteProduct(id);

    }
    
document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addProduct();
    }

});
});
