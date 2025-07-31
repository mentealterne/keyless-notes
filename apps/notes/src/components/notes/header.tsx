'use client'

import { FC } from 'react'
import { CaretDoubleLeft, Laptop } from '@phosphor-icons/react'

const NotesListHeader:FC = () => {
  return <div className="flex items-center justify-between px-4 py-2">
    <h1 className={'text-sm text-gray-500 font-bold flex flex-row items-center justify-center gap-1'}><Laptop size={24} /> Workspace </h1>
    <CaretDoubleLeft size={16} className={'text-accent'} />
  </div>
}

export default NotesListHeader
