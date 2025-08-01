"use client";

import { useMemo } from "react";
import { useStore } from "@nanostores/react";
import { $selectedNoteID, $showingNote } from "@/store/notes";
import { useNote } from "@/lib/http/queries/useNote.query";

export const useNoteToEdit = () => {
  const selectedNoteID = useStore($selectedNoteID);
  const newNote = useStore($showingNote);
  const noteQuery = useNote(selectedNoteID);

  const note = useMemo(() => {
    if (noteQuery.data) return noteQuery.data;
    if (newNote) return newNote;
  }, [noteQuery.data, noteQuery.isLoading, noteQuery.isError, newNote]);

  return {
    note,
    isLoading: noteQuery.isLoading,
    isError: noteQuery.isError,
    error: noteQuery.error,
  };
};
