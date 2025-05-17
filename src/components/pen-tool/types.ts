export type Path = PathPoint[];

/**
 * M - move to
 * L - line to
 * C - cubic bezier curve
 * Z - close path
 * S - copies or mirrors last curve
 */
export type PathPoint =
  | {
      type: 'M';
      x: number;
      y: number;
    }
  | {
      type: 'L';
      x: number;
      y: number;
    }
  | {
      type: 'C';
      x: number;
      y: number;
      c1?: Point;
      c2?: Point;
    }
  | {
      type: 'Z';
      x?: number;
      y?: number;
    };

export type Point = {
  x: number;
  y: number;
};
