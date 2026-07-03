"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { animate, useMotionValue } from "framer-motion";
import type * as THREE from "three";
import type { ExhibitDef, SectionId } from "@/lib/content";
import { PILLAR_BASE_HEIGHT, PILLAR_CAP_HEIGHT, PILLAR_SHAFT_HEIGHT } from "@/lib/three/layout";

const RISE_AMOUNT = 0.32;
const RISE_SPRING = { type: "spring" as const, stiffness: 220, damping: 22, mass: 0.7 };

export default function PillarMesh({
  def,
  position,
  active,
  onOpen,
}: {
  def: ExhibitDef;
  position: [number, number, number];
  active: boolean;
  onOpen: (id: SectionId) => void;
}) {
  const [x, , z] = position;
  const shaftY = PILLAR_BASE_HEIGHT + PILLAR_SHAFT_HEIGHT / 2;
  const capY = PILLAR_BASE_HEIGHT + PILLAR_SHAFT_HEIGHT + PILLAR_CAP_HEIGHT / 2;

  const riseGroupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const riseY = useMotionValue(0);

  useEffect(() => {
    const controls = animate(riseY, active ? RISE_AMOUNT : 0, RISE_SPRING);
    return () => controls.stop();
  }, [active, riseY]);

  useFrame(() => {
    const rise = riseY.get();
    if (riseGroupRef.current) riseGroupRef.current.position.y = rise;
    if (glowRef.current) glowRef.current.intensity = (rise / RISE_AMOUNT) * 1.8;
  });

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onOpen(def.id);
    },
    [def.id, onOpen],
  );
  const handleOver = useCallback(() => {
    document.body.style.cursor = "pointer";
  }, []);
  const handleOut = useCallback(() => {
    document.body.style.cursor = "auto";
  }, []);

  return (
    <group>
      {/* base plinth — fixed, this is where the character stands */}
      <mesh
        position={[x, PILLAR_BASE_HEIGHT / 2, z]}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      >
        <boxGeometry args={[0.9, PILLAR_BASE_HEIGHT, 0.9]} />
        <meshStandardMaterial color="#726a57" flatShading />
      </mesh>

      <pointLight ref={glowRef} position={[x, PILLAR_BASE_HEIGHT + 0.2, z]} color="#ffc86c" intensity={0} distance={2.4} />

      {/* rising shaft + cap */}
      <group ref={riseGroupRef} position={[x, 0, z]}>
        <mesh
          position={[0, shaftY, 0]}
          castShadow
          receiveShadow
          onClick={handleClick}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
        >
          <cylinderGeometry args={[0.35, 0.46, PILLAR_SHAFT_HEIGHT, 7]} />
          <meshStandardMaterial color="#5c584a" flatShading />
        </mesh>
        <mesh
          position={[0, capY, 0]}
          castShadow
          receiveShadow
          onClick={handleClick}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
        >
          <boxGeometry args={[0.85, PILLAR_CAP_HEIGHT, 0.85]} />
          <meshStandardMaterial color="#d8cfae" flatShading />
        </mesh>

        <Html position={[0, capY + 0.55, 0]} center className="pillar-label-3d" occlude={false}>
          {/* real DOM button: keyboard/screen-reader parity, since WebGL
              meshes aren't part of the tab order or focusable on their own */}
          <button
            type="button"
            aria-label={`Open ${def.label} exhibit`}
            onClick={() => onOpen(def.id)}
            style={{ appearance: "none", border: 0, background: "transparent", padding: 0, cursor: "pointer" }}
          >
            <span className="pillar-face">
              <span className="pillar-num">{def.index}</span>
              <span className="pillar-title">{def.label}</span>
            </span>
            <span className="plaque" style={{ marginTop: 8 }}>
              <span className="plaque__cap">{def.caption}</span>
            </span>
          </button>
        </Html>
      </group>
    </group>
  );
}
