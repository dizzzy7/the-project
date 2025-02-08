'use client'

import { useEffect, useRef, useState } from "react";
import colors from 'tailwindcss/colors'

import useMousePosition from "../../hooks/useMousePosition";
import { useAtom } from "jotai/react";
import { mousePosAtom } from "@/atoms";

const MaskImageFlashlight = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  const flashlightRef = useRef<HTMLDivElement | null>(null);

  const mousePosBackup = useMousePosition();
  const [mousePos,] = useAtom(mousePosAtom);

  return (
    <div
      data-component="flashlight"
      className={'fixed inset-0 bg-white transition-all duration-500 pointer-events-none'}
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
    </div>
  )
}

export default MaskImageFlashlight;