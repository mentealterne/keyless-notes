'use client'
import { FC } from 'react'
import { type Note } from '@/types/notes'
import NotesListHeader from '@/components/notes/header'
import NoteItemWrapper from '@/components/notes/item_wrapper'
import '@keyless/web-components/note-item'

interface Props {
  notes: Note[]
}
const NotesList: FC<Props> = ({ notes }) => {
  return <div className={'flex flex-col gap-6'}>
    <NotesListHeader />
    <div className='flex flex-col gap-4'>
    {notes.map((note, index) => (
      <NoteItemWrapper key={index} heading={note.title} text={note.text} lastUpdated={note.lastUpdated}  />
    ))}
  </div></div>
}

export default NotesList
