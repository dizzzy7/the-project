'use client';

import { mousePosAtom } from '@/atoms';
import { useAtom } from 'jotai/react';
import { useEffect } from 'react';

let isHandlerRegistered = false;

const useMousePosition = () => {
  const [mousePos, setMousePos] = useAtom(mousePosAtom);

  useEffect(() => {
    if (!isHandlerRegistered) {
      const handleMouseMove = (event: MouseEvent) => {
        setMousePos({
          x: event.clientX,
          y: event.clientY,
          isTracked: true,
        });
      };

      const handleMouseLeave = (event: MouseEvent) => {
        setMousePos({
          x: event.clientX,
          y: event.clientY,
          isTracked: false,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseout', handleMouseLeave);
      isHandlerRegistered = true;

      return () => {
        setMousePos({ ...mousePos, isTracked: false });
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseout', handleMouseLeave);
        isHandlerRegistered = false;
      };
    }
  }, [mousePos]);

  return mousePos;
};

export default useMousePosition;
