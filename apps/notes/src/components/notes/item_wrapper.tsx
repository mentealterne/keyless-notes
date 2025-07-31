'use client';

import dynamic from 'next/dynamic'
import type { FC } from 'react'

const NoteItemReact = dynamic(
  () => import('./item').then(m => m.NoteItemReact),
  { ssr: false }
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
