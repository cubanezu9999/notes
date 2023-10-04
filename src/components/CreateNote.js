import classes from "./CreateNote.module.css";

function CreateNote(props) {
  return (
    <button onClick={props.save} className={classes.button}>
      New Note
    </button>
  );
}

export default CreateNote;
