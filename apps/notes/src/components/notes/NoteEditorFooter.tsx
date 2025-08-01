import { FC } from "react";
import NoteStatusIndicators from "@/components/notes/actions/NoteStatusIndicators";
import { useNoteToEdit } from "@/lib/useNoteToEdit.hook";

interface Props {
  isPending?: boolean;
}
const NoteEditorFooter: FC<Props> = (props) => {
  const note = useNoteToEdit();
  return (
    <div className="flex justify-end items-center p-4 max-h-[30px] overflow-hidden bg-gray-100 border-t border-accent">
      <NoteStatusIndicators note={note.note} isPending={props.isPending} />
    </div>
  );
};

export default NoteEditorFooter;
