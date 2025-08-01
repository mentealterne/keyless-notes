import { Note } from "@prisma/client";
import { ResultWithError } from "@/lib/http/response";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ResultWithError<Note>,
    Error,
    Omit<Note, "id" | "createdAt">
  >({
    mutationFn: async (
      input: Omit<Note, "id" | "createdAt">,
    ): Promise<ResultWithError<Note>> => {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json.error.message || "Failed to create Note");
      return { data: json.data, error: null };
    },
  });
};
