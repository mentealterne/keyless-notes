export type NoteDTO = {
  id: string | undefined;
  heading: string | null;
  text: string | null;
  lastUpdated: Date;
  createdAt?: Date;
};
