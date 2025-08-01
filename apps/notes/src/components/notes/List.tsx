"use client";
import { FC } from "react";
import { type Note } from "@/types/notes";
import NotesListHeader from "@/components/notes/Header";
import NoteItemWrapper from "@/components/notes/ItemWrapper";
import { useTheme } from "@/providers/themeProvider/useTheme";
import clsx from "clsx";
import { useStore } from "@nanostores/react";
import { $selectedNote } from "@/store/notes";
import { ListVisibility } from "@/providers/themeProvider/theme.context";

interface Props {
  notes: Note[];
}
const NotesList: FC<Props> = ({ notes }) => {
  const selectedNote = useStore($selectedNote);
  const { listVisibility, isMobile } = useTheme();
  return (
    <div className={"flex flex-col gap-6 w-full"}>
      <NotesListHeader />
      <div
        className={clsx(
          "flex flex-col gap-4",
          isMobile && listVisibility === ListVisibility.COLLAPSED
            ? "hidden"
            : "block",
        )}
      >
        {notes.map((note, index) => {
          const isSelected = selectedNote?.id === note.id;
          const noteToRender = isSelected ? { ...note, ...selectedNote } : note;

          return (
            <NoteItemWrapper
              key={note.id}
              id={note.id}
              isSelected={isSelected}
              isCollapsed={listVisibility === ListVisibility.COLLAPSED}
              heading={noteToRender.heading}
              text={noteToRender.text}
              lastUpdated={noteToRender.lastUpdated}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NotesList;
