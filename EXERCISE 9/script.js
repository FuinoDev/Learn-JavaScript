const loadUsersButton = document.querySelector("#loadUsersButton");
const searchInput = document.querySelector("#searchInput");
const clearButton = document.querySelector("#clearButton");
const status = document.querySelector("#status");
const userCount = document.querySelector("#userCount");
const userList = document.querySelector("#userList");

let users = [];

async function loadUsers() {
    status.textContent = "Loading users...";
    status.className = "status loading";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users.");
        }

        users = await response.json();

        displayUsers(users);

        status.textContent = "Users loaded successfully.";
        status.className = "status";
    } catch (error) {
        status.textContent = error.message;
        status.className = "status error";
        userList.innerHTML = "";
        userCount.textContent = "0";
    }
}

function displayUsers(usersToDisplay) {
    userList.innerHTML = "";

    userCount.textContent = usersToDisplay.length;

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
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm)
    );

    displayUsers(filteredUsers);
}

function clearUsers() {
    users = [];
    userList.innerHTML = "";
    userCount.textContent = "0";
    searchInput.value = "";
    status.textContent = "";
}

loadUsersButton.addEventListener("click", loadUsers);

searchInput.addEventListener("input", searchUsers);

clearButton.addEventListener("click", clearUsers);