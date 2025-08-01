import { FC, useEffect, useState } from "react";
import NoteEditorHeader from "@/components/notes/NoteEditorHeader";
import NoteEditor from "@/components/notes/NoteEditor";
import { Note } from "@/types/notes";
import NoteEditorFooter from "@/components/notes/NoteEditorFooter";
import { useAutosave } from "@/lib/useAutosave.hook";

interface Props {
  note: Note | undefined;
}
const NoteEditorWrapper: FC<Props> = (props) => {
  const { isSaving, updatedNote, updateNote } = useAutosave(props.note);
  const [editingNote, setEditingNote] = useState<Note | undefined>(props.note);
  console.log("Editing note:", editingNote);
  useEffect(() => {
    setEditingNote(props.note);
  }, [props.note]);
  const onHeadingChange = (heading: string) => {
    if (!editingNote) return;
    setEditingNote({ ...editingNote, heading: heading });
    updateNote({ ...editingNote, heading: heading });
  };

  const onTextChange = (text: string) => {
    if (!editingNote) return;
    setEditingNote({ ...editingNote, text: text });
    updateNote({ ...editingNote, text: text });
  };
  return (
    <div className={"flex flex-col mx-auto w-full justify-between  h-full"}>
      <NoteEditorHeader note={props.note} />
      <div
        className={
          "xs:w-full md:w-1/2 mx-auto md:mt-20 p-8 h-[calc(100vh-60px-48px)] overflow-auto"
        }
      >
        <NoteEditor
          note={editingNote}
          onHeadingChange={onHeadingChange}
          onTextChange={onTextChange}
        />
      </div>
      <NoteEditorFooter />
    </div>
  );
};

export default NoteEditorWrapper;
