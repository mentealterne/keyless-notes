"use client";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { NotesListResponse } from "@/lib/http/notes";

type PageParams = {
  page: number;
};

export const useInfiniteNotes = () => {
  return useInfiniteQuery<NotesListResponse, Error>({
    queryKey: ["notes"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/notes?page=${pageParam}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch Notes");
      return json.data as NotesListResponse;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 1000,
    placeholderData: keepPreviousData,
  });
};
