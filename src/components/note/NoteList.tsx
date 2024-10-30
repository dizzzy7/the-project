import { clx } from '@/utils/clx';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export type Note = {
  id: string;
  title: string;
  content: string;
  done: boolean;
};

export type NoteListProps = {
  notes: Note[];
  onChange: (notes: Note[]) => void;
  richTextClasses: string;
  className?: string;
  loadNote: (noteId: number) => void;
  addNote: () => void;
  deleteNote: (index: number) => void;
  activeNoteIndex: number | null;
  previewNoteIndex: number | null;
  setActiveNoteIndex: (index: number | null) => void;
  setPreviewNoteIndex: (index: number | null) => void;
  previewNote: (index: number | null) => void;
};

export default function NoteList(props: NoteListProps) {
  return (
    <ul
      className={clx(
        props.className,
        'px-2 md:pr-0 py-1 transition-all space-y-2'
      )}
    >
      <li className="bg-slate-600 text-white rounded-md border border-slate-500 rounded-md hover:bg-slate-500 transition-all">
        <button
          onClick={(e) => props.addNote()}
          className="flex items-center justify-center w-full py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="inline-block w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="pl-3 text-xl">Add Note</span>
        </button>
      </li>
      {props.notes
        .sort((a, b) => {
          if (a.done && !b.done) {
            return 1;
          } else if (!a.done && b.done) {
            return -1;
          } else {
            return 0;
          }
        })
        .map((note, noteIndex) => {
          return (
            <li
              className={
                'bg-slate-600 text-white rounded-md border-slate-200 border group hover:bg-slate-500'
              }
              key={note.id}
            >
              <button
                className="w-full pl-3 text-left"
                onClick={(e) => {
                  props.loadNote(noteIndex);
                  e.stopPropagation();
                }}
              >
                {
                  <div className="flex justify-between">
                    <div
                      className={clx(
                        note.done && 'line-through opacity-50',
                        'py-2'
                      )}
                    >
                      {note.title}
                    </div>
                    <div className="flex items-center">
                      <div
                        className="py-2 pr-2 bg-slate-600 group-hover:bg-slate-500 opacity-0 group-hover:opacity-60 hover:!opacity-90 rounded-md transition-opacity"
                        onClick={(e) => {
                          props.deleteNote(noteIndex);
                          e.stopPropagation();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                      <div
                        className="py-2"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      ></div>
                    </div>
                  </div>
                }
              </button>
            </li>
          );
        })}
    </ul>
  );
}
