"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import Reel from "@/components/ui/Reel";
import { getProperty } from "@/data/properties";

const IMAGE = "/images/properties/mirante-paineiras-01.jpg";
// Plays the launch clip when it is added to /public/videos; the aerial still stands in until then.
const VIDEO = getProperty("mirante-das-paineiras")?.video;
// Until then, a clip cut from the Paineiras renders: aerial, pool, facade, the view from the balcony.
const SHOTS = [
  IMAGE,
  "/images/properties/mirante-paineiras-piscina.jpg",
  "/images/properties/mirante-paineiras-03.jpg",
  "/images/properties/solar-paineiras-01.jpg",
  "/images/properties/solar-paineiras-07.jpg",
];
const rise = { hidden: { y: "105%" }, show: { y: "0%" } };

/**
 * Signature moment: a small arched window ("mirante") opens with the scroll
 * until it becomes the whole screen and reveals the bairro-parque.
 */
export default function HeroWindow() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Window geometry (percent of the viewport) from small arch to full bleed.
  const g = useWindowGeometry();
  const open = useTransform(p, [0, 0.7], [0, 1], { clamp: true });
  const side = useTransform([open, g.x], ([o, v]: number[]) => `${v * (1 - o)}%`);
  const top = useTransform([open, g.t], ([o, v]: number[]) => `${v * (1 - o)}%`);
  const bottom = useTransform([open, g.b], ([o, v]: number[]) => `${v * (1 - o)}%`);
  const radius = useTransform(p, [0, 0.6], [900, 0]);
  const radiusB = useTransform(p, [0.5, 0.7], [20, 0]);
  const clip = useMotionTemplate`inset(${top} ${side} ${bottom} ${side} round ${radius}px ${radius}px ${radiusB}px ${radiusB}px)`;
  const imgScale = useTransform(p, [0, 0.7], [1.35, 1]);

  const lineUpX = useTransform(p, [0, 0.5], ["0%", "-8%"]);
  const lineDownX = useTransform(p, [0, 0.5], ["0%", "8%"]);
  const linesOpacity = useTransform(p, [0, 0.5, 0.6], [1, 1, 0]);
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const shade = useTransform(p, [0.55, 0.85], [0, 1]);
  const captionY = useTransform(p, [0.65, 0.9], [60, 0]);
  const captionOpacity = useTransform(p, [0.65, 0.88], [0, 1]);

  if (reduce) return <StaticHero />;

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative h-[260vh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <h1 id="hero-title" className="display pointer-events-none absolute inset-0 flex flex-col justify-between px-4 pb-[6svh] pt-[13svh] text-forest sm:px-8">
          <motion.span style={{ x: lineUpX, opacity: linesOpacity }} className="block overflow-hidden text-[clamp(3rem,10.5vw,11rem)]">
            <motion.span className="block" variants={rise} initial="hidden" animate="show" transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}>
              Um bairro-parque
            </motion.span>
          </motion.span>
          <motion.span style={{ x: lineDownX, opacity: linesOpacity }} className="block self-end overflow-hidden text-right text-[clamp(3rem,10.5vw,11rem)]">
            <motion.span className="block" variants={rise} initial="hidden" animate="show" transition={{ duration: 1.1, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}>
              <span className="text-teal-deep">inteiro</span> em volta
            </motion.span>
          </motion.span>
        </h1>

        <motion.div style={{ opacity: hintOpacity }} className="mono absolute left-4 top-[calc(13svh+clamp(3rem,10.5vw,11rem))] mt-3 hidden max-w-[14rem] text-ink-soft sm:left-8 sm:block">
          Paulista · Recife · Caruaru
          <br />
          construindo desde 1999
        </motion.div>
        <motion.p style={{ opacity: hintOpacity }} className="mono absolute bottom-[calc(6svh+clamp(3rem,10.5vw,11rem))] right-4 mb-3 text-right text-ink-soft sm:right-8">
          Role para abrir a janela ↓
        </motion.p>

        {/* The window sits above the headline, so opening it covers the words. */}
        <motion.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
            <Reel images={SHOTS} video={VIDEO} alt="Imagens do Paineiras Bairro-Parque" priority sizes="100vw" shot={3200} />
          </motion.div>
          <motion.div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-forest/10" style={{ opacity: shade }} />
        </motion.div>

        <motion.div style={{ y: captionY, opacity: captionOpacity }} className="absolute inset-x-0 bottom-0 text-paper">
          <div className="container-x grid gap-8 pb-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="mono flex items-center gap-2 text-paineira">
                <span className="size-2 rounded-full bg-paineira" aria-hidden /> Lançamento em Paulista
              </p>
              <p className="display mt-4 text-[clamp(2.8rem,8vw,7.5rem)]">Paineiras Bairro-Parque</p>
            </div>
            <div>
              <p className="max-w-md text-lg leading-relaxed text-paper/80">
                O primeiro bairro-parque de Pernambuco: condomínio clube completo, mall integrado e acesso rápido à BR-101.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/imovel/mirante-das-paineiras" className="rounded-full bg-paper px-6 py-3.5 font-semibold text-forest transition hover:bg-paineira">
                  Mirante das Paineiras
                </Link>
                <Link href="/imovel/solar-das-paineiras" className="rounded-full border border-paper/40 px-6 py-3.5 font-semibold transition hover:bg-paper hover:text-forest">
                  Solar das Paineiras
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Starting size of the arched window for the current breakpoint. */
function useWindowGeometry() {
  const x = useMotionValue(18);
  const t = useMotionValue(26);
  const b = useMotionValue(18);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const [nx, nt, nb] = w >= 1024 ? [38, 22, 14] : w >= 640 ? [32, 24, 16] : [18, 26, 18];
      x.set(nx);
      t.set(nt);
      b.set(nb);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [x, t, b]);
  return { x, t, b };
}

function StaticHero() {
  return (
    <section aria-labelledby="hero-title" className="container-x pb-16 pt-28">
      <h1 id="hero-title" className="display text-[clamp(3rem,10vw,10rem)] text-forest">
        Um bairro-parque <span className="text-teal-deep">inteiro</span> em volta
      </h1>
      <div className="arch relative mt-10 aspect-[4/5] sm:aspect-[16/9]">
        <Image src={IMAGE} alt="Vista aérea do lazer do Mirante das Paineiras" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/imovel/mirante-das-paineiras" className="rounded-full bg-forest px-6 py-3.5 font-semibold text-paper">Mirante das Paineiras</Link>
        <Link href="/imovel/solar-das-paineiras" className="rounded-full border border-forest px-6 py-3.5 font-semibold">Solar das Paineiras</Link>
      </div>
    </section>
  );
}
