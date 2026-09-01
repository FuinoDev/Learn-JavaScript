// Elements
const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskPriority = document.querySelector("#taskPriority");
const taskDueDate = document.querySelector("#taskDueDate");
const taskNameError = document.querySelector("#taskNameError");
const taskDescriptionError = document.querySelector("#taskDescriptionError");
const taskPriorityError = document.querySelector("#taskPriorityError");
const taskDueDateError = document.querySelector("#taskDueDateError");
const addTaskButton = document.querySelector("#addTaskButton");
const cancelEditButton = document.querySelector("#cancelEditButton");
const searchInput = document.querySelector("#searchInput");
const statusFilter = document.querySelector("#statusFilter");
const priorityFilter = document.querySelector("#priorityFilter");
const sortTasks = document.querySelector("#sortTasks");
const taskList = document.querySelector("#taskList");
const emptyMessage = document.querySelector("#emptyMessage");
const totalTasks = document.querySelector("#totalTasks");
const pendingTasks = document.querySelector("#pendingTasks");
const completedTasks = document.querySelector("#completedTasks");
const highPriorityTasks = document.querySelector("#highPriorityTasks");
const message = document.querySelector("#message");
const messageText = document.querySelector("#messageText");
const closeMessage = document.querySelector("#closeMessage");

// Data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;
let messageTimeout;

// Save
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Message
function showMessage(text, type) {
    clearTimeout(messageTimeout);

    messageText.textContent = text;

    message.className = "message";
    message.classList.add(type);

    messageTimeout = setTimeout(() => {
        hideMessage();
    }, 4000);
}

function hideMessage() {
    message.className = "message";
}
