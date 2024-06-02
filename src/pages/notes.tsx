import Head from 'next/head';

import '@/app/globals.css';

import NoteList, { Note } from '@/components/note/NoteList';
import NoteEditor from '@/components/note/NoteEditor';

import { useEffect, useRef, useState } from 'react';
import { clx } from '@/utils/clx';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

const richTextClasses = clx(
  'prose prose-ul:pl-0 prose-ul:ml-6 prose-li:pl-0 prose-ul:space-y-1 prose-h1:font-bold prose-h1:text-2xl prose-h1:mb-4 prose-h2:mb-2 max-w-none',
  'prose-h2:mt-0 prose-h3:mb-2 prose-h4:mb-2 prose-li:my-0',
  'prose-p:my-1 prose-hr:my-4 prose-ul:my-0 prose-label:mt-0'
);

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: uuidv4(),
      title: 'Buy some grocieries',
      content: `
        <ul>
          <li>3x Peppers</li>
          <li>2x Milk</li>
        </ul>
        Reminder: There is a big online sale for supplements!
      `,

      done: false,
    },
    {
      id: uuidv4(),
      title: 'Cool vim key combos to practice',
      content: `
        <ul>
          <li>ciw -> change inner word</li>
          <li>dd -> cut current line</li>
          <li>gj/gk -> move cursor down/up, instead of going down/up a line</li>
        </ul>
      `,
      done: false,
    },
    {
      id: uuidv4(),
      title: 'Headlines and done state',
      content: `
        <h2>Hello World!</h2>
        <h3>Hello World!</h3>
        <h4>Hello World!</h4>
        <h5>Hello World!</h5>
        <hr>
      `,
      done: true,
    },
    {
      id: uuidv4(),
      title: 'Testing out Checkboxes',
      content: `
        <ul data-type="taskList">
          <li class="flex space-x-2 [&amp;_input]:mt-3" data-checked="false">
            <label contenteditable="false">
              <input type="checkbox">
              <span>
              </span>
            </label>
            <div>
              <p>First Task</p>
            </div>
          </li>
          <li class="flex space-x-2 [&amp;_input]:mt-3" data-checked="false">
            <label contenteditable="false">
              <input type="checkbox">
              <span>
              </span>
            </label>
            <div>
              <p>Second Task</p>
              <ul data-type="taskList">
                <li class="flex space-x-2 [&amp;_input]:mt-3" data-checked="false">
                  <label contenteditable="false">
                    <input type="checkbox">
                    <span></span>
                  </label>
                  <div>
                    <p>Sub Task of Second Task</p>
                  </div>
                </li>
                <li class="flex space-x-2 [&amp;_input]:mt-3" data-checked="false">
                  <label contenteditable="false">
                    <input type="checkbox">
                    <span></span>
                  </label>
                  <div>
                    <p>Second Sub Task</p>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      `,
      done: false,
    },
  ]);

  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null);
  const [previewNoteIndex, setPreviewNoteIndex] = useState<number | null>(null);

  const editorRef = useRef<{
    title: HTMLInputElement | null;
    content: HTMLInputElement | null;
  }>({
    title: null,
    content: null,
  });

  const addNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      content: '',
      title: '',
      done: false,
    };

    setNotes([newNote, ...structuredClone(notes)]);

    setActiveNoteIndex(0);
  };

  const deleteNote = (index: number) => {
    const result = structuredClone(notes);

    result.splice(index, 1);

    setNotes(result);

    setActiveNoteIndex(null);
  };

  return (
    <>
      <Head>
        <title>Note Application</title>
        <meta
          name="description"
          content="This is a Note Application written in Next.js"
        />
      </Head>
      <div>
        <div className="container mx-auto">
          <div className="mt-10">
            <Link className="text-3xl" href={'/'}>
              ↞ <span className="text-2xl">Zurück</span>
            </Link>
          </div>
          <h1 className="mt-10 mb-10 text-5xl text-center">Notes</h1>
          <div className="flex flex-col items-center w-full md:flex-row md:items-start text-md">
            <NoteList
              richTextClasses={richTextClasses}
              notes={notes}
              onChange={setNotes}
              className="order-1 max-w-full w-96 md:order-none"
              loadNote={(noteIndex: number) => {
                setActiveNoteIndex(noteIndex);
              }}
              previewNote={(noteIndex) => {
                if (noteIndex === previewNoteIndex) {
                  setPreviewNoteIndex(null);
                } else {
                  setPreviewNoteIndex(noteIndex);
                }
              }}
              activeNoteIndex={activeNoteIndex}
              previewNoteIndex={previewNoteIndex}
              setActiveNoteIndex={setActiveNoteIndex}
              setPreviewNoteIndex={setPreviewNoteIndex}
              toggleNoteDone={(noteIndex: number) => {
                const notesCopy = structuredClone(notes);
                notesCopy[noteIndex].done = !notesCopy[noteIndex].done;
                setNotes(notesCopy);
              }}
              addNote={addNote}
              deleteNote={deleteNote}
            />
            <NoteEditor
              className="grow"
              richTextClasses={richTextClasses}
              note={activeNoteIndex !== null ? notes[activeNoteIndex] : null}
              editorRef={editorRef}
              onSubmit={(newNoteTitle, newNoteContent, noteId, persist) => {
                if (noteId === null) {
                  noteId = uuidv4();
                }
                const noteIndex = notes.findIndex((note) => note.id === noteId);

                // save note if it is new, else just overwrite
                if (noteIndex === -1) {
                  const newNotes = [
                    {
                      id: uuidv4(),
                      title: newNoteTitle,
                      content: newNoteContent,
                      done: false,
                    },
                    ...notes
                  ];
                  setNotes(newNotes);
                  setActiveNoteIndex(0)


                } else {
                  const newNotes = [...notes];

                  newNotes[noteIndex].title = newNoteTitle;
                  newNotes[noteIndex].content = newNoteContent;
                  setNotes(newNotes);

                }

                if (persist) {
                  // persist in database here
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
