"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";

// Alternating widths give the rail a rhythm instead of a uniform strip.
const widths = ["w-[78vw] sm:w-[46vw]", "w-[62vw] sm:w-[30vw]", "w-[70vw] sm:w-[38vw]"];

/** Horizontal photo rail with arrow controls and a fullscreen viewer. */
export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState<number | null>(null);
  const rail = useRef<HTMLUListElement>(null);
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

  const scrollRail = (d: number) => rail.current?.scrollBy({ left: d * rail.current.clientWidth * 0.6, behavior: "smooth" });

  return (
    <>
      <div className="container-x mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scrollRail(-1)} aria-label="Fotos anteriores" className="grid size-12 place-items-center rounded-full ring-1 ring-line transition hover:bg-forest hover:text-paper">←</button>
        <button type="button" onClick={() => scrollRail(1)} aria-label="Próximas fotos" className="grid size-12 place-items-center rounded-full ring-1 ring-line transition hover:bg-forest hover:text-paper">→</button>
      </div>
      <ul
        ref={rail}
        data-lenis-prevent-horizontal
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none]"
        style={{ paddingInline: "max(1rem, calc((100vw - 86rem) / 2))", scrollPaddingInline: "max(1rem, calc((100vw - 86rem) / 2))" }}
      >
        {images.map((src, i) => (
          <li key={src} className={`shrink-0 snap-start ${widths[i % widths.length]}`}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`group relative block h-[56svh] w-full overflow-hidden bg-paper-deep ${i % 3 === 1 ? "arch" : "rounded-[1.5rem]"}`}
              aria-label={`Ampliar foto ${i + 1} de ${images.length} do ${name}`}
            >
              <Image src={src} alt={`${name}: foto ${i + 1}`} fill sizes="(min-width: 640px) 46vw, 78vw" className="object-cover" />
              <span className="mono absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-forest opacity-0 transition group-hover:opacity-100">Ampliar</span>
            </button>
          </li>
        ))}
      </ul>

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
