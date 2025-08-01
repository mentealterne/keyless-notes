"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { debounce } from "@tanstack/react-pacer/debouncer"; // :contentReference[oaicite:0]{index=0}
import NoteEditorHeader from "@/components/notes/NoteEditorHeader";
import NoteEditor from "@/components/notes/NoteEditor";
import { NoteDTO } from "@/types/notes";
import NoteEditorFooter from "@/components/notes/NoteEditorFooter";
import { clearShowingNote, setSelectedNoteID } from "@/store/notes";
import { useUpsertNote } from "@/lib/http/mutations/useUpsertNote";

interface Props {
  note: NoteDTO | undefined;
  isListLoading?: boolean;
  isNoteLoading?: boolean;
}

const NoteEditorWrapper: FC<Props> = ({ note: propsNote, isNoteLoading }) => {
  const [editingNote, setEditingNote] = useState<NoteDTO | undefined>(
    undefined,
  );
  const onSaveSuccess = (note: NoteDTO) => {
    clearShowingNote();
  };

  const {
    mutate: upsertNote,
    isPending,
    data: result,
  } = useUpsertNote(onSaveSuccess);

  const debouncedUpsert = useMemo(
    () => debounce(upsertNote, { wait: 1000 }),
    [upsertNote],
  );

  useEffect(() => {
    if (result?.data?.id) {
      setSelectedNoteID(result.data.id);
    }
  }, [result?.data?.id]);

  useEffect(() => {
    setEditingNote(propsNote);
  }, [propsNote]);

  const onHeadingChange = (heading: string) => {
    if (!editingNote) return;
    const updated = { ...editingNote, heading };
    setEditingNote(updated);
    debouncedUpsert(updated);
  };

  const onTextChange = (text: string) => {
    if (!editingNote) return;
    const updated = { ...editingNote, text };
    setEditingNote(updated);
    debouncedUpsert(updated);
  };

  return (
    <div className="flex flex-col mx-auto w-full justify-between h-full">
      <NoteEditorHeader note={propsNote} />
      <div className="xs:w-full md:w-1/2 mx-auto md:mt-20 p-8 h-[calc(100vh-60px-48px)] overflow-auto">
        <NoteEditor
          note={editingNote}
          onHeadingChange={onHeadingChange}
          onTextChange={onTextChange}
        />
      </div>
      {propsNote && <NoteEditorFooter isPending={isPending} />}
    </div>
  );
};

export default NoteEditorWrapper;
