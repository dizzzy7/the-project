import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="border-l border-r border-slate-500 px-8 lg:px-0">
      <nav className="flex lg:flex-col lg:h-full lg:min-h-screen align-middle fixed top-0 left-0 right-0 lg:left-auto lg:right-auto px-5 lg:w-auto justify-between">
        <h1 className="fixed top-0 pt-6 lg:pt-16 px-2 text-3xl lg:text-4xl font-bold tracking-wide">
          Sait<span className="text-red-300">&apos;</span>s<br />
          <span className="font-normal tracking-normal">Project</span>
        </h1>
        <ul className="space-y-5 flex flex-col pt-6 lg:pt-16 lg:p-12 justify-center h-full ml-auto">
          <li className='before:content-["↠"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:top-1/2 before:scale-y-125'>
            <Link
              className="text-2xl opacity-60 hover:opacity-100 transition-opacity"
              href={'#about-me'}
            >
              About me
            </Link>
          </li>
          <li className='before:content-["↠"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:top-1/2 before:scale-y-125'>
            <Link
              className="text-2xl opacity-60 hover:opacity-100 transition-opacity"
              href={'#experience'}
            >
              Experience
            </Link>
          </li>
          <li className='before:content-["↠"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:top-1/2 before:scale-y-125'>
            <Link
              className="text-2xl opacity-60 hover:opacity-100 transition-opacity"
              href={'#side-projects'}
            >
              Side Projects
            </Link>
          </li>
          <li className='ml-6 !mt-3 before:content-["🔗"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-7 before:-translate-y-1/2 relative before:text-2xl before:top-1/2'>
            <Link
              className="text-xl opacity-60 hover:opacity-100 hover:text-blue-400 transition-all"
              href={'/notes'}
            >
              Notes
            </Link>
          </li>
          <li className='ml-6 !mt-2 before:content-["🔗"] before:absolute before:-left-3 before:-translate-x-7 before:-translate-y-1/2 relative before:text-2xl before:text-gray-500 before:top-1/2'>
            <Link
              className="text-xl opacity-60 hover:opacity-100 hover:text-blue-200 transition-all"
              href={'/tictactoe'}
            >
              Tic-Tac-Toe
            </Link>
          </li>
          <li className='before:content-["↠"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:top-1/2 before:scale-y-125'>
            <Link
              className="text-2xl opacity-60 hover:opacity-100 transition-opacity hover:text-yellow-100"
              href={'#tech-i-use'}
            >
              Tech I use
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
