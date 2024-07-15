import '@/globals.css';
import Link from 'next/link';
import TicTacToeGame from './TicTacToeGame';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tic Tac Toe',
  description: 'This is a Tic Tac Toe game',
};

export default function TicTacToe() {
  return (
    <div className="min-h-screen bg-gray-800 text-slate-50">
      <div className="container mx-auto">
        <div className="pt-10">
          <Link className="text-3xl" href={'/'}>
            ↞ <span className="text-2xl">Zurück</span>
          </Link>
        </div>
        <h1 className="text-5xl text-center mt-10">TicTacToe</h1>
        <TicTacToeGame />
      </div>
    </div>
  );
}
