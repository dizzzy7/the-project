'use client'

import { useEffect, useRef, useState } from "react";
import colors from 'tailwindcss/colors'

import useMousePosition from "../hooks/useMousePosition";
import { useAtom } from "jotai/react";
import { mousePosAtom } from "@/atoms";

const Flashlight = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  const flashlightRef = useRef<HTMLDivElement | null>(null);

  const mousePosBackup = useMousePosition();
  const [mousePos,] = useAtom(mousePosAtom);

  // IDEA: i want to create an animation on the mask-image
  // for this to work i need to probably animate the radial gradient values over time

  return (
    <div
      data-component="flashlight"
      className={'fixed inset-0 bg-white transition-all duration-500'}
      ref={flashlightRef}
      style={{
        '--flashlight-x': mousePos !== null ? mousePos.x + 'px' : 0,
        '--flashlight-y': mousePos !== null ? mousePos.y + 'px' : 0,
        background: isEnabled && mousePos !== null ? `${colors.slate[800]}aa` : `${colors.slate[800]}dd`,
        maskImage: `radial-gradient(circle 550px at var(--flashlight-x) var(--flashlight-y), transparent, ${colors.slate[800]})`,
        opacity: isEnabled ? 1 : 0

      } as React.CSSProperties}
      onMouseEnter={(e) => {
        setIsEnabled(true)
      }}
      onMouseLeave={(e) => {
        setIsEnabled(false)
      }}
    >
      <div className='flex'></div>
    </div>
  )
}

export default Flashlight;