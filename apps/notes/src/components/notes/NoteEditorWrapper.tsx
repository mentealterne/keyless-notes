import { FC } from "react";
import NoteEditorHeader from "@/components/notes/NoteEditorHeader";
import NoteEditor from "@/components/notes/NoteEditor";
import { Note } from "@/types/notes";
import { updateSelectedNote } from "@/store/notes";

interface Props {
  note: Note | undefined;
}
const NoteEditorWrapper: FC<Props> = (props) => {
  const updateSelectedNoteTrigger = (note: Note) => {
    if (!props.note) return;
    updateSelectedNote(note);
  };
  return (
    <div className={"flex flex-col mx-auto w-full  h-full"}>
      <NoteEditorHeader note={props.note} />
      <div className={"w-1/2 mx-auto mt-20 p-8"}>
        <NoteEditor
          note={props.note}
          onHeadingChange={(heading) =>
            updateSelectedNoteTrigger({
              ...props.note!,
              heading: heading,
            })
          }
          onTextChange={(text) =>
            updateSelectedNoteTrigger({ ...props.note!, text: text })
          }
        />
      </div>
    </div>
  );
};

export default NoteEditorWrapper;
