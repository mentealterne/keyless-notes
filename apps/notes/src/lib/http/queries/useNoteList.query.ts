"use client";

import { useQuery } from "@tanstack/react-query";
import { NotesListResponse } from "@/lib/http/notes";

export const useNoteList = (page = 1) => {
  return useQuery<NotesListResponse>({
    queryKey: ["notes", page],
    queryFn: async () => {
      const res = await fetch(`/api/notes?page=${page}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch Notes");
      return json.data as NotesListResponse;
    },
  });
};
