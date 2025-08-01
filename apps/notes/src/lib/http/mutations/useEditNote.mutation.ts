"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@/types/notes";
import { ResultWithError } from "@/lib/http/response";

export const useEditNote = () => {
  const queryClient = useQueryClient();

  return useMutation<ResultWithError<Note>, Error, Note>({
    mutationFn: async (input: Note) => {
      const res = await fetch(`/api/notes/${input.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update Note");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
