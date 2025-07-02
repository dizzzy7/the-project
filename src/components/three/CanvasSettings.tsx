import { advance, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react"

function CanvasSettings() {
  const fps = 30

  const lastTime = useRef(0)
  const frame = useRef<number>()
  const interval = 1000 / fps

  // limit the FPS to 30
  useEffect(() => {
    const loop = (time: number) => {
      if (!lastTime.current) {
        lastTime.current = time
      }
      const delta = time - lastTime.current

      if (delta >= interval) {
        lastTime.current = time
        advance(performance.now())
      }
      frame.current = requestAnimationFrame(loop)
    }
    frame.current = requestAnimationFrame(loop)

    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current!)
      }
    }
  }, [fps, advance])

  return null
}

export default CanvasSettings;