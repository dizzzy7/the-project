import { PropsWithChildren, useState } from 'react';
import Square from './Square';
import { clx } from '@/utils/clx';

export type GameBoardProps = {
  className?: string;
};

export type PlayerCharacters = {
  player: 'X' | 'O' | null;
};

function calculateWinner(squares: number[][]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToeGame(
  props: PropsWithChildren<GameBoardProps>
) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(squareIndex: number) {
    const nextSquares = squares.slice();

    if (squares[squareIndex] || calculateWinner(squares)) {
      return;
    }

    if (xIsNext) {
      nextSquares[squareIndex] = 'X';
    } else {
      nextSquares[squareIndex] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div
        className={clx(
          winner && 'transition-opacity opacity-100',
          'text-center text-2xl mt-5'
        )}
      >
        {status}
      </div>
      <div
        className={clx(
          'w-min mx-auto mt-10 bg-slate-400 gap-1 flex flex-col select-none'
        )}
      >
        <div className={clx('board-row', 'gap-1 flex justify-between')}>
          <Square onClick={(e) => handleClick(0)} value={squares[0]} />
          <Square onClick={(e) => handleClick(1)} value={squares[1]} />
          <Square onClick={(e) => handleClick(2)} value={squares[2]} />
        </div>
        <div className={clx('board-row', 'gap-1 flex justify-between')}>
          <Square
            onClick={(e) => {
              handleClick(3);
            }}
            value={squares[3]}
          />
          <Square
            onClick={(e) => {
              handleClick(4);
            }}
            value={squares[4]}
          />
          <Square
            onClick={(e) => {
              handleClick(5);
            }}
            value={squares[5]}
          />
        </div>
        <div className={clx('board-row', 'gap-1 flex justify-between')}>
          <Square
            onClick={(e) => {
              handleClick(6);
            }}
            value={squares[6]}
          />
          <Square
            onClick={(e) => {
              handleClick(7);
            }}
            value={squares[7]}
          />
          <Square
            onClick={(e) => {
              handleClick(8);
            }}
            value={squares[8]}
          />
        </div>
      </div>
    </>
  );
}
