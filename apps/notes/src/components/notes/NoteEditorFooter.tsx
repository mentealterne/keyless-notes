import { FC } from "react";
import NoteStatusIndicators from "@/components/notes/actions/NoteStatusIndicators";
import { useNoteToEdit } from "@/lib/useNoteToEdit.hook";

const NoteEditorFooter: FC = () => {
  const note = useNoteToEdit();
  return (
    <div className="flex justify-end items-center p-4 max-h-[30px] overflow-hidden bg-gray-100 border-t border-accent">
      <NoteStatusIndicators note={note.note} />
    </div>
  );
};

export default NoteEditorFooter;
