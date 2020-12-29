'use strict'; // Enables strict mode to make errors more visible.

document.querySelector('#saveNote').addEventListener("click", () => {
    return verifyNote();
})

document.querySelector('#typeNotes').addEventListener("keydown", (k) => {
    if (k.key === "Enter") {
        return verifyNote()
    }
})

function readNotes() {
    document.querySelector('#notesArea').innerHTML = '';
    let retrievedNote = localStorage.getItem('notebook');
    let notebook = JSON.parse(retrievedNote);
    console.log(notebook)
    if (notebook != null) {
        notebook.forEach((v, i) => {
            let name = v.name;
            let link = v.link;
            let text = v.text;
            console.log('Valor: ', v.name);
            console.log('Valor: ', v.link);
            console.log('Valor: ', v.text);
            console.log('Index', i);
            console.log('-------------');
            return createTemplate(i, name, link, text)
        })
    }
    

    function createTemplate(n, name, link, text) {
        
        let card = document.createElement('div');
        card.id = `noteid-${n}`;
        card.className = 'notes_card';

        document.querySelector('#notesArea').appendChild(card);
        
        let noteCard = document.querySelector(`#noteid-${n}`);
        let labelName = document.createElement('label');
        let typeBoxName = document.createElement('input');
        let labelLink = document.createElement('label');
        let typeBoxLink = document.createElement('input');
        let labelNote = document.createElement('label');
        let typeBoxNote = document.createElement('textarea');
        let deleteNoteButton = document.createElement('img');
        let updateNoteButton = document.createElement('input');

        deleteNoteButton.src = "../img/error.png";
        deleteNoteButton.className = "deleteNoteButton";
        deleteNoteButton.addEventListener("click", () => {
            eraseNote(n);
            return readNotes();
        });

        labelName.className = "notesLayout";
        labelName.innerText = "Note name:";
        labelLink.className = "notesLayout";
        labelLink.innerText = "Link:";
        labelNote.className = "notesLayout";
        labelNote.innerText = "Your note:";

        typeBoxName.type = 'text';
        typeBoxName.id = `typeBox-noteName-${n}`;
        typeBoxName.className = 'notetypeBox';
        typeBoxName.value = name;

        typeBoxLink.type = 'text';
        typeBoxLink.id = `typeBox-noteName-${n}`;
        typeBoxLink.className = 'notetypeBox';
        typeBoxLink.value = link;

        typeBoxNote.id = `typeBox-noteName-${n}`;
        typeBoxNote.className = 'notetypeBox';
        typeBoxNote.value = text;

        updateNoteButton.type = 'button'
        updateNoteButton.className = 'updateNoteButton'
        updateNoteButton.value = 'Update'
        updateNoteButton.addEventListener("click", () => {
            return updateNote(n, typeBoxName.value, typeBoxLink.value, typeBoxNote.value)
        })

        noteCard.appendChild(deleteNoteButton);
        noteCard.appendChild(labelName);
        noteCard.appendChild(typeBoxName);
        noteCard.appendChild(labelLink);
        noteCard.appendChild(typeBoxLink);
        noteCard.appendChild(labelNote);
        noteCard.appendChild(typeBoxNote);
        noteCard.appendChild(updateNoteButton)
       

        return console.log(noteCard)
    }
    
    /*
    let retrievedNote = localStorage.getItem('notebook');
    notebook = JSON.parse(retrievedNote);
    notebook.forEach((v, i) => {
        console.log('Valor: ', v.name);
        console.log('Index', i);
        console.log('-------------');
        
    })
    console.log(notebook)
    */
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

    return readNotes()
}

function updateNote(id, name, link, text) {
    let retrievedNote = localStorage.getItem('notebook');
    let notebook = JSON.parse(retrievedNote);
    notebook[id].name = name;
    notebook[id].link = link;
    notebook[id].text = text;
    return localStorage.setItem('notebook', JSON.stringify(notebook));
}

// Erase notes by index.
function eraseNote(i) {
    let retrievedNote = localStorage.getItem('notebook');
    let notebook = JSON.parse(retrievedNote);
    console.log(notebook);
    notebook.splice(i, 1);
    console.log(`Delete note: ${i}.`);
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
        alert('You need to type something in the note name and content.');
    } else {
        return createNote(newNote.name.value, newNote.link.value, newNote.note.value);
    }
}

readNotes()
