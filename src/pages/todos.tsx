import Head from 'next/head';

import '@/app/globals.css';

import TodoList, { Todo } from '@/components/todo/TodoList';
import TodoEditor from '@/components/todo/TodoEditor';

import { useEffect, useRef, useState } from 'react';
import { clx } from '@/utils/clx';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

const richTextClasses = clx(
  'prose prose-ul:pl-0 prose-ul:ml-6 prose-li:pl-0 prose-ul:space-y-1 prose-h1:font-bold prose-h1:text-3xl prose-h1:mb-4 prose-h2:mb-2 max-w-none',
  'prose-h2:mt-0 prose-h3:mb-2 prose-h4:mb-2 prose-li:my-0',
  'prose-p:my-1 prose-hr:my-4 prose-ul:my-0'
);

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuidv4(),
      title: 'Buy some grocieries',
      content: `
        <ul>
          <li>Peppers</li>
          <li>Milk</li>
          <li></li>
        </ul>
        <input type="checkbox">
      `,
      done: false,
    },
    {
      id: uuidv4(),
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
    {
      id: uuidv4(),
      title: 'Third Todo',
      content: `
        <h2>Hello World!</h2>
        <h3>Hello World!</h3>
        <h4>Hello World!</h4>
        <h5>Hello World!</h5>
        <ul>
          <li>This is a thing</li>
          <li>This is the second thing</li>
          <li>This is the third thing</li>
          <li>This is the fourth thing</li>
        </ul>
        <hr>
      `,
      done: false,
    },
  ]);

  const [activeTodoIndex, setActiveTodoIndex] = useState<number | null>(null);
  const [previewTodoIndex, setPreviewTodoIndex] = useState<number | null>(null);

  const editorRef = useRef<{
    title: HTMLInputElement | null;
    content: HTMLInputElement | null;
  }>({
    title: null,
    content: null,
  });

  const addTodo = () => {
    const newTodo: Todo = {
      id: uuidv4(),
      content: '',
      title: '',
      done: false,
    };

    setTodos([newTodo, ...structuredClone(todos)]);

    setActiveTodoIndex(0);
  };

  const deleteTodo = (index: number) => {
    const result = structuredClone(todos);

    result.splice(index, 1);

    setTodos(result);

    setActiveTodoIndex(null);
  };

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
          <div className='mt-10'>
            <Link className='text-3xl' href={'/'}>
              ↞ <span className='text-2xl'>Zurück</span>
            </Link>
          </div>
          <h1 className='mt-10 mb-10 text-5xl text-center'>Todos</h1>
          <div className='flex flex-col items-center w-full md:flex-row md:items-start'>
            <TodoList
              richTextClasses={richTextClasses}
              todos={todos}
              onChange={setTodos}
              className='order-1 max-w-full w-96 md:order-none'
              loadTodo={(todoIndex: number) => {
                setActiveTodoIndex(todoIndex);
              }}
              previewTodo={(todoIndex) => {
                if (todoIndex === previewTodoIndex) {
                  setPreviewTodoIndex(null)
                } else {
                  setPreviewTodoIndex(todoIndex)
                }
              }}
              activeTodoIndex={activeTodoIndex}
              previewTodoIndex={previewTodoIndex}
              setActiveTodoIndex={setActiveTodoIndex}
              setPreviewTodoIndex={setPreviewTodoIndex}
              toggleTodoDone={(todoIndex: number) => {
                const todosCopy = structuredClone(todos)
                todosCopy[todoIndex].done = !todosCopy[todoIndex].done
                setTodos(todosCopy)
              }}
              addTodo={addTodo}
              deleteTodo={deleteTodo}
            />
            <TodoEditor
              className='grow'
              richTextClasses={richTextClasses}
              todo={activeTodoIndex !== null ? todos[activeTodoIndex] : null}
              editorRef={editorRef}
              onSubmit={(newTodoTitle, newTodoContent, todoId) => {
                if (todoId === null) {
                  todoId = uuidv4();
                }
                const todoIndex = todos.findIndex((todo) => todo.id === todoId);

                // save todo if it is new, else just overwrite
                if (todoIndex === -1) {
                  const newTodos = [
                    ...todos,
                    {
                      id: uuidv4(),
                      title: newTodoTitle,
                      content: newTodoContent,
                      done: false,
                    },
                  ];
                  setTodos(newTodos);
                } else {
                  const newTodos = [...todos];

                  newTodos[todoIndex].title = newTodoTitle;
                  newTodos[todoIndex].content = newTodoContent;
                  setTodos(newTodos);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
