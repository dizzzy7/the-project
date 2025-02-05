'use client'

import { useEffect, useRef, useState } from "react";
import colors from 'tailwindcss/colors'


// const mouseMoveHandler = (e) => {
//   const light = document.querySelector(".cursor-light");
//   light.style.setProperty("--x", `${e.clientX}px`);
//   light.style.setProperty("--y", `${e.clientY}px`);
// }

const Flashlight = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const flashlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    // document.addEventListener("mousemove",);
    //update component that is pointed to by ref
    if (flashlightRef.current !== null) {
      // flashlightRef.current.
    }

  }, [])

  //

  return (
    <div
      data-component="flashlight"
      className={'fixed inset-0 bg-white transition-all'}
      ref={flashlightRef}
      style={{
        '--flashlight-x': '100px',
        '--flashlight-y': '100px',
        background: isEnabled ? colors.slate[800] : 'transparent',
        maskImage: `radial-gradient(circle 550px at var(--flashlight-x) var(--flashlight-y), transparent, ${colors.slate[800]}4f)`
      } as React.CSSProperties}
      onMouseMoveCapture={(e) => {
        setIsEnabled(true)
        flashlightRef.current?.style.setProperty('--flashlight-x', e.clientX + 'px');
        flashlightRef.current?.style.setProperty('--flashlight-y', e.clientY + 'px');
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