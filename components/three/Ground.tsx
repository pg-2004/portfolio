"use client";

import { useMemo } from "react";
import * as THREE from "three";

const WIDTH = 34;
const DEPTH = 24;
const SEGMENTS_X = 44;
const SEGMENTS_Z = 32;
const NOISE_AMPLITUDE = 0.15;

export default function Ground() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(WIDTH, DEPTH, SEGMENTS_X, SEGMENTS_Z);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const bump =
        (Math.sin(x * 0.35) + Math.sin(y * 0.5 + x * 0.15)) * NOISE_AMPLITUDE;
      pos.setZ(i, bump);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.02, 0]}
      receiveShadow
    >
      <meshStandardMaterial color="#4a3d22" roughness={0.95} flatShading />
    </mesh>
  );
}
