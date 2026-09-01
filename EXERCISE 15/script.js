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

// Validation
function showInputError(input, errorElement, text) {
    input.classList.add("input-invalid");
    errorElement.textContent = text;
}

function clearInputError(input, errorElement) {
    input.classList.remove("input-invalid");
    errorElement.textContent = "";
}

function clearAllErrors() {
    clearInputError(taskName, taskNameError);
    clearInputError(taskDescription, taskDescriptionError);
    clearInputError(taskPriority, taskPriorityError);
    clearInputError(taskDueDate, taskDueDateError);
}

function validateForm() {
    clearAllErrors();

    let isValid = true;

    const nameValue = taskName.value.trim();
    const descriptionValue = taskDescription.value.trim();
    const priorityValue = taskPriority.value;
    const dueDateValue = taskDueDate.value;

    if (nameValue.length < 2) {
        showInputError(
            taskName,
            taskNameError,
            "Task name must contain at least 2 characters."
        );

        isValid = false;
    }

    if (descriptionValue.length < 3) {
        showInputError(
            taskDescription,
            taskDescriptionError,
            "Description must contain at least 3 characters."
        );

        isValid = false;
    }

    if (priorityValue === "") {
        showInputError(
            taskPriority,
            taskPriorityError,
            "Please select a priority."
        );

        isValid = false;
    }

    if (dueDateValue === "") {
        showInputError(
            taskDueDate,
            taskDueDateError,
            "Please select a due date."
        );

        isValid = false;
    }

    if (dueDateValue !== "") {
        const selectedDate = new Date(dueDateValue + "T00:00:00");
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showInputError(
                taskDueDate,
                taskDueDateError,
                "Due date cannot be in the past."
            );

            isValid = false;
        }
    }

    const duplicateTask = tasks.some(task =>
        task.name.toLowerCase() === nameValue.toLowerCase() &&
        task.id !== editingTaskId
    );

    if (duplicateTask) {
        showInputError(
            taskName,
            taskNameError,
            "This task already exists."
        );

        isValid = false;
    }

    return isValid;
}

// Reset
function resetForm() {
    taskForm.reset();

    editingTaskId = null;

    addTaskButton.textContent = "Add Task";

    cancelEditButton.style.display = "none";

    clearAllErrors();
}

// Add or update
function handleTaskSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
        showMessage("Please fix the form errors.", "error");
        return;
    }

    const taskData = {
        name: taskName.value.trim(),
        description: taskDescription.value.trim(),
        priority: taskPriority.value,
        dueDate: taskDueDate.value
    };

    if (editingTaskId === null) {

        const newTask = {
            id: Date.now(),
            ...taskData,
            status: "Pending",
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);

        showMessage("Task added successfully.", "success");

    } else {

        const taskIndex = tasks.findIndex(
            task => task.id === editingTaskId
        );

        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                ...taskData
            };
        }

        showMessage("Task updated successfully.", "success");
    }

    saveTasks();

    resetForm();

    renderTasks();
}

// Edit
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    taskName.value = task.name;
    taskDescription.value = task.description;
    taskPriority.value = task.priority;
    taskDueDate.value = task.dueDate;

    editingTaskId = id;

    addTaskButton.textContent = "Update Task";

    cancelEditButton.style.display = "block";

    clearAllErrors();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Delete
function deleteTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    const confirmed = confirm(
        `Delete "${task.name}"?`
    );

    if (!confirmed) {
        return;
    }

    tasks = tasks.filter(task => task.id !== id);

    if (editingTaskId === id) {
        resetForm();
    }

    saveTasks();

    renderTasks();

    showMessage("Task deleted successfully.", "success");
}

// Status
function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    if (task.status === "Pending") {
        task.status = "Completed";
        showMessage("Task marked as completed.", "success");
    } else {
        task.status = "Pending";
        showMessage("Task marked as pending.", "success");
    }

    saveTasks();

    renderTasks();
}

// Date
function formatDate(dateValue) {
    const date = new Date(dateValue + "T00:00:00");

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

// Priority
function getPriorityValue(priority) {
    if (priority === "High") {
        return 3;
    }

    if (priority === "Medium") {
        return 2;
    }

    return 1;
}

// Summary
function updateSummary() {
    totalTasks.textContent = tasks.length;

    pendingTasks.textContent = tasks.filter(
        task => task.status === "Pending"
    ).length;

    completedTasks.textContent = tasks.filter(
        task => task.status === "Completed"
    ).length;

    highPriorityTasks.textContent = tasks.filter(
        task => task.priority === "High"
    ).length;
}

// Filter
function getFilteredTasks() {
    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    const selectedStatus = statusFilter.value;

    const selectedPriority = priorityFilter.value;

    let filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.name.toLowerCase().includes(searchValue) ||
            task.description.toLowerCase().includes(searchValue);

        const matchesStatus =
            selectedStatus === "All" ||
            task.status === selectedStatus;

        const matchesPriority =
            selectedPriority === "All" ||
            task.priority === selectedPriority;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });

    filteredTasks = [...filteredTasks];

    if (sortTasks.value === "dueDate") {
        filteredTasks.sort(
            (a, b) =>
                new Date(a.dueDate) -
                new Date(b.dueDate)
        );
    }

    if (sortTasks.value === "priority") {
        filteredTasks.sort(
            (a, b) =>
                getPriorityValue(b.priority) -
                getPriorityValue(a.priority)
        );
    }

    if (sortTasks.value === "name") {
        filteredTasks.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );
    }

    return filteredTasks;
}

// Render
function renderTasks() {
    taskList.innerHTML = "";

    updateSummary();

    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    filteredTasks.forEach(task => {

        const taskCard = document.createElement("div");

        taskCard.className = "task-card";

        if (task.status === "Completed") {
            taskCard.classList.add("completed");
        }

        taskCard.dataset.id = task.id;

        const taskHeader = document.createElement("div");
        taskHeader.className = "task-header";

        const title = document.createElement("h2");
        title.className = "task-title";
        title.textContent = task.name;

        const priority = document.createElement("span");

        priority.className =
            `priority priority-${task.priority.toLowerCase()}`;

        priority.textContent = task.priority;

        taskHeader.appendChild(title);
        taskHeader.appendChild(priority);

        const description = document.createElement("p");

        description.className = "task-description";

        description.textContent = task.description;

        const details = document.createElement("div");

        details.className = "task-details";

        const dueDate = document.createElement("span");

        dueDate.textContent =
            `Due: ${formatDate(task.dueDate)}`;

        const status = document.createElement("span");

        status.textContent =
            `Status: ${task.status}`;

        details.appendChild(dueDate);
        details.appendChild(status);

        const actions = document.createElement("div");

        actions.className = "task-actions";

        const completeButton = document.createElement("button");

        completeButton.dataset.action = "toggle";
        completeButton.dataset.id = task.id;

        if (task.status === "Pending") {
            completeButton.textContent = "Complete";
            completeButton.className = "complete-button";
        } else {
            completeButton.textContent = "Mark Pending";
            completeButton.className = "pending-button";
        }

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.className = "edit-button";
        editButton.dataset.action = "edit";
        editButton.dataset.id = task.id;

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = task.id;

        actions.appendChild(completeButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        taskCard.appendChild(taskHeader);
        taskCard.appendChild(description);
        taskCard.appendChild(details);
        taskCard.appendChild(actions);

        taskList.appendChild(taskCard);
    });
}

// Task actions
taskList.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "toggle") {
        toggleTaskStatus(id);
    }

    if (action === "edit") {
        editTask(id);
    }

    if (action === "delete") {
        deleteTask(id);
    }
});

// Events
taskForm.addEventListener("submit", handleTaskSubmit);

cancelEditButton.addEventListener("click", resetForm);

closeMessage.addEventListener("click", hideMessage);

searchInput.addEventListener("input", renderTasks);

statusFilter.addEventListener("change", renderTasks);

priorityFilter.addEventListener("change", renderTasks);

sortTasks.addEventListener("change", renderTasks);

// Clear validation
taskName.addEventListener("input", () => {
    clearInputError(taskName, taskNameError);
});

taskDescription.addEventListener("input", () => {
    clearInputError(
        taskDescription,
        taskDescriptionError
    );
});

taskPriority.addEventListener("change", () => {
    clearInputError(
        taskPriority,
        taskPriorityError
    );
});

taskDueDate.addEventListener("change", () => {
    clearInputError(
        taskDueDate,
        taskDueDateError
    );
});

// Start
renderTasks();