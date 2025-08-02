import { FC, useCallback, useEffect, useMemo } from "react";
import clsx from "clsx";
import NotesList from "@/components/notes/List";
import { ListVisibility } from "@/providers/themeProvider/theme.context";
import { useTheme } from "@/providers/themeProvider/useTheme";
import { useInfiniteNotes } from "@/lib/http/queries/useInfiniteNotes.query";
import { useStore } from "@nanostores/react";
import {
  $selectedNoteID,
  $showingNote,
  setSelectedNoteID,
} from "@/store/notes";
import IconButton from "@/components/common/IconButton";
import { DotsThree } from "@phosphor-icons/react";

const NotesListWrapper: FC = () => {
  const {
    listVisibility,
    isMobile,
    startHideFloatingList,
    cancelHideFloatingList,
  } = useTheme();

  const selectedNoteID = useStore($selectedNoteID);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteNotes();
  const newNote = useStore($showingNote);

  const notesFromPages = useMemo(
    () => data?.pages.flatMap((page) => page.notes) ?? [],
    [data],
  );

  const notes = useMemo(
    () => (newNote ? [newNote, ...notesFromPages] : notesFromPages),
    [notesFromPages, newNote],
  );

  const initSelectedNote = useCallback(() => {
    if (notes.length > 0 && !selectedNoteID) {
      setSelectedNoteID(notes[0]!.id!);
    }
  }, [notes, selectedNoteID]);

  useEffect(() => {
    initSelectedNote();
  }, [initSelectedNote]);

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
      <div className={"flex flex-col gap-4 h-full justify-between"}>
        <NotesList notes={notes} />
        {hasNextPage && (
          <IconButton onClick={fetchNextPage} label={"Load More"}>
            <DotsThree size={24} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default NotesListWrapper;
