import { PropsWithChildren, useCallback, useState } from 'react';
import Square from './Square';
import { clx } from '@/utils/clx';

export type GameBoardProps = {
  className?: string;
};

export type PlayerCharacters = {
  player: 'O' | 'X' | null;
};

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

export default function TicTacToeGame(
  props: PropsWithChildren<GameBoardProps>
) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(false);
  const [score, setScore] = useState([0, 0]);

  const calculateWinner = useCallback(
    (squares: string[]) => {
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return `Winner: ${squares[a]}`;
        }
      }

      if (squares.every((square) => square !== null)) {
        return 'Tie';
      }

      return null;
    },
    [squares]
  );

  const resetBoard = useCallback((setState: (squares: number[][]) => void) => {
    setState(Array(9).fill(null));
    setXIsNext(false);
  }, []);

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = winner;
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

    const winner = calculateWinner(nextSquares);

    if (winner && xIsNext === false) {
      const newScore = [...score];
      newScore[0]++;
      setScore(newScore);
    } else if (winner && xIsNext === true) {
      const newScore = [...score];
      newScore[1]++;
      setScore(newScore);
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className={clx('text-center text-2xl mt-5 relative w-max mx-auto')}>
        <div
          className={clx(
            winner === 'Tie' ? 'bg-yellow-100' : winner && 'bg-emerald-200 rounded animate-pulse ',
            'absolute inset-0'
          )}
        ></div>
        <div className='relative px-4 py-2'>{status}</div>
      </div>
      <div
        className={clx(
          'w-min mx-auto mt-10 bg-slate-400 gap-1 flex flex-col select-none'
        )}
      >
        <div className={clx('board-row', 'gap-1 flex justify-between')}>
          <Square onClick={() => handleClick(0)} value={squares[0]} />
          <Square onClick={() => handleClick(1)} value={squares[1]} />
          <Square onClick={() => handleClick(2)} value={squares[2]} />
        </div>
        <div className={clx('board-row', 'gap-1 flex justify-between')}>
          <Square
            onClick={() => {
              handleClick(3);
            }}
            value={squares[3]}
          />
          <Square
            onClick={() => {
              handleClick(4);
            }}
            value={squares[4]}
          />
          <Square
            onClick={() => {
              handleClick(5);
            }}
            value={squares[5]}
          />
        </div>
        <div className={clx('board-row', 'gap-1 flex justify-between')}>
          <Square
            onClick={() => {
              handleClick(6);
            }}
            value={squares[6]}
          />
          <Square
            onClick={() => {
              handleClick(7);
            }}
            value={squares[7]}
          />
          <Square
            onClick={() => {
              handleClick(8);
            }}
            value={squares[8]}
          />
        </div>
      </div>
      <div className='mx-auto text-center mt-5 space-x-4'>
        <span className='text-2xl align-middle'>
          {score[0]}
          <span className='font-bold text-3 opacity-50 rounded-md border-2 aspect-square w-9 inline-grid items-center pb-1 ml-3'>
            O
          </span>
        </span>
        <button
          onClick={() => {
            resetBoard(setSquares);
          }}
          className={clx(
            'bg-indigo-200 p-2 px-4 rounded hover:opacity-100 transition-opacity align-middle',
            winner ? 'opacity-100' : 'opacity-70'
          )}
        >
          RESTART
        </button>
        <span className='text-2xl align-middle'>
          <span className='font-bold text-3 opacity-50 border-2 rounded-md aspect-square w-9 inline-grid items-center pb-1 mr-3'>
            X
          </span>
          {score[1]}
        </span>
      </div>
    </>
  );
}
