"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  useVelocity,
} from "framer-motion";
import { EXHIBITS, siteConfig, type SectionId } from "@/lib/content";
import { PILLAR_POSITIONS } from "@/lib/three/layout";
import SceneContents from "./SceneContents";
import InfoPanel from "../InfoPanel";

export default function Scene3D() {
  const [active, setActive] = useState<SectionId | null>(null);
  const [station, setStation] = useState<SectionId>(EXHIBITS[0].id);
  const reduce = useReducedMotion();

  /* ------------------------------------------------------------------ */
  /* Character walking — no DOM measurement needed: pillar positions are  */
  /* fixed 3D world-space constants (lib/three/layout.ts).                */
  /* ------------------------------------------------------------------ */
  const x = useMotionValue(PILLAR_POSITIONS[EXHIBITS[0].id].x);
  const vx = useVelocity(x);
  const bounceY = useMotionValue(0);
  const facingRef = useRef(1);
  const facing = useTransform(() => {
    const v = vx.get();
    if (v > 2) facingRef.current = 1;
    else if (v < -2) facingRef.current = -1;
    return facingRef.current;
  });

  useAnimationFrame((t) => {
    if (reduce) return;
    const speed = Math.abs(vx.get());
    if (speed > 4) {
      bounceY.set(Math.abs(Math.sin(t / 90)) * -10);
    } else if (bounceY.get() !== 0) {
      bounceY.set(0);
    }
  });

  const controlsRef = useRef<{ stop: () => void } | null>(null);
  // Tracks the last station this effect actually processed (not just
  // "have we mounted") — unlike a plain mounted flag, this stays correct
  // under React Strict Mode's dev-only double-invoke of the initial
  // effect, which would otherwise replay the "first paint" branch a
  // second time with `lastProcessedRef` already set and wrongly treat it
  // as a real station change (auto-opening the panel on load).
  const lastProcessedRef = useRef<SectionId | null>(null);
  const target = PILLAR_POSITIONS[station].x;

  useEffect(() => {
    controlsRef.current?.stop();

    // First time we've ever processed a station this mount, or a replay of
    // the same station (Strict Mode) — snap into place, no walk, no open.
    if (lastProcessedRef.current === null || lastProcessedRef.current === station) {
      x.jump(target);
      lastProcessedRef.current = station;
      return;
    }
    lastProcessedRef.current = station;

    // Both branches only ever set `active` from inside animate()'s onComplete
    // (never synchronously in the effect body) to avoid cascading renders.
    controlsRef.current = animate(
      x,
      target,
      reduce
        ? { duration: 0, onComplete: () => setActive(station) }
        : {
            type: "spring",
            stiffness: 260,
            damping: 30,
            mass: 1,
            onComplete: () => setActive(station),
          },
    );
  }, [station, target, reduce, x]);

  const walkTo = useCallback(
    (id: SectionId) => {
      if (id === station) {
        setActive(id);
        return;
      }
      setActive(null);
      setStation(id);
    },
    [station],
  );

  const stepStation = useCallback(
    (dir: 1 | -1) => {
      const idx = EXHIBITS.findIndex((e) => e.id === station);
      const nextId = EXHIBITS[Math.min(EXHIBITS.length - 1, Math.max(0, idx + dir))].id;
      if (nextId === station) return;
      setActive(null);
      setStation(nextId);
    },
    [station],
  );

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        return;
      }
      const el = document.activeElement;
      const tag = el instanceof HTMLElement ? el.tagName : "";
      if (tag === "INPUT" || tag === "TEXTAREA" || (el instanceof HTMLElement && el.isContentEditable)) {
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        stepStation(-1);
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        stepStation(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepStation]);

  return (
    <main className="jungle-3d">
      <Canvas shadows dpr={[1, 2]} flat>
        <SceneContents
          active={active}
          onOpen={walkTo}
          characterX={x}
          bounceY={bounceY}
          facing={facing}
        />
      </Canvas>

      {/* expedition title — static, never overlapped */}
      <div className="expedition">
        <p className="expedition__kicker">Expedition 01 — Software &amp; Systems</p>
        <h1 className="expedition__name">{siteConfig.name}</h1>
        <p className="expedition__sub">{siteConfig.title}</p>
        <div className="expedition__rule" />
      </div>

      <div className="vignette" />

      <div className="wordmark">
        <span className="wordmark__mono">{siteConfig.monogram}</span>
        <span className="wordmark__text">
          {siteConfig.name} <span>/ Portfolio</span>
        </span>
      </div>

      <motion.div
        className="scene-hint"
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="scene-hint__dot" />
        Click a plinth, or use ← → / A D, to visit an exhibit
      </motion.div>

      <InfoPanel active={active} onClose={close} />
    </main>
  );
}
