let students = [];

const studentNameInput = document.querySelector("#studentNameInput");
const gradeInput = document.querySelector("#gradeInput");
const addStudentButton = document.querySelector("#addStudentButton");
const studentList = document.querySelector("#studentList");
const studentCount = document.querySelector("#studentCount");
const totalStudents = document.querySelector("#totalStudents");
const averageGrade = document.querySelector("#averageGrade");
const highestGrade = document.querySelector("#highestGrade");
const lowestGrade = document.querySelector("#lowestGrade");

const nameError = document.querySelector("#nameError");
const gradeError = document.querySelector("#gradeError");
const errorMessage = document.querySelector("#errorMessage");
const errorText = document.querySelector("#errorText");
const closeErrorButton = document.querySelector("#closeErrorButton");

const successMessage = document.querySelector("#successMessage");
const successText = document.querySelector("#successText");
const closeSuccessButton = document.querySelector("#closeSuccessButton");

addStudentButton.addEventListener("click", addStudent);
function addStudent() {
    clearValidation();

    const studentName = studentNameInput.value.trim();
    const gradeValue = gradeInput.value.trim();
    let isValid = true;

    if (studentName === "") {
        nameError.textContent = "Student name is required.";
        studentNameInput.classList.add("input-invalid");
        isValid = false;
    } else if (studentName.length < 2) {
        nameError.textContent = "Name must be at least 2 characters.";
        studentNameInput.classList.add("input-invalid");
        isValid = false;
    } else if (!/[a-zA-Z]/.test(studentName)) {
        nameError.textContent = "Name must contain letters.";
        studentNameInput.classList.add("input-invalid");
        isValid = false;
    } else {
        studentNameInput.classList.add("input-valid");
    }

    if (gradeValue === "") {
        gradeError.textContent = "Grade is required.";
        gradeInput.classList.add("input-invalid");
        isValid = false;
    } else {
        const grade = Number(gradeValue);

        if (grade < 0 || grade > 100) {
            gradeError.textContent = "Grade must be between 0 and 100.";
            gradeInput.classList.add("input-invalid");
            isValid = false;
        } else {
            gradeInput.classList.add("input-valid");
        }
    }

    if (!isValid) {
        showError("Please correct the highlighted fields.");
        return;
    }

    const grade = Number(gradeValue);

    const duplicateStudent = students.some(student => {
        return student.name.toLowerCase() === studentName.toLowerCase();
    });

    if (duplicateStudent) {
        nameError.textContent = "Student name already exists.";
        studentNameInput.classList.add("input-invalid");
        showError("This student has already been added.");
        return;
    }

    const student = {
        id: Date.now(),
        name: studentName,
        grade: grade
    };

    students.push(student);

    displayStudents();
    updateSummary();

    showSuccess(`${studentName} was added successfully.`);

    studentNameInput.value = "";
    gradeInput.value = "";

    clearValidation();
    studentNameInput.focus();
}

function displayStudents() {
    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = `
            <p class="empty-message">
                No students added yet.
            </p>
        `;
        return;
    }

    students.forEach(student => {
        const studentCard = document.createElement("div");
        studentCard.classList.add("student-card");

        const status = student.grade >= 75 ? "PASSED" : "FAILED";
        const statusClass = student.grade >= 75 ? "passed" : "failed";

        studentCard.innerHTML = `
            <div class="student-info">
                <h3>${student.name}</h3>
                <p>Grade: ${student.grade.toFixed(2)}</p>
            </div>

            <div class="student-grade">
                <span class="grade">${student.grade.toFixed(2)}</span>
                <span class="status ${statusClass}">${status}</span>
                <br>
                <button class="delete-button" data-id="${student.id}">
                    Delete
                </button>
            </div>
        `;

        studentList.appendChild(studentCard);
    });

    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            deleteStudent(id);
        });
    });
}

function deleteStudent(id) {
    const student = students.find(student => {
        return student.id === id;
    });

    if (!student) {
        return;
    }

    students = students.filter(student => {
        return student.id !== id;
    });

    displayStudents();
    updateSummary();
    showSuccess(`${student.name} was deleted.`);
}

function updateSummary() {
    const count = students.length;

    totalStudents.textContent = count;
    studentCount.textContent = count === 1 ? "1 Student" : `${count} Students`;

    if (count === 0) {
        averageGrade.textContent = "0.00";
        highestGrade.textContent = "0.00";
        lowestGrade.textContent = "0.00";
        return;
    }

    const total = students.reduce((sum, student) => {
        return sum + student.grade;
    }, 0);

    const average = total / count;

    const highest = Math.max(
        ...students.map(student => student.grade)
    );

    const lowest = Math.min(
        ...students.map(student => student.grade)
    );

    averageGrade.textContent = average.toFixed(2);
    highestGrade.textContent = highest.toFixed(2);
    lowestGrade.textContent = lowest.toFixed(2);
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
    nameError.textContent = "";
    gradeError.textContent = "";

    studentNameInput.classList.remove("input-invalid");
    studentNameInput.classList.remove("input-valid");
    gradeInput.classList.remove("input-invalid");
    gradeInput.classList.remove("input-valid");

    errorMessage.classList.remove("show");
}

closeErrorButton.addEventListener("click", () => {
    errorMessage.classList.remove("show");
});

closeSuccessButton.addEventListener("click", () => {
    successMessage.classList.remove("show");
});