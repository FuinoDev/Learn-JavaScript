let items = [];

const itemInput = document.querySelector("#item-input");
const addButton = document.querySelector("#add-button");
const itemList = document.querySelector("#item-list");
const itemCount = document.querySelector("#item-count");

function renderItems() {
    itemList.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        const listItem = document.createElement("li");
        listItem.classList.add("item");
        listItem.textContent = items[i];
        const deleteButton = document.createElement("button");  
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
            items.splice(i, 1);
            renderItems();
        });
        listItem.appendChild(deleteButton);
        itemList.appendChild(listItem);
    }
    itemCount.textContent = items.length;
}
function addItem() {

    const item = itemInput.value.trim();

    if (item === "") {
        return;
    }
    items.push(item);
    itemInput.value = "";

    renderItems();
}
addButton.addEventListener("click", function () {
    addItem();
});

itemInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addItem();
    }
});