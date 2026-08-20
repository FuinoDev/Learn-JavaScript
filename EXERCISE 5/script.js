// Store all products
let cart = [];


// Get elements from HTML
const productNameInput = document.querySelector("#productNameInput");
const priceInput = document.querySelector("#priceInput");
const quantityInput = document.querySelector("#quantityInput");

const addToCartButton = document.querySelector("#addtocartButton");

const shoppingList = document.querySelector("#shoppingList");

const totalItems = document.querySelector("#total-items");
const subTotal = document.querySelector("#sub-total");


// Get error elements
const errorElement = document.querySelector("#error-message");
const errorText = document.querySelector("#error-text");
const exitButton = document.querySelector("#exit-message");


// Hide error message initially
errorElement.style.display = "none";


// Show error message
function showError(message) {
    errorText.textContent = message;
    errorElement.style.display = "block";
}


// Hide error message
exitButton.addEventListener("click", function () {
    errorElement.style.display = "none";
});


// Add product
addToCartButton.addEventListener("click", function () {

    // Get input values
    const productName = productNameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);


    // Remove previous error classes
    productNameInput.classList.remove("input-error");
    priceInput.classList.remove("input-error");
    quantityInput.classList.remove("input-error");


    // Validate product name
    if (productName === "") {
        productNameInput.classList.add("input-error");
        showError("Please, enter a product name.");
        return;
    }


    // Validate price
    if (price <= 0 || priceInput.value === "") {
        priceInput.classList.add("input-error");
        showError("Please, enter a valid price.");
        return;
    }


    // Validate quantity
    if (quantity <= 0 || quantityInput.value === "") {
        quantityInput.classList.add("input-error");
        showError("Please, enter a valid quantity.");
        return;
    }


    // Create product object
    const product = {
        name: productName,
        price: price,
        quantity: quantity
    };


    // Add product to cart
    cart.push(product);


    // Display cart
    renderCart();


    // Clear inputs
    productNameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
});


// Display cart
function renderCart() {

    // Clear current shopping list
    shoppingList.innerHTML = "";


    // Display each product
    cart.forEach(function (product, index) {

        const listItem = document.createElement("li");

        const productTotal = product.price * product.quantity;

        listItem.innerHTML = `
            <strong>${product.name}</strong><br>
            Price: ₱${product.price.toFixed(2)}<br>
            Quantity: ${product.quantity}<br>
            Total: ₱${productTotal.toFixed(2)}
            <br><br>
            <button onclick="removeProduct(${index})">Remove</button>
        `;

        shoppingList.appendChild(listItem);
    });


    // Calculate total number of items
    const itemCount = cart.reduce(function (total, product) {
        return total + product.quantity;
    }, 0);


    // Calculate subtotal
    const subtotal = cart.reduce(function (total, product) {
        return total + (product.price * product.quantity);
    }, 0);


    // Update HTML
    totalItems.textContent = itemCount;
    subTotal.textContent = subtotal.toFixed(2);
}


// Remove product
function removeProduct(index) {

    cart.splice(index, 1);

    renderCart();
}