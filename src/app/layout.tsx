'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <title>The Project</title>
          <meta
            name="description"
            content="This is my project. It is made up of multiple projects."
          />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
