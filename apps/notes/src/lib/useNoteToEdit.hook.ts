"use client";

import { useMemo } from "react";
import { useStore } from "@nanostores/react";
import { $selectedNoteID, $showingNote } from "@/store/notes";
import { useNote } from "@/lib/http/queries/useNote.query";
import { Note } from "@/types/notes";

export const useNoteToEdit = (): Note | undefined => {
  const selectedNoteID = useStore($selectedNoteID);
  const newNote = useStore($showingNote);
  const noteQuery = useNote(selectedNoteID);

  const note = useMemo(() => {
    if (noteQuery.data) return noteQuery.data;
    if (newNote) return newNote;
    if (noteQuery.isLoading) return undefined;
    if (noteQuery.isError) {
      console.error("Error fetching note:", noteQuery.error);
      return undefined;
    }
  }, [noteQuery.data, noteQuery.isLoading, noteQuery.isError, newNote]);

  return note;
};
