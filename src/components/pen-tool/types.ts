export type Path = PathPoint[];

export type PathCommand = 'M' | 'L' | 'C' | 'Z';

/**
 * M - move to
 * L - line to
 * C - cubic bezier curve
 * Z - close path
 */
export type PathPoint = Point & {
  type: PathCommand;
  controlPoints?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
};

export type Point = {
  x: number;
  y: number;
};
