import { FC, useEffect } from "react";
import { Note } from "@/types/notes";
import { useAutosave } from "@/lib/useAutosave.hook";
import { setSelectedNoteID } from "@/store/notes";

interface Props {
  note: Note | undefined;
  onHeadingChange: (heading: string) => void;
  onTextChange: (text: string) => void;
}
const NoteEditor: FC<Props> = (props) => {
  const { updatedNote } = useAutosave(props.note);

  useEffect(() => {
    if (!updatedNote?.id) return;
    setSelectedNoteID(updatedNote.id);
  }, [updatedNote]);

  if (!props.note)
    return (
      <div className={"flex flex-col    w-full h-full"}>
        <h2 className={"text-xl"}>Please select a note to start.</h2>
      </div>
    );

  return (
    <div className={"flex flex-col gap-4 w-full h-full"}>
      <textarea
        autoFocus
        onChange={(e) => props.onHeadingChange(e.target.value)}
        name={"heading"}
        placeholder={"Write a title"}
        className={
          "w-full text-accent font-bold text-4xl no-underline focus:outline-none"
        }
        value={props.note.heading}
      />

      <textarea
        onChange={(e) => props.onTextChange(e.target.value)}
        name={"text"}
        placeholder={"Write your note here..."}
        className={
          "w-full h-full leading-relaxed text-xl no-underline focus:outline-none scrollbar-hide"
        }
        value={props.note.text}
      />
    </div>
  );
};

export default NoteEditor;
