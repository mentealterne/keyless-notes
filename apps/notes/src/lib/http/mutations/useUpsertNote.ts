import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@prisma/client";
import { ResultWithError } from "@/lib/http/response";

type UpsertNoteInput =
  | Omit<Note, "id" | "createdAt">
  | (Omit<Note, "createdAt"> & { id: string });

export const useUpsertNote = (onCreateSuccess?: (note: Note) => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResultWithError<Note>, Error, UpsertNoteInput>({
    mutationFn: async (input) => {
      if ("id" in input && input.id) {
        const res = await fetch(`/api/notes/${input.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to update Note");
        return { data: json.data as Note, error: null };
      }

      // CREATE
      const body = input as Omit<Note, "id" | "createdAt">;
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok)
        throw new Error(json.error?.message || "Failed to create Note");
      return { data: json.data as Note, error: null };
    },
    onSuccess: async ({ data }, variables) => {
      if (!data?.id) return;

      await queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["note", data.id],
      });
      onCreateSuccess?.(data);
    },
  });
};
