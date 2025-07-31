"use client";

import { createComponent } from "@lit/react";
import * as React from "react";
import { NoteItem } from "@keyless/web-components/note-item";

export const NoteItemReact = createComponent({
  tagName: "note-item",
  elementClass: NoteItem,

  react: React,
  events: {
    onNoteSelected: "note-selected",
  },
});
