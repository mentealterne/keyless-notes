import { FC } from "react";
import NoteStatusIndicators from "@/components/notes/actions/NoteStatusIndicators";

const NoteEditorFooter: FC = () => {
  return (
    <div className="flex justify-end items-center p-4 max-h-[30px] overflow-hidden bg-gray-100 border-t border-accent">
      <NoteStatusIndicators />
    </div>
  );
};

export default NoteEditorFooter;
