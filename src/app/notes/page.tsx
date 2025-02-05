'use client';

import Head from 'next/head';

import '@/globals.scss';

import NoteList, { Note } from '@/components/note/NoteList';
import NoteEditor from '@/components/note/NoteEditor';

import { useEffect, useRef, useState } from 'react';
import { clx } from '@/utils/clx';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import useBreakpoint from 'use-breakpoint';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const richTextClasses = clx(
  'prose prose-invert prose-ul:pl-0 prose-ul:ml-6 prose-li:pl-0 prose-ul:space-y-1 prose-h1:font-bold prose-h1:text-2xl prose-h1:mb-4 prose-h2:mb-2 max-w-none',
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

  const { breakpoint, maxWidth, minWidth } = useBreakpoint({
    mobile: 0,
    tablet: 768,
    desktop: 1280,
  });

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
      <div className="bg-gray-800">
        <div className="mx-auto min-h-screen h-screen pt-2">
          <ResizablePanelGroup
            className="min-h-screen xl:min-h-0"
            direction={breakpoint === 'desktop' ? 'horizontal' : 'vertical'}
          >
            <ResizablePanel minSize={25} defaultSize={25}>
              <ScrollArea className="h-full">
                <NoteList
                  richTextClasses={richTextClasses}
                  notes={notes}
                  onChange={setNotes}
                  className="order-1 md:order-none"
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
                  addNote={addNote}
                  deleteNote={deleteNote}
                />
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle className="mx-3" withHandle />
            <ResizablePanel minSize={25} defaultSize={75}>
              <NoteEditor
                richTextClasses={richTextClasses}
                note={activeNoteIndex !== null ? notes[activeNoteIndex] : null}
                editorRef={editorRef}
                onSubmit={(newNoteTitle, newNoteContent, noteId, persist) => {
                  if (noteId === null) {
                    noteId = uuidv4();
                  }
                  const noteIndex = notes.findIndex(
                    (note) => note.id === noteId
                  );

                  // save note if it is new, else just overwrite
                  if (noteIndex === -1) {
                    const newNotes = [
                      {
                        id: uuidv4(),
                        title: newNoteTitle,
                        content: newNoteContent,
                        done: false,
                      },
                      ...notes,
                    ];
                    setNotes(newNotes);
                    setActiveNoteIndex(0);
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
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
}
