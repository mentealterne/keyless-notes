import { atom } from "nanostores";
import { Note } from "@/types/notes";

export const $newNote = atom<Note | undefined>();
export const $selectedNoteID = atom<string | undefined>();
export function addNewNote() {
  const newNote = {
    id: undefined,
    heading: "",
    text: "",
    lastUpdated: new Date(),
  };
  $newNote.set(newNote);
}

export function setSelectedNoteID(noteID: string) {
  $selectedNoteID.set(noteID);
}

export function clearSelectedNote() {
  $newNote.set(undefined);
}
