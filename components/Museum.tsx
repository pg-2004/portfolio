"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { EXHIBITS, siteConfig, type SectionId } from "@/lib/content";
import Frame from "./Frame";
import InfoPanel from "./InfoPanel";

export default function Museum() {
  const [active, setActive] = useState<SectionId | null>(null);
  const reduce = useReducedMotion();

  // Very subtle mouse parallax on the wall (the title stays perfectly still).
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
    [mx, my, reduce],
  );

  const open = useCallback((id: SectionId) => setActive(id), []);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="museum" onMouseMove={onMove}>
      <motion.div className="room" style={reduce ? undefined : { x: sx, y: sy }}>
        <div className="ceiling-glow" />

        {/* ceiling track lighting */}
        <div className="track">
          <div className="track__rail" />
          <div className="track__row">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="track__lamp" />
            ))}
          </div>
        </div>

        <div className="floor" />

        {/* a quiet gallery bench in the foreground */}
        <div className="bench" aria-hidden="true">
          <span className="bench__top" />
          <span className="bench__shadow" />
        </div>

        {/* framed works hung on the wall */}
        <div className="wall-hang">
          {EXHIBITS.map((ex) => (
            <Frame key={ex.id} def={ex} active={active === ex.id} onOpen={open} />
          ))}
        </div>
      </motion.div>

      {/* exhibition title — static wall text, never overlapped */}
      <div className="exhibition">
        <p className="exhibition__kicker">Exhibition 01 — Software &amp; Systems</p>
        <h1 className="exhibition__name">{siteConfig.name}</h1>
        <p className="exhibition__sub">{siteConfig.title}</p>
        <div className="exhibition__rule" />
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
        Select a framed work to view the exhibit
      </motion.div>

      <InfoPanel active={active} onClose={close} />
    </main>
  );
}
