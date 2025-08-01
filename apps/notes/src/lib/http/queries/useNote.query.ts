"use client";

import { useQuery } from "@tanstack/react-query";
import { Note } from "@prisma/client";
import { ResultWithError } from "@/lib/http/response";

export const useNote = (id: string) => {
  return useQuery<ResultWithError<Note>>({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await fetch(`/api/notes/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch Note");
      return json.data;
    },
    enabled: !!id,
  });
};
