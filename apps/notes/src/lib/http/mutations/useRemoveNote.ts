"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveNote = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (res.status !== 204) {
        const json = await res.json();
        throw new Error(json.error || "Failed to remove Note");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess?.();
    },
  });
};
