
const terazTimeStamp = Date.now();
// Date.now(); 
const wczoraj = new Date(terazTimeStamp);
console.log(wczoraj.toLocaleTimeString());
//tolocaletimestring - zwaraca czas lokalny komputera wyswietla date i czas w formacie lokalnym
console.log(wczoraj.toISOString()); // zwraca date w formacie ISO (zawsze UTC) ten standard uwzglednia wszystko
//const numbers = [1, 2, 3, 4, 5];
//localStorage.SetItem('numbers', JSON.stringify(numbers)); // zapisuje notatke w local storage
//const numbersFromLocalStorage = JSON.parse(localStorage.getItem(`numbers`)); // odczytuje notatke z local storage
//console.log(numbersFromLocalStorage);
const clearBtn = document.querySelector('#clearNotesBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const notes = document.querySelector('.notes');
let noteTitle = document.querySelector('#noteTitle');
let noteValue = document.querySelector('#note');
let notesDiv = document.querySelector('.allNotes');
let noteColor = document.querySelector('#color')
let data = localStorage.getItem('data');
let notatki = data ? JSON.parse(data) : []
const addBtn = document.querySelector('#addNoteBtn').addEventListener('click', addNewNote);

clearBtn.addEventListener('click', () => {
    noteTitle.value = '';
    noteValue.value = '';
}
);


function Note(Title, Value, Color)
{
    this.noteTitle = Title;
    this.noteValue = Value;
    this.noteColor = Color;
    this.created = new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString().slice(0, 5);
}

function addNewNote(){
    if(noteTitle.value == "")
    {
    alert("Note without title? Why????");
    }
    else if (noteValue.value == "")
    {
        alert("Pls enter something...")
    }
    else {
        let note = new Note(noteTitle.value, noteValue.value, noteColor.value)
        notatki.push(note)
        localStorage.setItem('data', JSON.stringify(notatki))
        console.log(notatki)
        const newNote = document.createElement('div');
        newNote.innerHTML = `
        <div class = "newNote" style = "background-color: ${note.noteColor}; padding: 40px; border-radius: 20px;">
            <p class = "titleOfNote>">Title: ${noteTitle.value}</p>
            <p class = "valueOfNote>">Content: ${noteValue.value}</p>
            <p class = "created">Created: ${note.created}</p>
            <button class = "deleteNoteBtn">Usuń notatkę</button>
        </div>
        <br>
        `
        location.reload();
        notesDiv.appendChild(newNote);
    }
}

function displayNotes(){
    notatki.forEach(note => {
        const newNote = document.createElement('div');
        newNote.innerHTML = `
        <div class = "newNote" style = "background-color: ${note.noteColor}; padding: 40px; border-radius: 20px;">
            <label class="pinezka-checkbox">
            <input type="checkbox"/>
            <span class="checkmark"></span>
            </label>
            <br>
            <p class = "titleOfNote>">Title: ${note.noteTitle}</p>
            <p class = "valueOfNote>">Content: ${note.noteValue}</p>
            <p class = "created">Created: ${note.created}</p>
            <button class = "deleteNoteBtn">Usuń notatkę</button>
        </div>
        <br>
        `
        const deleteNoteBtn = newNote.querySelector('.deleteNoteBtn');
        deleteNoteBtn.addEventListener('click', () => {
            const isConfirmed = confirm('Czy napewno chcesz usunąć notatkę?');
            if (isConfirmed) {
                notatki.splice(notatki.indexOf(note), 1);
                localStorage.setItem('data', JSON.stringify(notatki));
                location.reload();
            }
        });
        notesDiv.appendChild(newNote);

        const pinezka = newNote.querySelector('.pinezka-checkbox');
        pinezka.addEventListener('click', () => {
            notatki.forEach(function(item,i){
                if(item.id === "kjfdhg87"){
                  data.splice(i, 1);
                  data.unshift(item);
                }
              });
        });
    });

}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    displayNotes();
    
});



deleteBtn.addEventListener('click', () => {
    const isConfirmed = confirm('Czy napewno chcesz usunąć wszystkie notatki?');
    
    if (isConfirmed) {
        localStorage.removeItem('data');
        notatki = [];
        console.log('Wszystkie notatki zostały usunięte.');
        location.reload();
    }
});