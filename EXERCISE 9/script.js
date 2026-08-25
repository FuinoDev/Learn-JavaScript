const loadUsersButton = document.querySelector("#loadUsersButton");
const searchInput = document.querySelector("#searchInput");
const clearButton = document.querySelector("#clearButton");
const userCount = document.querySelector("#userCount");
const userList = document.querySelector("#userList");

const searchError = document.querySelector("#searchError");

const errorMessage = document.querySelector("#errorMessage");
const errorText = document.querySelector("#errorText");
const closeErrorButton = document.querySelector("#closeErrorButton");

const successMessage = document.querySelector("#successMessage");
const successText = document.querySelector("#successText");
const closeSuccessButton = document.querySelector("#closeSuccessButton");

let users = [];

loadUsersButton.addEventListener("click", loadUsers);

async function loadUsers() {
    clearValidation();

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users.");
        }

        users = await response.json();

        displayUsers(users);

        showSuccess("Users were loaded successfully.");

    } catch (error) {

        userList.innerHTML = `
            <p class="empty-message">
                No users loaded.
            </p>
        `;

        userCount.textContent = "0";

        showError(error.message);
    }
}

function displayUsers(usersToDisplay) {

    userList.innerHTML = "";

    userCount.textContent = usersToDisplay.length;

    if (usersToDisplay.length === 0) {

        userList.innerHTML = `
            <p class="empty-message">
                No users found.
            </p>
        `;

        return;
    }

    usersToDisplay.forEach(user => {

        const userCard = document.createElement("div");

        userCard.classList.add("user-card");

        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        `;

        userList.appendChild(userCard);
    });
}

function searchUsers() {

    clearValidation();

    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {

        displayUsers(users);

        return;
    }

    if (searchTerm.length < 2) {

        searchError.textContent =
            "Search must be at least 2 characters.";

        searchInput.classList.add("input-invalid");

        showError("Please correct the highlighted field.");

        return;
    }

    searchInput.classList.add("input-valid");

    const filteredUsers = users.filter(user => {

        return user.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });

    displayUsers(filteredUsers);

    if (filteredUsers.length === 0) {

        showError("No users found matching your search.");
    }
}

function clearUsers() {

    users = [];

    userList.innerHTML = `
        <p class="empty-message">
            No users loaded yet.
        </p>
    `;

    userCount.textContent = "0";

    searchInput.value = "";

    clearValidation();

    showSuccess("Users were cleared.");
}

function showError(message) {

    errorText.textContent = message;

    errorMessage.classList.add("show");

    successMessage.classList.remove("show");
}

function showSuccess(message) {

    successText.textContent = message;

    successMessage.classList.add("show");

    errorMessage.classList.remove("show");
}

function clearValidation() {

    searchError.textContent = "";

    searchInput.classList.remove("input-invalid");

    searchInput.classList.remove("input-valid");

    errorMessage.classList.remove("show");
}

searchInput.addEventListener("input", searchUsers);

clearButton.addEventListener("click", clearUsers);

closeErrorButton.addEventListener("click", () => {

    errorMessage.classList.remove("show");
});

closeSuccessButton.addEventListener("click", () => {

    successMessage.classList.remove("show");
});