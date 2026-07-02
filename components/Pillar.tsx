"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ExhibitDef, SectionId } from "@/lib/content";

const spring: Transition = { type: "spring", stiffness: 220, damping: 22, mass: 0.7 };

// The pillar rises out of the ground and casts a deeper shadow while its panel is open.
const riseV: Variants = {
  rest: { y: 0, scaleY: 1, boxShadow: "0 18px 40px -22px rgba(4,10,5,0.55)" },
  risen: { y: -10, scaleY: 1.16, boxShadow: "0 34px 64px -26px rgba(4,10,5,0.68)" },
};
const spotV: Variants = { rest: { opacity: 0.4 }, risen: { opacity: 0.95 } };
const glowV: Variants = { rest: { opacity: 0 }, risen: { opacity: 0.75 } };
const pulseV: Variants = { rest: { opacity: 0, scale: 0.6 }, risen: { opacity: 1, scale: 1 } };

export default function Pillar({
  def,
  active,
  onOpen,
  boxRef,
}: {
  def: ExhibitDef;
  active: boolean;
  onOpen: (id: SectionId) => void;
  boxRef: (id: SectionId, el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.button
      type="button"
      className="pillar"
      aria-label={`Open ${def.label} exhibit`}
      onClick={() => onOpen(def.id)}
      initial="rest"
      animate={active ? "risen" : "rest"}
      whileFocus="risen"
      whileTap={{ scale: 0.99 }}
      transition={spring}
    >
      <motion.span className="pillar-spot" variants={spotV} transition={spring} />
      <motion.span className="pillar-glow" variants={glowV} transition={spring} />

      <motion.div className="pillar-window" variants={riseV} transition={spring}>
        <div className="pillar-shaft">
          <div className="pillar-face">
            <span className="pillar-num">{def.index}</span>
            <span className="pillar-title">{def.label}</span>
          </div>
        </div>
      </motion.div>

      <span className="plaque">
        <span className="plaque__cap">{def.caption}</span>
        <ArrowUpRight size={12} strokeWidth={1.75} />
      </span>

      {/* ground-level plinth — the character walks here; kept last so it's the row's baseline */}
      <div className="pillar-box" ref={(el) => boxRef(def.id, el)}>
        <motion.span className="pillar-box__pulse" variants={pulseV} transition={spring} />
      </div>
    </motion.button>
  );
}
