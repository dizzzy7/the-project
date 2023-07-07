import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ul className='space-y-5 flex flex-col'>
        <li className='before:content-["↠"] before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-3xl before:top-1/2 before:scale-y-125'>
          <Link className='text-5xl' href={'/tictactoe'}>
            Tic-Tac-Toe
          </Link>
        </li>
        <li className='before:content-["↠"] before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-3xl before:top-1/2 before:scale-y-125'>
          <Link className='text-5xl' href={'/tictactoe'}>
            Todos
          </Link>
        </li>
      </ul>
    </main>
  );
}
