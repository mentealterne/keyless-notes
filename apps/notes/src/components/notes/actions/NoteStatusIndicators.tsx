import { FC } from "react";
import IconButton from "@/components/common/IconButton";
import { Trash } from "@phosphor-icons/react";
import { useStore } from "@nanostores/react";
import { $selectedNote } from "@/store/notes";
import { format } from "date-fns";
import NoteSaveButton from "@/components/notes/actions/NoteSaveButton";

const NoteStatusIndicators: FC = () => {
  const selectedNote = useStore($selectedNote);
  return (
    <div className={"flex flex-row gap-1 w-full justify-between items-center"}>
      <div className="text-sm text-gray-500 flex items-center flex-row gap-2">
        <NoteSaveButton />
        {selectedNote?.lastUpdated && (
          <span className={"font-bold text-xs"}>
            {format(selectedNote.lastUpdated, "dd/MM/yyyy HH:MM")}{" "}
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
