const productForm = document.querySelector("#productForm");

const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productStock = document.querySelector("#productStock");
const productCategory = document.querySelector("#productCategory");

const productList = document.querySelector("#productList");
const emptyMessage = document.querySelector("#emptyMessage");

const totalProducts = document.querySelector("#totalProducts");
const totalStock = document.querySelector("#totalStock");
const inventoryValue = document.querySelector("#inventoryValue");
const lowStock = document.querySelector("#lowStock");

const searchInput = document.querySelector("#searchInput");
const filterCategory = document.querySelector("#filterCategory");
const sortProduct = document.querySelector("#sortProduct");

const formTitle = document.querySelector("#formTitle");
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");

let products = [
    {
        id: 1,
        name: "Wireless Mouse",
        price: 450,
        stock: 15,
        category: "Electronics"
    },
    {
        id: 2,
        name: "T-Shirt",
        price: 350,
        stock: 8,
        category: "Clothing"
    },
    {
        id: 3,
        name: "Notebook",
        price: 80,
        stock: 25,
        category: "School"
    },
    {
        id: 4,
        name: "Coffee",
        price: 120,
        stock: 4,
        category: "Food"
    }
];

let editingProductId = null;

function setInvalid(input, message) {

    input.classList.remove("valid");
    input.classList.add("invalid");

    removeError(input);

    const error = document.createElement("small");

    error.classList.add("input-error");
    error.textContent = message;

    input.parentElement.appendChild(error);
}

function setValid(input) {

    input.classList.remove("invalid");
    input.classList.add("valid");

    removeError(input);
}

function removeError(input) {

    const oldError =
        input.parentElement.querySelector(".input-error");

    if (oldError) {
        oldError.remove();
    }
}

function validateName() {

    const name = productName.value.trim();

    if (name === "") {

        setInvalid(
            productName,
            "Product name is required."
        );

        return false;
    }

    if (name.length < 2) {

        setInvalid(
            productName,
            "Product name must contain at least 2 characters."
        );

        return false;
    }

    setValid(productName);

    return true;
}

function validatePrice() {

    const price = Number(productPrice.value);

    if (
        productPrice.value === "" ||
        isNaN(price)
    ) {

        setInvalid(
            productPrice,
            "Price is required."
        );

        return false;
    }

    if (price <= 0) {

        setInvalid(
            productPrice,
            "Price must be greater than 0."
        );

        return false;
    }

    setValid(productPrice);

    return true;
}

function validateStock() {

    const stock = Number(productStock.value);

    if (
        productStock.value === "" ||
        isNaN(stock)
    ) {

        setInvalid(
            productStock,
            "Stock quantity is required."
        );

        return false;
    }

    if (stock < 0) {

        setInvalid(
            productStock,
            "Stock cannot be negative."
        );

        return false;
    }

    setValid(productStock);

    return true;
}

function validateCategory() {

    if (productCategory.value === "") {

        setInvalid(
            productCategory,
            "Please select a category."
        );

        return false;
    }

    setValid(productCategory);

    return true;
}

function validateForm() {

    const nameValid = validateName();
    const priceValid = validatePrice();
    const stockValid = validateStock();
    const categoryValid = validateCategory();

    return (
        nameValid &&
        priceValid &&
        stockValid &&
        categoryValid
    );
}

function displayProducts() {

    const searchValue =
        searchInput.value.toLowerCase();

    const selectedCategory =
        filterCategory.value;

    const selectedSort =
        sortProduct.value;

    let filteredProducts = products.filter(function(product) {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (selectedSort === "nameAsc") {

        filteredProducts.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    if (selectedSort === "nameDesc") {

        filteredProducts.sort(function(a, b) {
            return b.name.localeCompare(a.name);
        });
    }

    if (selectedSort === "priceLow") {

        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    if (selectedSort === "priceHigh") {

        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    if (selectedSort === "stockLow") {

        filteredProducts.sort(function(a, b) {
            return a.stock - b.stock;
        });
    }

    if (selectedSort === "stockHigh") {

        filteredProducts.sort(function(a, b) {
            return b.stock - a.stock;
        });
    }

    productList.innerHTML = "";

    if (filteredProducts.length === 0) {

        emptyMessage.style.display = "block";

        return;
    }

    emptyMessage.style.display = "none";

    filteredProducts.forEach(function(product) {

        const card =
            document.createElement("div");

        card.classList.add("product-card");

        let stockClass = "stock-normal";
        let stockText = `${product.stock} in stock`;

        if (product.stock === 0) {

            stockClass = "stock-out";
            stockText = "Out of stock";

        } else if (product.stock <= 5) {

            stockClass = "stock-low";
            stockText = `${product.stock} in stock - Low stock`;
        }

        const totalValue =
            product.price * product.stock;

        card.innerHTML = `
            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-price">
                    Price: ₱${product.price.toFixed(2)}
                </p>

                <p class="${stockClass}">
                    Stock: ${stockText}
                </p>

                <p>
                    Category: ${product.category}
                </p>

                <p>
                    Total Value: ₱${totalValue.toFixed(2)}
                </p>

            </div>

            <div class="product-actions">

                <button
                    class="edit-button"
                    onclick="editProduct(${product.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-button"
                    onclick="deleteProduct(${product.id})"
                >
                    Delete
                </button>

            </div>
        `;

        productList.appendChild(card);
    });
}

function updateStatistics() {

    totalProducts.textContent =
        products.length;

    const stockTotal =
        products.reduce(function(sum, product) {
            return sum + product.stock;
        }, 0);

    totalStock.textContent =
        stockTotal;

    const valueTotal =
        products.reduce(function(sum, product) {
            return sum +
                product.price * product.stock;
        }, 0);

    inventoryValue.textContent =
        `₱${valueTotal.toFixed(2)}`;

    const lowStockProducts =
        products.filter(function(product) {
            return product.stock <= 5;
        });

    lowStock.textContent =
        lowStockProducts.length;
}

productForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const name =
            productName.value.trim();

        const price =
            Number(productPrice.value);

        const stock =
            Number(productStock.value);

        const category =
            productCategory.value;

        if (editingProductId !== null) {

            const productIndex =
                products.findIndex(function(product) {
                    return product.id === editingProductId;
                });

            products[productIndex].name = name;
            products[productIndex].price = price;
            products[productIndex].stock = stock;
            products[productIndex].category = category;

            editingProductId = null;

            formTitle.textContent =
                "Add Product";

            submitButton.textContent =
                "Add Product";

            cancelButton.style.display =
                "none";

        } else {

            const newProduct = {

                id: Date.now(),

                name: name,

                price: price,

                stock: stock,

                category: category
            };

            products.push(newProduct);
        }

        productForm.reset();

        clearValidation();

        displayProducts();

        updateStatistics();
    }
);

function editProduct(id) {

    const product =
        products.find(function(product) {
            return product.id === id;
        });

    if (!product) {
        return;
    }

    productName.value =
        product.name;

    productPrice.value =
        product.price;

    productStock.value =
        product.stock;

    productCategory.value =
        product.category;

    editingProductId =
        id;

    formTitle.textContent =
        "Edit Product";

    submitButton.textContent =
        "Update Product";

    cancelButton.style.display =
        "block";

    clearValidation();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteProduct(id) {

    const product =
        products.find(function(product) {
            return product.id === id;
        });

    if (!product) {
        return;
    }

    const confirmDelete =
        confirm(`Delete ${product.name}?`);

    if (!confirmDelete) {
        return;
    }

    products =
        products.filter(function(product) {
            return product.id !== id;
        });

    if (editingProductId === id) {
        cancelEdit();
    }

    displayProducts();

    updateStatistics();
}

function clearValidation() {

    const inputs = [
        productName,
        productPrice,
        productStock,
        productCategory
    ];

    inputs.forEach(function(input) {

        input.classList.remove(
            "invalid",
            "valid"
        );

        removeError(input);
    });
}

function cancelEdit() {

    editingProductId = null;

    productForm.reset();

    clearValidation();

    formTitle.textContent =
        "Add Product";

    submitButton.textContent =
        "Add Product";

    cancelButton.style.display =
        "none";
}

cancelButton.addEventListener(
    "click",
    function() {
        cancelEdit();
    }
);

productName.addEventListener(
    "blur",
    validateName
);

productPrice.addEventListener(
    "blur",
    validatePrice
);

productStock.addEventListener(
    "blur",
    validateStock
);

productCategory.addEventListener(
    "change",
    validateCategory
);

productName.addEventListener(
    "input",
    function() {

        if (
            productName.classList.contains("invalid")
        ) {
            validateName();
        }
    }
);

productPrice.addEventListener(
    "input",
    function() {

        if (
            productPrice.classList.contains("invalid")
        ) {
            validatePrice();
        }
    }
);

productStock.addEventListener(
    "input",
    function() {

        if (
            productStock.classList.contains("invalid")
        ) {
            validateStock();
        }
    }
);

searchInput.addEventListener(
    "input",
    function() {
        displayProducts();
    }
);

filterCategory.addEventListener(
    "change",
    function() {
        displayProducts();
    }
);

sortProduct.addEventListener(
    "change",
    function() {
        displayProducts();
    }
);

displayProducts();

updateStatistics();