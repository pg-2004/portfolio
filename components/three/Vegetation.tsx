"use client";

import { useMemo } from "react";
import { Instance, Instances } from "@react-three/drei";

type Placement = { x: number; z: number; scale: number; rotation: number; variance: number };

// Keep the stage clear: the camera sits at positive Z looking toward the
// pillar row at Z=0, so anything within the pillar row's width AND between
// the pillars and the camera would block the view. Vegetation is only
// placed outside that width, or behind the pillars (more negative Z).
const STAGE_HALF_WIDTH = 9.5;
const STAGE_CLEAR_Z = -1;
const FIELD_X = 16;
const FIELD_Z = 11;

function scatter(count: number, seedOffset: number): Placement[] {
  const out: Placement[] = [];
  let attempts = 0;
  while (out.length < count && attempts < count * 12) {
    attempts++;
    const x = (Math.random() * 2 - 1) * FIELD_X;
    const z = (Math.random() * 2 - 1) * FIELD_Z;
    if (Math.abs(x) < STAGE_HALF_WIDTH && z > STAGE_CLEAR_Z) continue;
    out.push({
      x,
      z,
      scale: 0.75 + Math.random() * 0.6,
      rotation: Math.random() * Math.PI * 2 + seedOffset,
      variance: 0.9 + Math.random() * 0.3,
    });
  }
  return out;
}

export default function Vegetation() {
  const trees = useMemo(() => scatter(52, 0), []);
  const rocks = useMemo(() => scatter(20, 1.7), []);
  const ferns = useMemo(() => scatter(26, 3.1), []);

  return (
    <group>
      {/* trunks */}
      <Instances limit={trees.length} castShadow={false} receiveShadow={false}>
        <cylinderGeometry args={[0.09, 0.13, 1, 6]} />
        <meshStandardMaterial color="#3d2d18" flatShading />
        {trees.map((t, i) => (
          <Instance
            key={i}
            position={[t.x, 0.5 * t.scale, t.z]}
            scale={[t.scale, t.scale, t.scale]}
            rotation={[0, t.rotation, 0]}
          />
        ))}
      </Instances>

      {/* foliage */}
      <Instances limit={trees.length} castShadow={false} receiveShadow={false}>
        <coneGeometry args={[0.85, 1.9, 7]} />
        <meshStandardMaterial color="#2f5c2f" flatShading />
        {trees.map((t, i) => (
          <Instance
            key={i}
            position={[t.x, (1 + 1.05) * t.scale, t.z]}
            scale={[t.scale, t.scale * t.variance, t.scale]}
            rotation={[0, t.rotation, 0]}
          />
        ))}
      </Instances>
      <Instances limit={trees.length} castShadow={false} receiveShadow={false}>
        <coneGeometry args={[0.6, 1.3, 6]} />
        <meshStandardMaterial color="#3d7a3a" flatShading />
        {trees.map((t, i) => (
          <Instance
            key={i}
            position={[t.x, (1 + 1.9) * t.scale, t.z]}
            scale={[t.scale, t.scale, t.scale]}
            rotation={[0, -t.rotation, 0]}
          />
        ))}
      </Instances>

      {/* rocks */}
      <Instances limit={rocks.length} castShadow={false} receiveShadow={false}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#5c5c52" flatShading />
        {rocks.map((r, i) => (
          <Instance
            key={i}
            position={[r.x, 0.18 * r.scale, r.z]}
            scale={[r.scale * 0.8, r.scale * 0.6, r.scale * 0.8]}
            rotation={[r.rotation * 0.4, r.rotation, r.rotation * 0.2]}
          />
        ))}
      </Instances>

      {/* undergrowth */}
      <Instances limit={ferns.length} castShadow={false} receiveShadow={false}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#4a7a3f" flatShading />
        {ferns.map((f, i) => (
          <Instance
            key={i}
            position={[f.x, 0.14 * f.scale, f.z]}
            scale={[f.scale * 0.7, f.scale * 0.45, f.scale * 0.7]}
            rotation={[0, f.rotation, 0]}
          />
        ))}
      </Instances>
    </group>
  );
}
