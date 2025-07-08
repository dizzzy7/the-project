import { useThree } from "@react-three/fiber";


import { RefObject, useEffect, useState } from "react";
import { MapNode } from "./ThreeDRoomScene";
import { GLTF } from "three-stdlib";
import { cn } from "@/lib/utils";

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

interface PlayerState {
  currentNode: MapNode;
  direction: DIRECTION;
}

interface CameraPlayerProps {
  nodes: Record<string, MapNode>;
  gltfRef: RefObject<GLTF>;
}

function CameraPlayer(props: CameraPlayerProps) {

  const [playerState, setPlayerState] = useState<PlayerState>({
    currentNode: props.nodes.SofaPosition,
    direction: DIRECTION.North,
  });

  const { camera } = useThree()

  // set camera rotation north when loaded
  useEffect(() => {
    if (camera) {
      camera.rotation.y = -0.010318912165364331 + (Math.PI / 2 * 2);
    }
  }, [camera])

  const handleCameraRotation = (direction: 'left' | 'right') => {
    if (camera) {
      if (direction === 'left') {
        setPlayerState({ ...playerState, direction: getPrevDirection(playerState.direction) })
        camera.rotation.y = camera.rotation.y + Math.PI / 2;
      } else if (direction === 'right') {
        setPlayerState({ ...playerState, direction: getNextDirection(playerState.direction) })
        camera.rotation.y = camera.rotation.y - Math.PI / 2;
      }
      camera.rotation.x = 0
      camera.rotation.z = 0
    }
  }


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

  return (

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
  )

}

export default CameraPlayer;