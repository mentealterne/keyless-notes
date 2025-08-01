import { FC } from "react";
import IconButton from "@/components/common/IconButton";
import { Trash } from "@phosphor-icons/react";
import { format } from "date-fns";
import NoteSaveButton from "@/components/notes/actions/NoteSaveButton";
import { useRemoveNote } from "@/lib/http/mutations/useRemoveNote";
import { Note } from "@/types/notes";

interface Props {
  note: Note | undefined;
  isPending?: boolean;
}
const NoteStatusIndicators: FC<Props> = (props) => {
  const removeNote = useRemoveNote();
  return (
    <div className={"flex flex-row gap-1 w-full justify-between items-center"}>
      <div className="text-sm text-gray-500 flex items-center flex-row gap-2">
        <NoteSaveButton isSaving={props.isPending} />
        {props.note?.lastUpdated && props.note.id && (
          <span className={"font-bold text-xs"}>
            Autosaved on:
            {format(props.note.lastUpdated, " dd/MM/yyyy HH:mm")}{" "}
          </span>
        )}
      </div>
      {props.note?.id && (
        <IconButton onClick={() => removeNote.mutate(props.note!.id as string)}>
          <Trash
            size={24}
            weight="duotone"
            className="text-red-600 hover:text-gray-700 transition-colors"
          />
        </IconButton>
      )}
    </div>
  );
};

export default NoteStatusIndicators;
