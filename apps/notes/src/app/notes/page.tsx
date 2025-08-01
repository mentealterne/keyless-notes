"use client";
import { $newNote, $selectedNoteID, setSelectedNoteID } from "@/store/notes";
import { useStore } from "@nanostores/react";
import NotesListWrapper from "@/components/notes/NotesListWrapper";
import NoteEditorWrapper from "@/components/notes/NoteEditorWrapper";
import { useCallback, useEffect, useMemo } from "react";
import { useNoteList } from "@/lib/http/queries/useNoteList.query";
import { useNote } from "@/lib/http/queries/useNote.query";

export default function Home() {
  const selectedNoteID = useStore($selectedNoteID);
  const newNote = useStore($newNote);
  const { data: notesResponse, isLoading } = useNoteList(1);

  const notes = useMemo(() => {
    const baseNotes = notesResponse?.notes ?? [];
    return newNote ? [newNote, ...baseNotes] : baseNotes;
  }, [notesResponse?.notes, newNote]);

  const noteQuery = useNote(selectedNoteID);

  const note = useMemo(() => {
    if (newNote) return newNote;
    if (noteQuery.isLoading) return undefined;
    if (noteQuery.isError) {
      console.error("Error fetching note:", noteQuery.error);
      return undefined;
    }
    return noteQuery.data;
  }, [noteQuery.data, selectedNoteID, newNote]);

  const initSelectedNote = useCallback(() => {
    if (notes.length > 0 && !selectedNoteID) {
      console.log("Setting initial selected note ID to first note");
      setSelectedNoteID(notes[0]!.id!);
    }
  }, [notes, selectedNoteID]);

  useEffect(() => {
    initSelectedNote();
  }, [initSelectedNote]);

  return (
    <div className="flex h-screen w-full">
      <NotesListWrapper notes={notes} />
      <div className="flex flex-col  gap-4 flex-grow">
        <NoteEditorWrapper note={note} />
      </div>
    </div>
  );
}
