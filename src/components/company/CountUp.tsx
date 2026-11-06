"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts from zero to the target once, the first time it scrolls into view.
 * It renders zero from the start (no final value flashing before the count),
 * keeps every digit the same width so the line never jitters, and exposes the
 * final number to assistive technology.
 */
export default function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const final = `${to.toLocaleString("pt-BR")}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = final;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v).toLocaleString("pt-BR")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, final, reduce]);

  return (
    <span aria-label={final} role="text" className="tabular-nums">
      <span ref={ref} aria-hidden>
        0{suffix}
      </span>
    </span>
  );
}
