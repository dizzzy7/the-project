import { clx } from '@/utils/clx';
import { Disclosure } from '@headlessui/react';
import { ReactNode, useState } from 'react';
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
  id: number;
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
};

export default function TodoList(props: TodoListProps) {
  const [activeTodoIndex, setActiveTodoIndex] = useState<number | null>(null);
  return (
    <ul className={clx(props.className, 'px-2 py-1 transition-all space-y-2')}>
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
              className='w-full text-left pl-3'
              onClick={() => {
                todoIndex !== activeTodoIndex
                  ? setActiveTodoIndex(todoIndex)
                  : setActiveTodoIndex(null);
              }}
            >
              {
                <div className='flex justify-between'>
                  <div className='py-2'>{todo.title}</div>
                  <div
                    className='py-2 pr-3'
                    onClick={(e) => {
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
              }
            </Disclosure.Button>
            <AnimateHeight
              duration={400}
              height={activeTodoIndex === todoIndex ? 'auto' : 0}
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
