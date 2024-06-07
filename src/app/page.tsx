import Link from 'next/link';

export default function Home() {
  return (
    <main className='min-h-screen bg-gray-800 text-slate-100'>
      <div className='container grid grid-cols-[21rem_auto] h-full min-h-screen'>
        <div className='border-l border-r border-slate-500 px-8 '>
          <nav className='flex flex-col h-full min-h-screen align-middle fixed'>
            <h1 className='fixed top-0 pt-16 px-2 text-4xl font-bold tracking-wide'>Sait<span className='text-red-300'>'</span>s<br /><span className='font-normal tracking-normal'>Portfolio</span></h1>
            <ul className='space-y-5 flex flex-col pt-16 p-12 justify-center h-full'>
              <li className='before:content-["↠"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:top-1/2 before:scale-y-125'>
                <Link className='text-3xl' href={'#about-me'}>
                  About me
                </Link>
              </li>
              <li className='before:content-["↠"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:top-1/2 before:scale-y-125'>
                <Link className='text-3xl' href={'#side-projects'}>
                  Side Projects
                </Link>
              </li>
              <li className='ml-6 !mt-3 before:content-["↠"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:top-1/2 before:scale-y-125'>
                <Link className='text-2xl' href={'/notes'}>
                  Notes
                </Link>
              </li>
              <li className='ml-6 !mt-2 before:content-["↠"] before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:text-gray-500 before:top-1/2 before:scale-y-125'>
                <Link className='text-2xl' href={'/tictactoe'}>Tic-Tac-Toe</Link>
              </li>
              <li className='before:content-["↠"] before:text-gray-500 before:absolute before:-left-3 before:-translate-x-full before:-translate-y-1/2 relative before:text-2xl before:top-1/2 before:scale-y-125'>
                <Link className='text-3xl' href={'#other-projects'}>Other Projects</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='px-12 prose prose-invert prose-p:text-lg prose-h1:font-medium prose-h1:text-3xl justify-self-stretch'>
          <div id='about-me' className='flex min-h-screen'>
            <div className='my-auto'>
              <h1>About me.</h1>
              <p><span className='text-red-200 text-xl mr-2'>Hello there!</span> I am Sait. A developer based in Berlin, Germany.</p>
              <p>Over the duration of my <span className='text-red-300'>3 years</span> of studies <span className='text-red-300'>I have been working as a web developer</span> <span className='text-gray-400'>(20h/week)</span>.</p>
              <p>I switched to working full time as a frontend developer in <span className='text-cyan-300'>07.2022</span> and collected <u className='text-cyan-300'>17 months of frontend development experience</u> with a great team of seasoned developers and engineers.</p>
              <p>My main frontend framework I use is <span className='text-cyan-300'>React</span>.</p>
            </div>
          </div>
          <div id='side-projects' className='flex min-h-screen'>
            <div className='my-auto'>
              <h1>Side Projects</h1>
              <p>I am creating projects in my free time and showcase them here, since it's hard for me to show things that I built for other companies.</p>
              <p>Here is a list with links:</p>
              <ul>
                <li><Link href={'/notes'}>Notes</Link></li>
                <li><Link href={'/tictactoe'}>Tic-Tac-Toe</Link></li>
              </ul>
              <p>My main frontend framework I use is <span className='text-cyan-300'>React</span>.</p>
            </div>
          </div>
          <div id="other-projects" className='flex min-h-screen'>
            <div className='my-auto'>
              <h1>Other projects</h1>
              <p>I have worked on several websites and projects. Here are the ones that I can publicly list:</p>
              <ul>
                <li><a className='decoration-red-500 underline-offset-4 decoration-2' href="https://beefbusters.de/">Beef Busters</a></li>
                <li><a className='decoration-blue-400 underline-offset-4 decoration-2' href="https://kh-zahnarztpraxis.de/">KH Zahnarztpraxis</a></li>
                <li><a className='decoration-cyan-400 underline-offset-4 decoration-2' href="https://can-facilityservices.de/">Can Facility Services</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
