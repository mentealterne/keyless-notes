import { FC } from "react";
import { format } from "date-fns";
import NoteSaveButton from "@/components/notes/actions/NoteSaveButton";
import { NoteDTO } from "@/types/notes";
import { useStore } from "@nanostores/react";
import { $isUnsavedChanges } from "@/store/notes";

interface Props {
  note: NoteDTO | undefined;
}
const NoteStatusIndicators: FC<Props> = (props) => {
  const isUnsavedChanges = useStore($isUnsavedChanges);
  return (
    <div className={"flex flex-row gap-1 w-full justify-between items-center"}>
      <div className="text-sm text-gray-500 flex items-center flex-row gap-2">
        <NoteSaveButton isSaving={isUnsavedChanges} />
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
