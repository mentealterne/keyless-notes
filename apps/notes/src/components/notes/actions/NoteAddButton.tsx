import { FC } from "react";
import IconButton from "@/components/common/IconButton";
import { PenNib } from "@phosphor-icons/react";
import { useStore } from "@nanostores/react";
import { $newNote, addNewNote } from "@/store/notes";

const NoteAddButton: FC = () => {
  const newNote = useStore($newNote);
  return (
    <IconButton disabled={!!newNote} onClick={addNewNote}>
      <PenNib size={24} weight="duotone" className="text-white" />
    </IconButton>
  );
};

export default NoteAddButton;
