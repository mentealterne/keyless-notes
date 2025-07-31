import { atom } from "nanostores";
import { Note } from "@/types/notes";

export const $selectedNote = atom<Note | undefined>();

export function updateSelectedNote(note: Note) {
  $selectedNote.set(note);
}
