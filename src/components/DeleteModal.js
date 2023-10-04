import classes from "./DeleteModal.module.css";

function DeleteModal({ open, close }) {
  return (
    <div className={classes.container} onClick={close}>
      Are you sure you want to delete this note?
      <div className={classes.button_container}>
        <button onClick={open} className={classes.button}>
          Yes
        </button>
        <button onClick={close} className={classes.button}>
          Cancel
        </button>
      </div>
    </div>
  );
}
export default DeleteModal;
