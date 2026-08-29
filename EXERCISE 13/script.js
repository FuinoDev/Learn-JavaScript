let notes = JSON.parse(localStorage.getItem("exercise13Notes")) || [];
let editingNoteId = null;
let selectedNoteId = null;
let deleteMode = "single";
let messageTimer;
