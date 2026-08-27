const studentForm = document.querySelector("#studentForm");
const studentName = document.querySelector("#studentName");
const studentAge = document.querySelector("#studentAge");
const studentGender = document.querySelector("#studentGender");
const studentCourse = document.querySelector("#studentCourse");

const studentList = document.querySelector("#studentList");
const emptyMessage = document.querySelector("#emptyMessage");

const totalStudents = document.querySelector("#totalStudents");
const averageAge = document.querySelector("#averageAge");
const maleStudents = document.querySelector("#maleStudents");
const femaleStudents = document.querySelector("#femaleStudents");

const searchInput = document.querySelector("#searchInput");
const filterCourse = document.querySelector("#filterCourse");
const sortStudent = document.querySelector("#sortStudent");

const formTitle = document.querySelector("#formTitle");
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");

let students = [
    {
        id: 1,
        name: "Joshua",
        age: 20,
        gender: "Male",
        course: "BSIT"
    },
    {
        id: 2,
        name: "Maria",
        age: 19,
        gender: "Female",
        course: "BSBA"
    },
    {
        id: 3,
        name: "Daniel",
        age: 21,
        gender: "Male",
        course: "BSCS"
    }
];

let editingStudentId = null;

function setInvalid(input, message) {

    input.classList.remove("valid");
    input.classList.add("invalid");

    removeError(input);

    const error = document.createElement("small");

    error.classList.add("input-error");
    error.textContent = message;

    input.parentElement.appendChild(error);
}

function setValid(input) {

    input.classList.remove("invalid");
    input.classList.add("valid");

    removeError(input);
}

function removeError(input) {

    const oldError =
        input.parentElement.querySelector(".input-error");

    if (oldError) {
        oldError.remove();
    }
}

function validateName() {

    const name = studentName.value.trim();

    if (name === "") {
        setInvalid(
            studentName,
            "Student name is required."
        );

        return false;
    }

    if (name.length < 2) {
        setInvalid(
            studentName,
            "Name must contain at least 2 characters."
        );

        return false;
    }

    setValid(studentName);

    return true;
}

function validateAge() {

    const age = Number(studentAge.value);

    if (
        studentAge.value === "" ||
        isNaN(age)
    ) {
        setInvalid(
            studentAge,
            "Age is required."
        );

        return false;
    }

    if (age < 15 || age > 100) {
        setInvalid(
            studentAge,
            "Age must be between 15 and 100."
        );

        return false;
    }

    setValid(studentAge);

    return true;
}

function validateGender() {

    if (studentGender.value === "") {
        setInvalid(
            studentGender,
            "Please select a gender."
        );

        return false;
    }

    setValid(studentGender);

    return true;
}

function validateCourse() {

    if (studentCourse.value === "") {
        setInvalid(
            studentCourse,
            "Please select a course."
        );

        return false;
    }

    setValid(studentCourse);

    return true;
}

function validateForm() {

    const nameValid = validateName();
    const ageValid = validateAge();
    const genderValid = validateGender();
    const courseValid = validateCourse();

    return (
        nameValid &&
        ageValid &&
        genderValid &&
        courseValid
    );
}

function displayStudents() {

    const searchValue =
        searchInput.value.toLowerCase();

    const selectedCourse =
        filterCourse.value;

    const selectedSort =
        sortStudent.value;

    let filteredStudents = students.filter(function(student) {

        const matchesSearch =
            student.name
                .toLowerCase()
                .includes(searchValue);

        const matchesCourse =
            selectedCourse === "All" ||
            student.course === selectedCourse;

        return matchesSearch && matchesCourse;
    });

    if (selectedSort === "nameAsc") {

        filteredStudents.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    if (selectedSort === "nameDesc") {

        filteredStudents.sort(function(a, b) {
            return b.name.localeCompare(a.name);
        });
    }

    if (selectedSort === "ageAsc") {

        filteredStudents.sort(function(a, b) {
            return a.age - b.age;
        });
    }

    if (selectedSort === "ageDesc") {

        filteredStudents.sort(function(a, b) {
            return b.age - a.age;
        });
    }

    studentList.innerHTML = "";

    if (filteredStudents.length === 0) {

        emptyMessage.style.display = "block";

        return;
    }

    emptyMessage.style.display = "none";

    filteredStudents.forEach(function(student) {

        const card =
            document.createElement("div");

        card.classList.add("student-card");

        card.innerHTML = `
            <div class="student-info">

                <h3>${student.name}</h3>

                <p>Age: ${student.age}</p>

                <p>Gender: ${student.gender}</p>

                <p>Course: ${student.course}</p>

            </div>

            <div class="student-actions">

                <button
                    class="edit-button"
                    onclick="editStudent(${student.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-button"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </div>
        `;

        studentList.appendChild(card);
    });
}

function updateStatistics() {

    totalStudents.textContent =
        students.length;

    const totalAge =
        students.reduce(function(sum, student) {
            return sum + student.age;
        }, 0);

    if (students.length === 0) {

        averageAge.textContent = "0";

    } else {

        averageAge.textContent =
            (totalAge / students.length).toFixed(1);
    }

    const maleCount =
        students.filter(function(student) {
            return student.gender === "Male";
        }).length;

    const femaleCount =
        students.filter(function(student) {
            return student.gender === "Female";
        }).length;

    maleStudents.textContent = maleCount;
    femaleStudents.textContent = femaleCount;
}

studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const name =
            studentName.value.trim();

        const age =
            Number(studentAge.value);

        const gender =
            studentGender.value;

        const course =
            studentCourse.value;

        if (editingStudentId !== null) {

            const studentIndex =
                students.findIndex(function(student) {
                    return student.id === editingStudentId;
                });

            students[studentIndex].name = name;
            students[studentIndex].age = age;
            students[studentIndex].gender = gender;
            students[studentIndex].course = course;

            editingStudentId = null;

            formTitle.textContent =
                "Add Student";

            submitButton.textContent =
                "Add Student";

            cancelButton.style.display =
                "none";

        } else {

            const newStudent = {
                id: Date.now(),
                name: name,
                age: age,
                gender: gender,
                course: course
            };

            students.push(newStudent);
        }

        studentForm.reset();

        clearValidation();

        displayStudents();

        updateStatistics();
    }
);

function editStudent(id) {

    const student =
        students.find(function(student) {
            return student.id === id;
        });

    if (!student) {
        return;
    }

    studentName.value =
        student.name;

    studentAge.value =
        student.age;

    studentGender.value =
        student.gender;

    studentCourse.value =
        student.course;

    editingStudentId = id;

    formTitle.textContent =
        "Edit Student";

    submitButton.textContent =
        "Update Student";

    cancelButton.style.display =
        "block";

    clearValidation();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteStudent(id) {

    const student =
        students.find(function(student) {
            return student.id === id;
        });

    if (!student) {
        return;
    }

    const confirmDelete =
        confirm(`Delete ${student.name}?`);

    if (!confirmDelete) {
        return;
    }

    students =
        students.filter(function(student) {
            return student.id !== id;
        });

    if (editingStudentId === id) {
        cancelEdit();
    }

    displayStudents();

    updateStatistics();
}

function clearValidation() {

    const inputs = [
        studentName,
        studentAge,
        studentGender,
        studentCourse
    ];

    inputs.forEach(function(input) {

        input.classList.remove(
            "invalid",
            "valid"
        );

        removeError(input);
    });
}

function cancelEdit() {

    editingStudentId = null;

    studentForm.reset();

    clearValidation();

    formTitle.textContent =
        "Add Student";

    submitButton.textContent =
        "Add Student";

    cancelButton.style.display =
        "none";
}

cancelButton.addEventListener(
    "click",
    function() {
        cancelEdit();
    }
);

studentName.addEventListener(
    "blur",
    validateName
);

studentAge.addEventListener(
    "blur",
    validateAge
);

studentGender.addEventListener(
    "change",
    validateGender
);

studentCourse.addEventListener(
    "change",
    validateCourse
);

studentName.addEventListener(
    "input",
    function() {

        if (
            studentName.classList.contains("invalid")
        ) {
            validateName();
        }
    }
);

studentAge.addEventListener(
    "input",
    function() {

        if (
            studentAge.classList.contains("invalid")
        ) {
            validateAge();
        }
    }
);

searchInput.addEventListener(
    "input",
    function() {
        displayStudents();
    }
);

filterCourse.addEventListener(
    "change",
    function() {
        displayStudents();
    }
);

sortStudent.addEventListener(
    "change",
    function() {
        displayStudents();
    }
);

displayStudents();

updateStatistics();