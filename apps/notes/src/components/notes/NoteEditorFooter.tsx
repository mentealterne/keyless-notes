import { FC } from "react";
import NoteStatusIndicators from "@/components/notes/actions/NoteStatusIndicators";
import { useStore } from "@nanostores/react";
import { $selectedNoteID } from "@/store/notes";
import { useNote } from "@/lib/http/queries/useNote.query";

const NoteEditorFooter: FC = () => {
  const selectedNoteID = useStore($selectedNoteID);
  const { data: note } = useNote(selectedNoteID);
  return (
    <div className="flex justify-end items-center p-4 max-h-[30px] overflow-hidden bg-gray-100 border-t border-accent">
      <NoteStatusIndicators note={note?.data || undefined} />
    </div>
  );
};

export default NoteEditorFooter;
