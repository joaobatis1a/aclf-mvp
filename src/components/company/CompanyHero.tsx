"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MaskText, Reveal } from "@/components/motion/Reveal";

const photos = [
  { src: "/images/company/story.jpg", alt: "Equipe da empresa com troféus", className: "left-0 top-6 w-[58%] aspect-[4/5] z-10" },
  { src: "/images/properties/mirante-paineiras-01.jpg", alt: "Vista aérea do Paineiras Bairro-Parque", className: "right-0 top-0 w-[48%] aspect-[3/4]" },
  { src: "/images/properties/shopping-cover.jpeg", alt: "Paulista North Way Shopping", className: "right-[6%] bottom-0 w-[46%] aspect-square z-20" },
];

/** Opening: the story in type on the left, a layered collage that drifts apart on scroll. */
export default function CompanyHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ys = [
    useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]),
    useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]),
    useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]),
  ];

  return (
    <section ref={ref} className="overflow-hidden bg-paper pb-20 pt-32 sm:pt-40">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mono text-teal-deep">Empresa · desde 1999</p>
          <h1 className="display mt-6 text-[clamp(3.2rem,8vw,8.5rem)] text-forest">
            <MaskText text="Construindo o" />
            <br />
            <span className="accent text-teal-deep">litoral norte</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              Nascemos em Paulista para requalificar a cidade e o litoral norte de Pernambuco. Hoje somos um grupo com obras em Paulista, Recife, Caruaru e Fortaleza, um shopping e mais de mil pessoas trabalhando juntas.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/empreendimentos" className="rounded-full bg-forest px-7 py-4 font-semibold text-paper transition hover:bg-brand">Ver empreendimentos</Link>
              <Link href="/premiacoes" className="rounded-full px-7 py-4 font-semibold text-forest ring-1 ring-forest transition hover:bg-forest hover:text-paper">Premiações</Link>
            </div>
          </Reveal>
        </div>

        <div className="relative h-[30rem] sm:h-[38rem]">
          {photos.map((p, i) => (
            <motion.div
              key={p.src}
              style={{ y: ys[i] }}
              initial={reduce ? false : { opacity: 0, y: 60 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 * i, ease: [0.2, 0.8, 0.2, 1] }}
              className={`absolute overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(15,29,12,0.5)] ${p.className}`}
            >
              <Image src={p.src} alt={p.alt} fill priority sizes="(min-width: 1024px) 26vw, 55vw" className="object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
