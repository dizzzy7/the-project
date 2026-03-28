import { atom } from 'jotai';

export const mousePosAtom = atom<{
  x: number;
  y: number;
  isTracked: boolean;
}>({ x: 0, y: 0, isTracked: false });
