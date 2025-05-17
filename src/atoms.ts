import { atom } from 'jotai';
import { Path, PathPoint } from './components/pen-tool/types';

export const mousePosAtom = atom<{
  x: number;
  y: number;
  isTracked: boolean;
}>({ x: 0, y: 0, isTracked: false });

// EMPTY PATH
// export const pathsAtom = atom<Path[]>([]);

// BEZIER PATH
export const pathsAtom = atom<Path[]>([
  [
    { type: 'M', x: 150, y: 450 },
    {
      type: 'C',
      c1: { x: 150, y: 400 },
      c2: { x: 190, y: 350 },
      x: 250,
      y: 350,
    },
    {
      type: 'C',
      c1: { x: 310, y: 350 },
      c2: { x: 350, y: 400 },
      x: 350,
      y: 450,
    },
    {
      type: 'C',
      c1: { x: 350, y: 500 },
      c2: { x: 310, y: 550 },
      x: 250,
      y: 550,
    },
    {
      type: 'C',
      c1: { x: 190, y: 550 },
      c2: { x: 150, y: 500 },
      x: 150,
      y: 450,
    },
  ],
  [
    { type: 'M', x: 100, y: 200 },
    {
      type: 'C',
      c1: { x: 150, y: 200 },
      c2: { x: 150, y: 250 },
      x: 200,
      y: 250,
    },
    {
      type: 'C',
      c1: { x: 250, y: 250 },
      c2: { x: 250, y: 300 },
      x: 300,
      y: 300,
    },
  ],
  [
    { type: 'M', x: 50, y: 100 },
    { type: 'C', c1: { x: 100, y: 50 }, c2: { x: 150, y: 50 }, x: 200, y: 100 },
  ],
]);
export const selectedPointsAtom = atom<[number, Set<number>]>([
  -1,
  new Set([]),
]);
export const isDrawingAtom = atom<boolean>(false);
