import { EXHIBITS, type SectionId } from "@/lib/content";

/** World-space spacing between adjacent pillar centers. */
export const PILLAR_SPACING = 3.2;
export const PILLAR_Z = 0;

/** Fixed pillar positions — no DOM measurement needed, unlike the 2D scene. */
export const PILLAR_POSITIONS: Record<SectionId, { x: number; z: number }> = Object.fromEntries(
  EXHIBITS.map((ex, i) => [
    ex.id,
    { x: (i - (EXHIBITS.length - 1) / 2) * PILLAR_SPACING, z: PILLAR_Z },
  ]),
) as Record<SectionId, { x: number; z: number }>;

export const PILLAR_BASE_HEIGHT = 0.35;
export const PILLAR_SHAFT_HEIGHT = 1.4;
export const PILLAR_CAP_HEIGHT = 0.5;

export const CAMERA_POSITION: [number, number, number] = [0, 6, 13];
export const CAMERA_TARGET: [number, number, number] = [0, 1, 0];
export const CAMERA_FOV = 42;
export const CAMERA_BASE_Z = CAMERA_POSITION[2];

// Below this aspect ratio (16:9), the camera progressively widens its FOV
// and dollies back so the full pillar row stays in frame on narrow/portrait
// viewports. Below CAMERA_NARROW_ASPECT the blend is fully maxed out.
export const CAMERA_TARGET_ASPECT = 16 / 9;
export const CAMERA_NARROW_ASPECT = 0.45;
export const CAMERA_MAX_FOV = 62;
export const CAMERA_MAX_DOLLY = 2.85;
