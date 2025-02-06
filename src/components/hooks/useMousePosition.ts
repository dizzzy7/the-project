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
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      console.log('registering event');
      isHandlerRegistered = true;

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        console.log('unregistering event');
        isHandlerRegistered = false;
      };
    }
  }, []);

  return mousePos;
};

export default useMousePosition;
