Learn JavaScript — Exercises 1–14
Current Progress: Exercise 14 — Interactive JavaScript Quiz

A collection of beginner-to-intermediate JavaScript exercises created to practice JavaScript step by step through small projects.
The exercises start with basic JavaScript concepts and gradually introduce DOM manipulation, form validation, arrays, objects, APIs, Local Storage, application state, timers, filtering, sorting, and other practical concepts.

Learning Progress
Exercise	Project / Focus	Main Concepts
Exercise 1	JavaScript Basics	Variables, data types, operators, conditions
Exercise 2	Basic Interaction	Functions, user input, events
Exercise 3	To-Do List	DOM manipulation, arrays, events
Exercise 4	Expense Tracker	Objects, arrays, calculations, validation
Exercise 5	Shopping Cart	Products, quantity, totals, remove operations
Exercise 6	Advanced Expense Tracker	Filtering, totals, categories, keyboard events
Exercise 7	Student Grade Manager	Validation, calculations, statistics
Exercise 8	Form Application	Forms, validation, error handling
Exercise 9	User Dashboard	Fetch API, async data, searching
Exercise 10	Advanced Validation	Real-time input validation and UI feedback
Exercise 11	Inventory Management	CRUD, search, filter, sort, calculations
Exercise 12	Persistent Inventory	Local Storage and data persistence
Exercise 13	Advanced JavaScript Practice	Combining previous JavaScript concepts
Exercise 14	JavaScript Quiz App	State, timers, randomization, scoring
Exercise 1 — JavaScript Basics

The first exercise introduces the basic structure and syntax of JavaScript.

Concepts
Variables
let
const
Strings
Numbers
Booleans
Basic operators
Conditional statements
Basic functions
Console output
Goal

Understand how JavaScript stores information and executes basic logic.

Exercise 2 — Basic JavaScript Interaction

Exercise 2 introduces interaction between JavaScript and a webpage.

Concepts
Functions
Function calls
Parameters
User input
Button events
addEventListener()
Basic DOM selection
Changing webpage content
Goal

Understand how JavaScript responds to user actions.

Exercise 3 — To-Do List

A simple task management application where users can add and remove tasks.

Concepts
Arrays
DOM manipulation
Creating HTML elements with JavaScript
Event listeners
Form input
Input validation
Adding items
Removing items
Updating the interface
Important Methods
querySelector()
addEventListener()
push()
forEach()
createElement()
appendChild()
Goal

Learn how JavaScript can dynamically change webpage content.

Exercise 4 — Expense Tracker

An application for recording expenses and calculating total spending.

Features
Add expense
Expense name
Expense amount
Expense category
Display expenses
Delete expenses
Calculate total expenses
Input validation
Concepts
Arrays
Objects
Functions
DOM manipulation
Form validation
Calculations
Template literals
Array iteration
Important Methods
push()
filter()
forEach()
reduce()
Goal

Learn how arrays and objects can be used to manage structured application data.

Exercise 5 — Shopping Cart

A basic shopping cart that manages products, quantities, and prices.

Features
Add product
Enter price
Enter quantity
Calculate product total
Calculate subtotal
Count total items
Remove product
Concepts
Objects
Arrays
Quantity calculations
Price calculations
Dynamic HTML
Functions
Form validation
Removing array items
Example Calculation
const productTotal = product.price * product.quantity;
Goal

Practice working with multiple related values inside JavaScript objects.

Exercise 6 — Advanced Expense Tracker

An improved version of the Expense Tracker with additional controls.

Features
Add expenses
Delete expenses
Expense categories
Filter expenses
Calculate totals
Expense count
Validation messages
Error message timeout
Keyboard interaction
Concepts
Filtering arrays
Event handling
Keyboard events
Enter key handling
Timers
Dynamic totals
Conditional rendering
Important Concepts
filter()
reduce()
setTimeout()
keydown
Goal

Learn how to build more interactive applications from previously learned concepts.

Exercise 7 — Student Grade Manager

An application for managing student names and grades.

Features
Add students
Enter grades
Validate names
Validate grades
Prevent duplicate students
Delete students
Passed / Failed status
Average grade
Highest grade
Lowest grade
Concepts
Advanced validation
Arrays of objects
Duplicate checking
Statistical calculations
Conditional logic
Dynamic summaries
Updating the DOM
Important Methods
some()
forEach()
reduce()
Math.max()
Math.min()
Goal

Practice processing and analyzing data stored inside arrays.

Exercise 8 — Form Validation

A user form focused on improving input validation and user feedback.

Concepts
Forms
Required fields
Validation
Error messages
Input states
DOM manipulation
Event listeners
Conditional statements
User feedback
Goal

Understand how JavaScript validates information before processing it.

Exercise 9 — User Dashboard

A dashboard that retrieves users from an external API.

Features
Load users
Display users
Search users
Clear results
Loading state
Error handling
Concepts
Fetch API
HTTP requests
JSON
Promises
Asynchronous JavaScript
API data
Searching arrays
Error handling
Important Concepts
fetch()
async
await
response.json()
try
catch
Goal

Learn how JavaScript communicates with external APIs.

Exercise 10 — Advanced Form Validation

Exercise 10 improves form validation by giving immediate visual feedback.

Features
Required-field validation
Invalid inputs turn red
Error messages
Valid input detection
Better user feedback
Concepts
Real-time validation
Input events
CSS classes from JavaScript
Conditional validation
Form state
Important Methods
classList.add()
classList.remove()
addEventListener()
Goal

Learn how JavaScript and CSS work together to provide interactive validation.

Exercise 11 — Inventory Management System

A more complete CRUD-style JavaScript application for managing products.

Features
Add products
Edit products
Delete products
Search products
Filter products
Sort products
Product quantity
Product price
Total products
Total stock
Total inventory value
Low-stock detection
Concepts
CRUD operations
Arrays of objects
Search
Filtering
Sorting
Calculations
Dynamic rendering
Editing existing data
Application state
CRUD

C — Create

Add new products.

R — Read

Display stored products.

U — Update

Edit existing products.

D — Delete

Remove products.

Important Methods
push()
filter()
find()
findIndex()
sort()
reduce()
Goal

Understand the basic structure used by real inventory and management systems.

Exercise 12 — Inventory with Local Storage

Exercise 12 improves the Inventory Management System by saving data locally.

New Concept
Local Storage

localStorage allows the browser to keep information even after the page is refreshed or closed.

Saving Data
localStorage.setItem("products", JSON.stringify(products));
Loading Data
const products = JSON.parse(localStorage.getItem("products")) || [];
Concepts
localStorage
JSON.stringify()
JSON.parse()
Persistent data
Saving application state
Loading stored information
CRUD with persistent storage
Goal

Understand the difference between temporary JavaScript data and persistent browser data.

Exercise 13 — Advanced JavaScript Practice

Exercise 13 focuses on combining concepts learned from the previous exercises into a more complete application structure.

Concepts
Arrays
Objects
Functions
DOM manipulation
Event listeners
Validation
CRUD operations
Search
Filtering
Sorting
Local Storage
Application state
Reusable functions
Goal

Become more comfortable combining multiple JavaScript concepts instead of learning them individually.

Exercise 14 — Interactive JavaScript Quiz

A JavaScript quiz application with questions, scoring, a timer, randomized answers, progress tracking, and saved high scores.

Features
Start quiz
Multiple-choice questions
Randomized questions
Randomized answers
15-second timer
Correct / incorrect feedback
Score tracking
Progress bar
Final percentage
Best score
Restart quiz
Local Storage
Concepts
Arrays of objects
Application state
DOM manipulation
Event listeners
Timers
Randomization
Score calculations
Conditional logic
Local Storage
Dynamic UI updates
Application State

The quiz keeps track of its current condition using variables.

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval = null;
let answered = false;
Timer
setInterval()
clearInterval()
Randomization
Math.random()
Math.floor()
Local Storage

The user's best score can be saved using:

localStorage.setItem()
localStorage.getItem()
Goal

Learn how several JavaScript concepts work together inside one interactive application.

JavaScript Concepts Learned

After completing Exercises 1–14, the following concepts have been practiced:

Fundamentals
Variables
Constants
Data types
Operators
Conditional statements
Functions
Parameters
Return values
Template literals
Arrays
push()
pop()
filter()
find()
findIndex()
some()
forEach()
map()
reduce()
sort()
Objects
const product = {
    name: "Keyboard",
    price: 1500,
    quantity: 2
};
DOM Manipulation
document.querySelector()
document.createElement()
appendChild()
textContent
innerHTML
Events
click
submit
input
change
keydown
Event Listeners
element.addEventListener("click", function () {

});
CSS Manipulation
classList.add()
classList.remove()
classList.toggle()
Validation
Empty input checking
Number validation
Minimum and maximum values
Duplicate detection
Error messages
Valid / invalid input states
Array Processing
Searching
Filtering
Sorting
Counting
Calculating totals
Finding minimum values
Finding maximum values
Calculating averages
Asynchronous JavaScript
fetch()
async
await
try
catch
JSON
JSON.stringify()
JSON.parse()
Browser Storage
localStorage.setItem()
localStorage.getItem()
localStorage.removeItem()
Timers
setTimeout()
setInterval()
clearInterval()
Math
Math.random()
Math.floor()
Math.max()
Math.min()
Project Structure

Each exercise normally contains three files:

EXERCISE/
│
├── index.html
├── style.css
└── script.js
HTML

Defines the structure and elements of the application.

CSS

Controls the appearance, responsiveness, states, and layout.

JavaScript

Controls the application's logic and user interaction.

Learning Progression

The exercises follow this general progression:

JavaScript Fundamentals
        ↓
Functions
        ↓
DOM Manipulation
        ↓
Events
        ↓
Arrays
        ↓
Objects
        ↓
Form Validation
        ↓
CRUD Operations
        ↓
Search / Filter / Sort
        ↓
Calculations
        ↓
Fetch API
        ↓
Async / Await
        ↓
Local Storage
        ↓
Application State
        ↓
Timers
        ↓
Interactive Applications
Skills Developed

By Exercise 14, these projects provide practical experience with:

Building interactive webpages
Reading and modifying HTML using JavaScript
Processing user input
Validating forms
Managing arrays and objects
Creating CRUD applications
Searching and filtering data
Sorting data
Performing calculations
Working with APIs
Handling asynchronous operations
Handling errors
Saving data locally
Managing application state
Using timers
Randomizing data
Structuring JavaScript applications
Technologies
HTML5
CSS3
JavaScript
Browser DOM API
Fetch API
Web Storage API

No JavaScript framework is required for these exercises.

Purpose
This repository documents my progress in learning JavaScript through practical exercises.
Instead of studying syntax alone, each exercise applies JavaScript concepts to a small application. Every new exercise builds on concepts introduced in previous exercises.
The goal is to develop a strong JavaScript foundation before progressing into larger frontend and full-stack applications

Current Progress: Exercise 14 — Interactive JavaScript Quiz
