// Questions
const questions = [
    {
        question: "Which keyword is used to declare a variable that can be reassigned?",
        answers: [
            "const",
            "let",
            "static",
            "define"
        ],
        correct: "let"
    },
    {
        question: "Which method selects an element using its CSS selector?",
        answers: [
            "document.getElement()",
            "document.querySelector()",
            "document.select()",
            "document.find()"
        ],
        correct: "document.querySelector()"
    },
    {
        question: "Which array method adds an item to the end of an array?",
        answers: [
            "push()",
            "pop()",
            "shift()",
            "slice()"
        ],
        correct: "push()"
    },
    {
        question: "What does === check in JavaScript?",
        answers: [
            "Only value",
            "Only data type",
            "Value and data type",
            "Variable name"
        ],
        correct: "Value and data type"
    },
    {
        question: "Which method converts a JavaScript object into a JSON string?",
        answers: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.object()"
        ],
        correct: "JSON.stringify()"
    },
    {
        question: "What does event.preventDefault() do?",
        answers: [
            "Deletes an event",
            "Stops the browser's default action",
            "Refreshes the page",
            "Creates a new event"
        ],
        correct: "Stops the browser's default action"
    },
    {
        question: "Which function repeatedly executes code after a specific time interval?",
        answers: [
            "setTimeout()",
            "setInterval()",
            "repeat()",
            "delay()"
        ],
        correct: "setInterval()"
    },
    {
        question: "Which storage keeps data even after the browser is closed?",
        answers: [
            "sessionStorage",
            "temporaryStorage",
            "localStorage",
            "browserMemory"
        ],
        correct: "localStorage"
    },
    {
        question: "Which array method creates a new array containing elements that pass a test?",
        answers: [
            "find()",
            "filter()",
            "forEach()",
            "push()"
        ],
        correct: "filter()"
    },
    {
        question: "Which array method returns a single accumulated value?",
        answers: [
            "reduce()",
            "map()",
            "filter()",
            "sort()"
        ],
        correct: "reduce()"
    }
];

// Elements
const startScreen = document.querySelector("#startScreen");
const quizScreen = document.querySelector("#quizScreen");
const resultScreen = document.querySelector("#resultScreen");

const startButton = document.querySelector("#startButton");
const nextButton = document.querySelector("#nextButton");
const restartButton = document.querySelector("#restartButton");

const questionCount = document.querySelector("#questionCount");
const bestScore = document.querySelector("#bestScore");

const currentQuestionNumber = document.querySelector("#currentQuestionNumber");
const totalQuestions = document.querySelector("#totalQuestions");
const questionText = document.querySelector("#questionText");
const answerContainer = document.querySelector("#answerContainer");

const timer = document.querySelector("#timer");
const progressBar = document.querySelector("#progressBar");
const scoreText = document.querySelector("#scoreText");

const finalScore = document.querySelector("#finalScore");
const finalTotal = document.querySelector("#finalTotal");
const correctAnswers = document.querySelector("#correctAnswers");
const incorrectAnswers = document.querySelector("#incorrectAnswers");
const percentage = document.querySelector("#percentage");
const resultBestScore = document.querySelector("#resultBestScore");
const resultMessage = document.querySelector("#resultMessage");

// State
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval = null;
let answered = false;

// Storage
let storedBestScore = Number(localStorage.getItem("exercise14BestScore")) || 0;

// Initialize
questionCount.textContent = questions.length;
totalQuestions.textContent = questions.length;
bestScore.textContent = storedBestScore;

// Shuffle array
function shuffleArray(array) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffledArray[i], shuffledArray[randomIndex]] =
            [shuffledArray[randomIndex], shuffledArray[i]];
    }

    return shuffledArray;
}

// Change screen
function showScreen(screen) {
    startScreen.classList.remove("active");
    quizScreen.classList.remove("active");
    resultScreen.classList.remove("active");

    screen.classList.add("active");
}

// Start quiz
function startQuiz() {
    quizQuestions = shuffleArray(questions);

    currentQuestionIndex = 0;
    score = 0;
    answered = false;

    scoreText.textContent = `Score: ${score}`;

    showScreen(quizScreen);

    displayQuestion();
}

// Display question
function displayQuestion() {
    clearInterval(timerInterval);

    answered = false;
    timeLeft = 15;

    nextButton.disabled = true;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionNumber.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentQuestion.question;

    const progress =
        ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    progressBar.style.width = `${progress}%`;

    answerContainer.innerHTML = "";

    const shuffledAnswers = shuffleArray(currentQuestion.answers);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(button, answer);
        });

        answerContainer.appendChild(button);
    });

    startTimer();
}

// Start timer
function startTimer() {
    updateTimer();

    timerInterval = setInterval(() => {
        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeExpired();
        }
    }, 1000);
}

// Update timer
function updateTimer() {
    timer.textContent = `${timeLeft}s`;

    timer.classList.remove("warning", "danger");

    if (timeLeft <= 5) {
        timer.classList.add("danger");
    } else if (timeLeft <= 10) {
        timer.classList.add("warning");
    }
}

// Select answer
function selectAnswer(selectedButton, selectedAnswer) {
    if (answered) {
        return;
    }

    answered = true;

    clearInterval(timerInterval);

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const answerButtons =
        document.querySelectorAll(".answer-button");

    answerButtons.forEach(button => {
        button.disabled = true;

        if (button.textContent === currentQuestion.correct) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === currentQuestion.correct) {
        selectedButton.classList.add("correct");

        score++;

        scoreText.textContent = `Score: ${score}`;
    } else {
        selectedButton.classList.add("incorrect");
    }

    nextButton.disabled = false;
}

// Time expired
function timeExpired() {
    if (answered) {
        return;
    }

    answered = true;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const answerButtons =
        document.querySelectorAll(".answer-button");

    answerButtons.forEach(button => {
        button.disabled = true;

        if (button.textContent === currentQuestion.correct) {
            button.classList.add("correct");
        }
    });

    nextButton.disabled = false;
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    clearInterval(timerInterval);

    const total = quizQuestions.length;
    const incorrect = total - score;
    const scorePercentage = Math.round((score / total) * 100);

    if (score > storedBestScore) {
        storedBestScore = score;

        localStorage.setItem(
            "exercise14BestScore",
            storedBestScore
        );
    }

    finalScore.textContent = score;
    finalTotal.textContent = total;
    correctAnswers.textContent = score;
    incorrectAnswers.textContent = incorrect;
    percentage.textContent = `${scorePercentage}%`;
    resultBestScore.textContent = storedBestScore;
    bestScore.textContent = storedBestScore;

    resultMessage.textContent = getResultMessage(scorePercentage);

    showScreen(resultScreen);
}

// Result message
function getResultMessage(scorePercentage) {
    if (scorePercentage === 100) {
        return "Perfect score. You have a strong understanding of these JavaScript concepts.";
    }

    if (scorePercentage >= 80) {
        return "Great work. You understand most of the JavaScript concepts in this quiz.";
    }

    if (scorePercentage >= 60) {
        return "Good progress. Review the questions you missed and try again.";
    }

    return "Keep practicing. Review the JavaScript fundamentals and try the quiz again.";
}

// Restart quiz
function restartQuiz() {
    startQuiz();
}

// Events
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);