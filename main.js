import NotesView from "./NotesView.js"

const app = document.getElementById("app");
const view = new NotesView(app, {
    onNoteAdd() {
        console.log("Add a new note")
    },
    onNoteEdit(newTitle, newBody,newO, newA, newP) {
        console.log(newTitle);
        console.log(newBody);
        console.log(newO);
        console.log(newA);
        console.log(newP);
    },

});

view.updateNoteList(NotesAPI.getAllNotes());