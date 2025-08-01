import { Note } from "@prisma/client";

export type NotesListResponse = {
  notes: Note[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
