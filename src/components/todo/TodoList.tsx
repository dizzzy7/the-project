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
            className={
              'bg-slate-100 rounded-md border-slate-600 border-2 py-2 px-3'
            }
            key={todoIndex}
          >
            <Disclosure.Button
              className='w-full text-left'
              onClick={() => {
                todoIndex !== activeTodoIndex
                  ? setActiveTodoIndex(todoIndex)
                  : setActiveTodoIndex(null);
              }}
            >
              {
                <div className='flex justify-between'>
                  {todo.title}
                  <div
                    onClick={() => {
                      props.loadTodo(todoIndex);
                    }}
                  >
                    EDIT
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
                  'pt-2 mt-2 prose w-full mr-0 border-t'
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
