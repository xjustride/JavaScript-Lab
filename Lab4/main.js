
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

let notesDiv = document.querySelector('#notes');
const addBtn = document.querySelector('#addNoteBtn');
const clearBtn = document.querySelector('#clearNotesBtn');

clearBtn.addEventListener('click', () => {
    const tytulNotatki = document.querySelector('#noteTitle');
    const trescNotatki = document.querySelector('#note');
    
    tytulNotatki.value = '';
    trescNotatki.value = '';
}
);


addEventListener ('DOMContentLoaded', () => {
    let notatki = [];
    if (localStorage.getItem('notatki')) {
        notatki = JSON.parse(localStorage.getItem('notatki'));
    }
    notatki.forEach(notatka => {
        let noteDiv = document.createElement('div');
        noteDiv.innerHTML = `
            <h2>${notatka.tytul}</h2>
            <p>${notatka.tresc}</p>
            <p>${new Date(notatka.data).toLocaleString()}</p>
            `;
            notesDiv.appendChild(noteDiv);
        });
    });
    
    addBtn.addEventListener('click', () => {
        const tytulNotatki = document.querySelector('#noteTitle');
        const trescNotatki = document.querySelector('#note');
        const colorInput = document.querySelector('#color');  
        const notatka = {
            tytul: tytulNotatki.value,
            tresc: trescNotatki.value,
            data: Date.now()
        }    
        let notatki = [];
        if (localStorage.getItem('notatki')) {
            notatki = JSON.parse(localStorage.getItem('notatki'));
        }    
        notatki.push(notatka);
        localStorage.setItem('notatki', JSON.stringify(notatki));
        notatki.forEach(notatka => {
            let noteDiv = document.createElement('div');
            noteDiv.innerHTML = `
            <h2>${notatka.tytul}</h2>
            <p>${notatka.tresc}</p>
            <p>${new Date(notatka.data).toLocaleString()}</p>
            `;
            noteDiv.style = backgroundColor = colorInput.value; 
            notesDiv.appendChild(noteDiv);
        });    
    });    
    
    