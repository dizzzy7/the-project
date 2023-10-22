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
import { Todo } from './TodoList';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';

import { v4 as uuidv4 } from 'uuid';

export type TodoEditorProps = {
  richTextClasses: string;
  onSubmit: (title: string, content: string, id: string | null) => void;
  className?: string;
  todo: Todo | null;
  editorRef: MutableRefObject<{
    title: HTMLInputElement | null;
    content: HTMLInputElement | null;
  }>;
};

const TodoEditor = forwardRef((props: TodoEditorProps, ref) => {
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
    content: (props.todo && props.todo.content) || '',
  });

  const [titleInputValue, setTitleInputValue] = useState<string>(
    (props.todo && props.todo.title) || ''
  );


  useEffect(() => {
    if (props.todo && props.todo.content) {
      editor?.commands.setContent(props.todo.content);
      setTitleInputValue(props.todo && props.todo.title);
    } else {
      editor?.commands.setContent('');
      setTitleInputValue('');
    }
  }, [editor, props.todo]);

  return (
    <div
      className={clx(
        props.className,
        'p-2 border-2 [&_*]:outline-none bg-neutral-100'
      )}
    >
      <input
        type='text'
        ref={(el) => {
          if (props.editorRef) {
            return (props.editorRef.current.title = el);
          }
        }}
        className='w-full p-2 text-2xl font-bold border-b bg-neutral-50'
        value={titleInputValue}
        onChange={(e) => {
          setTitleInputValue(e.target.value);
        }}
        placeholder='. . .'
      />
      <EditorContent
        className={clx(
          props.richTextClasses,
          'bg-neutral-50 w-full p-2 [&>div]:min-h-[100px] [&>div]:md:min-h-[500px]'
        )}
        editor={editor}
        placeholder='. . . . .'
      />
      <button
        className='px-6 py-2 mt-4 mb-2 font-medium bg-orange-200 rounded-md'
        onClick={() => {
          if (editor) {
            let todoTitle = titleInputValue;
            const editorContent = editor.getHTML();
            if (titleInputValue === '') {
              const match = editorContent.match(/<[^>]*>([^<]*)<\/[^>]*>/);
              const firstTagContent = match ? match[1] : '';
              todoTitle = firstTagContent;
            }

            if (props.todo) {
              props.onSubmit(
                todoTitle,
                editor.getHTML(),
                props.todo.id
              );
              editor.commands.setContent('');
              setTitleInputValue('');
            } else if (titleInputValue && editorContent) {
              props.onSubmit(
                todoTitle,
                editor.getHTML(),
                uuidv4()
              );
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

TodoEditor.displayName = 'TodoEditor'

export default TodoEditor;
