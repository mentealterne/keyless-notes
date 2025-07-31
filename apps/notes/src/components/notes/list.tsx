"use client";
import { FC } from "react";
import { type Note } from "@/types/notes";
import NotesListHeader from "@/components/notes/header";
import NoteItemWrapper from "@/components/notes/item_wrapper";
import { useTheme } from "@/providers/themeProvider/useTheme";
import clsx from "clsx";

interface Props {
  notes: Note[];
}
const NotesList: FC<Props> = ({ notes }) => {
  const { listCollapsed, isMobile } = useTheme();
  return (
    <div className={"flex flex-col gap-6 w-full"}>
      <NotesListHeader />
      <div
        className={clsx(
          "flex flex-col gap-4",
          isMobile && listCollapsed ? "hidden" : "block",
        )}
      >
        {notes.map((note, index) => (
          <NoteItemWrapper
            id={note.id}
            isCollapsed={listCollapsed}
            key={index}
            heading={note.title}
            text={note.text}
            lastUpdated={note.lastUpdated}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
