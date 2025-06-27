import { Ref, useEffect } from "react";
import * as THREE from "three";
import GLTFModel from "./GLTFModel";
import { useThree } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

function MyRoom(props: { gltfRef: Ref<GLTF>, modelUrl: string }) {
  const { camera } = useThree()

  return (
    <GLTFModel
      gltfRef={props.gltfRef}
      url={props.modelUrl}
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
  )
}

export default MyRoom;