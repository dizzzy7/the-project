import { PathPoint, Point } from '@/components/pen-tool/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMousePositionSVG(
  event: React.MouseEvent<SVGSVGElement>
): Point {
  const svg = event.currentTarget;
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;

  const screenCTM = svg.getScreenCTM();
  if (!screenCTM) {
    throw new Error('SVG Element is not properly rendered or not in the DOM.');
  }

  const { x, y } = point.matrixTransform(screenCTM.inverse());

  return { x, y };
}
