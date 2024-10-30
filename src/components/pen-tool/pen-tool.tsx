'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Stage, Layer, Circle, Line, Rect } from 'react-konva';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';

const PenToolApplication = () => {
  const [points, setPoints] = useState<Array<Vector2d>>([]);
  const [updatedPoints, setUpdatedPoints] = useState<Array<Vector2d>>([]);
  const [dragging, setDragging] = useState(false);
  const [pointSelection, setPointSelection] = useState<Set<number>>(new Set());
  const [clickStart, setClickStart] = useState<Vector2d | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 }); // Default dimensions
  const [isNewPoint, setIsNewPoint] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const generateAnchor = useCallback(
    (point: Vector2d, index: number) => {
      const isAnchor = isAnchorPoint(index);
      const attributes = {
        fill: pointSelection && pointSelection.has(index) ? 'red' : 'white',
        stroke: 'pink',
        id: index.toString(),
        x: isAnchor ? point.x - 4 : point.x,
        y: isAnchor ? point.y - 4 : point.y,
        strokeWidth: 2,
      };
      if (isAnchor) {
        return <Rect width={5} height={5} key={index} {...attributes} />;
      } else {
        return <Circle radius={4} key={index} {...attributes} />;
      }
    },
    [pointSelection]
  );

  const generateAnchorLine = useCallback(
    (point1: Vector2d, point2: Vector2d, isClosingSegment: boolean = false) => {
      const points = [point1, point2];
      return (
        <Line
          key={crypto.randomUUID()}
          points={points.flatMap((point) => [point.x, point.y])}
          stroke={isClosingSegment ? 'red' : 'gray'}
          strokeWidth={1.5}
          lineJoin="round"
          lineCap="round"
        />
      );
    },
    []
  );

  const closePath = useCallback(() => {
    if (updatedPoints.length >= 4) {
      const firstPoint = updatedPoints[0];
      const lastAnchorIndex = Math.floor((updatedPoints.length - 1) / 3) * 3;
      const lastPoint = updatedPoints[lastAnchorIndex];

      const handleAfterLast = {
        x: lastPoint.x + (lastPoint.x - updatedPoints[lastAnchorIndex - 1].x),
        y: lastPoint.y + (lastPoint.y - updatedPoints[lastAnchorIndex - 1].y),
      };

      const handleBeforeFirst = {
        x: firstPoint.x - (updatedPoints[1].x - firstPoint.x),
        y: firstPoint.y - (updatedPoints[1].y - firstPoint.y),
      };

      const newPoints = updatedPoints.slice(0, lastAnchorIndex + 1);
      newPoints.push(handleAfterLast, handleBeforeFirst, { ...firstPoint });

      setUpdatedPoints(newPoints);
      setPoints(newPoints);
      setIsClosed(true);
      setPointSelection(new Set()); // clear Selection after closing
    }
  }, [updatedPoints]);

  const doSelection = useCallback(
    (
      index: number | null,
      type?: 'add' | 'remove' | 'reset' | 'handles' | 'toggle'
    ) => {
      if (index === null) {
        setPointSelection(new Set());
        return;
      }

      const isAnchor = isAnchorPoint(index);
      if (type === 'toggle') {
        if (pointSelection.has(index)) {
          const adjustedSet = new Set(pointSelection);
          adjustedSet.delete(index);
          setPointSelection(adjustedSet);
        } else {
          setPointSelection(new Set(pointSelection).add(index));
        }
      } else if (isAnchor && type === 'handles') {
        const pointsToBeSelected = new Set([index]);
        if (index - 1 >= 0 && !isAnchorPoint(index - 1)) {
          pointsToBeSelected.add(index - 1);
        }
        if (index + 1 < updatedPoints.length - 1 && !isAnchorPoint(index + 1)) {
          pointsToBeSelected.add(index + 1);
        }
        setPointSelection(pointsToBeSelected);
      } else if (isAnchor && type === 'add') {
        setPointSelection(new Set(pointSelection).add(index));
      } else if (type === 'reset') {
        setPointSelection(new Set<number>().add(index));
      } else if (type === 'remove') {
        const adjustedSet = new Set(pointSelection);
        adjustedSet.delete(index);
        setPointSelection(adjustedSet);
      }
    },
    [pointSelection, updatedPoints.length]
  );

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (isClosed && event.target.className === undefined) {
      return;
    }

    setDragging(true);

    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();

    if (!point) {
      return; // Don't allow new points if path is closed
    }

    setClickStart(point);

    if (
      event.target.className === 'Rect' ||
      event.target.className === 'Circle'
    ) {
      const pointIndex = Number(event.target.id());
      setIsNewPoint(false);

      if (!isClosed && pointIndex === 0 && updatedPoints.length >= 4) {
        closePath();
        return;
      }

      // point selection logic
      if (event.evt.ctrlKey) {
        doSelection(pointIndex, 'add');
      } else {
        if (event.target.className === 'Circle') {
          doSelection(pointIndex, 'reset');
        } else {
          doSelection(pointIndex, 'handles');
        }
      }
    } else if (event.target.className === undefined) {
      if (event.evt.ctrlKey) {
        doSelection(null);
        setIsNewPoint(false);
        return;
      }

      if (!isClosed && updatedPoints.length >= 4) {
        const firstPoint = updatedPoints[0];
        const distance = distanceBetweenPoints(firstPoint, point);

        if (distance < 20) {
          closePath();
          return;
        }
      }

      if (!isClosed) {
        setIsNewPoint(true);
        let newPoints;

        // if this is not the initial point, add another one
        if (updatedPoints.length === 0) {
          newPoints = [
            { x: point.x, y: point.y },
            { x: point.x, y: point.y },
          ];
          doSelection(1, 'reset');
        } else {
          newPoints = [
            ...updatedPoints,
            { x: point.x, y: point.y },
            { x: point.x, y: point.y },
            { x: point.x, y: point.y },
          ];
          const newHandleIndices = new Set([
            newPoints.length - 3,
            newPoints.length - 1,
          ]);
          setPointSelection(newHandleIndices);
        }

        setUpdatedPoints(newPoints);
      }
    }
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();

    if (!dragging || !point || pointSelection.size === 0 || !clickStart) return;

    const newPoints = structuredClone(updatedPoints);
    const lastAnchorIndex = Math.floor((newPoints.length - 1) / 3) * 3;

    if (
      pointSelection.size == 2 &&
      [...pointSelection].filter((pointIndex) => {
        return isAnchorPoint(pointIndex);
      }).length === 0
    ) {
      const temp = Array.from(pointSelection);
      const min = Math.min(temp[0], temp[1]);
      const max = Math.max(temp[0], temp[1]);
      // selection are mirrored handles
      if (max - min === 2) {
        const basePoint = updatedPoints[max - 1];
        newPoints[max] = { x: point.x, y: point.y };
        newPoints[min] = {
          x: basePoint.x + (basePoint.x - point.x),
          y: basePoint.y + (basePoint.y - point.y),
        };
      }
    } else {
      // handle single point movement
      for (const selectedIndex of pointSelection) {
        // Calculate new position
        const newX = newPoints[selectedIndex].x + (point.x - clickStart.x);
        const newY = newPoints[selectedIndex].y + (point.y - clickStart.y);

        newPoints[selectedIndex] = { x: newX, y: newY };

        if (isClosed) {
          // if moving the first point's handle
          if (selectedIndex === 1) {
            // Update the closing handle (last handle) to mirror the movement
            const lastHandleIndex = newPoints.length - 1;
            const anchorPoint = newPoints[0];
            newPoints[lastHandleIndex] = {
              x: anchorPoint.x - (newX - anchorPoint.x),
              y: anchorPoint.y - (newY - anchorPoint.y),
            };
          } else if (selectedIndex === newPoints.length - 1) {
            const anchorPoint = newPoints[0];
            newPoints[1] = {
              x: anchorPoint.x - (newX - anchorPoint.x),
              y: anchorPoint.y - (newY - anchorPoint.y),
            };
          } else if (selectedIndex === lastAnchorIndex - 1) {
            const anchorPoint = newPoints[lastAnchorIndex];
            newPoints[lastAnchorIndex + 1] = {
              x: anchorPoint.x + (anchorPoint.x - newX),
              y: anchorPoint.y + (anchorPoint.y - newY),
            };
          } else if (selectedIndex === lastAnchorIndex + 1) {
            const anchorPoint = newPoints[lastAnchorIndex];
            newPoints[lastAnchorIndex - 1] = {
              x: anchorPoint.x - (newX - anchorPoint.x),
              y: anchorPoint.y - (newY - anchorPoint.y),
            };
          }
        }
      }
    }
    setUpdatedPoints(newPoints);
    setClickStart(point);
  };

  const handleMouseUp = () => {
    setDragging(false);
    setPoints(updatedPoints);
    setClickStart(null);
  };

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  let anchorLines = [];
  for (let i = 0; i < updatedPoints.length - 3; i = i + 3) {
    if (i - 1 < 0) {
      anchorLines.push(
        generateAnchorLine(updatedPoints[i], updatedPoints[i + 1])
      );
    } else {
      anchorLines.push(
        generateAnchorLine(updatedPoints[i], updatedPoints[i - 1])
      );
      if (i + 1 < updatedPoints.length) {
        anchorLines.push(
          generateAnchorLine(updatedPoints[i], updatedPoints[i + 1])
        );
      }
    }
  }

  // If closed, add closing segment visualization
  if (isClosed && updatedPoints.length > 3) {
    const lastAnchorIndex = Math.floor((updatedPoints.length - 4) / 3) * 3;

    anchorLines.push(
      generateAnchorLine(
        updatedPoints[lastAnchorIndex],
        updatedPoints[updatedPoints.length - 3],
        true
      )
    );
    anchorLines.push(
      generateAnchorLine(
        updatedPoints[0],
        updatedPoints[updatedPoints.length - 2],
        true
      )
    );
  }

  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="bg-gray-800"
    >
      <Layer>
        {/* Render anchor point lines */}
        {anchorLines}
        {/* Render the lines */}
        <Line
          bezier
          points={updatedPoints.flatMap((point) => [point.x, point.y])}
          stroke="white"
          strokeWidth={2}
          lineJoin="round"
          lineCap="round"
        />
        {/* Render anchor points */}
        {updatedPoints.map((point, index) => {
          return generateAnchor(point, index);
        })}
      </Layer>
    </Stage>
  );
};

function distanceBetweenPoints(point1: Vector2d, point2: Vector2d) {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
}

function isAnchorPoint(index: number) {
  return index % 3 === 0;
}

function debugPoints(points: Vector2d[]) {
  console.log('Points structure:');
  points.forEach((point, index) => {
    let type = 'unknown';
    if (isAnchorPoint(index)) {
      type = 'ANCHOR';
    } else if (index % 3 === 1) {
      type = 'HANDLE_AFTER';
    } else if (index % 3 === 2) {
      type = 'HANDLE_BEFORE';
    }
    console.log(`Index ${index}: ${type} at (${point.x}, ${point.y})`);
  });
}

export default PenToolApplication;
