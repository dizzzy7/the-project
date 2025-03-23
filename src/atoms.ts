import { atom } from 'jotai';
import { Path, PathPoint } from './components/pen-tool/types';

export const mousePosAtom = atom<{
  x: number;
  y: number;
  isTracked: boolean;
}>({ x: 0, y: 0, isTracked: false });

export const pathsAtom = atom<Path[]>([]);
export const selectedPointsAtom = atom<[number, Set<number>]>([
  -1,
  new Set([]),
]);
export const isDrawingAtom = atom<boolean>(false);
