import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FixedGradientTop from '@/components/visual-components/fixed-gradient-top';
import FixedGradientBottom from '@/components/visual-components/fixed-gradient-bottom';
import Navigation from './navigation';
import Container from './container';
import { IconBadge } from '@/components/ui/icon-badge';
import ReactBadge from '../../public/ReactBadge.svg';
import VueBadge from '../../public/VueBadge.svg';
import AlpineBadge from '../../public/AlpineBadge.svg';
import AffinityPhotoLogo from '../../public/AffinityPhotoLogo.svg';
import ArchiveIcon from '../../public/ArchiveIcon.svg';
import BlenderLogo from '../../public/BlenderLogo.svg';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-800 text-slate-100">
      <FixedGradientBottom />
      <FixedGradientTop />
      <Container>
        <Navigation />
        <div className="px-12 prose prose-invert prose-p:text-lg prose-h1:font-medium prose-h1:text-3xl justify-self-stretch">
          <section id="about-me" className="flex min-h-screen my-10">
            <div className="my-auto py-8">
              <h1>About me.</h1>
              <p>
                <span className="text-green-200 text-xl mr-2">
                  Hello there!
                </span>{' '}
                I am Sait. A developer based in Berlin, Germany.
              </p>
              <p>
                Over the duration of my{' '}
                <span className="text-green-300">3 years</span> of studies{' '}
                <span className="text-green-300">
                  I have been working as a web developer
                </span>{' '}
                <span className="text-gray-400">(20h/week)</span>.
              </p>
              <p>
                I switched to working full time as a frontend developer in{' '}
                <span className="text-cyan-300">07.2022</span> and collected{' '}
                <u className="text-cyan-300">
                  17 months of frontend development experience
                </u>{' '}
                with a great team of seasoned developers and engineers.
              </p>
            </div>
          </section>
          <section id="experience" className="flex min-h-screen my-10">
            <div className="my-auto py-8">
              <h1>Experience</h1>
              <p>
                I have worked on several websites and projects. Here are the
                ones that I can publicly list:
              </p>
              <ul className="text-2xl">
                <li>
                  <a
                    className="text-amber-200 hover:text-amber-400 transition-all decoration-white/30 hover:decoration-white/90 underline-offset-8 decoration-1"
                    href="https://www.tonhalle.de/"
                  >
                    Tonhalle Düsseldorf
                  </a>
                </li>
                <li>
                  <a
                    className="text-yellow-200 hover:text-yellow-400 transition-all hover:decoration-white/90 decoration-white/30 underline-offset-8 decoration-1"
                    href="https://beemedic.com/de"
                  >
                    Beemedic
                  </a>
                </li>
                <li>
                  <a
                    className="text-red-200 hover:text-red-300 hover:decoration-white/90 decoration-white/30 transition-all underline-offset-8 decoration-1"
                    href="https://beefbusters.de/"
                  >
                    Beef Busters
                  </a>
                </li>
                <li>
                  <a
                    className="text-blue-200 hover:text-blue-400 decoration-white/30 hover:decoration-white/90 transition-all underline-offset-8 decoration-1"
                    href="https://kh-zahnarztpraxis.de/"
                  >
                    KH Zahnarztpraxis
                  </a>
                </li>
                <li>
                  <a
                    className="text-cyan-200 hover:text-blue-400 decoration-white/30 transition-all underline-offset-8 decoration-1 hover:decoration-white/90"
                    href="https://can-facilityservices.de/"
                  >
                    Can Facility Services
                  </a>
                </li>
              </ul>
              <p>
                In my latest projects I have been using{' '}
                <span className="text-cyan-200">React + Typescript.</span> I
                implemented API integrations to the frontend with{' '}
                <span className="text-white">Tanstack Query</span>, created a
                graphical application with{' '}
                <span className="text-cyan-200">konva.js</span>, and solved
                several problems using different combinations of libraries.
              </p>
              <p>
                In my early career I built websites for small companies. I
                implemented designs and ideas in plain HTML, CSS, JS using
                Wordpress in the backend.
              </p>
            </div>
          </section>
          <section id="side-projects" className="flex min-h-screen my-10">
            <div className="my-auto py-8">
              <h1>Side Projects</h1>
              <p>
                I am creating projects with{' '}
                <span className="text-cyan-300">React</span> in my free time and
                showcase them here, since it&apos;s hard for me to show all the
                things that I built for other companies.
              </p>
              <p>Here is a list with links:</p>
              <ul className="-mt-3">
                <li>
                  <Link className="text-xl" href={'/notes'}>
                    <Button className="bg-blue-800 hover:bg-blue-700 text-md w-40">
                      Notes
                    </Button>
                  </Link>
                  <span> - uses TipTap (Editor)</span>
                </li>
                <li>
                  <Link className="text-xl opacity-80" href={'/tictactoe'}>
                    <Button className="bg-blue-900 hover:bg-blue-700 text-md w-40">
                      Tic-Tac-Toe{' '}
                    </Button>
                  </Link>
                  <span className="!no-underline"> - uses React only</span>
                </li>
              </ul>
            </div>
          </section>
          <section id="tech-i-use" className="flex min-h-screen mb-10 pt-32">
            <div className="my-auto py-8">
              <h1 className="!font-bold">Tech I use</h1>
              <h2 className="opacity-90 font-medium">Javascript Libraries: </h2>
              <ul>
                <li className="!text-xl">
                  Frontend frameworks:{' '}
                  <div className="flex mt-2 space-x-4">
                    <IconBadge
                      className="text-cyan-300 border-cyan-300 bg-cyan-300/5 drop-shadow"
                      text={'React'}
                    >
                      <ReactBadge />
                    </IconBadge>
                    <IconBadge
                      className="text-green-300 border-green-300/10 bg-green-300/5 opacity-50 drop-shadow"
                      text={'Vue 2'}
                    >
                      <VueBadge />
                    </IconBadge>
                    <IconBadge
                      className="text-blue-300/70 border-blue-300 bg-blue-300/5 opacity-60 drop-shadow"
                      text={'Alpine.js'}
                    >
                      <AlpineBadge />
                    </IconBadge>
                  </div>
                </li>
              </ul>
              <ul>
                <li className="!text-xl">
                  <ArchiveIcon className="w-10 inline-block mr-3 text-orange-300" />
                  <strong className="opacity-80">Tanstack Query</strong> -
                  library to manage fetched data
                </li>
                <li className="!text-xl">
                  <Image
                    className="inline-block w-10 rounded-lg mr-3 opacity-40 my-0"
                    src={'/ShadcnLogo.png'}
                    alt={'shadcn-ui logo'}
                    width={40}
                    height={40}
                  />
                  <strong className="opacity-80">shadcn/ui</strong> - component
                  library
                </li>
                <li className="!text-xl">
                  <Image
                    className="inline-block w-10 rounded-lg mr-3 opacity-90 my-0"
                    src={'/KonvaLogo.png'}
                    alt={'Konva.js logo'}
                    width={40}
                    height={40}
                  />
                  <strong className="opacity-80">konva.js</strong> - canvas
                  library for 2D graphics apps
                </li>
              </ul>
              <hr />
              <h2 className="!font-normal opacity-90 mb-5 mt-10">
                Graphics Applications
              </h2>
              <ul className="text-xl space-y-4 leading-8">
                <li>
                  <Image
                    className="inline-block w-10 rounded-lg mr-1 opacity-90 my-0"
                    src={'/AdobePhotoshopLogo.png'}
                    alt={'Adobe Photoshop Logo'}
                    width={40}
                    height={40}
                  />{' '}
                  OR{' '}
                  <AffinityPhotoLogo className="w-10 inline-block ml-1 mr-0" />{' '}
                  - Used to work with Adobe Products and transitioned to
                  Affinity Apps.
                </li>
                <li>
                  <div className="bg-black/30 w-10 h-10 text-center inline-flex mr-3 justify-center align-middle rounded-lg ">
                    <Image
                      className="inline-block h-8 w-auto opacity-90 my-auto"
                      src={'/FigmaLogo.png'}
                      alt={'Figma Logo'}
                      width={30}
                      height={30}
                    />{' '}
                  </div>
                  <strong className="opacity-80">Figma</strong> - for web
                  designs, from components to full pages.
                </li>
                <li>
                  <div className="bg-black/20 w-10 h-10 text-center inline-flex mr-3 justify-center align-middle rounded-lg ">
                    <BlenderLogo className="inline-block w-8 opacity-90 my-auto" />{' '}
                  </div>
                  For 3D I use blender.
                  <div></div>
                </li>
              </ul>
              <Button
                className="h-14 inline-grid place-items-center bg-sky-900/50 hover:bg-sky-900/90"
                asChild
              >
                <Link
                  className="text-white/70 hover:text-white/90 transition-all decoration-white/40 no-underline hover:decoration-white/100 text-xl"
                  target="_blank"
                  href="https://www.behance.net/Sait1?locale=de_DE"
                >
                  🔗 Check out some of my art here 🔗
                </Link>
              </Button>
              <hr />
              <h2 className="!font-normal opacity-90">For Coding</h2>
              <ul>
                <li className="!text-xl">
                  <strong className="opacity-80">
                    IntelliJ IDEA, VSCode, Neovim
                  </strong>{' '}
                  - Any IDE will do
                </li>
                <li className="!text-xl">
                  <strong className="opacity-80">Git + Lazygit</strong> -
                  Version Control + TUI App
                </li>
              </ul>
              <h2 className="!font-normal opacity-90 mb-3 mt-8">
                Backend Frameworks
              </h2>
              <ul>
                <li className="!text-xl">
                  <strong className="opacity-80">
                    Next.js, Node.js + Express.js
                  </strong>{' '}
                  - will probably build my first full backend with Node.js +
                  Express.js
                </li>
                <li className="!text-xl">
                  <strong className="opacity-80">Java Spring Boot</strong> -
                  will probably rebuild what I will have built in Node.js +
                  Express.js in this tech stack as a learning.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
