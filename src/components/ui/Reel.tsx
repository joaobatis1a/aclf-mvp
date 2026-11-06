"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A short "clip" cut from a project's real renders: each shot drifts like a slow camera move
 * and hands over to the next with a soft cut. When an actual video file exists it plays instead.
 */
export default function Reel({
  images,
  video,
  alt,
  sizes,
  shot = 3800,
  priority = false,
  playing = true,
  progress = false,
}: {
  images: string[];
  video?: string;
  alt: string;
  sizes: string;
  /** Duration of each shot in ms. */
  shot?: number;
  priority?: boolean;
  /** Pause the reel when it is off screen or not the active item. */
  playing?: boolean;
  /** Show the segmented progress bar, like a story. */
  progress?: boolean;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const shots = images.length > 0 ? images : [];
  const run = playing && !reduce && shots.length > 1 && !video;

  useEffect(() => {
    if (!run) return;
    const t = setTimeout(() => setI((n) => (n + 1) % shots.length), shot);
    return () => clearTimeout(t);
  }, [run, i, shot, shots.length]);

  if (video && !reduce) {
    return (
      <video className="absolute inset-0 size-full object-cover" src={video} poster={shots[0]} autoPlay muted loop playsInline aria-label={alt} />
    );
  }

  const current = shots[i % shots.length];

  return (
    <div className="absolute inset-0 overflow-hidden" role="img" aria-label={alt}>
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.14, x: "-1.5%" }}
            animate={{ scale: reduce ? 1 : 1.02, x: "1.5%" }}
            transition={{ duration: (shot + 1100) / 1000, ease: "linear" }}
          >
            <Image src={current} alt="" fill priority={priority && i === 0} sizes={sizes} className="object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {progress && shots.length > 1 && (
        <div className="absolute inset-x-5 top-[var(--reel-top,1.25rem)] z-10 flex gap-1.5 sm:inset-x-8" aria-hidden>
          {shots.map((s, n) => (
            <span key={s} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
              {n < i && <span className="block h-full w-full bg-white" />}
              {n === i && (
                <motion.span
                  key={`${s}-${i}`}
                  className="block h-full origin-left bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: run ? 1 : 0 }}
                  transition={{ duration: shot / 1000, ease: "linear" }}
                />
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

