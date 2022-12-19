const notesContainer = document.getElementById("notes-container");
const addNoteButton = document.querySelector(".add-note-btn");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => {
    addNote();
});

function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const noteElement = document.createElement("textarea");
    noteElement.classList.add("note");
    noteElement.placeholder = "Your note here!";
    noteElement.innerText = content;

    noteElement.addEventListener("change", () => {
        updateNote(id, noteElement.value);
    });

    noteElement.addEventListener("dblclick", () => {
        deleteNote(id, noteElement);
    });

    return noteElement;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    }

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContet) {
    const notes = getNotes();
    const updatedNote = notes.filter(note => note.id === id)[0];
    updatedNote.content = newContet;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id !== id);
    saveNotes(notes);
    notesContainer.removeChild(element);
}