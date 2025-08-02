"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";
import { setSelectedNoteID } from "@/store/notes";
import { NoteDTO } from "@/types/notes";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/themeProvider/useTheme";
import { ListVisibility } from "@/providers/themeProvider/theme.context";

const NoteItemReact = dynamic(
  () => import("./Item").then((m) => m.NoteItemReact),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 w-full rounded opacity-50 bg-gray-200 animate-pulse" />
    ),
  },
);

type NoteItemWrapperProps = {
  id: string | undefined;
  heading: string | undefined;
  text: string | undefined;
  isSelected: boolean;
  lastUpdated: Date;
  isCollapsed: boolean;
};

const NoteItemWrapper: FC<NoteItemWrapperProps> = (props) => {
  const { isMobile, updateListVisibility } = useTheme();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <NoteItemReact
        onNoteSelected={(e) => {
          setSelectedNoteID((e as CustomEvent<NoteDTO>).detail.id!);
          if (isMobile) {
            updateListVisibility(ListVisibility.COLLAPSED);
          }
        }}
        noteID={props.id}
        {...props}
      />
    </motion.div>
  );
};

export default NoteItemWrapper;
