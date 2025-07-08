import { PerspectiveCamera, PerspectiveCameraProps, useGLTF } from "@react-three/drei";
import { Camera, useThree } from "@react-three/fiber";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import type { GLTF } from "three-stdlib"; // Correct import
import * as THREE from "three";


interface GLTFModelProps {
  gltfRef: RefObject<GLTF>;
  url: string;
  onGLTFLoaded?: (gltf: GLTF) => void;
}

function GLTFModel(props: GLTFModelProps) {
  const gltf = useGLTF(props.url)
  const { camera } = useThree();

  useEffect(() => {
    const importedCamera = gltf.cameras[0];
    if (gltf.cameras && gltf.cameras.length
      && camera instanceof THREE.PerspectiveCamera
      && importedCamera instanceof THREE.PerspectiveCamera
    ) {
      camera.position.set(importedCamera.position.x, importedCamera.position.y, importedCamera.position.z)
      camera.rotation.set(importedCamera.rotation.x, importedCamera.rotation.y, importedCamera.rotation.z)
      camera.fov = importedCamera.fov;
    }

    if (gltf.scene && props.onGLTFLoaded) {
      props.onGLTFLoaded(gltf)
    }
  }, []);

  return (
    <>
      <primitive ref={props.gltfRef} object={gltf.scene} />
    </>
  )
}

export default GLTFModel;