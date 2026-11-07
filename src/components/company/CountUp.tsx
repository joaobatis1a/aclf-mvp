"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts from zero to the target once, the first time it scrolls into view.
 * The number is a motion value rendered by motion itself, so React never fights
 * over the text node. It starts at zero (no final value flashing first) and the
 * final figure is always available to screen readers.
 */
export default function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${Math.round(v).toLocaleString("pt-BR")}${suffix}`);
  const final = `${to.toLocaleString("pt-BR")}${suffix}`;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration: 1.6, ease: [0.2, 0.8, 0.2, 1] });
    return () => controls.stop();
  }, [inView, reduce, to, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{final}</span>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
}
