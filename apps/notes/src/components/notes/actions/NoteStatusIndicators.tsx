import { FC } from "react";
import { format } from "date-fns";
import NoteSaveButton from "@/components/notes/actions/NoteSaveButton";
import { Note } from "@/types/notes";

interface Props {
  note: Note | undefined;
  isPending?: boolean;
}
const NoteStatusIndicators: FC<Props> = (props) => {
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
    </div>
  );
};

export default NoteStatusIndicators;
