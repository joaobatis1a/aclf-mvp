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
 * Phones: the same idea stacked, photo pinned on top and names below (see PhonePinned).
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

        <PhonePinned />

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
 * Phones: the desktop layout stacked. The photo pins to the top of the screen and the names
 * scroll underneath it; the name that crosses the middle of the free space lights up and takes
 * the photo with it. A tap on a name does the same.
 */
function PhonePinned() {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-10 lg:hidden">
      <div className="sticky top-0 z-10 -mx-4 bg-paper px-4 pb-3 pt-3">
        <div className="relative h-[42svh] overflow-hidden rounded-[1.75rem] bg-forest shadow-[0_24px_48px_-28px_rgba(15,29,12,0.55)]">
          <Photo active={active} sizes="100vw" />
          <p className="mono absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-forest">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · imagem ilustrativa
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-full h-10 bg-gradient-to-b from-paper to-transparent" aria-hidden />
      </div>
      <ol className="pb-[22svh] pt-6">
        {items.map((it, i) => (
          <Item key={it.name} index={i} name={it.name} active={active === i} onActive={setActive} line="-60% 0px -36% 0px" />
        ))}
      </ol>
    </div>
  );
}

type ItemProps = {
  name: string;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
  /** The band of the screen where an item counts as current. */
  line?: `${number}% 0px ${number}% 0px`;
};

function Item({ name, index, active, onActive, line = "-45% 0px -45% 0px" }: ItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: line });
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
