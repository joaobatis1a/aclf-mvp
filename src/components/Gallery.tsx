"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) => setActive((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <ul className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] md:grid-cols-4">
        {images.map((src, i) => (
          <li key={src} className={i % 7 === 0 ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block size-full overflow-hidden rounded-2xl bg-paper-deep"
              aria-label={`Ampliar imagem ${i + 1} de ${images.length} do ${name}`}
            >
              <Image
                src={src}
                alt={`${name}: imagem ${i + 1}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {active !== null && (
        <div role="dialog" aria-modal="true" aria-label={`Galeria do ${name}`} className="fixed inset-0 z-[100] grid place-items-center bg-forest/95 p-4">
          <button type="button" onClick={close} className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20">
            Fechar
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Imagem anterior" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20">
            ‹
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Próxima imagem" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20">
            ›
          </button>
          <div className="relative h-[80vh] w-full max-w-6xl">
            <Image src={images[active]} alt={`${name}: imagem ${active + 1}`} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="absolute bottom-4 text-sm text-white/70">
            {active + 1} / {images.length} · Imagem ilustrativa
          </p>
        </div>
      )}
    </>
  );
}
