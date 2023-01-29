import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Center, Text3D, PointerLockControls, OrbitControls } from "@react-three/drei";
import CustomObject from "./CustomObject.jsx";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

extend({ TextGeometry });
extend({OrbitControls});

export default function Experience() {

  
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  const hub = useLoader(GLTFLoader, "./hub.glb");
  const fire = useLoader(GLTFLoader, './bonfire.glb')
  const everest = useLoader(GLTFLoader, "./everest.glb");
  const forest = useLoader(GLTFLoader, "./magic_forest.glb");
  const desert = useLoader(GLTFLoader, "./desert.glb");
  const tree = useLoader(GLTFLoader, "./tree.glb");
  const floating_rock = useLoader(GLTFLoader, "./floating_rock.glb");
  const forest_tent = useLoader(GLTFLoader, "./forest_tent.glb");
  const everest_tent = useLoader(GLTFLoader, "./everest_tent.glb");
  const desert_tent = useLoader(GLTFLoader, "./desert_tent.glb");
  
  // const clock = new THREE.Clock()

  // console.log(fire)

  // const cubeRef = useRef()
  // const groupRef = useRef()

  // const font2 = new FontLoader().parse(font);





  const groupRef = useRef();  

  return (
    <>
      {/* <PointerLockControls ref={controlsRef} args={[camera, gl.domElement]} /> */}

      <OrbitControls args={[camera, gl.domElement]} />

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
      <Center position-y={4} position-x={8.5} position-z={6.} >
         <primitive object={fire.scene} scale = {0.1}/>
        </Center>
        {/* <Center position-y={2} position-x={35} position-z={6.} > */}
        <Center position-y={20} position-x={-45} position-z={-10} >
         <primitive object={everest.scene} scale = {3}/>
        </Center>

        <Center position-y={-5} position-x={-27} position-z={43.} >
         <primitive object={floating_rock.scene} scale = {2}/>
        </Center>

        <Center position-y={5.15} position-x={-27} position-z={39.5} rotation-y={2.7}>
         <primitive object={desert.scene} scale = {5}/>
        </Center>

        <Center position-y={3.8} position-x={-26} position-z={45} rotation-y={2.7}>
         <primitive object={desert_tent.scene} scale = {0.1}/>
        </Center>

        <Center position-y={13} position-x={7.5} position-z={-11} >
         <primitive object={forest.scene} scale = {0.001}/>
        </Center>

        <Center position-y={15.5} position-x={7} position-z={-12} >
         <primitive object={tree.scene} scale = {0.25}/>
        </Center>

        <Center position-y={15} position-x={8.4} position-z={-10.5} >
         <primitive object={forest_tent.scene} scale = {0.001}/>
        </Center>

        <Center position-y={20.7} position-x={-42} position-z={-7.5} >
         <primitive object={everest_tent.scene} scale = {0.3}/>
        </Center>
        


      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
