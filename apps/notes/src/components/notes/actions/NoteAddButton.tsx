import { FC } from "react";
import IconButton from "@/components/common/IconButton";
import { PenNib } from "@phosphor-icons/react";
import { useStore } from "@nanostores/react";
import { $showingNote, addShowingNote } from "@/store/notes";

const NoteAddButton: FC = () => {
  const newNote = useStore($showingNote);
  const addNote = () => {
    addShowingNote({
      id: undefined,
      heading: "",
      text: "",
      lastUpdated: new Date(),
    });
  };
  return (
    <IconButton disabled={!!newNote && !newNote.id} onClick={addNote}>
      <PenNib size={24} weight="duotone" className="text-white" />
    </IconButton>
  );
};

export default NoteAddButton;
