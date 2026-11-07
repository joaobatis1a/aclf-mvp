"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Reel from "@/components/ui/Reel";
import { useVideo } from "@/components/video/VideoPlayer";
import { phaseDot, phaseLabel, properties, shotsOf, specList, type Phase } from "@/data/properties";

const PHASES: Phase[] = ["lancamento", "em-construcao", "pronto-para-morar"];
const INTERVAL = 6500;

/**
 * Showroom: the project list on one side, a large stage on the other.
 * The stage advances on its own while visible and stops for good once the visitor picks a project.
 */
export default function Showroom() {
  const reduce = useReducedMotion();
  const playVideo = useVideo();
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

  const strip = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = strip.current?.querySelector<HTMLElement>("[data-on]");
    const box = strip.current;
    if (!el || !box) return;
    box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [index, phase]);

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
          className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Stage */}
          <motion.div
            className="relative order-1 h-[58svh] touch-pan-y overflow-hidden rounded-[2rem] bg-forest-2 sm:h-auto sm:aspect-[16/11] lg:order-2 lg:aspect-auto lg:min-h-[72vh]"
            // Swipe sideways on the stage to move between projects, like a story.
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) < 50) return;
              pick((index + (info.offset.x < 0 ? 1 : -1) + list.length) % list.length);
            }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.2 } }}
                transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
              >
                <Reel images={shotsOf(current, 4)} video={current.video} alt={`Imagens do ${current.name}`} sizes="(min-width: 1024px) 60vw, 100vw" shot={2300} playing={visible} />
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
                    {current.videos?.[0] && (
                      <button
                        type="button"
                        onClick={() => playVideo(current.videos!.find((v) => v.kind === "filme") ?? current.videos![0])}
                        className="ml-auto inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ring-1 ring-white/40 backdrop-blur transition hover:bg-paper hover:text-forest"
                      >
                        <svg viewBox="0 0 24 24" className="size-4" aria-hidden><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
                        {current.videos.some((v) => v.kind === "filme") ? "Assistir filme" : "Ver a obra"}
                      </button>
                    )}
                    <Link href={`/imovel/${current.slug}`} className={`${current.videos?.[0] ? "" : "ml-auto "}inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-forest transition hover:bg-paineira`}>
                      Conhecer <span aria-hidden>→</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Phones: the names sit right under the stage, so picking one never scrolls it away. */}
          <div className="order-2 min-w-0 lg:hidden">
            <ul ref={strip} className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]" data-lenis-prevent-horizontal>
              {list.map((p, i) => {
                const on = p.slug === current.slug;
                return (
                  <li key={p.slug} className="shrink-0 snap-start">
                    <button
                      type="button"
                      data-on={on || undefined}
                      onClick={() => pick(i)}
                      aria-pressed={on}
                      className={`relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2.5 text-sm font-medium transition ${on ? "bg-paper text-forest" : "text-paper/70 ring-1 ring-line-inv"}`}
                    >
                      <span className={`size-1.5 rounded-full ${phaseDot[p.phase]}`} aria-hidden />
                      {p.name}
                      {on && running && (
                        <motion.span
                          key={`${p.slug}-${index}-m`}
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-paineira"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mono mt-3 text-center text-paper/45" aria-hidden>
              toque num nome ou deslize a foto
            </p>
          </div>

          {/* List */}
          <ol className="order-3 hidden flex-col justify-center lg:order-1 lg:flex">
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
