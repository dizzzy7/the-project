import { useGLTF } from "@react-three/drei";
import { Ref, useEffect } from "react";
import type { GLTF } from "three-stdlib"; // Correct import


interface GLTFModelProps {
  gltfRef: Ref<GLTF>;
  url: string;
  onGLTFLoaded?: (gltf: GLTF) => void;
  // change SceneLoaded to GLTFloaded -> adjust
}

function GLTFModel(props: GLTFModelProps) {
  const gltf = useGLTF(props.url)

  useEffect(() => {
    const importedCamera = gltf.cameras?.[0]

    // console.log('Imported Camera:', importedCamera);
    if (gltf.scene && props.onGLTFLoaded) {
      props.onGLTFLoaded(gltf)
    }
  }, [gltf.scene]);

  return <primitive ref={props.gltfRef} object={gltf.scene} />
}

export default GLTFModel;