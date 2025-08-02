"use client";
import NotesListWrapper from "@/components/notes/NotesListWrapper";
import NoteEditorWrapper from "@/components/notes/NoteEditorWrapper";
import { useNoteToEdit } from "@/lib/useNoteToEdit.hook";

export default function Home() {
  const noteData = useNoteToEdit();

  return (
    <div className="flex h-screen w-full">
      <NotesListWrapper />
      <div className="flex flex-col  gap-4 flex-grow">
        <NoteEditorWrapper
          note={noteData.note}
          isListLoading={false}
          isNoteLoading={noteData.isLoading}
        />
      </div>
    </div>
  );
}
