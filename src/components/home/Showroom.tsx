"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Reel from "@/components/ui/Reel";
import { useVideo } from "@/components/video/VideoPlayer";
import { phaseDot, phaseLabel, properties, shotsOf, specList, type Phase, type Property } from "@/data/properties";

const PHASES: Phase[] = ["lancamento", "em-construcao", "pronto-para-morar"];
const INTERVAL = 6500;

/**
 * Showroom: the project list on one side, a large stage on the other.
 * The stage advances on its own while visible and stops for good once the visitor picks a project.
 * Phones get the same list in the same type, and the chosen name opens into its own stage (PhoneList).
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

  const pick = (i: number) => {
    setIndex(i);
    setAuto(false);
  };

  const chip = (on: boolean) =>
    `shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${on ? "bg-paper text-forest" : "text-paper/70 ring-1 ring-line-inv hover:text-paper"}`;

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
          <div role="group" aria-label="Filtrar por fase" data-lenis-prevent-horizontal className="-mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:flex-wrap sm:px-0">
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
          className="mt-14 hidden lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Stage */}
          <motion.div
            className="relative order-2 min-h-[72vh] touch-pan-y overflow-hidden rounded-[2rem] bg-forest-2"
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

          {/* List */}
          <ol className="order-1 flex flex-col justify-center">
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

        <PhoneList key={phase} list={list} />
      </div>
    </section>
  );
}

/**
 * Phones: the desktop list, one name per row, and the open row unfolds into the stage right
 * under its name. Opening a row closes the previous one; while both animate, the scroll is held
 * so the name you tapped stays under your finger, then a row tapped low is brought up.
 */
function PhoneList({ list }: { list: Property[] }) {
  const lenis = useLenis();
  const [open, setOpen] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const hold = useRef<{ i: number; top: number } | null>(null);

  const toggle = (i: number) => {
    const el = rows.current[i];
    if (el) hold.current = { i, top: el.getBoundingClientRect().top };
    setOpen((o) => (o === i ? -1 : i));
  };

  useEffect(() => {
    const h = hold.current;
    const el = h && rows.current[h.i];
    hold.current = null;
    if (!h || !el) return;
    const opened = open === h.i;
    let raf = 0;
    let start = -1;
    const tick = (now: number) => {
      if (start < 0) start = now;
      const shift = el.getBoundingClientRect().top - h.top;
      if (Math.abs(shift) > 0.5) {
        if (lenis) lenis.scrollTo(lenis.scroll + shift, { immediate: true, force: true });
        else window.scrollBy(0, shift);
      }
      if (now - start < 700) raf = requestAnimationFrame(tick);
      else if (opened && h.top > window.innerHeight * 0.35) {
        if (lenis) lenis.scrollTo(el, { offset: -16, duration: 0.8 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, lenis]);

  return (
    <div className="mt-10 lg:hidden">
      <ol className="border-t border-line-inv">
        {list.map((p, i) => {
          const on = open === i;
          return (
            <li key={p.slug} ref={(el) => { rows.current[i] = el; }} className="border-b border-line-inv">
              <button type="button" onClick={() => toggle(i)} aria-expanded={on} className="flex w-full items-center gap-3 py-4 text-left">
                <span className={`size-2 shrink-0 rounded-full ${phaseDot[p.phase]}`} aria-hidden />
                <span className={`display-soft min-w-0 flex-1 text-[1.65rem] leading-[1.05] transition duration-300 ${on ? "text-paper" : "text-paper/45"}`}>{p.name}</span>
                <span className="mono shrink-0 text-paper/50">{p.areaLabel}</span>
                <span aria-hidden className={`grid size-8 shrink-0 place-items-center rounded-full ring-1 transition duration-300 ${on ? "rotate-45 bg-paper text-forest ring-paper" : "text-paper/70 ring-line-inv"}`}>
                  <svg viewBox="0 0 16 16" className="size-3.5"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {on && <PhoneStage key={p.slug} p={p} />}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
      <Link href="/empreendimentos" className="mono mt-6 inline-block text-paper/70 underline underline-offset-4">
        Ver todos, inclusive os entregues →
      </Link>
    </div>
  );
}

const unfold = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.5, ease: [0.7, 0, 0.2, 1] as const } },
  open: { height: "auto", opacity: 1, transition: { duration: 0.6, ease: [0.7, 0, 0.2, 1] as const } },
};

function PhoneStage({ p }: { p: Property }) {
  const playVideo = useVideo();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.3 });
  const film = p.videos?.find((v) => v.kind === "filme") ?? p.videos?.[0];

  return (
    <motion.div variants={unfold} initial="closed" animate="open" exit="closed" className="overflow-hidden">
      <div ref={ref} className="pb-5">
        <motion.div
          className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-forest-2"
          initial={{ clipPath: "inset(0 0 100% 0 round 1.75rem)" }}
          animate={{ clipPath: "inset(0 0 0% 0 round 1.75rem)" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          <Reel images={shotsOf(p, 4)} video={p.video} alt={`Imagens do ${p.name}`} sizes="100vw" shot={2300} playing={visible} progress />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="mono flex items-center gap-2 text-paper/80">
              {phaseLabel[p.phase]}
              {p.city && <span>· {p.city}</span>}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {specList(p)
                .filter((s) => s.k !== "Cidade")
                .map((s) => (
                  <span key={s.k} className="rounded-full bg-paper/12 px-3.5 py-1.5 text-sm ring-1 ring-white/15 backdrop-blur-md">
                    {s.v} {s.k === "Área" ? "" : s.k.toLowerCase()}
                  </span>
                ))}
            </div>
          </div>
        </motion.div>
        <div className="mt-3 flex gap-2">
          <Link href={`/imovel/${p.slug}`} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-forest active:bg-paineira">
            Ver o empreendimento <span aria-hidden>→</span>
          </Link>
          {film && (
            <button
              type="button"
              onClick={() => playVideo(film)}
              aria-label={`${film.kind === "filme" ? "Assistir o filme" : "Ver a obra"} do ${p.name}`}
              className="grid size-12 shrink-0 place-items-center rounded-full ring-1 ring-white/40 active:bg-paper active:text-forest"
            >
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
