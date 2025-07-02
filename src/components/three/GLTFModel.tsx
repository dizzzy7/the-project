import { PerspectiveCamera, PerspectiveCameraProps, useGLTF } from "@react-three/drei";
import { Camera, useThree } from "@react-three/fiber";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import type { GLTF } from "three-stdlib"; // Correct import
import * as THREE from "three";


interface GLTFModelProps {
  camRef: RefObject<THREE.PerspectiveCamera>,
  gltfRef: RefObject<GLTF>;
  url: string;
  onGLTFLoaded?: (gltf: GLTF) => void;
}

function GLTFModel(props: GLTFModelProps) {
  const gltf = useGLTF(props.url)
  const { set } = useThree();

  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([100, 100, 0]);
  const [cameraRotation, setCameraRotation] = useState<[number, number, number]>([0, 0, 0]);

  const camRef = useRef<PerspectiveCameraProps>(null);

  useEffect(() => {
    if (gltf.cameras && gltf.cameras.length) {
      const importedCamera = gltf.cameras[0]
      console.log('Imported Camera:', importedCamera);

      setCameraPosition([importedCamera.position.x, importedCamera.position.y, importedCamera.position.z]);
      setCameraRotation([importedCamera.rotation.x, importedCamera.rotation.y, importedCamera.rotation.z]);
    }

    if (gltf.scene && props.onGLTFLoaded) {
      props.onGLTFLoaded(gltf)
    }
  }, []);

  return (
    <>
      <PerspectiveCamera ref={props.camRef} makeDefault position={cameraPosition} rotation={cameraRotation} />
      <primitive ref={props.gltfRef} object={gltf.scene} />
    </>
  )
}

export default GLTFModel;