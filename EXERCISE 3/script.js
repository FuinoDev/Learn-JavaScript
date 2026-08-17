// Store all tasks
let tasks = [];


// Get elements from HTML
const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");


// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    // Prevent empty tasks
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add task to array
    tasks.push(task);

    // Clear input
    taskInput.value = "";

    // Update the screen
    renderTasks();
}


// Display all tasks
function renderTasks() {

    // Clear existing list
    taskList.innerHTML = "";

    // Loop through tasks
    tasks.forEach(function(task) {

        // Create list item
        const li = document.createElement("li");

        li.classList.add("task");

        // Create task text
        const span = document.createElement("span");

        span.classList.add("task-text");

        span.textContent = task.text;

        // Add completed class if task is completed
        if (task.completed) {
            span.classList.add("completed");
        }

        // Click task to toggle completed
        span.addEventListener("click", function() {

            task.completed = !task.completed;

            renderTasks();
        });


        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-button");

        deleteButton.textContent = "Delete";


        // Delete task
        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            renderTasks();
        });


        // Put elements inside li
        li.appendChild(span);

        li.appendChild(deleteButton);


        // Put li inside ul
        taskList.appendChild(li);

    });


    // Update task counter
    updateTaskCount();
}


// Update remaining task count
function updateTaskCount() {

    const remainingTasks = tasks.filter(function(task) {
        return !task.completed;
    });

    taskCount.textContent =
        remainingTasks.length + " tasks remaining";
}


// Add task when button is clicked
addButton.addEventListener("click", addTask);


// Add task when Enter is pressed
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});