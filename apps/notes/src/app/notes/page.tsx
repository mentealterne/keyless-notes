"use client";
import {
  $listPage,
  $selectedNoteID,
  $showingNote,
  setSelectedNoteID,
} from "@/store/notes";
import { useStore } from "@nanostores/react";
import NotesListWrapper from "@/components/notes/NotesListWrapper";
import NoteEditorWrapper from "@/components/notes/NoteEditorWrapper";
import { useCallback, useEffect, useMemo } from "react";
import { useNoteList } from "@/lib/http/queries/useNoteList.query";
import { useNoteToEdit } from "@/lib/useNoteToEdit.hook";

export default function Home() {
  const selectedNoteID = useStore($selectedNoteID);
  const newNote = useStore($showingNote);
  const listPage = useStore($listPage);
  const { data: notesResponse, isLoading } = useNoteList(listPage);

  const notes = useMemo(() => {
    const baseNotes = notesResponse?.notes ?? [];
    return newNote ? [newNote, ...baseNotes] : baseNotes;
  }, [notesResponse?.notes, newNote]);

  const noteData = useNoteToEdit();

  const initSelectedNote = useCallback(() => {
    if (notes.length > 0 && !selectedNoteID) {
      setSelectedNoteID(notes[0]!.id!);
    }
  }, [notes, selectedNoteID]);

  useEffect(() => {
    initSelectedNote();
  }, [initSelectedNote]);

  return (
    <div className="flex h-screen w-full">
      <NotesListWrapper notes={notes} isListLoading={isLoading} />
      <div className="flex flex-col  gap-4 flex-grow">
        <NoteEditorWrapper
          note={noteData.note}
          isListLoading={isLoading}
          isNoteLoading={noteData.isLoading}
        />
      </div>
    </div>
  );
}
