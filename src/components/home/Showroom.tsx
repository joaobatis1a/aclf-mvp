"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Media from "@/components/ui/Media";
import { phaseDot, phaseLabel, properties, specList, type Phase } from "@/data/properties";

const PHASES: Phase[] = ["lancamento", "em-construcao", "pronto-para-morar"];
const INTERVAL = 6500;

/**
 * Showroom: the project list on one side, a large stage on the other.
 * The stage advances on its own while visible and stops for good once the visitor picks a project.
 */
export default function Showroom() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase | "all">("all");
  const list = useMemo(
    () => properties.filter((p) => p.phase !== "portfolio" && (phase === "all" || p.phase === phase)),
    [phase],
  );
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.4 });

  const current = list[Math.min(index, list.length - 1)];
  const running = auto && !paused && visible && !reduce && list.length > 1;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % list.length), INTERVAL);
    return () => clearTimeout(t);
  }, [running, index, list.length]);

  const pick = (i: number) => {
    setIndex(i);
    setAuto(false);
  };

  const chip = (on: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${on ? "bg-paper text-forest" : "text-paper/70 ring-1 ring-line-inv hover:text-paper"}`;

  return (
    <section ref={ref} aria-labelledby="vitrine" className="bg-forest py-24 text-paper sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mono text-leaf">Vitrine · {properties.filter((p) => p.phase !== "portfolio").length} empreendimentos ativos</p>
            <h2 id="vitrine" className="display mt-5 text-[clamp(2.8rem,7vw,7rem)]">
              Escolha sua <span className="accent text-paineira">próxima</span> vista
            </h2>
          </div>
          <div role="group" aria-label="Filtrar por fase" className="flex flex-wrap gap-2">
            <button type="button" className={chip(phase === "all")} aria-pressed={phase === "all"} onClick={() => { setPhase("all"); setIndex(0); }}>
              Todos
            </button>
            {PHASES.map((p) => (
              <button key={p} type="button" className={chip(phase === p)} aria-pressed={phase === p} onClick={() => { setPhase(p); setIndex(0); }}>
                {phaseLabel[p]}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Stage */}
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] bg-forest-2 sm:aspect-[16/11] lg:order-2 lg:aspect-auto lg:min-h-[72vh]">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.2 } }}
                transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
              >
                <Media image={current.hero ?? current.cover} video={current.video} alt={`Imagem do ${current.name}`} sizes="(min-width: 1024px) 60vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                >
                  <p className="mono flex items-center gap-2 text-paper/80">
                    <span className={`size-2 rounded-full ${phaseDot[current.phase]}`} aria-hidden />
                    {phaseLabel[current.phase]}
                    {current.city && <span>· {current.city}</span>}
                  </p>
                  <p className="display mt-3 text-[clamp(2.4rem,5vw,4.8rem)]">{current.name}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {specList(current)
                      .filter((s) => s.k !== "Cidade")
                      .map((s) => (
                        <span key={s.k} className="rounded-full bg-paper/12 px-4 py-2 text-sm backdrop-blur-md ring-1 ring-white/15">
                          {s.v} {s.k === "Área" ? "" : s.k.toLowerCase()}
                        </span>
                      ))}
                    <Link href={`/imovel/${current.slug}`} className="ml-auto inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-forest transition hover:bg-paineira">
                      Conhecer <span aria-hidden>→</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* List */}
          <ol className="order-2 flex flex-col justify-center lg:order-1">
            {list.map((p, i) => {
              const on = p.slug === current.slug;
              return (
                <li key={p.slug} className="border-b border-line-inv first:border-t">
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-pressed={on}
                    className="group relative flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span className={`size-2 shrink-0 rounded-full ${phaseDot[p.phase]}`} aria-hidden />
                    <span className={`display-soft flex-1 text-[clamp(1.4rem,2.2vw,2rem)] transition duration-300 ${on ? "translate-x-1 text-paper" : "text-paper/40 group-hover:text-paper/80"}`}>
                      {p.name}
                    </span>
                    <span className="mono text-paper/50">{p.areaLabel}</span>
                    {on && running && (
                      <motion.span
                        key={`${p.slug}-${index}`}
                        aria-hidden
                        className="absolute -bottom-px left-0 h-px w-full origin-left bg-paineira"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
            <li className="pt-6">
              <Link href="/empreendimentos" className="mono text-paper/70 underline-offset-4 hover:text-paper hover:underline">
                Ver todos os empreendimentos, inclusive os entregues →
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
