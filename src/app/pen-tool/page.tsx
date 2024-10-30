'use client';

export const dynamic = 'force-dynamic';

import React, { useCallback, useState } from 'react';
import { Stage, Layer, Circle, Line, Rect } from 'react-konva';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';

const PenToolApplication = () => {
  const [points, setPoints] = useState<Array<Vector2d>>([]);
  const [updatedPoints, setUpdatedPoints] = useState<Array<Vector2d>>([]);
  const [dragging, setDragging] = useState(false);

  // selection contains, point to be moved (index, position), action
  const [pointSelection, setPointSelection] = useState<Set<number>>(new Set());

  const [clickStart, setClickStart] = useState<Vector2d | null>(null);

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
    (point1: Vector2d, point2: Vector2d) => {
      const points = [point1, point2];
      return (
        <Line
          key={crypto.randomUUID()}
          points={points.flatMap((point) => [point.x, point.y])}
          stroke="gray"
          strokeWidth={1.5}
          lineJoin="round"
          lineCap="round"
        />
      );
    },
    []
  );

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
        const pointsToBeSelected = [index];
        if (index - 1 >= 0) {
          pointsToBeSelected.push(index - 1);
        }
        if (index + 1 <= updatedPoints.length - 1) {
          pointsToBeSelected.push(index + 1);
        }
        setPointSelection(new Set(pointsToBeSelected));
      } else if (isAnchor && type === 'add') {
        setPointSelection(new Set(pointSelection).add(index));
      } else if (type === 'reset') {
        setPointSelection(new Set<number>().add(index));
      } else if (type === 'remove') {
        const adjustedSet = new Set(pointSelection);
        adjustedSet.delete(index);
        setPointSelection(adjustedSet);
      }
      console.log(pointSelection);
    },
    [pointSelection, updatedPoints.length]
  );

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    setDragging(true);

    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();

    if (!point) {
      return;
    }

    setClickStart(point);

    // clear all selects if ctrl click on background
    if (event.target.className === undefined && event.evt.ctrlKey) {
      doSelection(null);
      // handle select of anchor and control points
    } else if (
      event.target.className === 'Rect' ||
      event.target.className === 'Circle'
    ) {
      const pointIndex = Number(event.target.id());
      const isAnchor = isAnchorPoint(pointIndex);
      // if click on handle with ctrl, select it
      if (event.evt.ctrlKey) {
        doSelection(pointIndex, 'add');
      }

      // if regular click on anchorPoint, select control and anchor points
      if (isAnchor) {
        doSelection(pointIndex, 'handles');
        doSelection(pointIndex, 'add');
        // if regular click on control point, just select and drag it
      } else if (!isAnchor) {
        doSelection(pointIndex, 'reset');
      }
      // create a new point, if click is on canvas
    } else if (event.target.className === undefined) {
      // Stage was clicked -> set point
      const newPoints = [
        ...updatedPoints,
        { x: point.x, y: point.y },
        { x: point.x, y: point.y },
      ];

      // if this is not the initial point, add another one
      if (updatedPoints.length !== 0) {
        newPoints.push({ x: point.x, y: point.y });
        doSelection(newPoints.length - 2, 'handles');
      } else {
        setPoints(newPoints);
        doSelection(newPoints.length - 1, 'reset');
      }

      setUpdatedPoints(newPoints);
    }
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();

    if (!dragging || !point || pointSelection.size === 0 || !clickStart) return;

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
        const newPoints = updatedPoints.slice();

        newPoints[max] = { x: point.x, y: point.y }; // move newest handle to current cursor position
        newPoints[min] = {
          x: basePoint.x + (basePoint.x - point.x),
          y: basePoint.y + (basePoint.y - point.y),
        };
        setUpdatedPoints(newPoints);
      }
    } else if (distanceBetweenPoints(clickStart, point) > 5) {
      const newPoints = structuredClone(points);

      for (const item of pointSelection) {
        newPoints[item].x = newPoints[item].x + (point.x - clickStart.x);
        newPoints[item].y = newPoints[item].y + (point.y - clickStart.y);
      }

      setUpdatedPoints(newPoints);
    }
  };

  const handleMouseUp = (event: Konva.KonvaEventObject<MouseEvent>) => {
    setDragging(false);
    setPoints(updatedPoints);
    setClickStart(null);
  };

  let anchorLines = [];

  for (let i = 0; i < updatedPoints.length; i = i + 3) {
    if (i - 1 < 0) {
      anchorLines.push(
        generateAnchorLine(updatedPoints[i], updatedPoints[i + 1])
      );
    } else {
      anchorLines.push(
        generateAnchorLine(updatedPoints[i], updatedPoints[i - 1])
      );
      anchorLines.push(
        generateAnchorLine(updatedPoints[i], updatedPoints[i + 1])
      );
    }
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
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

export default PenToolApplication;
