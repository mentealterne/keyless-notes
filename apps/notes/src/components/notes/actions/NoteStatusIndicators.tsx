import { FC } from "react";
import { format } from "date-fns";
import NoteSaveButton from "@/components/notes/actions/NoteSaveButton";
import { NoteDTO } from "@/types/notes";

interface Props {
  note: NoteDTO | undefined;
  isPending?: boolean;
}
const NoteStatusIndicators: FC<Props> = (props) => {
  return (
    <div className={"flex flex-row gap-1 w-full justify-between items-center"}>
      <div className="text-sm text-gray-500 flex items-center flex-row gap-2">
        <NoteSaveButton isSaving={props.isPending} />
        <span className={"font-bold text-xs"}>
          {props.note?.lastUpdated && props.note.id ? (
            <>
              Changes saved on:
              {format(props.note.lastUpdated, " dd/MM/yyyy HH:mm")}
            </>
          ) : (
            <>Changes not saved </>
          )}
        </span>
      </div>
    </div>
  );
};

export default NoteStatusIndicators;
