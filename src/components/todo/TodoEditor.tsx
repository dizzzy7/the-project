import { clx } from '@/utils/clx';
import { useEditor, EditorContent } from '@tiptap/react';
import Starterkit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { Todo } from './TodoList';

export type TodoEditorProps = {
  richTextClasses: string;
  onSubmit: (title: string, content: string, id: number) => void;
  className?: string;
  todo: Todo;
};

export default function TodoEditor(props: TodoEditorProps) {
  const editor = useEditor({
    extensions: [Starterkit],
    content: props.todo.content,
  });

  /**
   * if there is the need, load in some content initially
   *
   * This will help with
   *  */

  const [titleInputValue, setTitleInputValue] = useState<string>(
    props.todo.title
  );

  useEffect(() => {
    editor?.commands.setContent(props.todo.content);
    setTitleInputValue(props.todo.title);
  }, [props.todo.content, props.todo.title]);

  return (
    <div
      className={clx(
        props.className,
        'p-2 border-2 [&_*]:outline-none bg-neutral-100'
      )}
    >
      <input
        type='text'
        className='border-b w-full bg-neutral-50 p-2 text-2xl font-bold'
        value={titleInputValue}
        onChange={(e) => {
          setTitleInputValue(e.target.value);
        }}
        placeholder='. . .'
      />
      <EditorContent
        className={clx(
          props.richTextClasses,
          'bg-neutral-50 w-full p-2 [&>div]:min-h-[500px]'
        )}
        editor={editor}
        placeholder='. . . . .'
      />
      <button
        className='rounded-md bg-orange-200 py-2 font-medium mt-4 mb-2 px-6'
        onClick={() => {
          // TODO: get title of Todo, and the Content of the Todo
          if (editor) {
            let todoTitle = titleInputValue;
            if (titleInputValue === '') {
              const editorContent = editor.getHTML();
              const match = editorContent.match(/<[^>]*>([^<]*)<\/[^>]*>/);
              const firstTagContent = match ? match[1] : '';
              todoTitle = firstTagContent;
            }

            props.onSubmit(todoTitle, editor.getHTML(), props.todo.id);
            editor.commands.setContent('');
            setTitleInputValue('');
          }
        }}
      >
        Save
      </button>
    </div>
  );
}
