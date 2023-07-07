import { MouseEventHandler } from 'react';

export type SquareProps = {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function Square(props: SquareProps) {
  return (
    <button
      className='bg-slate-50 text-black aspect-square inline-block w-20 font-bold text-5xl'
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
