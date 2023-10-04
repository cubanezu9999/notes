import Cookie from "universal-cookie";
import { useRef } from "react";
import classes from "./NoteEditor.module.css";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";

import firestore from "../Firebase";

function NoteEditor(props) {
  const noteTitle = useRef();
  const noteNote = useRef();
  const noteId = useRef();

  async function saveNote(event) {
    event.preventDefault();
    const cookie = new Cookie();
    const email = cookie.get("email");
    const titleToSend = noteTitle.current.value;
    const noteToSend = noteNote.current.value;
    const noteid = noteId.current.value;

    if (noteid === "") {
      await addDoc(collection(firestore, "notes"), {
        titleToSend,
        noteToSend,
        email,
      });
      window.location.reload();
    } else {
      const docRef = doc(firestore, "notes", noteid);
      await deleteDoc(docRef);
      await addDoc(collection(firestore, "notes"), {
        titleToSend,
        noteToSend,
        email,
      });
      window.location.reload();
      console.log(noteid);
    }
  }

  return (
    <div className={classes.container}>
      <form onSubmit={saveNote} className={classes.form}>
        <label htmlFor="title" className={classes.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          ref={noteTitle}
          className={classes.inputtext}
          defaultValue={props.title}
        />
        <label htmlFor="content" className={classes.label}>
          Note
        </label>
        <textarea
          id="content"
          rows="6"
          cols="100"
          ref={noteNote}
          className={classes.textarea}
          defaultValue={props.note}
        />
        <input type="hidden" value={props.noteid} ref={noteId} />
        <button className={classes.button}>Save</button>
      </form>
    </div>
  );
}

export default NoteEditor;
