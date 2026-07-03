"use client";

import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import type { SectionId } from "@/lib/content";
import {
  CAMERA_BASE_Z,
  CAMERA_FOV,
  CAMERA_MAX_DOLLY,
  CAMERA_MAX_FOV,
  CAMERA_NARROW_ASPECT,
  CAMERA_POSITION,
  CAMERA_TARGET,
  CAMERA_TARGET_ASPECT,
  PILLAR_Z,
} from "@/lib/three/layout";
import Ground from "./Ground";
import Vegetation from "./Vegetation";
import Pillars from "./Pillars";
import CharacterMesh from "./CharacterMesh";

const FOG_COLOR = "#0a140c";
const BG_COLOR = "#16301b";

function ResponsiveCamera() {
  const lastAspect = useRef(0);

  // Imperatively mutating the camera every frame (not in an effect) is the
  // idiomatic r3f pattern — three.js objects are meant to be driven this way.
  // Skip the work entirely once the aspect ratio has settled, since this
  // only ever needs to change on resize, not every single frame.
  useFrame(({ camera, viewport }) => {
    if (viewport.aspect === lastAspect.current) return;
    lastAspect.current = viewport.aspect;

    // 0 at/above the target (wide) aspect, 1 at/below the narrow (portrait)
    // aspect — blended smoothly so both FOV and distance share the work of
    // keeping the full pillar row in frame, rather than relying on either
    // alone (a pure distance dolly would need to push the camera out past
    // the fog; a pure FOV widen alone gets uncomfortably fisheye-like).
    const t = Math.min(
      1,
      Math.max(0, (CAMERA_TARGET_ASPECT - viewport.aspect) / (CAMERA_TARGET_ASPECT - CAMERA_NARROW_ASPECT)),
    );

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = CAMERA_FOV + t * (CAMERA_MAX_FOV - CAMERA_FOV);
      camera.updateProjectionMatrix();
    }
    camera.position.z = CAMERA_BASE_Z * (1 + t * (CAMERA_MAX_DOLLY - 1));
    camera.lookAt(...CAMERA_TARGET);
  });

  return null;
}

export default function SceneContents({
  active,
  onOpen,
  characterX,
  bounceY,
  facing,
}: {
  active: SectionId | null;
  onOpen: (id: SectionId) => void;
  characterX: MotionValue<number>;
  bounceY: MotionValue<number>;
  facing: MotionValue<number>;
}) {
  return (
    <>
      <color attach="background" args={[BG_COLOR]} />
      <fog attach="fog" args={[FOG_COLOR, 14, 46]} />

      <PerspectiveCamera makeDefault position={CAMERA_POSITION} fov={CAMERA_FOV} />
      <ResponsiveCamera />

      <ambientLight intensity={1.1} color="#4a6a45" />
      <directionalLight
        position={[6, 9, 4]}
        intensity={2.6}
        color="#fff3d9"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={1}
        shadow-camera-far={22}
      />

      <Ground />
      <Vegetation />
      <Pillars active={active} onOpen={onOpen} />
      <CharacterMesh x={characterX} z={PILLAR_Z} bounceY={bounceY} facing={facing} />
    </>
  );
}
