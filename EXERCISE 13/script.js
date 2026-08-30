let notes = JSON.parse(localStorage.getItem("exercise13Notes")) || [];
let editingNoteId = null;
let selectedNoteId = null;
let deleteMode = "single";
let messageTimer;

const noteForm = document.querySelector("#noteForm");
const formTitle = document.querySelector("#formTitle");
const titleInput = document.querySelector("#titleInput");
const categoryInput = document.querySelector("#categoryInput");
const contentInput = document.querySelector("#contentInput");
const titleError = document.querySelector("#titleError");
const categoryError = document.querySelector("#categoryError");
const contentError = document.querySelector("#contentError");
const characterCount = document.querySelector("#characterCount");
const saveButton = document.querySelector("#saveButton");
const cancelButton = document.querySelector("#cancelButton");
const clearAllButton = document.querySelector("#clearAllButton");
const searchInput = document.querySelector("#searchInput");
const filterCategory = document.querySelector("#filterCategory");
const sortNotes = document.querySelector("#sortNotes");
const notesList = document.querySelector("#notesList");
const emptyState = document.querySelector("#emptyState");
const resultText = document.querySelector("#resultText");
const totalNotes = document.querySelector("#totalNotes");
const pinnedNotes = document.querySelector("#pinnedNotes");
const importantNotes = document.querySelector("#importantNotes");
const messageBox = document.querySelector("#messageBox");
const messageText = document.querySelector("#messageText");
const closeMessageButton = document.querySelector("#closeMessageButton");
const confirmModal = document.querySelector("#confirmModal");
const modalTitle = document.querySelector("#modalTitle");
const modalMessage = document.querySelector("#modalMessage");
const cancelDeleteButton = document.querySelector("#cancelDeleteButton");
const confirmDeleteButton = document.querySelector("#confirmDeleteButton");

function saveNotes() {
    localStorage.setItem("exercise13Notes", JSON.stringify(notes));
}

function showMessage(message, type = "success") {
    clearTimeout(messageTimer);

    messageText.textContent = message;
    messageBox.className = "message-box show";

    if (type === "error") {
        messageBox.classList.add("error");
    }

    messageTimer = setTimeout(() => {
        hideMessage();
    }, 4000);
}

function hideMessage() {
    messageBox.classList.remove("show");
}

function showInputError(input, errorElement, message) {
    input.classList.add("invalid");
    errorElement.textContent = message;
}

function clearInputError(input, errorElement) {
    input.classList.remove("invalid");
    errorElement.textContent = "";
}

function validateForm() {
    let isValid = true;

    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const content = contentInput.value.trim();

    clearInputError(titleInput, titleError);
    clearInputError(categoryInput, categoryError);
    clearInputError(contentInput, contentError);

    if (title.length < 3) {
        showInputError(
            titleInput,
            titleError,
            "Title must contain at least 3 characters."
        );

        isValid = false;
    }

    if (category === "") {
        showInputError(
            categoryInput,
            categoryError,
            "Please select a category."
        );

        isValid = false;
    }

    if (content.length < 5) {
        showInputError(
            contentInput,
            contentError,
            "Content must contain at least 5 characters."
        );

        isValid = false;
    }

    return isValid;
}

function resetForm() {
    noteForm.reset();

    editingNoteId = null;
    formTitle.textContent = "Create New Note";
    saveButton.textContent = "Save Note";
    cancelButton.classList.add("hidden");
    characterCount.textContent = "0 / 500";

    clearInputError(titleInput, titleError);
    clearInputError(categoryInput, categoryError);
    clearInputError(contentInput, contentError);
}

function updateSummary() {
    totalNotes.textContent = notes.length;

    pinnedNotes.textContent = notes.filter(note => {
        return note.pinned;
    }).length;

    importantNotes.textContent = notes.filter(note => {
        return note.category === "Important";
    }).length;
}

function formatDate(date) {
    return new Date(date).toLocaleString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

function getFilteredNotes() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const selectedCategory = filterCategory.value;
    const selectedSort = sortNotes.value;

    let filteredNotes = notes.filter(note => {
        const matchesSearch =
            note.title.toLowerCase().includes(searchValue) ||
            note.content.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            note.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    filteredNotes.sort((firstNote, secondNote) => {
        if (firstNote.pinned !== secondNote.pinned) {
            return Number(secondNote.pinned) - Number(firstNote.pinned);
        }

        if (selectedSort === "oldest") {
            return (
                new Date(firstNote.createdAt) -
                new Date(secondNote.createdAt)
            );
        }

        if (selectedSort === "title") {
            return firstNote.title.localeCompare(secondNote.title);
        }

        return (
            new Date(secondNote.createdAt) -
            new Date(firstNote.createdAt)
        );
    });

    return filteredNotes;
}

function createNoteCard(note) {
    const noteCard = document.createElement("article");
    noteCard.className = "note-card";

    if (note.pinned) {
        noteCard.classList.add("pinned");
    }

    const noteHeader = document.createElement("div");
    noteHeader.className = "note-header";

    const noteTitle = document.createElement("h3");
    noteTitle.className = "note-title";
    noteTitle.textContent = note.title;

    const categoryBadge = document.createElement("span");
    categoryBadge.className = "category-badge";
    categoryBadge.textContent = note.category;

    const noteContent = document.createElement("p");
    noteContent.className = "note-content";
    noteContent.textContent = note.content;

    const noteFooter = document.createElement("div");
    noteFooter.className = "note-footer";

    const noteDate = document.createElement("span");
    noteDate.className = "note-date";
    noteDate.textContent = `Created: ${formatDate(note.createdAt)}`;

    const noteActions = document.createElement("div");
    noteActions.className = "note-actions";

    const pinButton = document.createElement("button");
    pinButton.type = "button";
    pinButton.className = "note-button pin";
    pinButton.textContent = note.pinned ? "Unpin" : "Pin";

    pinButton.addEventListener("click", () => {
        togglePin(note.id);
    });

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "note-button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
        editNote(note.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "note-button delete";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        openDeleteModal(note.id);
    });

    noteHeader.append(noteTitle, categoryBadge);
    noteActions.append(pinButton, editButton, deleteButton);
    noteFooter.append(noteDate, noteActions);
    noteCard.append(noteHeader, noteContent, noteFooter);

    return noteCard;
}

function displayNotes() {
    notesList.innerHTML = "";

    const filteredNotes = getFilteredNotes();

    filteredNotes.forEach(note => {
        const noteCard = createNoteCard(note);
        notesList.appendChild(noteCard);
    });

    if (filteredNotes.length === 0) {
        emptyState.style.display = "block";
        resultText.textContent = "No notes available";
    } else {
        emptyState.style.display = "none";

        if (filteredNotes.length === 1) {
            resultText.textContent = "Showing 1 note";
        } else {
            resultText.textContent =
                `Showing ${filteredNotes.length} notes`;
        }
    }

    updateSummary();
}

function createNoteId() {
    return Date.now() + Math.floor(Math.random() * 100000);
}

function addNote() {
    const newNote = {
        id: createNoteId(),
        title: titleInput.value.trim(),
        category: categoryInput.value,
        content: contentInput.value.trim(),
        pinned: false,
        createdAt: new Date().toISOString()
    };

    notes.push(newNote);

    saveNotes();
    displayNotes();
    resetForm();
    showMessage("Note created successfully.");
}

function updateNote() {
    const note = notes.find(note => {
        return note.id === editingNoteId;
    });

    if (!note) {
        showMessage(
            "The selected note could not be found.",
            "error"
        );

        resetForm();
        return;
    }

    note.title = titleInput.value.trim();
    note.category = categoryInput.value;
    note.content = contentInput.value.trim();
    note.updatedAt = new Date().toISOString();

    saveNotes();
    displayNotes();
    resetForm();
    showMessage("Note updated successfully.");
}

function editNote(noteId) {
    const note = notes.find(note => {
        return note.id === noteId;
    });

    if (!note) {
        showMessage(
            "The selected note could not be found.",
            "error"
        );

        return;
    }

    editingNoteId = noteId;

    titleInput.value = note.title;
    categoryInput.value = note.category;
    contentInput.value = note.content;

    characterCount.textContent =
        `${note.content.length} / 500`;

    formTitle.textContent = "Edit Note";
    saveButton.textContent = "Update Note";
    cancelButton.classList.remove("hidden");

    clearInputError(titleInput, titleError);
    clearInputError(categoryInput, categoryError);
    clearInputError(contentInput, contentError);

    document.querySelector(".form-section").scrollIntoView({
        behavior: "smooth"
    });

    titleInput.focus();
}

function togglePin(noteId) {
    const note = notes.find(note => {
        return note.id === noteId;
    });

    if (!note) {
        return;
    }

    note.pinned = !note.pinned;

    saveNotes();
    displayNotes();

    if (note.pinned) {
        showMessage("Note pinned.");
    } else {
        showMessage("Note unpinned.");
    }
}

function openDeleteModal(noteId) {
    selectedNoteId = noteId;
    deleteMode = "single";

    modalTitle.textContent = "Delete Note?";
    modalMessage.textContent =
        "This note will be permanently removed.";
    confirmDeleteButton.textContent = "Delete";

    confirmModal.classList.add("show");
}

function openClearAllModal() {
    if (notes.length === 0) {
        showMessage(
            "There are no notes to clear.",
            "error"
        );

        return;
    }

    selectedNoteId = null;
    deleteMode = "all";

    modalTitle.textContent = "Clear All Notes?";
    modalMessage.textContent =
        "All saved notes will be permanently removed.";
    confirmDeleteButton.textContent = "Clear All";

    confirmModal.classList.add("show");
}

function closeDeleteModal() {
    selectedNoteId = null;
    confirmModal.classList.remove("show");
}

function confirmDelete() {
    if (deleteMode === "all") {
        notes = [];
        resetForm();
        showMessage("All notes were cleared.");
    } else {
        notes = notes.filter(note => {
            return note.id !== selectedNoteId;
        });

        if (editingNoteId === selectedNoteId) {
            resetForm();
        }

        showMessage("Note deleted successfully.");
    }

    saveNotes();
    displayNotes();
    closeDeleteModal();
}

noteForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!validateForm()) {
        showMessage(
            "Please correct the invalid fields.",
            "error"
        );

        return;
    }

    if (editingNoteId !== null) {
        updateNote();
    } else {
        addNote();
    }
});

titleInput.addEventListener("input", () => {
    if (titleInput.value.trim().length >= 3) {
        clearInputError(titleInput, titleError);
    }
});

categoryInput.addEventListener("change", () => {
    if (categoryInput.value !== "") {
        clearInputError(categoryInput, categoryError);
    }
});

contentInput.addEventListener("input", () => {
    characterCount.textContent =
        `${contentInput.value.length} / 500`;

    if (contentInput.value.trim().length >= 5) {
        clearInputError(contentInput, contentError);
    }
});

searchInput.addEventListener("input", displayNotes);
filterCategory.addEventListener("change", displayNotes);
sortNotes.addEventListener("change", displayNotes);
cancelButton.addEventListener("click", resetForm);
clearAllButton.addEventListener("click", openClearAllModal);
cancelDeleteButton.addEventListener("click", closeDeleteModal);
confirmDeleteButton.addEventListener("click", confirmDelete);
closeMessageButton.addEventListener("click", hideMessage);

confirmModal.addEventListener("click", event => {
    if (event.target === confirmModal) {
        closeDeleteModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeDeleteModal();
    }
});

displayNotes();