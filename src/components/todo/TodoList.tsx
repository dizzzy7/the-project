import { clx } from '@/utils/clx';
import { Disclosure } from '@headlessui/react';
import { ReactNode, useRef, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import DOMPurify from 'isomorphic-dompurify';

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

export type Todo = {
  id: string;
  title: string;
  content: string;
  done: boolean;
};

export type TodoListProps = {
  todos: Todo[];
  onChange: (todos: Todo[]) => void;
  richTextClasses: string;
  className?: string;
  loadTodo: (todoId: number) => void;
  addTodo: () => void;
  deleteTodo: (index: number) => void;
  activeTodoIndex: number | null;
  setActiveTodoIndex: (index: number | null) => void;
};

export default function TodoList(props: TodoListProps) {
  return (
    <ul className={clx(props.className, 'px-2 py-1 transition-all space-y-2')}>
      <li className='border-2 rounded-md bg-slate-100 border-slate-600'>
        <button
          onClick={(e) => props.addTodo()}
          className='flex items-center justify-center w-full py-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='inline-block w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
          <span className='pl-3 text-xl'>Add Todo</span>
        </button>
      </li>
      {props.todos.map((todo, todoIndex) => {
        let sanitizedTodoContent;
        if (todo.content) {
          sanitizedTodoContent = DOMPurify.sanitize(todo.content.toString());
        }
        return (
          <Disclosure
            as='li'
            className={'bg-slate-100 rounded-md border-slate-600 border-2'}
            key={todoIndex}
          >
            <Disclosure.Button
              className='w-full pl-3 text-left'
              onClick={() => {
                todoIndex !== props.activeTodoIndex
                  ? props.setActiveTodoIndex(todoIndex)
                  : props.setActiveTodoIndex(null);
              }}
            >
              {
                <div className='flex justify-between'>
                  <div className='py-2'>{todo.title}</div>
                  <div className='flex'>
                    <div
                      className='py-2 pr-2'
                      onClick={(e) => {
                        props.deleteTodo(todoIndex);
                        e.stopPropagation();
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                    </div>
                    <div
                      className='py-2 pr-3'
                      onClick={(e) => {
                        console.log(todoIndex);
                        props.loadTodo(todoIndex);
                        e.stopPropagation();
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              }
            </Disclosure.Button>
            <AnimateHeight
              duration={400}
              // only show maximum of 200 if the height of the content is greater, else do auto
              height={props.activeTodoIndex === todoIndex ? 'auto' : 0}
            >
              <div
                className={clx(
                  props.richTextClasses,
                  'pt-2 mt-2 prose w-full mr-0 border-t px-3 pb-2'
                )}
                dangerouslySetInnerHTML={{ __html: sanitizedTodoContent || '' }}
              ></div>
            </AnimateHeight>
          </Disclosure>
        );
      })}
    </ul>
  );
}
