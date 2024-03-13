export default class NotesView {
    constructor(root, {onNoteSelect,onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML =  `
         <div class="sidebar">
            <button class="add_notes " type="button">Add Notes</button>
            <div class="notes_list "></div>

        </div> 
        <div class="notes_preview">
            <input class="notes_title" type="text" placeholder="Mark 19">
            
            <textarea class="notes_Body" >Verse :-</textarea>
            <textarea class="notes_O">observation...</textarea>
            <textarea class="notes_A">application...</textarea>
            <textarea class="notes_P">prayer...</textarea>
            
        </div> -->

    `;


    const btnAddNote = this.root.querySelector(".add_notes");
    const inpTitle =  this.root.querySelector(".notes_title");
    const inpBody = this.root.querySelector(".notes_Body");
    const inpO = this.root.querySelector(".notes_O");
    const inpA = this.root.querySelector(".notes_A");
    const inpP = this.root.querySelector(".notes_P");

    btnAddNote.addEventListener("click", () => {
        this.onNoteAdd();
    });





    [inpTitle, inpBody,inpO,inpA,inpP].forEach(inputField => {
        inputField.addEventListener("blur", () => {
            const updatedTitle = inpTitle.value.trim();
            const updatedBody = inpBody.value.trim();
            const updatedO = inpO.value.trim();
            const updatedA = inpA.value.trim();
            const updatedP = inpP.value.trim();


            this.onNoteEdit(updatedTitle, updatedBody, updatedO,updatedA, updatedP);

        });
    });
    console.log(this._createListItenHTML(300, "hey", "yeah mate", new Date()))
    // this.updateNotePreviewVisibility(false);
}
_createListItenHTML(id, title,body, updated){
    const MAX_BODY_LENGTH = 60;


    return `
    <div class="notes_list" data-note-id="${id}">
    <div class="notes_small_title">${title}</div>
    <div class="notes_small_content">
        ${body.substring(0, MAX_BODY_LENGTH)}
        ${body.length > MAX_BODY_LENGTH ? "..." : ""}
    </div>
    <div class="notes_small-updated">
        ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
    </div>
</div>
    
    
    
    `;
}
 updateNoteList(notes){
    const notesListContainer = this.root.querySelector(".notes_list");

            // Empty list
            notesListContainer.innerHTML = "";

            for (const note of notes) {
                const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));
    
                notesListContainer.insertAdjacentHTML("beforeend", html);
            }
    
            // Add select/delete events for each list item
            notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
                noteListItem.addEventListener("click", () => {
                    this.onNoteSelect(noteListItem.dataset.noteId);
                });
    
                noteListItem.addEventListener("dblclick", () => {
                    const doDelete = confirm("Are you sure you want to delete this note?");
    
                    if (doDelete) {
                        this.onNoteDelete(noteListItem.dataset.noteId);
                    }
                });
            });
        }v


 }
