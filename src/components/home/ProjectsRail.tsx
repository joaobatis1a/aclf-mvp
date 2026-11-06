"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { phaseLabel, properties, type Property } from "@/data/properties";

const active = properties.filter((p) => p.phase !== "portfolio");

const dot: Record<Property["phase"], string> = {
  lancamento: "bg-paineira",
  "em-construcao": "bg-teal",
  "pronto-para-morar": "bg-leaf",
  portfolio: "bg-paper",
};

function specs(p: Property) {
  return [
    { k: "Área", v: p.areaLabel },
    { k: "Quartos", v: p.slug === "solar-das-paineiras" ? "2 ou 3" : p.bedrooms?.toString() },
    { k: "Suíte", v: p.suites?.toString() },
    { k: "Cidade", v: p.city },
  ].filter((s) => s.v);
}

/**
 * The active projects travel horizontally while the page scrolls vertically.
 * On small screens it becomes a native swipeable rail.
 */
export default function ProjectsRail() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section aria-label="Empreendimentos ativos" className="bg-forest text-paper">
      {/* Desktop: pinned horizontal travel */}
      <div ref={section} className="relative hidden lg:block" style={{ height: `${active.length * 70 + 60}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div ref={track} style={{ x: smoothX }} className="flex w-max items-stretch gap-10 pl-[6vw] pr-[6vw]">
            <Intro />
            {active.map((p) => (
              <Panel key={p.slug} p={p} />
            ))}
          </motion.div>
          <div className="container-x mt-10 flex items-center gap-6">
            <span className="mono text-paper/50">Role</span>
            <div className="h-px flex-1 bg-line-inv">
              <motion.div className="h-px origin-left bg-paineira" style={{ scaleX: bar }} />
            </div>
            <Link href="/empreendimentos" className="mono text-paper/70 hover:text-paper">Ver todos →</Link>
          </div>
        </div>
      </div>

      {/* Mobile and tablet: swipe */}
      <div className="py-20 lg:hidden">
        <div className="container-x">
          <Intro />
        </div>
        <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-8" data-lenis-prevent-horizontal>
          {active.map((p) => (
            <li key={p.slug} className="w-[82vw] shrink-0 snap-center sm:w-[60vw]">
              <Link href={`/imovel/${p.slug}`} className="block">
                <div className="arch relative aspect-[4/5]">
                  <Image src={p.cover} alt={p.name} fill sizes="82vw" className="object-cover" />
                </div>
                <p className="mono mt-4 flex items-center gap-2 text-paper/70">
                  <span className={`size-2 rounded-full ${dot[p.phase]}`} aria-hidden /> {phaseLabel[p.phase]}
                </p>
                <p className="display mt-2 text-4xl">{p.name}</p>
                <p className="mono mt-2 text-paper/60">{specs(p).map((s) => s.v).join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center lg:w-[30vw]">
      <p className="mono text-leaf">Empreendimentos ativos · {active.length}</p>
      <h2 className="display mt-5 text-[clamp(3rem,6vw,6.5rem)]">
        Escolha a sua <span className="text-paineira">próxima vista</span>
      </h2>
      <ul className="mt-8 space-y-2 text-sm text-paper/70">
        {(["lancamento", "em-construcao", "pronto-para-morar"] as const).map((ph) => (
          <li key={ph}>
            <Link href={`/empreendimentos/${ph}`} className="flex items-center gap-3 hover:text-paper">
              <span className={`size-2 rounded-full ${dot[ph]}`} aria-hidden />
              {phaseLabel[ph]} · {active.filter((p) => p.phase === ph).length}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Panel({ p }: { p: Property }) {
  return (
    <article className="group grid h-[72vh] w-[64vw] max-w-[62rem] shrink-0 grid-cols-[1.15fr_1fr] gap-8">
      <Link href={`/imovel/${p.slug}`} className="arch relative block h-full" aria-label={`Ver ${p.name}`}>
        <Image src={p.cover} alt="" fill sizes="36vw" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105" />
      </Link>
      <div className="flex flex-col justify-end border-t border-line-inv pb-2 pt-6">
        <p className="mono flex items-center gap-2 text-paper/70">
          <span className={`size-2 rounded-full ${dot[p.phase]}`} aria-hidden /> {phaseLabel[p.phase]}
        </p>
        <h3 className="display mt-4 text-[clamp(2.6rem,4.6vw,5rem)]">{p.name}</h3>
        <p className="mt-4 max-w-sm leading-relaxed text-paper/70">{p.summary}</p>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line-inv">
          {specs(p).map((s) => (
            <div key={s.k} className="bg-forest p-4">
              <dt className="mono text-paper/50">{s.k}</dt>
              <dd className="display-soft mt-1 text-2xl">{s.v}</dd>
            </div>
          ))}
        </dl>
        <Link href={`/imovel/${p.slug}`} className="mt-8 inline-flex items-center gap-3 self-start rounded-full bg-paper px-6 py-3 font-semibold text-forest transition hover:bg-paineira">
          Ver empreendimento <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
