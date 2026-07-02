"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useIsomorphicLayoutEffect,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { EXHIBITS, siteConfig, type SectionId } from "@/lib/content";
import Pillar from "./Pillar";
import Character from "./Character";
import InfoPanel from "./InfoPanel";

export default function Museum() {
  const [active, setActive] = useState<SectionId | null>(null);
  const [station, setStation] = useState<SectionId>(EXHIBITS[0].id);
  const [stationX, setStationX] = useState<Partial<Record<SectionId, number>>>({});
  const reduce = useReducedMotion();

  // Very subtle mouse parallax on the grove (the title stays perfectly still).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce) return;
      mx.set((e.clientX / window.innerWidth - 0.5) * 14);
      my.set((e.clientY / window.innerHeight - 0.5) * 8);
    },
    [reduce, mx, my],
  );

  /* ------------------------------------------------------------------ */
  /* Responsive station positions — measured from the real pillar boxes  */
  /* ------------------------------------------------------------------ */
  const stageRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<Map<SectionId, HTMLDivElement>>(new Map());

  const registerBox = useCallback((id: SectionId, el: HTMLDivElement | null) => {
    if (el) boxRefs.current.set(id, el);
    else boxRefs.current.delete(id);
  }, []);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const next: Partial<Record<SectionId, number>> = {};
    boxRefs.current.forEach((el, id) => {
      const r = el.getBoundingClientRect();
      next[id] = r.left - stageRect.left + r.width / 2;
    });
    setStationX(next);
  }, []);

  useIsomorphicLayoutEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(stage);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ------------------------------------------------------------------ */
  /* Character walking                                                   */
  /* ------------------------------------------------------------------ */
  const x = useMotionValue(0);
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
  const mountedRef = useRef(false);
  const target = stationX[station];

  useEffect(() => {
    if (target === undefined) return;
    controlsRef.current?.stop();

    // First paint: snap the character into place, no walk-in, no auto-open.
    if (!mountedRef.current) {
      x.jump(target);
      mountedRef.current = true;
      return;
    }

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
    <main className="jungle" onMouseMove={onMove}>
      <motion.div ref={stageRef} className="grove" style={reduce ? undefined : { x: sx, y: sy }}>
        <div className="canopy-glow" />
        <div className="canopy" />
        <div className="ground" />

        {/* a quiet cluster of ferns in the foreground */}
        <div className="undergrowth" aria-hidden="true">
          <span className="undergrowth__leaf" />
          <span className="undergrowth__leaf" />
          <span className="undergrowth__leaf" />
        </div>

        {/* stone pillars — one per exhibit — hold the navigation */}
        <div className="pillar-row">
          {EXHIBITS.map((ex) => (
            <Pillar key={ex.id} def={ex} active={active === ex.id} onOpen={walkTo} boxRef={registerBox} />
          ))}
        </div>

        {target !== undefined && <Character x={x} bounceY={bounceY} facing={facing} />}
      </motion.div>

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
