let count = 0;

const countElement = document.querySelector("#count");
const increaseButton = document.querySelector("#increase");
const decreaseButton = document.querySelector("#decrease");
const resetButton = document.querySelector("#reset");
const doubleButton = document.querySelector("#double");
const stepInput = document.querySelector("#step-input");

increaseButton.addEventListener("click", function () {
    const step = Number(stepInput.value);
    count = count + step;
    countElement.textContent = count;
});

decreaseButton.addEventListener("click", function () {
    const step = Number(stepInput.value);
    if (count - step >= 0) {
        count = count - step;
    }
    countElement.textContent = count;
});

resetButton.addEventListener("click", function () {
    count = 0;
    countElement.textContent = count;
});

doubleButton.addEventListener("click", function () {
    count = count * 2;
    countElement.textContent = count;
});