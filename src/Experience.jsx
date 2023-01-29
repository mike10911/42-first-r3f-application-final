import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import {
  Box,
  Center,
  Text3D,
  PointerLockControls,
  OrbitControls,
} from "@react-three/drei";
import CustomObject from "./CustomObject.jsx";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

extend({ TextGeometry });
extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  const hub = useLoader(GLTFLoader, "./hub.glb");
  const fire = useLoader(GLTFLoader, "./bonfire.glb");
  const everest = useLoader(GLTFLoader, "./everest.glb");
  const forest = useLoader(GLTFLoader, "./magic_forest.glb");
  const desert = useLoader(GLTFLoader, "./desert.glb");
  const tree = useLoader(GLTFLoader, "./tree.glb");
  const floating_rock = useLoader(GLTFLoader, "./floating_rock.glb");
  const forest_tent = useLoader(GLTFLoader, "./forest_tent.glb");
  const everest_tent = useLoader(GLTFLoader, "./everest_tent.glb");
  const desert_tent = useLoader(GLTFLoader, "./desert_tent.glb");

  const p = new THREE.Vector3();
  const c = new THREE.PerspectiveCamera();

  const state = useThree();
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    state.camera.lookAt(0, 0, 0);
  }, []);

  useEffect(() => {
    if (clicked !== null) {
      clicked.updateWorldMatrix(true, true);

      const selection = clicked;

      const { position } = selection;

      const viewPos = new THREE.Vector3(...selection.userData.viewPos);

      const camPosTarget = new THREE.Vector3(...position).add(viewPos);

      c.position.set(...camPosTarget);

      c.lookAt(...position);

      p.copy(c.position);
    } else {
      p.set(9, 4.25, 7);
    }
  });

  const forestRef = useRef();
  const everestRef = useRef();
  const desertRef = useRef();
  useFrame((state, dt) => {
    state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 0.4, dt));
    forestRef.current.rotation.y += 0.003;
    everestRef.current.rotation.y += 0.001;
    desertRef.current.rotation.y += 0.003;
  });

  const groupRef = useRef();
  const textureLoader = new THREE.TextureLoader();

  return (
    <>
      <PointerLockControls ref={controlsRef} args={[camera, gl.domElement]} />

      {/* <OrbitControls args={[camera, gl.domElement]} /> */}

      <spotLight position={[-1, 5, 15]} intensity={0.3} color={"purple"} />
      <spotLight
        position={[-1, 5, 15]}
        intensity={0.08}
        color={"dark orange"}
      />
      <spotLight
        position={[-100, 30, 1]}
        intensity={2}
        color={"white"}
        distance={125}
      />
      <spotLight
        position={[150, 70, -250]}
        intensity={10}
        color={"white"}
        distance={325}
      />
      <pointLight
        position={[-100, -1000, -100]}
        intensity={0.5}
        color={"blue"}
      />
      <ambientLight intensity={0.09} />

      <group ref={groupRef}>
        <Center position-y={10} position-x={1} position-z={-4} rotation-y={0.7}>
          <Text3D font="./Fredoka One_Regular.json">
            Welcome
            <meshBasicMaterial color={"#FF6600"} />
          </Text3D>
        </Center>

        <Center
          position-y={8.5}
          position-x={1}
          position-z={-4}
          rotation-y={0.7}
        >
          <Text3D font="./Fredoka One_Regular.json" scale={0.7}>
            To
            <meshNormalMaterial />
          </Text3D>
        </Center>

        <Center position-y={7} position-x={1} position-z={-4} rotation-y={0.7}>
          <Text3D font="./Fredoka One_Regular.json">
            The CampVerse
            <meshBasicMaterial color={"#FF6600"} />
          </Text3D>
        </Center>
      </group>

      <Center>
        <primitive object={hub.scene} />
      </Center>
      <Center position-y={4} position-x={8.5} position-z={6}>
        <primitive object={fire.scene} scale={0.1} />
      </Center>
      {/* <Center position-y={2} position-x={35} position-z={6.} > */}
      <Center
        ref={everestRef}
        position-y={20}
        position-x={-45}
        position-z={-10}
      >
        <primitive object={everest.scene} scale={3} />
      </Center>

      <Center position-y={-5} position-x={-27} position-z={43}>
        <primitive object={floating_rock.scene} scale={2} />
      </Center>

      <Center
        position-y={5.15}
        position-x={-27}
        position-z={39.5}
        rotation-y={2.7}
        ref={desertRef}
      >
        <primitive object={desert.scene} scale={5} />
      </Center>

      <Center
        position-y={3.8}
        position-x={-26}
        position-z={45}
        rotation-y={2.7}
      >
        <primitive object={desert_tent.scene} scale={0.1} />
      </Center>

      <Box
        // castShadow
        args={[0.5, 0.5, 0.5]}
        position={[-26, 3.8, 45]}
        userData={{ viewPos: [1, 1, 1] }}
        onClick={(e) => {
          e.stopPropagation();
          if (clicked === e.object) {
            setClicked(null);
            window.open("https://en.wikipedia.org/wiki/Western_Desert_(Egypt)");
          } else {
            setClicked(e.object);
          }
        }}
        onPointerMissed={() => {
          setClicked(null);
        }}
      >
        <meshStandardMaterial
          color={0xffffff}
          transparent={true}
          opacity={0.0}
        />
      </Box>

      <Box
        // castShadow
        args={[0.5, 0.5, 0.5]}
        position={[-42, 20.7, -7.5]}
        userData={{ viewPos: [0, 0, 0] }}
        onClick={(e) => {
          if (clicked === e.object) {
            setClicked(null);
            window.open("https://www.nationalgeographic.com/adventure/article/everest-base-camp-daily-life-perpetual-planet")

          } else {
            setClicked(e.object);
          }
        }}
      >
        <meshStandardMaterial
          color={"red"}
          transparent={true}
          opacity={0.0}
        />
      </Box>

      <Box
        // castShadow
        args={[0.25, 0.25, 0.25]}
        position={[8.5, 4., 6]}
        userData={{ viewPos: [0, 0, 0] }}
        onClick={(e) => {
          if (clicked === e.object) {
            setClicked(null);
            window.open("https://media.tenor.com/rQnJEmv72o4AAAAC/jack-jack-on-fire.gif")

          } else {
            setClicked(e.object);
          }
        }}
      >
        <meshStandardMaterial
          color={"red"}
          transparent={true}
          opacity={0.0}
        />
      </Box>

      <Box
        // castShadow
        args={[11, 11, 11]}
        position={[-30, -2, 40]}
        userData={{ viewPos: [3, 6.5, 2] }}
        onClick={(e) => {
          e.stopPropagation();
          if (clicked === e.object) {
            setClicked(null);
          } else {
            setClicked(e.object);
          }
        }}
        onPointerMissed={() => {
          setClicked(null);
        }}
      >
        <meshStandardMaterial
          color={"black"}
          transparent={false}
          opacity={0.0}
        />
      </Box>

      <Center ref={forestRef} position-y={13} position-x={7.5} position-z={-11}>
        <primitive object={forest.scene} scale={0.001} />
      </Center>
      <Box
        // castShadow
        args={[3, 3, 3]}
        position={[7.5, 12.5, -11]}
        userData={{ viewPos: [1, 2.5, 1] }}
        onClick={(e) => {
          e.stopPropagation();
          if (clicked === e.object) {
            setClicked(null);
          } else {
            setClicked(e.object);
          }
        }}
        onPointerMissed={() => {
          setClicked(null);
        }}
      >
        <meshStandardMaterial
          color={0xffffff}
          transparent={true}
          opacity={0.0}
        />
      </Box>

      <Center position-y={15.5} position-x={7} position-z={-12}>
        <primitive object={tree.scene} scale={0.25} />
      </Center>

      <Center position-y={14.9} position-x={8.4} position-z={-10.5}>
        <primitive object={forest_tent.scene} scale={0.001} />
      </Center>

      <Box
        // castShadow
        args={[0.5, 0.5, 0.5]}
        position={[8.4, 14.9, -10.5]}
        userData={{ viewPos: [1, 1, 1] }}
        onClick={(e) => {
          e.stopPropagation();
          if (clicked === e.object) {
            setClicked(null);
            window.open("https://www.nps.gov/seki/planyourvisit/conditions.htm");
          } else {
            setClicked(e.object);
          }
        }}
        onPointerMissed={() => {
          setClicked(null);
        }}
      >
        <meshStandardMaterial
          color={0xffffff}
          transparent={true}
          opacity={0.0}
        />
      </Box>

      <Center position-y={20.7} position-x={-42} position-z={-7.5}>
        <primitive object={everest_tent.scene} scale={0.3} />
      </Center>

      <Box
        // castShadow
        args={[8, 8, 8]}
        position={[-45, 15, -9.5]}
        userData={{ viewPos: [3, 6.5, 1] }}
        onClick={(e) => {
          e.stopPropagation();
          if (clicked === e.object) {
            setClicked(null);
          } else {
            setClicked(e.object);
          }
        }}
        onPointerMissed={() => {
          setClicked(null);
        }}
      >
        <meshStandardMaterial
          color={"black"}
          transparent={true}
          opacity={0.0}
        />
      </Box>
    </>
  );
}
