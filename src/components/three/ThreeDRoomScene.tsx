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

interface Node {
  position: Vector3;
  north?: Node;
  east?: Node;
  south?: Node;
  west?: Node;
}

interface PlayerState {
  currentNode: Node;
  direction: DIRECTION;
}

const Nodes: Record<string, Node> = {
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

export enum DIRECTION {
  North = 'north',
  East = 'east',
  South = 'south',
  West = 'west',
}
// 2. Create an ordered array of directions (for easy cycling)
const DIRECTIONS_ORDERED: DIRECTION[] = [
  DIRECTION.North,
  DIRECTION.East,
  DIRECTION.South,
  DIRECTION.West,
];

// 3. Helper function to get next/prev direction (with wrapping)
function getNextDirection(current: DIRECTION): DIRECTION {
  const currentIndex = DIRECTIONS_ORDERED.indexOf(current);
  const nextIndex = (currentIndex + 1) % DIRECTIONS_ORDERED.length;
  return DIRECTIONS_ORDERED[nextIndex];
}

function getPrevDirection(current: DIRECTION): DIRECTION {
  const currentIndex = DIRECTIONS_ORDERED.indexOf(current);
  const prevIndex = (currentIndex - 1 + DIRECTIONS_ORDERED.length) % DIRECTIONS_ORDERED.length;
  return DIRECTIONS_ORDERED[prevIndex];
}

const ThreeDRoomScene = () => {
  const [modelUrl, setModelUrl] = useState<string>("");
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentNode: Nodes.SofaPosition,
    direction: DIRECTION.North,
  });

  const gltfRef = useRef<GLTF | null>(null);
  const camRef = useRef<THREE.PerspectiveCamera | null>(null);

  const handleCameraRotation = (direction: 'left' | 'right') => {
    const gltfCurrent = gltfRef.current;

    if (camRef.current) {
      if (direction === 'left') {
        setPlayerState({ ...playerState, direction: getPrevDirection(playerState.direction) })
        camRef.current.rotation.y = camRef.current.rotation.y + Math.PI / 2;
      } else if (direction === 'right') {
        setPlayerState({ ...playerState, direction: getNextDirection(playerState.direction) })
        camRef.current.rotation.y = camRef.current.rotation.y - Math.PI / 2;
      }
      camRef.current.rotation.x = 0
      camRef.current.rotation.z = 0
    }
  }

  // set URL of the room model
  useEffect(() => {
    const fullUrl = new URL('/models/DizzzyRoom.glb', window.location.origin).toString()
    setModelUrl(fullUrl);
  }, [gltfRef, modelUrl])

  // set camera rotation north when loaded
  useEffect(() => {
    if (camRef.current) {
      camRef.current.rotation.y = -0.010318912165364331 + (Math.PI / 2 * 2);
    }
  }, [camRef.current])


  if (!modelUrl) return null;

  return (
    <div className='relative'>
      <Canvas style={{ height: '100vh', background: '#111' }} frameloop='never'>
        <CanvasSettings />
        {/* <ambientLight intensity={0.5} /> */}
        <directionalLight position={[3, 3, 3]} />
        <Suspense fallback={null}>
          <GLTFModel
            camRef={camRef}
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
      <div className='absolute inset-0 pointer-events-none'>
        <div
          className={
            cn('absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto',
              !playerState.currentNode && 'opacity-50')
          }
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
          }}
        >
          ARROW TOP
        </div>
        <div
          className={
            cn('absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-auto',
              !playerState.currentNode.south && 'opacity-50')
          }
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
          }}
        >
          ARROW BOTTOM
        </div>
        <div
          className={
            cn('absolute top-1/2 -translate-y-1/2 left-0 pointer-events-auto')
          }
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
            handleCameraRotation("left")
          }}
        >
          ARROW LEFT
        </div>
        <div
          className='absolute top-1/2 -translate-y-1/2 right-0 bg-black pointer-events-auto'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
            handleCameraRotation("right")
          }}
        >
          ARROW RIGHT
        </div>
      </div>
    </div>
  )

}

export default ThreeDRoomScene;