// =========================
// ELEMENTS
// =========================

const expenseForm = document.querySelector("#expenseForm");

const expenseName = document.querySelector("#expenseName");
const expenseAmount = document.querySelector("#expenseAmount");
const expenseCategory = document.querySelector("#expenseCategory");
const expenseDate = document.querySelector("#expenseDate");

const expenseList = document.querySelector("#expenseList");
const emptyMessage = document.querySelector("#emptyMessage");

const totalExpenses = document.querySelector("#totalExpenses");
const expenseCount = document.querySelector("#expenseCount");
const highestExpense = document.querySelector("#highestExpense");
const averageExpense = document.querySelector("#averageExpense");

const searchInput = document.querySelector("#searchInput");
const filterCategory = document.querySelector("#filterCategory");
const sortExpense = document.querySelector("#sortExpense");

const formTitle = document.querySelector("#formTitle");
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");


// =========================
// DATA
// =========================

let expenses = [];

let editingExpenseId = null;


// =========================
// LOCAL STORAGE
// =========================

function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}


function loadExpenses() {

    const savedExpenses =
        localStorage.getItem("expenses");

    if (savedExpenses) {

        expenses = JSON.parse(savedExpenses);

    }
}


// =========================
// VALIDATION
// =========================

function setInvalid(input, message) {

    input.classList.remove("valid");

    input.classList.add("invalid");

    removeError(input);

    const error =
        document.createElement("small");

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
        input.parentElement.querySelector(
            ".input-error"
        );

    if (oldError) {

        oldError.remove();

    }
}


// =========================
// VALIDATE NAME
// =========================

function validateName() {

    const name =
        expenseName.value.trim();


    if (name === "") {

        setInvalid(
            expenseName,
            "Expense name is required."
        );

        return false;
    }


    if (name.length < 2) {

        setInvalid(
            expenseName,
            "Expense name must contain at least 2 characters."
        );

        return false;
    }


    setValid(expenseName);

    return true;
}


// =========================
// VALIDATE AMOUNT
// =========================

function validateAmount() {

    const amount =
        Number(expenseAmount.value);


    if (
        expenseAmount.value === "" ||
        isNaN(amount)
    ) {

        setInvalid(
            expenseAmount,
            "Amount is required."
        );

        return false;
    }


    if (amount <= 0) {

        setInvalid(
            expenseAmount,
            "Amount must be greater than 0."
        );

        return false;
    }


    setValid(expenseAmount);

    return true;
}


// =========================
// VALIDATE CATEGORY
// =========================

function validateCategory() {

    if (expenseCategory.value === "") {

        setInvalid(
            expenseCategory,
            "Please select a category."
        );

        return false;
    }


    setValid(expenseCategory);

    return true;
}


// =========================
// VALIDATE DATE
// =========================

function validateDate() {

    if (expenseDate.value === "") {

        setInvalid(
            expenseDate,
            "Date is required."
        );

        return false;
    }


    setValid(expenseDate);

    return true;
}


// =========================
// VALIDATE FORM
// =========================

function validateForm() {

    const nameValid =
        validateName();

    const amountValid =
        validateAmount();

    const categoryValid =
        validateCategory();

    const dateValid =
        validateDate();


    return (
        nameValid &&
        amountValid &&
        categoryValid &&
        dateValid
    );
}


// =========================
// DISPLAY EXPENSES
// =========================

function displayExpenses() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCategory =
        filterCategory.value;


    const selectedSort =
        sortExpense.value;


    let filteredExpenses =
        expenses.filter(function(expense) {

            const matchesSearch =
                expense.name
                    .toLowerCase()
                    .includes(searchValue);


            const matchesCategory =
                selectedCategory === "All" ||
                expense.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    // =========================
    // SORTING
    // =========================

    if (selectedSort === "newest") {

        filteredExpenses.sort(
            function(a, b) {

                return new Date(b.date) -
                       new Date(a.date);

            }
        );
    }


    if (selectedSort === "oldest") {

        filteredExpenses.sort(
            function(a, b) {

                return new Date(a.date) -
                       new Date(b.date);

            }
        );
    }


    if (selectedSort === "amountLow") {

        filteredExpenses.sort(
            function(a, b) {

                return a.amount - b.amount;

            }
        );
    }


    if (selectedSort === "amountHigh") {

        filteredExpenses.sort(
            function(a, b) {

                return b.amount - a.amount;

            }
        );
    }


    if (selectedSort === "nameAsc") {

        filteredExpenses.sort(
            function(a, b) {

                return a.name.localeCompare(
                    b.name
                );

            }
        );
    }


    if (selectedSort === "nameDesc") {

        filteredExpenses.sort(
            function(a, b) {

                return b.name.localeCompare(
                    a.name
                );

            }
        );
    }


    // =========================
    // CLEAR LIST
    // =========================

    expenseList.innerHTML = "";


    // =========================
    // EMPTY STATE
    // =========================

    if (filteredExpenses.length === 0) {

        emptyMessage.style.display = "block";

        return;
    }


    emptyMessage.style.display = "none";


    // =========================
    // CREATE CARDS
    // =========================

    filteredExpenses.forEach(
        function(expense) {

            const card =
                document.createElement("div");


            card.classList.add(
                "expense-card"
            );


            card.innerHTML = `

                <div class="expense-info">

                    <h3>
                        ${expense.name}
                    </h3>

                    <p class="expense-amount">
                        Amount: ₱${expense.amount.toFixed(2)}
                    </p>

                    <p class="expense-category">
                        Category: ${expense.category}
                    </p>

                    <p>
                        Date: ${formatDate(expense.date)}
                    </p>

                </div>


                <div class="expense-actions">

                    <button
                        class="edit-button"
                        onclick="editExpense(${expense.id})"
                    >
                        Edit
                    </button>


                    <button
                        class="delete-button"
                        onclick="deleteExpense(${expense.id})"
                    >
                        Delete
                    </button>

                </div>

            `;


            expenseList.appendChild(card);

        }
    );
}


// =========================
// FORMAT DATE
// =========================

function formatDate(date) {

    const dateObject =
        new Date(date + "T00:00:00");


    return dateObject.toLocaleDateString(
        "en-PH",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


// =========================
// UPDATE STATISTICS
// =========================

function updateStatistics() {

    // Total amount

    const total =
        expenses.reduce(
            function(sum, expense) {

                return sum + expense.amount;

            },
            0
        );


    totalExpenses.textContent =
        `₱${total.toFixed(2)}`;


    // Number of expenses

    expenseCount.textContent =
        expenses.length;


    // Highest expense

    let highest = 0;


    if (expenses.length > 0) {

        highest =
            Math.max(
                ...expenses.map(
                    function(expense) {
                        return expense.amount;
                    }
                )
            );

    }


    highestExpense.textContent =
        `₱${highest.toFixed(2)}`;


    // Average expense

    let average = 0;


    if (expenses.length > 0) {

        average =
            total / expenses.length;

    }


    averageExpense.textContent =
        `₱${average.toFixed(2)}`;
}


// =========================
// ADD / UPDATE EXPENSE
// =========================

expenseForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (!validateForm()) {

            return;
        }


        const name =
            expenseName.value.trim();


        const amount =
            Number(expenseAmount.value);


        const category =
            expenseCategory.value;


        const date =
            expenseDate.value;


        // =========================
        // EDIT EXISTING EXPENSE
        // =========================

        if (editingExpenseId !== null) {

            const expenseIndex =
                expenses.findIndex(
                    function(expense) {

                        return (
                            expense.id ===
                            editingExpenseId
                        );

                    }
                );


            expenses[expenseIndex].name =
                name;


            expenses[expenseIndex].amount =
                amount;


            expenses[expenseIndex].category =
                category;


            expenses[expenseIndex].date =
                date;


            editingExpenseId = null;


            formTitle.textContent =
                "Add Expense";


            submitButton.textContent =
                "Add Expense";


            cancelButton.style.display =
                "none";

        }


        // =========================
        // ADD NEW EXPENSE
        // =========================

        else {

            const newExpense = {

                id: Date.now(),

                name: name,

                amount: amount,

                category: category,

                date: date

            };


            expenses.push(newExpense);

        }


        // =========================
        // SAVE DATA
        // =========================

        saveExpenses();


        // =========================
        // RESET
        // =========================

        expenseForm.reset();

        clearValidation();


        // =========================
        // UPDATE UI
        // =========================

        displayExpenses();

        updateStatistics();

    }
);


// =========================
// EDIT EXPENSE
// =========================

function editExpense(id) {

    const expense =
        expenses.find(
            function(expense) {

                return expense.id === id;

            }
        );


    if (!expense) {

        return;
    }


    expenseName.value =
        expense.name;


    expenseAmount.value =
        expense.amount;


    expenseCategory.value =
        expense.category;


    expenseDate.value =
        expense.date;


    editingExpenseId =
        id;


    formTitle.textContent =
        "Edit Expense";


    submitButton.textContent =
        "Update Expense";


    cancelButton.style.display =
        "block";


    clearValidation();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}


// =========================
// DELETE EXPENSE
// =========================

function deleteExpense(id) {

    const expense =
        expenses.find(
            function(expense) {

                return expense.id === id;

            }
        );


    if (!expense) {

        return;
    }


    const confirmDelete =
        confirm(
            `Delete ${expense.name}?`
        );


    if (!confirmDelete) {

        return;
    }


    expenses =
        expenses.filter(
            function(expense) {

                return expense.id !== id;

            }
        );


    if (editingExpenseId === id) {

        cancelEdit();

    }


    // Save updated array

    saveExpenses();


    displayExpenses();

    updateStatistics();
}


// =========================
// CLEAR VALIDATION
// =========================

function clearValidation() {

    const inputs = [

        expenseName,

        expenseAmount,

        expenseCategory,

        expenseDate

    ];


    inputs.forEach(
        function(input) {

            input.classList.remove(
                "invalid",
                "valid"
            );


            removeError(input);

        }
    );
}


// =========================
// CANCEL EDIT
// =========================

function cancelEdit() {

    editingExpenseId = null;


    expenseForm.reset();


    clearValidation();


    formTitle.textContent =
        "Add Expense";


    submitButton.textContent =
        "Add Expense";


    cancelButton.style.display =
        "none";
}


// =========================
// CANCEL BUTTON
// =========================

cancelButton.addEventListener(
    "click",
    function() {

        cancelEdit();

    }
);


// =========================
// VALIDATION EVENTS
// =========================

expenseName.addEventListener(
    "blur",
    validateName
);


expenseAmount.addEventListener(
    "blur",
    validateAmount
);


expenseCategory.addEventListener(
    "change",
    validateCategory
);


expenseDate.addEventListener(
    "change",
    validateDate
);


// =========================
// REAL-TIME VALIDATION
// =========================

expenseName.addEventListener(
    "input",
    function() {

        if (
            expenseName.classList.contains(
                "invalid"
            )
        ) {

            validateName();

        }

    }
);


expenseAmount.addEventListener(
    "input",
    function() {

        if (
            expenseAmount.classList.contains(
                "invalid"
            )
        ) {

            validateAmount();

        }

    }
);


// =========================
// SEARCH
// =========================

searchInput.addEventListener(
    "input",
    function() {

        displayExpenses();

    }
);


// =========================
// CATEGORY FILTER
// =========================

filterCategory.addEventListener(
    "change",
    function() {

        displayExpenses();

    }
);


// =========================
// SORT
// =========================

sortExpense.addEventListener(
    "change",
    function() {

        displayExpenses();

    }
);


// =========================
// INITIAL LOAD
// =========================

loadExpenses();

displayExpenses();

updateStatistics();