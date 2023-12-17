const addBtn = document.querySelector("#addBtn");
const main = document.querySelector(".main");

const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];

  notes.forEach((note) => data.push(note.value));
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

addBtn.addEventListener("click", function () {
  addNote();
});

const addNote = (text = "") => {
  // Added text parameter to pre-fill textareas
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `<div class="tool">
                <i class="fa-solid trash fa-trash"></i>
                <i class="fa-solid save fa-floppy-disk"></i>
            </div>
            <textarea>${text}</textarea>`; // Pre-filled textarea with text parameter

  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes(); // Save notes after removing a note
  });

  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });
  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });

  main.appendChild(note);
};

(function () {
  const lsnotes = JSON.parse(localStorage.getItem("notes"));
  if (lsnotes === null) {
    addNote();
    
  } else {
    lsnotes.forEach((lsnote) => {
      addNote(lsnote);
    });
  }
})();
