"use client";

import { motion, type MotionValue } from "framer-motion";

/**
 * Swap this for the real asset once supplied (transparent PNG/SVG, single
 * facing direction — mirrored via scaleX for the other direction).
 */
const CHARACTER_SRC = "/character-placeholder.svg";

export default function Character({
  x,
  bounceY,
  facing,
}: {
  x: MotionValue<number>;
  bounceY: MotionValue<number>;
  facing: MotionValue<number>;
}) {
  return (
    <motion.div className="character" style={{ x }} aria-hidden="true">
      <div className="character__anchor">
        <motion.img
          src={CHARACTER_SRC}
          alt=""
          className="character__img"
          style={{ y: bounceY, scaleX: facing }}
        />
        <div className="character__shadow" />
      </div>
    </motion.div>
  );
}
