import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Center, Text3D, PointerLockControls } from "@react-three/drei";
import CustomObject from "./CustomObject.jsx";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

extend({ TextGeometry });

export default function Experience() {

  
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  const hub = useLoader(GLTFLoader, "./hub.glb");
  const fire = useLoader(GLTFLoader, './bonfire.glb')
  const everest = useLoader(GLTFLoader, "./everest.glb");

  // const clock = new THREE.Clock()

  const tick = () =>
  {
    const elapsedTime = clock.getElapsedTime();

  }
  // console.log(fire)

  // const cubeRef = useRef()
  // const groupRef = useRef()

  // const font2 = new FontLoader().parse(font);

  useFrame((state, delta) => {
    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle) * 8
    // state.camera.position.z = Math.cos(angle) * 8
    // state.camera.lookAt(0, 0, 0)
    // cubeRef.current.rotation.y += delta
    // groupRef.current.rotation.y += delta
    groupRef.current.position.y = Math.sin(delta / 7)
    // groupRef.current.rotation.x += Math.cos(delta)

  });



  const groupRef = useRef();  

  return (
    <>
      <PointerLockControls ref={controlsRef} args={[camera, gl.domElement]} />

      {/* <pointerLockControls args={[camera, gl.domElement]} /> */}

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={ groupRef}>
        <Center position-y={10} position-x={1} position-z={-4} rotation-y={0.7}>
          <Text3D font="./Fredoka One_Regular.json">
            Welcome
            <meshNormalMaterial />
          </Text3D>
        </Center>

        <Center
          position-y={8.5}
          position-x={1}
          position-z={-4}
          rotation-y={0.7}
        >
          <Text3D font="./Fredoka One_Regular.json">
            To
            <meshNormalMaterial />
          </Text3D>
        </Center>

        <Center position-y={7} position-x={1} position-z={-4} rotation-y={0.7}>
          <Text3D font="./Fredoka One_Regular.json">
            The CampVerse
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </group>

      

      {/* <Center>
      <primitive object={fire.scene} />
      </Center> */}

      <Center>
        <primitive object={hub.scene} />
      </Center>
      <Center position-y={4.} position-x={8.5} position-z={6.} >
         <primitive object={fire.scene} scale = {0.1}/>
        </Center>
        <Center position-y={33} position-x={20} position-z={6.} >
         <primitive object={everest.scene} scale = {2}/>
        </Center>


      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
