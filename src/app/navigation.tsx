'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  return (
    <div className="border-l border-r border-slate-500 px-8 lg:px-0">
      <nav className="flex lg:flex-col lg:h-full lg:min-h-screen align-middle fixed top-0 left-0 right-0 lg:left-auto lg:right-auto px-5 lg:w-auto justify-between">
        <h1 className="pt-6 lg:pt-16 px-2 text-3xl lg:text-4xl font-bold tracking-wide relative">
          Sait<span className="text-red-300">&apos;</span>s<br />
          <span className="font-normal tracking-normal">Project</span>
        </h1>
        <ul
          className={clsx(
            'space-y-5 flex flex-col pt-20 lg:pt-16 lg:p-12 lg:justify-center justify-start lg:h-full ml-auto fixed right-0 top-0 lg:static bg-gray-800 lg:border-0 border-b border-l pl-14 pr-4 pb-6 h-fit transition-transform lg:transition-none lg:translate-x-0 lg:opacity-100 opacity-0',
            isNavigationVisible
              ? 'translate-x-0 opacity-100 transition-all'
              : 'translate-x-6 opacity-0'
          )}
        >
          <li className='before:content-["↠"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:top-1/2 before:scale-y-125'>
            <Link
              className="text-2xl opacity-60 hover:opacity-100 transition-opacity pr-16"
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
        <div
          className="fixed top-0 right-0 text-red-200 w-8 m-6 lg:hidden"
          onClick={() => setIsNavigationVisible(!isNavigationVisible)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </nav>
    </div>
  );
}
