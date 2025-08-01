"use client";
import { FC } from "react";
import { type Note } from "@/types/notes";
import NotesListHeader from "@/components/notes/Header";
import NoteItemWrapper from "@/components/notes/ItemWrapper";
import { useTheme } from "@/providers/themeProvider/useTheme";
import clsx from "clsx";
import { useStore } from "@nanostores/react";
import { ListVisibility } from "@/providers/themeProvider/theme.context";
import { $selectedNoteID } from "@/store/notes";

interface Props {
  notes: Note[] | undefined;
}
const NotesList: FC<Props> = ({ notes }) => {
  const selectedNoteID = useStore($selectedNoteID);
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
        {notes?.length ? (
          notes.map((note, index) => {
            const isSelected = selectedNoteID === note.id;

            return (
              <NoteItemWrapper
                key={index}
                id={note.id}
                isSelected={isSelected}
                isCollapsed={listVisibility === ListVisibility.COLLAPSED}
                heading={note.heading}
                text={note.text}
                lastUpdated={note.lastUpdated}
              />
            );
          })
        ) : (
          <div className="text-gray-500 text-left">
            No notes available. Please create a new note.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesList;
