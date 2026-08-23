// Store all expenses
let expenses = [];


// ===============================
// Get HTML Elements
// ===============================

const expenseNameInput = document.querySelector("#expenseNameInput");
const expenseInput = document.querySelector("#expenseInput");
const categoryInput = document.querySelector("#categoryInput");

const addExpenseButton = document.querySelector("#addExpenseButton");

const filterCategory = document.querySelector("#filterCategory");

const expenseList = document.querySelector("#expenseList");

const totalExpenses = document.querySelector("#totalExpenses");
const expenseCount = document.querySelector("#expenseCount");


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

    setTimeout(function () {
        errorElement.style.display = "none";
    }, 1500);

}


// Hide error message
exitButton.addEventListener("click", function () {
    errorElement.style.display = "none";
});

// ===============================
// Add Expense
// ===============================

function addExpense() {

    // Get values from inputs
    const name = expenseNameInput.value.trim();
    const amount = Number(expenseInput.value);
    const category = categoryInput.value;

    
    // Remove previous error classes
    expenseNameInput.classList.remove("input-error");
    expenseInput.classList.remove("input-error");
    categoryInput.classList.remove("input-error");


    // Validate inputs
    if (name === "") {
        expenseNameInput.classList.add("input-error")
        showError("Please, enter a expense name.");
        return;
    }

    if (amount <= 0 || isNaN(amount)) {
        expenseInput.classList.add("input-error")
        showError("Please, enter the amount.");
        return;
    }

    if (category === "") {
        categoryInput.classList.add("input-error")
        showError("Please, select approciate category.");
        return;

    }
    if (name === "" || amount <= 0 || isNaN(amount) || category === ""){
        showError("Please, Complete all fields.");
        return;
    }


    // Create expense object
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };


    // Add expense to array
    expenses.push(expense);


    // Clear inputs
    expenseNameInput.value = "";
    expenseInput.value = "";
    categoryInput.value = "";


    // Update the application
    displayExpenses();
    updateTotal();
    updateExpenseCount();
}

function displayExpenses() {
    expenseList.innerHTML = "";

    // Get selected category
    const selectedCategory = filterCategory.value;

    // Filter expenses
    let filteredExpenses = expenses;


    if (selectedCategory !== "All") {
        filteredExpenses = expenses.filter(function (expense) {
            return expense.category === selectedCategory;
        });

    }


    // Display each expense
    filteredExpenses.forEach(function (expense) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="expense-info">
                <span class="expense-name">
                    ${expense.name}
                </span>
                <span class="expense-category">
                    ${expense.category}
                </span>
            </div>
            <span class="expense-amount">
                ₱${expense.amount.toFixed(2)}
            </span>
            <button
                class="delete-button"
                data-id="${expense.id}">
                Delete
            </button>
        `;


        // Add item to list
        expenseList.appendChild(listItem);

    });
}

function deleteExpense(id) {
    expenses = expenses.filter(function (expense) {
        return expense.id !== id;

    });


    // Update application
    displayExpenses();
    updateTotal();
    updateExpenseCount();
}


// ===============================
// Update Total
// ===============================

function updateTotal() {
    const total = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);

    totalExpenses.textContent = total.toFixed(2);
}


// ===============================
// Update Expense Count
// ===============================

function updateExpenseCount() {
    expenseCount.textContent = expenses.length;
}


addExpenseButton.addEventListener("click", function () {
    addExpense();

});


filterCategory.addEventListener("change", function () {
    displayExpenses();

});


// Delete Button Event
// ===============================
expenseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const id = Number(event.target.dataset.id);
        deleteExpense(id);

    }

});