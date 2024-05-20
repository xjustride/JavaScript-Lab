const terazTimeStamp = Date.now();
const wczoraj = new Date(terazTimeStamp);
console.log(wczoraj.toLocaleTimeString());
console.log(wczoraj.toISOString());

const clearBtn = document.querySelector('#clearNotesBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const notes = document.querySelector('.notes');
let noteTitle = document.querySelector('#noteTitle');
let noteTags = document.querySelector('#noteTags');
let noteValue = document.querySelector('#note');
let notesDiv = document.querySelector('.allNotes');
let noteColor = document.querySelector('#color');
let data = localStorage.getItem('data');
let notatki = data ? JSON.parse(data) : [];
const addBtn = document.querySelector('#addNoteBtn').addEventListener('click', addNewNote);

clearBtn.addEventListener('click', () => {
    noteTitle.value = '';
    noteValue.value = '';
    noteTags.value = '';
});

function Note (Title, Value, Color, Tags) {
    this.noteTitle = Title;
    this.noteValue = Value;
    this.noteColor = Color;
    this.noteTags = Tags;
    this.created = new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString().slice(0, 5);
    this.pinned = false;
}

function createNoteElement(note) {
    const newNote = document.createElement('div');
    newNote.innerHTML = `
        <div class="newNote" style="background-color: ${note.noteColor}; padding: 40px; border-radius: 20px;">
            <label class="pinezka-checkbox">
                <input type="checkbox" ${note.pinned ? 'checked' : ''}/> 
                <span class="checkmark"></span>
            </label>
            <br>
            <br>
            <br>
            <p class="titleOfNote">Title: ${note.noteTitle}</p>
            <p class="valueOfNote">Content: ${note.noteValue}</p>
            <p class="created">Created: ${note.created}</p>
            <p class="tags">Tagi: ${note.noteTags}</p>
            <button class="deleteNoteBtn">Usuń notatkę</button>
        </div>
        <br>
    `;

    const deleteNoteBtn = newNote.querySelector('.deleteNoteBtn');
    deleteNoteBtn.addEventListener('click', () => {
        const isConfirmed = confirm('Czy napewno chcesz usunąć notatkę?');
        if (isConfirmed) {
            notatki.splice(notatki.indexOf(note), 1);
            localStorage.setItem('data', JSON.stringify(notatki));
            notesDiv.removeChild(newNote);
        }
    });

    const pinezka = newNote.querySelector('input[type="checkbox"]');
    pinezka.addEventListener('change', () => {
        note.pinned = pinezka.checked;
        if (note.pinned) {
            notatki.splice(notatki.indexOf(note), 1);
            notatki.unshift(note);
        } else {
            notatki.splice(notatki.indexOf(note), 1);
            notatki.push(note);
        }
        localStorage.setItem('data', JSON.stringify(notatki));
        notesDiv.removeChild(newNote);
        displayNotes();
    });

    return newNote;
}

function addNewNote() {
    if (noteTitle.value == "") {
        alert("Note without title? Why????");
    } else if (noteValue.value == "") {
        alert("Pls enter something...");
    } else {
        let note = new Note (noteTitle.value, noteValue.value, noteColor.value, noteTags.value);
        notatki.push(note);
        localStorage.setItem('data', JSON.stringify(notatki));
        const newNote = createNoteElement(note);
        notesDiv.appendChild(newNote);
        noteTitle.value = '';
        noteValue.value = '';
        noteTags.value = '';
    }
}

function displayNotes() {
    notesDiv.innerHTML = '';
    notatki.forEach(note => {
        const newNote = createNoteElement(note);
        notesDiv.appendChild(newNote);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    displayNotes();
});

deleteBtn.addEventListener('click', () => {
    const isConfirmed = confirm('Czy napewno chcesz usunąć wszystkie notatki?');
    if (isConfirmed) {
        localStorage.removeItem('data');
        notatki = [];
        console.log('Wszystkie notatki zostały usunięte.');
        notesDiv.innerHTML = '';
    }
});
