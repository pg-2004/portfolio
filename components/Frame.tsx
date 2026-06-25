"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ExhibitDef, SectionId } from "@/lib/content";

const spring: Transition = { type: "spring", stiffness: 240, damping: 24, mass: 0.6 };

// The picture lifts slightly off the wall and casts a deeper shadow on hover.
const picV: Variants = {
  rest: { y: 0, scale: 1, boxShadow: "0 18px 40px -22px rgba(17,17,17,0.5)" },
  hover: { y: -4, scale: 1.035, boxShadow: "0 34px 64px -26px rgba(17,17,17,0.62)" },
};
const spotV: Variants = { rest: { opacity: 0.45 }, hover: { opacity: 0.95 } };
const glowV: Variants = { rest: { opacity: 0 }, hover: { opacity: 0.7 } };
const placardV: Variants = { rest: { y: 0 }, hover: { y: 2 } };

export default function Frame({
  def,
  active,
  onOpen,
}: {
  def: ExhibitDef;
  active: boolean;
  onOpen: (id: SectionId) => void;
}) {
  return (
    <motion.button
      type="button"
      className="frame"
      aria-label={`Open ${def.label} exhibit`}
      onClick={() => onOpen(def.id)}
      initial="rest"
      animate={active ? "hover" : "rest"}
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.99 }}
      transition={spring}
    >
      <motion.span className="frame-spot" variants={spotV} transition={spring} />
      <motion.span className="frame-glow" variants={glowV} transition={spring} />

      <motion.span className="frame-pic" variants={picV} transition={spring}>
        <span className="frame-mat">
          <span className="frame-num">{def.index}</span>
          <span className="frame-title">{def.label}</span>
        </span>
      </motion.span>

      <motion.span className="placard" variants={placardV} transition={spring}>
        <span className="placard__cap">{def.caption}</span>
        <ArrowUpRight size={13} strokeWidth={1.75} />
      </motion.span>
    </motion.button>
  );
}
