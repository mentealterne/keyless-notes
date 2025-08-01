import { FC } from "react";
import NoteEditorHeader from "@/components/notes/NoteEditorHeader";
import NoteEditor from "@/components/notes/NoteEditor";
import { Note } from "@/types/notes";
import { updateSelectedNote } from "@/store/notes";
import NoteEditorFooter from "@/components/notes/NoteEditorFooter";

interface Props {
  note: Note | undefined;
}
const NoteEditorWrapper: FC<Props> = (props) => {
  const updateSelectedNoteTrigger = (note: Note) => {
    if (!props.note) return;
    updateSelectedNote(note);
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
      <NoteEditorFooter />
    </div>
  );
};

export default NoteEditorWrapper;
