import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Note } from "@/types/notes";
import { throttle } from "lodash";
import { useCreateNote } from "@/lib/http/mutations/useCreateNote.mutation";
import { useEditNote } from "@/lib/http/mutations/useEditNote.mutation";

export const useAutosave = (initialNote: Note | undefined) => {
  const createNote = useCreateNote();
  const editNote = useEditNote();

  const noteRef = useRef<Note | undefined>(initialNote);
  const [updatedNote, setUpdatedNote] = useState<Note | undefined>(undefined);

  const throttledSave = useRef(
    throttle(() => {
      const currentNote = noteRef.current;
      if (!currentNote?.heading && !currentNote?.text) return;

      if (currentNote.id) {
        editNote.mutate(currentNote, {
          onSuccess: (data) => {
            if (data?.data) setUpdatedNote(data.data);
          },
        });
      } else {
        createNote.mutate(currentNote, {
          onSuccess: (data) => {
            if (data?.data) setUpdatedNote(data.data);
          },
        });
      }
    }, 3000),
  ).current;

  const updateNote = useCallback(
    (note: Note) => {
      noteRef.current = note;
      throttledSave();
    },
    [throttledSave],
  );

  useEffect(() => {
    return () => {
      throttledSave.cancel();
    };
  }, [throttledSave]);

  const isSaving = useMemo(() => {
    return createNote.isPending || editNote.isPending;
  }, [createNote.isPending, editNote.isPending]);

  return { isSaving, updatedNote, updateNote };
};
