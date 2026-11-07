"use client";

import Image from "@/components/ui/Img";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Real renders of the Mirante das Paineiras leisure areas.
const items = [
  { name: "Piscina", img: "/images/properties/mirante-paineiras-piscina.jpg" },
  { name: "Quadra", img: "/images/properties/mirante-paineiras-04.jpg" },
  { name: "Churrasqueira e convivência", img: "/images/properties/mirante-paineiras-05.jpg" },
  { name: "Pet place", img: "/images/properties/mirante-paineiras-06.jpg" },
  { name: "Academia", img: "/images/properties/mirante-paineiras-07.jpg" },
  { name: "Salão de festas", img: "/images/properties/mirante-paineiras-08.jpg" },
  { name: "Terraço gourmet", img: "/images/properties/mirante-paineiras-09.jpg" },
];

function Photo({ active, sizes }: { active: number; sizes: string }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={items[active].img}
        className="absolute inset-0"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.2 } }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
      >
        <Image src={items[active].img} alt={`${items[active].name} do Mirante das Paineiras`} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Desktop: the photo stays pinned beside the list and changes as each item reaches the middle.
 * Phones: a self-contained stage with a strip of names (see PhoneStory).
 */
export default function AmenitiesScroll() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="lazer" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <p className="mono text-teal-deep">Condomínio clube · Mirante das Paineiras</p>
        <h2 id="lazer" className="display mt-5 max-w-5xl text-[clamp(2.8rem,7.5vw,7.5rem)] text-forest">
          O fim de semana <span className="accent text-teal-deep">começa no térreo</span>
        </h2>

        <PhoneStory />

        <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-2">
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            <div className="relative h-full overflow-hidden rounded-[2rem]">
              <Photo active={active} sizes="45vw" />
              <p className="mono absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-paper/90 px-4 py-2 text-forest">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · imagem ilustrativa
              </p>
            </div>
          </div>
          <ol className="py-[30vh]">
            {items.map((it, i) => (
              <Item key={it.name} index={i} name={it.name} active={active === i} onActive={setActive} />
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 lg:mt-12">
          <Link href="/imovel/mirante-das-paineiras" className="rounded-full bg-forest px-7 py-3.5 font-semibold text-paper transition hover:bg-brand">
            Ver o Mirante das Paineiras
          </Link>
          <Link href="/imovel/solar-das-paineiras" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest transition hover:bg-forest hover:text-paper">
            Ver o Solar das Paineiras
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Phones: the same pattern as the showroom. One large photo with the item's name on it, and a
 * strip of names right underneath. It advances by itself while on screen, a tap on a name or a
 * swipe on the photo takes over. Nothing is tied to the scroll, so it is always fully in view.
 */
function PhoneStory() {
  const box = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLUListElement>(null);
  const visible = useInView(box, { amount: 0.5 });
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const running = auto && visible;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % items.length), 3600);
    return () => clearTimeout(t);
  }, [running, active]);

  useEffect(() => {
    const el = strip.current?.querySelector<HTMLElement>("[data-on]");
    const bar = strip.current;
    if (!el || !bar) return;
    bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const go = (i: number) => {
    setActive((i + items.length) % items.length);
    setAuto(false);
  };

  return (
    <div ref={box} className="mt-10 min-w-0 lg:hidden">
      <motion.div
        className="relative h-[62svh] touch-pan-y overflow-hidden rounded-[2rem] bg-forest shadow-[0_24px_48px_-28px_rgba(15,29,12,0.55)]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) < 50) return;
          go(active + (info.offset.x < 0 ? 1 : -1));
        }}
      >
        <Photo active={active} sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-transparent" />
        <div className="absolute inset-x-4 top-4 flex gap-1.5" aria-hidden>
          {items.map((it, i) => (
            <span key={it.name} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
              {i < active && <span className="block h-full w-full bg-white" />}
              {i === active && (
                <motion.span
                  key={`${i}-${running}`}
                  className="block h-full origin-left bg-white"
                  initial={{ scaleX: running ? 0 : 1 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: running ? 3.6 : 0, ease: "linear" }}
                />
              )}
            </span>
          ))}
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-paper" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={items[active].name}
              className="display text-[clamp(2.4rem,11vw,3.4rem)] leading-[0.9]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {items[active].name}
            </motion.p>
          </AnimatePresence>
          <span className="mono shrink-0 pb-1 text-paper/80">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      <ul ref={strip} data-lenis-prevent-horizontal className="-mx-4 mt-3 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {items.map((it, i) => (
          <li key={it.name} className="shrink-0 snap-start">
            <button
              type="button"
              data-on={i === active || undefined}
              aria-pressed={i === active}
              onClick={() => go(i)}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${i === active ? "bg-forest text-paper" : "text-forest ring-1 ring-line"}`}
            >
              {it.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Item({ name, index, active, onActive }: { name: string; index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="border-b border-line">
      <button
        type="button"
        onClick={() => onActive(index)}
        className={`display w-full py-5 text-left text-[clamp(2rem,4.6vw,4.4rem)] transition duration-500 ${active ? "text-forest" : "text-forest/20 hover:text-forest/50"}`}
        aria-pressed={active}
      >
        {name}
      </button>
    </li>
  );
}
