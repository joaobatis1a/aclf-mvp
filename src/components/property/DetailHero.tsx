"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import Reel from "@/components/ui/Reel";

type Props = {
  name: string;
  /** Shots for the reel, hero first. */
  images: string[];
  video?: string;
  phase: string;
  phaseDotClass: string;
  where?: string;
  /** Full-bleed only when a high-resolution photo exists; otherwise the photo sits in an arch. */
  fullBleed: boolean;
};

export default function DetailHero(props: Props) {
  return props.fullBleed ? <FullBleed {...props} /> : <Arched {...props} />;
}

function Meta({ name, phase, phaseDotClass, where, light }: Props & { light: boolean }) {
  return (
    <>
      <nav aria-label="Trilha" className={`mono mb-6 ${light ? "text-paper/70" : "text-ink-soft"}`}>
        <Link href="/empreendimentos" className="hover:underline">Empreendimentos</Link> <span aria-hidden>/</span> {name}
      </nav>
      <p className="mono flex flex-wrap items-center gap-2">
        <span className={`size-2 rounded-full ${phaseDotClass}`} aria-hidden />
        {phase}
        {where && <span className={light ? "text-paper/70" : "text-ink-soft"}>· {where}</span>}
      </p>
    </>
  );
}

function FullBleed(props: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "60%"]);

  return (
    <section ref={ref} data-nav="dark" className="relative h-[92svh] min-h-[34rem] overflow-hidden bg-forest text-paper">
      <motion.div className="absolute inset-0 [--reel-top:6.5rem]" style={{ y, scale }}>
        <Reel images={props.images} video={props.video} alt={`Imagens do ${props.name}`} priority sizes="100vw" progress />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/35 to-forest/10" />
      {/* Keeps the light navigation legible over bright skies. */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-forest/70 to-transparent" />
      <motion.div style={{ y: textY }} className="container-x relative flex h-full flex-col justify-end pb-12">
        <Meta {...props} light />
        <h1 className="display mt-4 max-w-6xl text-[clamp(3.2rem,11vw,11rem)]">
          <MaskText text={props.name} />
        </h1>
      </motion.div>
    </section>
  );
}

function Arched(props: Props) {
  return (
    <section className="bg-paper pb-16 pt-32 sm:pt-40">
      <div className="container-x grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Meta {...props} light={false} />
          <h1 className="display mt-5 text-[clamp(3.2rem,9vw,9rem)] text-forest">
            <MaskText text={props.name} />
          </h1>
        </div>
        <Reveal className="arch relative aspect-[3/4] w-full max-w-md justify-self-end">
          <Reel images={props.images} video={props.video} alt={`Imagens do ${props.name}`} priority sizes="(min-width: 1024px) 28rem, 90vw" />
        </Reveal>
      </div>
    </section>
  );
}
