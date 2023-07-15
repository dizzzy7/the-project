import Head from 'next/head';

import '@/app/globals.css';

import TodoList, { Todo } from '@/components/todo/TodoList';
import TodoEditor from '@/components/todo/TodoEditor';

import { useState } from 'react';
import { clx } from '@/utils/clx';

const richTextClasses = clx(
  'prose prose-ul:space-y-1 prose-h1:font-bold prose-h1:text-3xl prose-h1:mb-4 prose-h2:mb-2 max-w-none',
  'prose-h2:mt-0 prose-h3:mb-2 prose-h4:mb-2 prose-li:my-0',
  'prose-p:my-1 prose-ul:my-4 prose-hr:my-4'
);

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 0,
      title: 'Laundry',
      content:
        "Go do the laundry before bedtime. It's gonna be a dark colored clothes wash.",
      done: false,
    },
    {
      id: 1,
      title: 'Get the groceries',
      content: `
        <ul>
          <li>One </li>
          <li>Two </li>
          <li>Three</li>
        </ul>
      `,
      done: false,
    },
  ]);

  return (
    <>
      <Head>
        <title>Todo Application</title>
        <meta
          name='description'
          content='This is a Todo Application written in Next.js'
        />
      </Head>
      <div>
        <div className='container mx-auto'>
          <h1 className='text-5xl text-center mt-10 mb-10'>Todos</h1>
          <div className='flex w-full'>
            <TodoList
              richTextClasses={richTextClasses}
              todos={todos}
              onChange={setTodos}
              className='w-96 max-w-full'
            />
            <TodoEditor
              className='grow'
              richTextClasses={richTextClasses}
              onSubmit={(newTodoTitle, newTodoContent) => {
                const newTodos = [
                  ...todos,
                  {
                    id: todos[todos.length - 1].id + 1,
                    title: newTodoTitle,
                    content: newTodoContent,
                    done: false,
                  },
                ];
                setTodos(newTodos);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
