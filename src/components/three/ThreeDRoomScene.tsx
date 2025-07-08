'use client'

export const dynamic = 'force-dynamic'

import { Canvas, useFrame, useThree, Vector3 } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { GLTF } from 'three-stdlib';
import * as THREE from "three";
import { cn } from '@/lib/utils';
import { Stats } from '@react-three/drei';
import GLTFModel from './GLTFModel';
import CanvasSettings from './CanvasSettings';
import CameraPlayer from './CameraPlayer';

export type MapNode = {
  position: Vector3,
  north?: MapNode,
  east?: MapNode,
  south?: MapNode;
  west?: MapNode;
}


const Nodes: Record<string, MapNode> = {
  TVPosition: {
    position: [-0.7117170691490173, 1.2975854873657227, -1.267665147781372],
  },
  DeskPosition: {
    position: [-0.7117170691490173, 1.2975854873657227, -1.267665147781372],
  },
  SofaPosition: {
    position: [-0.7117170691490173, 1.2975854873657227, -1.267665147781372],
  },
  BedPosition: {
    position: [-0.7117170691490173, 1.2975854873657227, -1.267665147781372],
  },
  DoorPosition: {
    position: [-0.7117170691490173, 1.2975854873657227, -1.267665147781372],
  },
  BalconyDoorPosition: {
    position: [-0.7117170691490173, 1.2975854873657227, -1.267665147781372],
  }
};

// map out the area
Nodes.DeskPosition.east = Nodes.SofaPosition;
Nodes.SofaPosition.north = Nodes.TVPosition;
Nodes.SofaPosition.west = Nodes.DeskPosition;
Nodes.SofaPosition.east = Nodes.BedPosition
Nodes.BedPosition.west = Nodes.SofaPosition;
Nodes.BedPosition.north = Nodes.DoorPosition;
Nodes.BalconyDoorPosition.east = Nodes.TVPosition
Nodes.TVPosition.west = Nodes.BalconyDoorPosition;
Nodes.TVPosition.south = Nodes.SofaPosition;
Nodes.TVPosition.east = Nodes.DoorPosition;

const ThreeDRoomScene = () => {
  const [modelUrl, setModelUrl] = useState<string>("");

  const gltfRef = useRef<GLTF | null>(null);

  // set URL of the room model
  useEffect(() => {
    const fullUrl = new URL('/models/DizzzyRoom.glb', window.location.origin).toString()
    setModelUrl(fullUrl);
  }, [gltfRef, modelUrl])

  if (!modelUrl) return null;

  return (
    <div className='relative'>
      <Canvas style={{ height: '100vh', background: '#111' }} frameloop='never'>
        <CanvasSettings />
        <CameraPlayer gltfRef={gltfRef} nodes={Nodes} />
        {/* <ambientLight intensity={0.5} /> */}
        <directionalLight position={[3, 3, 3]} />
        <Suspense fallback={null}>
          <GLTFModel
            gltfRef={gltfRef}
            url={modelUrl}
            onGLTFLoaded={(gltf) => {
              if (gltf.scene) {
                gltf.scene.traverse((child) => {
                  if (child instanceof THREE.Light) {
                    // Adjust properties of the light
                    child.intensity = 2;
                  }

                });

              }
            }}
          />
        </Suspense>
        <Stats />
      </Canvas>
    </div>
  )

}

export default ThreeDRoomScene;