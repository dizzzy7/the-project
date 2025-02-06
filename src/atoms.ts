import { atom } from 'jotai';

export const mousePosAtom = atom<{ x: number; y: number } | null>(null);
