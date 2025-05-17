'use client';

import { MouseEvent, MouseEventHandler, useState } from "react";

import { PathPoint, Path as PathType } from "./types";
import { useAtom } from "jotai/react";
import { selectedPointsAtom, isDrawingAtom, pathsAtom } from "@/atoms";
import { getMousePositionSVG } from "@/lib/utils";
import { addPointToPath, getPathData, createNewPath, updatePointOnPath } from "@/lib/svg";
import ControlPoints from "./control-points";
import Path from "./path";
import BezierLines from "./bezier-lines";


/**
 * This component renders
 */
const PenToolSVGApplication: React.FC = () => {

  const [paths, setPaths] = useAtom(pathsAtom);
  const [selectedPoints, setSelectedPoints] = useAtom(selectedPointsAtom);
  const [isDrawing, setIsDrawing] = useAtom(isDrawingAtom)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

  /**
   * STEPS:
   * 1. Create path when clicking on svg
   */

  /**
   * onMouseDown
   * 1.1. CLICK on existing -> select and move point OR close path
   * 1.2. CLICK (+ DRAG) on background/working area -> create new point and adjust the control points
   * 2.1 CTRL + CLICK on background/working area -> 
   * 2.2 CTRL + CLICK on Point -> SELECT/DESELECT point
   * 2.2 CTRL + CLICK + DRAG on Point -> 
   */

  /**
   * 1.1 create point <- if no selected
   */
  const mouseDownHandler: MouseEventHandler = (e: MouseEvent) => {
    const pointIsSelected = selectedPoints[0] !== -1;
    const mousePos = { x: e.clientX, y: e.clientY }
    setIsMouseDown(true)

    if (!pointIsSelected) {
      if (e.ctrlKey && e.target instanceof SVGSVGElement) {
        console.log("DESELECTING")
        setSelectedPoints([-1, new Set([])])
        return
      }

      if (e.target instanceof SVGSVGElement) {
        setPaths([...paths, createNewPath(mousePos)]);
        const lastPathIndex = paths.length;
        setSelectedPoints([lastPathIndex, new Set([0])])
      } else if (e.target instanceof SVGCircleElement) {
        console.log(e)
        // setSelectedPoints([lastPathIndex, new Set([0])])
      }
    } else if (pointIsSelected) {

      if (e.ctrlKey && e.target instanceof SVGSVGElement) {
        console.log("DESELECTING")
        setSelectedPoints([-1, new Set([])])
        return
      } else if (e.target instanceof SVGSVGElement) {
        const pathCopy = [...paths];
        const selectedPath = pathCopy[selectedPoints[0]];
        addPointToPath(selectedPath, mousePos)
        setSelectedPoints([selectedPoints[0], new Set([selectedPath.length - 1])])
        setPaths(pathCopy)
      } else if (e.ctrlKey && e.target instanceof SVGCircleElement) {
        // TODO: add a way to select points, need to maybe add ids or data-index, data-type attributes to get array position in points to properly select points
        // setSelectedPoints([])
      } else if (e.target instanceof SVGCircleElement) {

      }
    }
  }

  const mouseMoveHandler: MouseEventHandler = (e) => {
    const pointIsSelected = selectedPoints[0] !== -1;
    const mousePos = { x: e.clientX, y: e.clientY }

    if (pointIsSelected && isMouseDown) {
      const pathsCopy = [...paths];
      updatePointOnPath(pathsCopy[selectedPoints[0]], mousePos)
      setPaths(pathsCopy)
    }
  }

  const mouseUpHandler: MouseEventHandler = (e) => {
    setIsMouseDown(false)
  }

  const mouseLeaveHandler: MouseEventHandler = (e) => { }

  return (
    <svg
      width={800}
      height={800}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {paths.map((path, index) => {
        return (
          <g key={index}>
            <Path pathData={getPathData(path)} />
            <BezierLines path={path} />
            <ControlPoints path={path} />
          </g>
        )
      }
      )
      }

    </svg>
  )

};

export default PenToolSVGApplication;
