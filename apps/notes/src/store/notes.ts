import { atom } from "nanostores";
import { Note } from "@/types/notes";

export const $showingNote = atom<Note | undefined>();
export const $selectedNoteID = atom<string | undefined>();
export function addShowingNote(note: Note) {
  $showingNote.set(note);
  setSelectedNoteID(note.id);
}

export function setSelectedNoteID(noteID: string | undefined) {
  $selectedNoteID.set(noteID);
}
export function clearShowingNote() {
  $showingNote.set(undefined);
  $selectedNoteID.set(undefined);
}
