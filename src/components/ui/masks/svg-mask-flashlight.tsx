'use client'

import { LegacyRef, RefObject, useEffect, useRef, useState } from "react";
import colors from 'tailwindcss/colors'

import useMousePosition from "../../hooks/useMousePosition";
import { useAtom } from "jotai/react";
import { mousePosAtom } from "@/atoms";

const SVGMaskFlashlight = () => {
  const mousePosBackup = useMousePosition();
  const [mousePos,] = useAtom(mousePosAtom);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (mousePos.isTracked) {
      setRadius(300)
    } else {
      setRadius(0)
    }
  }, [mousePos.isTracked])

  return (
    <svg
      data-component="flashlight"
      className={'fixed h-full w-full inset-0'}
    >
      <defs>
        <radialGradient id="flashlight" cx="50%" cy={"50%"} r={"50%"}>
          <stop offset={"0%"} stopColor="black" stopOpacity={1} />
          <stop offset={"100%"} stopColor="white" stopOpacity={1} />
        </radialGradient>
        <mask id="mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle
            cx={mousePos.x}
            cy={mousePos.y}
            r={radius}
            fill="url(#flashlight)"
            style={{
              transition: 'r 0.1s ease-out'
            }}
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width={"100%"}
        height={"100%"}
        fill={`${colors.slate[800]}66`}
        mask="url(#mask)"
      />
    </svg>
  )
}

export default SVGMaskFlashlight;