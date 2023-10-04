import { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import NoteList from "../components/ListOfNotes";
import CreateNote from "../components/CreateNote";
import NoteEditor from "../components/NoteEditor";
import classes from "./Notes.module.css";
import firestore from "../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Notes() {
  const [notes, getNotes] = useState([]);
  const [noNotes, getNoNotes] = useState("");
  const [saveNote, setSaveNote] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [createNote, setCreateNote] = useState(true);
  const [title, setTitle] = useState("");
  const [editableNote, setEditableNote] = useState("");
  const [noteid, setNoteId] = useState("");

  function saveTheNote(userid) {
    setSaveNote(true);
    setCreateNote(false);
    getNotes([]);
    getNoNotes("");
    setEditNote(false);
  }
  function editTheNote(title, note, noteid) {
    console.log(title, note, noteid);
    setEditNote(!editNote);
    setEditableNote(note);
    setNoteId(noteid);
    setTitle(title);
    getNotes([]);
    getNoNotes("");
  }

  useEffect(() => {
    const cookie = new Cookie();
    const email = cookie.get("email");
    if (email) {
      getDocs(
        query(collection(firestore, "notes"), where("email", "==", email))
      ).then((data) => {
        getNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    }
  }, []);

  return (
    <div className={classes.container}>
      {createNote && <CreateNote save={saveTheNote} />}
      {saveNote && <NoteEditor />}
      {editNote && (
        <NoteEditor title={title} note={editableNote} noteid={noteid} />
      )}
      <div className={classes.nonotes}>{noNotes}</div>
      {notes && <p>You have {notes.length} Notes</p>}
      {notes && <NoteList notes={notes} editTheNote={editTheNote} />}
    </div>
  );
}
export default Notes;
