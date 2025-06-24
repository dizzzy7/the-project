'use client'

import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

const ThreeDRoomScene = () => {
  // const gltf = useGLTF('/models/DizzzyRoom.glb')
  // return <primitive object={gltf.scene} />
  return (
    <Canvas style={{ height: '100vh', background: '#111' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <Suspense fallback={null}>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Suspense>
      <OrbitControls />
    </Canvas>
  )

}

export default ThreeDRoomScene;