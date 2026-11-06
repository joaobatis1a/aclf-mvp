"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts from zero to the target the first time it scrolls into view. */
export default function CountUp({ to, prefix = "", suffix = "", format = true }: { to: number; prefix?: string; suffix?: string; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const show = (v: number) => {
      const n = Math.round(v);
      el.textContent = `${prefix}${format ? n.toLocaleString("pt-BR") : n}${suffix}`;
    };
    if (reduce) return show(to);
    const controls = animate(0, to, { duration: 1.8, ease: [0.2, 0.8, 0.2, 1], onUpdate: show });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, format, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {format ? to.toLocaleString("pt-BR") : to}
      {suffix}
    </span>
  );
}
