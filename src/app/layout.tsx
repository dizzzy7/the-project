import { Metadata } from 'next';
import '@/globals.scss';
import { Inter } from 'next/font/google';
import ReactQueryClientProvider from '@/components/ReactQueryClientProvider';
import { getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Project',
  description: 'This is the project.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
