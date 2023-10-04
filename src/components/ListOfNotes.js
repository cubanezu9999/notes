import NoteItem from "./NoteItem";

function NoteList(props) {
  function editNote(title, note, noteid) {
    props.editTheNote(title, note, noteid);
  }
  return (
    <ul>
      {props.notes.map((note, index) => (
        <NoteItem
          key={index}
          title={note.titleToSend}
          note={note.noteToSend}
          noteid={note.id}
          editNote={editNote}
        />
      ))}
    </ul>
  );
}
export default NoteList;
