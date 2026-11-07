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

/** The photo stays pinned and changes as each leisure item reaches the middle of the screen. */
export default function AmenitiesScroll() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="lazer" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <p className="mono text-teal-deep">Condomínio clube · Mirante das Paineiras</p>
        <h2 id="lazer" className="display mt-5 max-w-5xl text-[clamp(2.8rem,7.5vw,7.5rem)] text-forest">
          O fim de semana <span className="accent text-teal-deep">começa no térreo</span>
        </h2>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* Pinned on every screen size: on phones it sits on top while the list scrolls underneath. */}
          <div className="sticky top-20 z-10 h-[44svh] lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="relative h-full overflow-hidden rounded-[2rem] shadow-[0_20px_40px_-25px_rgba(15,29,12,0.5)] lg:shadow-none">
              <AnimatePresence initial={false}>
                <motion.div
                  key={items[active].img}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.2 } }}
                  transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
                >
                  <Image src={items[active].img} alt={`${items[active].name} do Mirante das Paineiras`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <p className="mono absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-paper/90 px-4 py-2 text-forest">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · imagem ilustrativa
              </p>
            </div>
          </div>

          <div>
            <ol className="pb-[24svh] pt-2 lg:py-[30vh]">
              {items.map((it, i) => (
                <Item key={it.name} index={i} name={it.name} active={active === i} onActive={setActive} />
              ))}
            </ol>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/imovel/mirante-das-paineiras" className="rounded-full bg-forest px-7 py-3.5 font-semibold text-paper transition hover:bg-brand">
                Ver o Mirante das Paineiras
              </Link>
              <Link href="/imovel/solar-das-paineiras" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest transition hover:bg-forest hover:text-paper">
                Ver o Solar das Paineiras
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ name, index, active, onActive }: { name: string; index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-62% 0px -34% 0px" });
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
