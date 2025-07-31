'use client';

import dynamic from 'next/dynamic'
import type { FC } from 'react'

const NoteItemReact = dynamic(
  () => import('./item').then(m => m.NoteItemReact),
  { ssr: false,loading: () => (
      <div className="h-32 w-full rounded opacity-50 bg-gray-200 animate-pulse" />
    ) }
);

type NoteItemWrapperProps = {
  heading: string;
  text: string;
  lastUpdated: string;
};

const NoteItemWrapper: FC<NoteItemWrapperProps> = (props) => {
  return <NoteItemReact {...props} />;
};

export default NoteItemWrapper;
