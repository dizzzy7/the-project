'use client'

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import GithubLogo from '../../public/GithubLogo.svg';
import SaitLogo from '../../public/SaitLogo.svg';

export default function Navigation() {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsNavigationVisible(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };

  })

  return (
    <div className="border-l border-r border-slate-500 px-8 lg:px-0 bg-gray-800">
      <nav className="flex lg:flex-col lg:h-full lg:min-h-screen align-middle fixed top-0 left-0 right-0 lg:left-auto lg:right-auto px-5 lg:w-auto justify-between z-10">
        <h1 className="pt-6 sm:pt-8 lg:pt-32 px-2 text-3xl lg:text-4xl font-bold tracking-wide relative bg-gradient-radial from-gray-800/95 via-gray-800/95 to-gray-800/5 shadow-gray-800 shadow-2xl rounded-lg">
          <SaitLogo className="[&_*]:!fill-slate-400 lg:w-56 sm:w-36 w-28 h-auto" />
        </h1>
        <ul
          className={clsx(
            'space-y-5 flex flex-col pt-20 lg:pt-16 lg:p-12 lg:justify-center justify-start lg:h-full ml-auto fixed right-0 top-0 lg:static bg-gray-800 lg:border-0 border-b border-l pl-14 pr-4 pb-6 h-fit transition-transform lg:transition-none lg:translate-x-0 lg:opacity-100 opacity-0',
            isNavigationVisible
              ? 'translate-x-0 opacity-100 transition-all'
              : 'translate-x-6 opacity-0 [&_*]:select-none pointer-events-none lg:pointer-events-auto'
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
              className="text-2xl opacity-60 hover:opacity-100 transition-opacity hover:text-yellow-100"
              href={'#tech-i-use'}
            >
              Tech I use
            </Link>
          </li>
        </ul>
        <div
          className="fixed top-0 right-0 text-red-200 p-6 lg:hidden bg-gradient-radial from-gray-800/90 to-transparentshadow-2xl rounded-lg"
          onClick={(e) => {
            setIsNavigationVisible(!isNavigationVisible)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>

        <Link
          className="relative px-4 py-4 rounded-lg mb-4 lg:flex items-center gap-3 text-lg tracking-wider font-light hidden bg-slate-700/40 hover:bg-slate-700/90 transition-colors duration-150"
          href={'https://github.com/dizzzy7'}
        >
          <div className="bg-gradient-to-b from-gray-300 via-gray-500 from-40% via-90% to-gray-600 p-2 inline-block rounded-lg">
            <GithubLogo className="w-8 text-gray-800" />
          </div>
          @dizzzy7
        </Link>
      </nav>
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-800 via-gray-800/80  to-gray-800/50 z-10">
        <Link
          className="pl-2 relative flex items-center gap-3 text-lg tracking-wider font-light"
          href={'https://github.com/dizzzy7'}
        >
          <div className="bg-gradient-to-b from-gray-300 via-gray-500 from-40% via-90% to-gray-600 p-2 inline-block rounded-lg">
            <GithubLogo className="w-8 text-gray-800" />
          </div>
          @dizzzy7
        </Link>
      </nav>
    </div>
  );
}
