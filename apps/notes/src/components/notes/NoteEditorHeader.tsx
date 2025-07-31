import { FC } from "react";
import { Note } from "@/types/notes";
import { useTheme } from "@/providers/themeProvider/useTheme";
import ToggleListButton from "@/components/common/ToggleListButton";
import { ListState } from "@/providers/themeProvider/theme.context";

interface Props {
  note: Note | undefined;
}
const NoteEditorHeader: FC<Props> = (props) => {
  const {
    listState,
    updateListState,
    cancelHideFloatingList,
    startHideFloatingList,
  } = useTheme();

  return (
    <div
      className={
        "w-full h-12 px-4 border-b flex gap-4 items-center border-accent bg-accent text-white"
      }
    >
      {listState !== ListState.EXPANDED && (
        <ToggleListButton
          isHoverable={true}
          onMouseEnter={() => {
            cancelHideFloatingList();
            updateListState(ListState.FLOATING);
          }}
          onMouseLeave={startHideFloatingList}
          color={"white"}
        />
      )}
      <div>
        {" "}
        <span className={"font-bold  mr-1"}>Notes</span>/
        <span className={"font-bold ml-1"}>
          {props.note?.heading || "New Note"}{" "}
        </span>
      </div>
    </div>
  );
};

export default NoteEditorHeader;
