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
    console.log("useNoteToEdit: selectedNoteID:", selectedNoteID);
    if (noteQuery.isLoading) return undefined;
    if (noteQuery.isError) {
      console.error("Error fetching note:", noteQuery.error);
      return undefined;
    }
    if (noteQuery.data) return noteQuery.data;
    if (newNote) return newNote;
  }, [
    noteQuery.data,
    noteQuery.isLoading,
    noteQuery.isError,
    newNote,
    selectedNoteID,
  ]);

  return {
    note,
    isLoading: noteQuery.isLoading,
    isError: noteQuery.isError,
    error: noteQuery.error,
  };
};
