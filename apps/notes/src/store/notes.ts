import { atom } from "nanostores";
import { Note } from "@/types/notes";

export const $notes = atom<Note[]>([]);

export function addNote(note: Note) {
  $notes.set([...$notes.get(), note]);
}
