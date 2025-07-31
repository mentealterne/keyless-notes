"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";
import { addNote } from "@/store/notes";
import { Note } from "@/types/notes";

const NoteItemReact = dynamic(
  () => import("./item").then((m) => m.NoteItemReact),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 w-full rounded opacity-50 bg-gray-200 animate-pulse" />
    ),
  },
);

type NoteItemWrapperProps = {
  id: string | undefined;
  heading: string;
  text: string;
  lastUpdated: string;
  isCollapsed: boolean;
};

const NoteItemWrapper: FC<NoteItemWrapperProps> = (props) => {
  return (
    <NoteItemReact
      onNoteSelected={(e) => addNote((e as CustomEvent<Note>).detail)}
      noteID={props.id}
      {...props}
    />
  );
};

export default NoteItemWrapper;
