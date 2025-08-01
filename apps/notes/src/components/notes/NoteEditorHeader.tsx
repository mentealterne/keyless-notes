import { FC } from "react";
import { Note } from "@/types/notes";
import { useTheme } from "@/providers/themeProvider/useTheme";
import ToggleListButton from "@/components/common/ToggleListButton";
import { ListVisibility } from "@/providers/themeProvider/theme.context";
import NoteAddButton from "@/components/notes/actions/NoteAddButton";
import { useRemoveNote } from "@/lib/http/mutations/useRemoveNote";
import NoteRemoveButton from "@/components/notes/actions/NoteRemoveButton";

interface Props {
  note: Note | undefined;
}
const NoteEditorHeader: FC<Props> = (props) => {
  const {
    listVisibility,
    updateListVisibility,
    cancelHideFloatingList,
    startHideFloatingList,
    isMobile,
  } = useTheme();

  const removeNote = useRemoveNote();

  return (
    <div
      className={
        " h-12 px-4 border-b flex gap-4 items-center justify-between w-full border-accent bg-accent text-white"
      }
    >
      <div className={"flex items-center gap-2"}>
        {" "}
        {listVisibility !== ListVisibility.EXPANDED && (
          <ToggleListButton
            isHoverable={!isMobile}
            onMouseEnter={() => {
              cancelHideFloatingList();
              updateListVisibility(ListVisibility.FLOATING);
            }}
            onMouseLeave={startHideFloatingList}
            color={"white"}
          />
        )}
        <div>
          <span className={"font-bold  mr-1"}>Notes</span>/
          <span className={"font-bold ml-1"}>
            {props.note?.heading || "New Note"}{" "}
          </span>
        </div>
      </div>
      <div className={"flex flex-row items-center gap-4"}>
        <NoteAddButton />
        {props.note?.id && <NoteRemoveButton note={props.note} />}
      </div>
    </div>
  );
};

export default NoteEditorHeader;
