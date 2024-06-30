import Head from 'next/head';

import Graph from '@/components/data-visualization/Graph';
import { Serie } from '@nivo/line';

const data: Serie[] = [
  {
    id: 'japan',
    color: 'hsl(27, 70%, 50%)',
    data: [
      { x: 'plane', y: 100 },
      { x: 'helicopter', y: 200 },
      { x: 'boat', y: 300 },
      { x: 'train', y: 400 },
      { x: 'subway', y: 500 },
      { x: 'bus', y: 600 },
      { x: 'car', y: 700 },
      { x: 'moto', y: 800 },
      { x: 'bicycle', y: 900 },
      { x: 'horse', y: 1000 },
      { x: 'skateboard', y: 1100 },
      { x: 'others', y: 1200 },
    ],
  },
  {
    id: 'france',
    color: 'hsl(162, 70%, 50%)',
    data: [
      { x: 'plane', y: 110 },
      { x: 'helicopter', y: 220 },
      { x: 'boat', y: 330 },
      { x: 'train', y: 440 },
      { x: 'subway', y: 550 },
      { x: 'bus', y: 660 },
      { x: 'car', y: 770 },
      { x: 'moto', y: 880 },
      { x: 'bicycle', y: 990 },
      { x: 'horse', y: 1100 },
      { x: 'skateboard', y: 1210 },
      { x: 'others', y: 1320 },
    ],
  },
];

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
      <div className="bg-gray-800">
        <div className="mx-auto min-h-screen h-screen pt-2">
          <Graph data={data} />
        </div>
      </div>
    </>
  );
}
