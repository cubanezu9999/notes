import React from "react";
import { useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import firestore from "../Firebase";
import classes from "./ShareModal.module.css";

export default function ShareModal(props) {
  const emailRef = useRef();

  async function submitShare(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const title = props.title;
    const note = props.note;
    console.log(title, note, email);
    await addDoc(collection(firestore, "notes"), {
      titleToSend: title,
      noteToSend: note,
      email,
    });
    window.location.reload();
  }
  return (
    <div>
      <form onSubmit={submitShare} className={classes.container}>
        <label htmlFor="email"> Email To Share </label>
        <input
          type="email"
          required
          placeholder="Email"
          id="email"
          ref={emailRef}
          className={classes.input}
        />
        <div className={classes.button_container}>
          <button className={classes.button}>Submit</button>
          <button onClick={props.close} className={classes.button}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
