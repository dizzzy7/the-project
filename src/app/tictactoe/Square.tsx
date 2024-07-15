import { cn } from '@/lib/utils';
import { MouseEventHandler } from 'react';
import { PlayerCharacters } from './TicTacToeGame';

export type SquareProps = {
  value: PlayerCharacters;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function Square(props: SquareProps) {
  return (
    <button
      className={cn(
        'bg-gray-700 text-gray-200 aspect-square inline-block w-20 font-bold text-5xl',
        props.value === 'O' && 'text-emerald-400',
        props.value === 'X' && 'text-purple-400'
      )}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
