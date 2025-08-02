import { atom } from "nanostores";
import { NoteDTO } from "@/types/notes";

export const $showingNote = atom<NoteDTO | undefined>();
export const $selectedNoteID = atom<string | undefined>();
export const $isUnsavedChanges = atom<boolean>(false);
export function addShowingNote(note: NoteDTO) {
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

export function setIsUnsavedChanges(isUnsaved: boolean) {
  $isUnsavedChanges.set(isUnsaved);
}
