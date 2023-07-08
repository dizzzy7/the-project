import Head from 'next/head';

import '@/app/globals.css';
import TodoList, { Todo } from '@/components/todo/TodoList';
import { useState } from 'react';

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
      content: (
        <ul>
          <li>One </li>
          <li>Two </li>
          <li>Three</li>
        </ul>
      ),
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
          <TodoList todos={todos} onChange={setTodos} />
        </div>
      </div>
    </>
  );
}
