import { FC } from "react";
import NoteStatusIndicators from "@/components/notes/actions/NoteStatusIndicators";
import { NoteDTO } from "@/types/notes";

interface Props {
  note: NoteDTO | undefined;
}
const NoteEditorFooter: FC<Props> = ({ note }) => {
  return (
    <div className="flex justify-end items-center p-4 max-h-[30px] overflow-hidden bg-gray-100 border-t border-accent">
      <NoteStatusIndicators note={note} />
    </div>
  );
};

export default NoteEditorFooter;
