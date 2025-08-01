import { FC } from "react";
import clsx from "clsx";
import NotesList from "@/components/notes/List";
import { Note } from "@/types/notes";
import { ListVisibility } from "@/providers/themeProvider/theme.context";
import { useTheme } from "@/providers/themeProvider/useTheme";

interface Props {
  notes: Note[];
}
const NotesListWrapper: FC<Props> = ({ notes }) => {
  const {
    listVisibility,
    isMobile,
    startHideFloatingList,
    cancelHideFloatingList,
  } = useTheme();

  const getStylesGivenListVisibilityStatus = () => {
    if (isMobile) {
      if (listVisibility === ListVisibility.COLLAPSED) {
        return "opacity-0 w-0 pointer-events-none";
      }
      return "w-1/2 opacity-100 fixed left-0 top-0 h-full pointer-events-auto";
    }

    if (listVisibility === ListVisibility.COLLAPSED) {
      return "opacity-0 w-0 pointer-events-none  md:fixed top-12 left-0 h-2/6 w-1/6";
    }

    if (listVisibility === ListVisibility.FLOATING) {
      return clsx(
        "md:fixed top-12 rounded-md shadow-md left-0 h-2/6 w-1/6",
        "opacity-100 pointer-events-auto",
      );
    }

    return "md:static w-1/6 opacity-100 pointer-events-auto";
  };

  return (
    <div
      onMouseEnter={cancelHideFloatingList}
      onMouseLeave={startHideFloatingList}
      className={clsx(
        "flex flex-col md:p-4 gap-4 fixed left-0 top-0 py-2 px-4 transition-all duration-300  scrollbar-hide bg-accent-dark overflow-auto",
        getStylesGivenListVisibilityStatus(),
      )}
    >
      <NotesList notes={notes} />
    </div>
  );
};

export default NotesListWrapper;
