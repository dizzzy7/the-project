'use client'

export const dynamic = 'force-dynamic'

import { FlyControls, GltfProps, OrbitControls, PointerLockControls, useGLTF } from '@react-three/drei'
import { Canvas, Euler, ObjectMap, Vector3 } from '@react-three/fiber';
import { Ref, Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import GLTFModel from './GLTFModel';
import MyRoom from './MyRoom';
import { GLTF } from 'three-stdlib';

type Direction = 'north' | 'south' | 'east' | 'west';

interface Node {
  id: string;
  position: Vector3;
  rotation: Euler;
  north?: Node;
  east?: Node;
  south?: Node;
  west?: Node;
}

interface PlayerState {
  currentNode: Node;
  direction: Direction;
}

const ThreeDRoomScene = () => {
  const [modelUrl, setModelUrl] = useState<string>("");


  const gltfRef = useRef<GLTF>(null);

  useEffect(() => {
    const fullUrl = new URL('/models/DizzzyRoom.glb', window.location.origin).toString()
    setModelUrl(fullUrl);
  }, [gltfRef, modelUrl])

  if (!modelUrl) return null;

  return (
    <div className='relative'>
      <Canvas style={{ height: '100vh', background: '#111' }}>
        {/* <ambientLight intensity={0.5} /> */}
        <directionalLight position={[3, 3, 3]} />
        <Suspense fallback={null}>
          <MyRoom gltfRef={gltfRef} modelUrl={modelUrl} />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <div className='absolute inset-0 pointer-events-none'>
        <div
          className='absolute top-1/2 -translate-y-1/2 left-0 pointer-events-auto'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
          }}
        >
          ARROW LEFT
        </div>
        <div
          className='absolute top-1/2 -translate-y-1/2 right-0 bg-black pointer-events-auto'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
            console.log('Arrow Right clicked');
          }}
        >
          ARROW RIGHT
        </div>
      </div>
    </div>
  )

}

export default ThreeDRoomScene;