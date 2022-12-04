import { Reflector, useTexture } from "@react-three/drei";
import {
  Canvas,
  MeshProps,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Color, Group } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

function App() {
  return (
    <div className="w-full h-screen flex flex-col bg-black">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 15] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <color attach="background" args={["black"]} />
        <ambientLight />
        <Suspense fallback={null}>
          <Rig>
            <Triangle
              color={"cyan" as unknown as Color}
              scale={0.009}
              position={[2, -1, -2]}
              rotation={[0, 0, Math.PI / 3]}
            />
            <Triangle
              color={"orange" as unknown as Color}
              scale={0.009}
              position={[-2, -1, -2]}
              rotation={[0, 0, Math.PI / 3]}
            />
            <Triangle
              color={"white" as unknown as Color}
              scale={0.009}
              position={[0, 2, -10]}
              rotation={[0, 0, Math.PI / 3]}
            />
            <Ground
              mirror={1}
              blur={[500, 100]}
              mixBlur={12}
              mixStrength={1.5}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              position-y={-0.8}
            />
          </Rig>
          <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
            <Bloom
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <div className="flex flex-1 justify-center items-center h-full z-10 relative">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-[20vmin] text-center leading-none text-white">
            Rifaldhi AW
          </h1>

          <h2 className="text-[4vmin] text-white text-center flex gap-5 font-bold">
            Software Engineer
            <div className="text-[2vmin] rounded-full border-2 border-inverse px-5 flex items-center">
              Frontend-Heavy
            </div>
          </h2>

          <div className="flex mt-10 text-white justify-center text-center w-[80vw]">
            NextJs - TailwindCSS - React - Flutter - React Native - Cloudflare -
            Sentry - WebRTC
          </div>
        </div>
      </div>
    </div>
  );
}

function Triangle({ color, ...props }: MeshProps & { color: Color }) {
  const ref = useRef<Group | null>(null);
  const [r] = useState(() => Math.random() * 10000);
  useFrame((_) => {
    if (ref.current?.position.y) {
      ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 10;
    }
  });
  const { paths: [path] } = useLoader(SVGLoader, '/triangle.svg') // prettier-ignore
  const geom = useMemo(
    () =>
      SVGLoader.pointsToStroke(
        path.subPaths[0].getPoints(),
        path.userData?.style
      ),
    []
  );
  return (
    <group ref={ref}>
      <mesh geometry={geom} {...props}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Rig({ children }: any) {
  const ref = useRef<Group | null>(null);
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05);
    if (ref.current) {
      ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        (-mouse.x * Math.PI) / 20,
        0.1
      );
    }
  });
  return <group ref={ref}>{children}</group>;
}

function Ground(props: any) {
  const [floor, normal] = useTexture([
    "/SurfaceImperfections003_1K_var1.jpg",
    "/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    <Reflector resolution={1024} args={[8, 8]} {...props}>
      {(Material, props) => (
        <Material
          color="#f0f0f0"
          metalness={0}
          roughnessMap={floor}
          normalMap={normal}
          //@ts-ignore
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
}

export default App;
