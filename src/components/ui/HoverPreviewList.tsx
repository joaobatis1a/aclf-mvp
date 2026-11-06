"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";

export type PreviewItem = {
  href: string;
  title: string;
  meta?: string;
  aside?: string;
  image: string;
};

/**
 * Typographic index. On pointer devices the row's photo follows the cursor,
 * so the list stays scannable while still showing each project.
 * On touch screens a small thumbnail is shown inline instead.
 */
export default function HoverPreviewList({
  items,
  tone = "light",
  size = "lg",
}: {
  items: PreviewItem[];
  tone?: "light" | "dark";
  size?: "lg" | "md";
}) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const dark = tone === "dark";
  const border = dark ? "border-line-inv" : "border-line";

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className={`border-t ${border}`}>
        {items.map((it, i) => (
          <li key={it.href} className={`border-b ${border}`}>
            <Link
              href={it.href}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                // Jump straight to the cursor so the preview never flies in from a corner.
                x.jump(e.clientX);
                y.jump(e.clientY);
                sx.jump(e.clientX);
                sy.jump(e.clientY);
                setActive(i);
              }}
              className="group grid grid-cols-[4rem_1fr] items-center gap-4 py-4 sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-6"
            >
              <span className="arch-sm relative block aspect-[3/4] w-16 sm:hidden">
                <Image src={it.image} alt="" fill sizes="4rem" className="object-cover" />
              </span>
              <span className="min-w-0">
                {it.meta && <span className={`mono block ${dark ? "text-leaf" : "text-teal-deep"}`}>{it.meta}</span>}
                <span
                  className={`display-soft mt-1 block transition duration-500 group-hover:translate-x-2 ${
                    size === "lg" ? "text-[clamp(1.6rem,4.2vw,3.6rem)]" : "text-[clamp(1.3rem,2.6vw,2.2rem)]"
                  } ${active !== null && active !== i ? "opacity-35" : ""}`}
                >
                  {it.title}
                </span>
              </span>
              {it.aside && (
                <span className={`mono col-start-2 sm:col-start-auto ${dark ? "text-paper/55" : "text-ink-soft"}`}>
                  {it.aside} <span aria-hidden className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={items[active].image}
              className="arch absolute -left-32 -top-44 h-[22rem] w-64 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Image src={items[active].image} alt="" fill sizes="16rem" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
