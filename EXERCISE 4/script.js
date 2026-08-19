// Store all expenses
let expenses = [];


// Get elements from HTML
const expenseNameInput = document.querySelector("#expenseNameInput");
const expenseInput = document.querySelector("#expenseInput");
const categoryInput = document.querySelector("#categoryInput");

const addExpenseButton = document.querySelector("#addExpenseButton");
const expenseList = document.querySelector("#expenseList");
const totalExpenses = document.querySelector("#totalExpenses");


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


// Add expense
addExpenseButton.addEventListener("click", function () {

    // Get input values
    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = Number(expenseInput.value);
    const expenseCategory = categoryInput.value;


    // Validate expense name
    if (expenseName === "") {
        expenseNameInput.classList.add("input-error");
        showError("Please enter an expense name.");
        return;
    }


   
    // Validate expense amount
    if (expenseInput.value === "" || expenseAmount <= 0) {
        expenseInput.classList.add("input-error");
        showError("Please enter a valid expense amount.");
        return;
    }

    // Create expense object
    const expense = {
        id: Date.now(),
        name: expenseName,
        amount: expenseAmount,
        category: expenseCategory
    };


    // Add expense to array
    expenses.push(expense);


    // Update the page
    displayExpenses();
    calculateTotal();


    // Clear inputs
    expenseNameInput.value = "";
    expenseInput.value = "";
    categoryInput.value = "Food";


    // Remove error styling
     expenseNameInput.classList.remove("input-error");
    expenseInput.classList.remove("input-error");

    // Hide error message
    errorElement.style.display = "none";
});


// Display expenses
function displayExpenses() {

    // Clear existing list
    expenseList.innerHTML = "";


    // Loop through expenses
    expenses.forEach(function (expense) {

        const listItem = document.createElement("li");


        listItem.innerHTML = `
            <div class="expense-info">
                <span class="expense-name">${expense.name}</span>
                <span class="expense-category">${expense.category}</span>
            </div>

            <span class="expense-amount">
                ₱${expense.amount.toFixed(2)}
            </span>

            <button 
                class="delete-button" 
                onclick="deleteExpense(${expense.id})"
            >
                Delete
            </button>
        `;


        expenseList.appendChild(listItem);
    });
}


// Calculate total expenses
function calculateTotal() {

    const total = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);


    totalExpenses.textContent = total.toFixed(2);
}


// Delete expense
function deleteExpense(id) {

    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });


    displayExpenses();
    calculateTotal();
}