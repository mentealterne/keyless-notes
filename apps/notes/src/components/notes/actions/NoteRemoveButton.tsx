import { FC } from "react";
import IconButton from "@/components/common/IconButton";
import { Trash } from "@phosphor-icons/react";
import { Note } from "@/types/notes";
import { useRemoveNote } from "@/lib/http/mutations/useRemoveNote";
import { clearShowingNote } from "@/store/notes";

interface Props {
  note: Note;
}
const NoteRemoveButton: FC<Props> = (props) => {
  const removeNote = useRemoveNote();

  const removeNoteHandler = (noteId: string) => {
    removeNote.mutate(noteId);
    clearShowingNote();
  };
  if (!props.note.id) return null;
  return (
    <IconButton
      onClick={() => removeNoteHandler(props.note.id as string)}
      disabled={removeNote.isPending}
    >
      <Trash
        size={24}
        weight="duotone"
        className="text-gray-300 hover:text-gray-700 transition-colors"
      />
    </IconButton>
  );
};

export default NoteRemoveButton;
