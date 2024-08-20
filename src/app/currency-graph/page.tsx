'use client';

import Head from 'next/head';

import CurrencyGraph from './currency-graph';
import { useQueryClient } from '@tanstack/react-query';

export default function DataVisuals() {
  return (
    <>
      <Head>
        <title>Data Visualization</title>
        <meta
          name="description"
          content="This is a Data Visualization Application written in Next.js"
        />
      </Head>
      <div className="bg-gray-800 overflow-x-hidden">
        <div className="mx-auto min-h-screen h-screen pt-2">
          <div className="max-w-6xl mx-auto">
            <CurrencyGraph />
          </div>
        </div>
      </div>
    </>
  );
}
