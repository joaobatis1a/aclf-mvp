"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useState } from "react";

// Alternating widths give each belt a rhythm instead of a uniform strip.
const widths = ["w-[19rem] sm:w-[30rem]", "w-[15rem] sm:w-[22rem]", "w-[17rem] sm:w-[26rem]"];

/**
 * Photos drift past in two belts running in opposite directions.
 * Hovering or focusing a belt pauses it; any photo opens the fullscreen viewer.
 */
export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState<number | null>(null);
  const lenis = useLenis();

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) => setActive((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [active, close, step, lenis]);

  const half = Math.ceil(images.length / 2);
  const rows = images.length > 5 ? [images.slice(0, half), images.slice(half)] : [images];

  return (
    <>
      <div className="space-y-4">
        {rows.map((row, r) => (
          <div key={r} className="group/belt overflow-hidden">
            <ul
              className={`marquee flex w-max gap-4 group-hover/belt:[animation-play-state:paused] group-focus-within/belt:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:px-4 ${r === 1 ? "[animation-direction:reverse]" : ""}`}
              style={{ animationDuration: `${Math.max(row.length, 3) * 8}s` }}
            >
              {[row, row].flatMap((set, c) =>
                set.map((src, i) => {
                  const index = images.indexOf(src);
                  return (
                    <li key={`${c}-${src}`} aria-hidden={c > 0 || undefined} className={`shrink-0 ${widths[(i + r) % widths.length]}`}>
                      <button
                        type="button"
                        tabIndex={c > 0 ? -1 : undefined}
                        onClick={() => setActive(index)}
                        className="group relative block h-56 w-full overflow-hidden rounded-[1.5rem] bg-paper-deep sm:h-72"
                        aria-label={`Ampliar foto ${index + 1} de ${images.length} do ${name}`}
                      >
                        <Image src={src} alt={c > 0 ? "" : `${name}: foto ${index + 1}`} fill sizes="(min-width: 640px) 30rem, 19rem" className="object-cover" />
                        <span className="absolute inset-0 bg-forest/0 transition duration-300 group-hover:bg-forest/20" />
                        <span className="mono absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-forest opacity-0 transition group-hover:opacity-100">Ampliar</span>
                      </button>
                    </li>
                  );
                }),
              )}
            </ul>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Fotos do ${name}`}
            className="fixed inset-0 z-[100] grid place-items-center bg-forest/95 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" onClick={close} autoFocus className="absolute right-4 top-4 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-forest">
              Fechar
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Foto anterior" className="absolute left-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-2xl text-paper hover:bg-paper/20">←</button>
            <button type="button" onClick={() => step(1)} aria-label="Próxima foto" className="absolute right-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-2xl text-paper hover:bg-paper/20">→</button>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative h-[80svh] w-full max-w-6xl"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image src={images[active]} alt={`${name}: foto ${active + 1}`} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <p className="mono absolute bottom-5 text-paper/70">
              {active + 1} / {images.length} · imagem ilustrativa
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
