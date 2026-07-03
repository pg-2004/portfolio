"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import type * as THREE from "three";

const BOUNCE_SCALE = 0.013;

export default function CharacterMesh({
  x,
  z,
  bounceY,
  facing,
}: {
  x: MotionValue<number>;
  z: number;
  bounceY: MotionValue<number>;
  facing: MotionValue<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    g.position.x = x.get();
    g.position.y = Math.abs(bounceY.get()) * BOUNCE_SCALE;
    g.rotation.y = facing.get() > 0 ? 0 : Math.PI;
  });

  return (
    <group ref={groupRef} position={[0, 0, z]}>
      {/* contact shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.55, 16]} />
        <meshBasicMaterial color="#04140a" transparent opacity={0.4} />
      </mesh>

      {/* horse legs */}
      {[
        [0.32, 0.18],
        [0.32, -0.18],
        [-0.32, 0.18],
        [-0.32, -0.18],
      ].map(([lx, lz], i) => (
        <mesh key={i} position={[lx, 0.28, lz]} castShadow>
          <cylinderGeometry args={[0.055, 0.07, 0.55, 5]} />
          <meshStandardMaterial color="#5a3d22" flatShading />
        </mesh>
      ))}

      {/* horse body */}
      <mesh position={[0, 0.58, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.3, 0.75, 3, 7]} />
        <meshStandardMaterial color="#a9772f" flatShading />
      </mesh>

      {/* neck */}
      <mesh position={[0.46, 0.85, 0]} rotation={[0, 0, -0.9]} castShadow>
        <capsuleGeometry args={[0.16, 0.42, 3, 6]} />
        <meshStandardMaterial color="#a9772f" flatShading />
      </mesh>

      {/* head */}
      <mesh position={[0.72, 1.14, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.2]} />
        <meshStandardMaterial color="#8a5f26" flatShading />
      </mesh>
      <mesh position={[0.68, 1.26, 0.07]} rotation={[0.3, 0, -0.3]} castShadow>
        <coneGeometry args={[0.05, 0.13, 5]} />
        <meshStandardMaterial color="#5a3d22" flatShading />
      </mesh>
      <mesh position={[0.68, 1.26, -0.07]} rotation={[-0.3, 0, -0.3]} castShadow>
        <coneGeometry args={[0.05, 0.13, 5]} />
        <meshStandardMaterial color="#5a3d22" flatShading />
      </mesh>

      {/* mane */}
      <mesh position={[0.34, 0.98, 0]} rotation={[0, 0, -0.9]} castShadow>
        <boxGeometry args={[0.06, 0.34, 0.16]} />
        <meshStandardMaterial color="#3d2a15" flatShading />
      </mesh>

      {/* tail */}
      <mesh position={[-0.52, 0.62, 0]} rotation={[0, 0, 0.7]} castShadow>
        <coneGeometry args={[0.1, 0.42, 5]} />
        <meshStandardMaterial color="#3d2a15" flatShading />
      </mesh>

      {/* rider torso */}
      <mesh position={[0.02, 0.95, 0]} rotation={[0.15, 0, 0]} castShadow>
        <capsuleGeometry args={[0.17, 0.32, 3, 7]} />
        <meshStandardMaterial color="#2f5c58" flatShading />
      </mesh>

      {/* rider head */}
      <mesh position={[-0.02, 1.32, 0]} castShadow>
        <sphereGeometry args={[0.14, 8, 6]} />
        <meshStandardMaterial color="#d9a066" flatShading />
      </mesh>

      {/* crown */}
      <mesh position={[-0.02, 1.42, 0]} castShadow>
        <coneGeometry args={[0.1, 0.1, 5]} />
        <meshStandardMaterial color="#e8b83a" flatShading />
      </mesh>

      {/* cape */}
      <mesh position={[-0.16, 0.88, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.05, 0.42, 0.28]} />
        <meshStandardMaterial color="#b8342e" flatShading />
      </mesh>
    </group>
  );
}
