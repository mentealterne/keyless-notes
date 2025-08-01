import { FC } from "react";
import IconButton from "@/components/common/IconButton";
import { Trash } from "@phosphor-icons/react";
import { format } from "date-fns";
import NoteSaveButton from "@/components/notes/actions/NoteSaveButton";
import { useAutosave } from "@/lib/useAutosave.hook";
import { Note } from "@prisma/client";

interface Props {
  note: Note | undefined;
}
const NoteStatusIndicators: FC<Props> = (props) => {
  const { isSaving } = useAutosave(props.note);
  return (
    <div className={"flex flex-row gap-1 w-full justify-between items-center"}>
      <div className="text-sm text-gray-500 flex items-center flex-row gap-2">
        <NoteSaveButton isSaving={isSaving} />
        {props.note?.lastUpdated && (
          <span className={"font-bold text-xs"}>
            {format(props.note.lastUpdated, "dd/MM/yyyy HH:mm")}{" "}
          </span>
        )}
      </div>
      <IconButton onClick={() => console.log("Save Note")}>
        <Trash
          size={24}
          weight="duotone"
          className="text-red-600 hover:text-gray-700 transition-colors"
        />
      </IconButton>
    </div>
  );
};

export default NoteStatusIndicators;
