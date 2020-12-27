'use strict'; // Enables strict mode to make errors more visible.

document.querySelector('#saveNote').addEventListener("click", () => {
    return verifyNote();
})

function readNotes() {
    let retrievedNote = localStorage.getItem('notebook');
    notebook = JSON.parse(retrievedNote);
    notebook.forEach((v, i) => {
        console.log('Valor: ', v.name);
        console.log('Index', i);
        console.log('-------------');
        
    })
    console.log(notebook)
}

// Create notes with a template.
function createNote(notename, notelink, notetext) {
    if (localStorage.getItem('notebook') == null) {
        let notebook = [{}];
        notebook[0] = {};
        notebook[0].name = notename;
        notebook[0].link = notelink;
        notebook[0].text = notetext;
        localStorage.setItem('notebook', JSON.stringify(notebook));
        console.log(notebook);
    } else {
        let retrievedNote = localStorage.getItem('notebook');
        let notebook = JSON.parse(retrievedNote);
        console.log(notebook);
        let t = notebook.length;
        console.log(t);
        console.log(notebook[0]);
        
        notebook.push({});
        console.log(notebook);
        notebook[t] = {};
        notebook[t].name = notename;
        notebook[t].link = notelink;
        notebook[t].text = notetext;

        localStorage.setItem('notebook', JSON.stringify(notebook));
    }
}

// Erase notes by index.
function eraseNote(i) {
    let retrievedNote = localStorage.getItem('notebook');
    notebook = JSON.parse(retrievedNote);
    console.log(notebook);
    notebook.splice(i-1, 1);
    console.log(`O valor de i é ${i}.`);
    console.log(notebook);
    localStorage.setItem('notebook', JSON.stringify(notebook));
}

// Validates notes before saving.
function verifyNote() {
    let newNote = {
        'name': document.querySelector('#typeNoteName'),
        'link': document.querySelector('#typeProjectURL'),
        'note': document.querySelector('#typeNotes')
    }

    console.log(newNote.name.value);
    console.log(newNote.link.value);
    console.log(newNote.note.value);

    if (newNote.note.value == '' || newNote.name.value == '') {
        alert('Você precisa digitar algo no nome da nota e conteúdo.');
    } else {
        return createNote(newNote.name.value, newNote.link.value, newNote.note.value);
    }
}

