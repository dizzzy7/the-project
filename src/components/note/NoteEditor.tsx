import { clx } from '@/utils/clx';
import { useEditor, EditorContent } from '@tiptap/react';
import Starterkit from '@tiptap/starter-kit';
import {
  MutableRefObject,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Note } from './NoteList';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';

import { v4 as uuidv4 } from 'uuid';

export type NoteEditorProps = {
  richTextClasses: string;
  onSubmit: (title: string, content: string, id: string | null, persist: boolean) => void;
  className?: string;
  note: Note | null;
  editorRef: MutableRefObject<{
    title: HTMLInputElement | null;
    content: HTMLInputElement | null;
  }>;
};

const NoteEditor = forwardRef((props: NoteEditorProps, ref) => {
  const editor = useEditor({
    extensions: [
      Starterkit,
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex space-x-2 [&_input]:mt-3',
        },
      }),
    ],
    content: (props.note && props.note.content) || '',
  });

  const [titleInputValue, setTitleInputValue] = useState<string>(
    (props.note && props.note.title) || ''
  );

  useEffect(() => {
    if (props.note && props.note.content) {
      editor?.commands.setContent(props.note.content);
      setTitleInputValue(props.note && props.note.title);
    } else {
      editor?.commands.setContent('');
      setTitleInputValue('');
    }
  }, [editor, props.note]);

  return (
    <div
      className={clx(
        props.className,
        'p-2 border-2 [&_*]:outline-none bg-neutral-100 h-full'
      )}
    >
      <input
        type="text"
        ref={(el) => {
          if (props.editorRef) {
            return (props.editorRef.current.title = el);
          }
        }}
        className="w-full p-2 text-2xl font-bold border-b bg-neutral-50"
        value={titleInputValue}
        onChange={(e) => {
          if (editor) {
            setTitleInputValue(e.target.value);
            props.onSubmit(e.target.value, editor.getHTML(), props.note && props.note.id || null, false)
          }
        }}
        placeholder=". . ."
      />
      <EditorContent
        className={clx(
          props.richTextClasses,
          'bg-neutral-50 w-full p-2 [&>div]:min-h-[100px] [&>div]:xl:min-h-[300px] h-[calc(100%-125px)]'
        )}
        editor={editor}
        placeholder=". . . . ."
      />
      <button
        className="px-6 py-2 mt-4 mb-2 font-medium bg-orange-200 rounded-md"
        onClick={() => {
          if (editor) {
            let noteTitle = titleInputValue;
            const editorContent = editor.getHTML();
            if (titleInputValue === '') {
              const match = editorContent.match(/<[^>]*>([^<]*)<\/[^>]*>/);
              const firstTagContent = match ? match[1] : '';
              noteTitle = firstTagContent;
            }

            if (props.note) {
              // update note
              props.onSubmit(noteTitle, editor.getHTML(), props.note.id, true);
            } else {
              // create new note
              props.onSubmit(noteTitle, editor.getHTML(), null, true);
              editor.commands.setContent('');
              setTitleInputValue('');
            }
          }
        }}
      >
        Save
      </button>
    </div>
  );
});

NoteEditor.displayName = 'NoteEditor';

export default NoteEditor;
