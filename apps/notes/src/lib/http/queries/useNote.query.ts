"use client";

import { useQuery } from "@tanstack/react-query";
import { Note } from "@prisma/client";

export const useNote = (id: string | undefined) => {
  return useQuery<Note>({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await fetch(`/api/notes/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch Note");
      return json.data as Note;
    },
    enabled: !!id,
  });
};
