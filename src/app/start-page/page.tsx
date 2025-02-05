
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Page',
  description: 'This is the Start Page',
};

/**
 * BOOKMARKS, RECENT PAGES/BOOKMARKS, QUICK NOTES
 * WEATHER, BUSSTATIONEN O. FAHRPLAN, TERMINE/FEIERTAGE (Google Calendar)
 */

const StartPage = () => {
  return (
    <main className='bg-slate-800 h-screen text-white'>
      <section className='h-full'>
        <div className='grid-cols-6 gap-5 p-5 grid grid-rows-5 h-full'>
          <div className='col-span-4 row-span-3 bg-slate-500 p-2 h-full rounded-xl'>
            <p>BOOKMARKS</p>
            Lieblingsseiten auflisten, einstellbar ob bookmarks, recent pages, recent bookmarks und kategorisiert sortieren oder gruppieren

            <p>EXTRA FEATURES:</p>
            Modul verstecken können (privatsphäre im stream/recording gewährleisten (Fahrplan, Termine, Notes))
          </div>
          <div className='col-span-2 row-span-3 bg-slate-500 p-2 h-full rounded-xl'>
            <p>Notes</p>
            Richtext editor für quicknotes
          </div>
          <div className='col-span-2 row-span-2 bg-slate-500 p-2 h-full rounded-xl'>
            <p>Weather</p>
            Wetter API ansprechen, eigene location verwenden, ungefähre Location benutzen
          </div>
          <div className='col-span-2 row-span-2 bg-slate-500 p-2 h-full rounded-xl'>
            <p>Fahrplan</p>
            BVG API ansprechen ? Oder Zeiten für die Lieblingsbuslinie holen (einmaliger API Aufruf/OFFLINE Dokument) und damit arbeiten, um die kommenden Busse/Züge anzuzeigen
          </div>
          <div className='col-span-2 row-span-2 bg-slate-500 p-2 h-full rounded-xl'>
            <p>Termine</p>
            Mit Google Calendar verbinden und aktuelle Termine auflisten
          </div>
        </div>
      </section>
    </main>
  );
};

export default StartPage;
