import { pathsAtom } from '@/atoms';
import { Path, PathPoint, Point } from '@/components/pen-tool/types';
import { useAtom } from 'jotai';

export function getPathData(points: PathPoint[]): string {
  if (points.length === 0) return '';

  let pathData = '';

  points.forEach((point) => {
    switch (point.type) {
      case 'M':
        pathData += `M ${point.x} ${point.y}`;
        break;
      case 'L':
        pathData += ` L ${point.x} ${point.y}`;
        break;
      case 'C':
        if (point.controlPoints) {
          pathData += ` C ${point.controlPoints.x1} ${point.controlPoints.y1}, ${point.controlPoints.x2} ${point.controlPoints.y2}, ${point.x} ${point.y}`;
        }
        break;
      case 'Z':
        pathData += ' Z';
        break;
      default:
        throw new Error(`Unsupported path command: ${point.type}`);
    }
  });

  return pathData;
}

export function createNewPath(point: Point): PathPoint[] {
  return [
    {
      type: 'M',
      x: point.x,
      y: point.y,
    },
  ];
}

export function addPointToPath(path: Path, point: Point): Path {
  path.push({ type: 'L', ...point });
  return path;
}

export function updatePointOnPath(path: Path, position: Point): Path {
  const point = path[path.length - 1];
  const pointType = position;

  path[path.length - 1] = { ...point, ...position };
  return path;
}
