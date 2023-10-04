import { useState } from "react";
import DeleteModal from "./DeleteModal";
import ShareModal from "./ShareModal";
import classes from "./NoteItem.module.css";
import { doc, deleteDoc } from "firebase/firestore";
import firestore from "../Firebase";

function NoteItem(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  function openDeleteModal() {
    setDeleteModal(true);
  }
  function closeDeleteModal() {
    setDeleteModal(false);
  }

  function openShareModal() {
    setShareModal(true);
  }

  function closeShareModal() {
    setShareModal(false);
  }

  async function handleDelete(noteid) {
    console.log(noteid);
    const docRef = doc(firestore, "notes", noteid);
    await deleteDoc(docRef);
    window.location.reload();
  }

  return (
    <>
      <li className={classes.container}>
        <div className={classes.text}>{props.title}</div>
        <div className={classes.textarea}>{props.note}</div>

        <div className={classes.buttoncontainer}>
          <button
            className={classes.button}
            onClick={() =>
              props.editNote(props.title, props.note, props.noteid)
            }>
            Edit
          </button>
          <button onClick={openDeleteModal} className={classes.button}>
            Delete
          </button>
          <button className={classes.button} onClick={openShareModal}>
            Share
          </button>
        </div>
      </li>
      {deleteModal && (
        <DeleteModal
          open={() => {
            handleDelete(props.noteid);
          }}
          close={() => {
            closeDeleteModal();
          }}
        />
      )}
      {shareModal && (
        <ShareModal
          close={() => {
            closeShareModal();
          }}
          title={props.title}
          note={props.note}
        />
      )}
    </>
  );
}
export default NoteItem;
