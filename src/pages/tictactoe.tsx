import TicTacToeGame from '@/components/tic-tac-toe/TicTacToeGame';
import Head from 'next/head';

import '@/app/globals.css';
import Link from 'next/link';

export default function TicTacToe() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name='description' content='This is a Tic Tac Toe game' />
      </Head>
      <div>
        <div className='container mx-auto'>
          <div className='mt-10'>
            <Link className='text-3xl' href={'/'}>
              ↞ <span className='text-2xl'>Zurück</span>
            </Link>
          </div>
          <h1 className='text-5xl text-center mt-10'>TicTacToe</h1>
          <TicTacToeGame />
        </div>
      </div>
    </>
  );
}
