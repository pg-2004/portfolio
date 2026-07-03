"use client";

import { EXHIBITS, type SectionId } from "@/lib/content";
import { PILLAR_POSITIONS } from "@/lib/three/layout";
import PillarMesh from "./PillarMesh";

export default function Pillars({
  active,
  onOpen,
}: {
  active: SectionId | null;
  onOpen: (id: SectionId) => void;
}) {
  return (
    <>
      {EXHIBITS.map((ex) => {
        const p = PILLAR_POSITIONS[ex.id];
        return (
          <PillarMesh
            key={ex.id}
            def={ex}
            position={[p.x, 0, p.z]}
            active={active === ex.id}
            onOpen={onOpen}
          />
        );
      })}
    </>
  );
}
