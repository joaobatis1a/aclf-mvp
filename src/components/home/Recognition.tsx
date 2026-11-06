"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import PhotoColumns from "@/components/ui/PhotoColumns";
import { awards } from "@/data/content";

const seals = [
  { name: "ISO 9001:2015", note: "Gestão da qualidade" },
  { name: "PBQP-H Nível A", note: "Programa Brasileiro da Qualidade" },
  { name: "NDT-I Caixa", note: "Primeira de Pernambuco" },
  { name: "Casa Azul + Caixa", note: "Sustentabilidade, graus Safira e Topázio" },
];

export default function Recognition() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="reconhecimento" className="relative overflow-hidden bg-forest py-24 text-paper sm:py-36">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 size-[40rem] rounded-full bg-paineira/10 blur-3xl" />

      <div className="container-x relative grid items-end gap-6 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
        <p aria-hidden className="accent select-none text-[clamp(12rem,32vw,30rem)] leading-[0.75] text-paineira">5</p>
        <div className="pb-4 lg:pb-10">
          <p className="mono text-leaf">30º Troféu ADEMI-PE · Reconhecimento</p>
          <h2 id="reconhecimento" className="display mt-5 text-[clamp(2.8rem,6.5vw,6.5rem)]">
            <MaskText text="Troféus numa" />
            <br />
            <MaskText text="única noite" delay={0.1} />
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            Na maior premiação do mercado imobiliário pernambucano, o Mirante do Frio Residence levou o Troféu Master, o principal prêmio da noite. Vieram junto mais quatro.
          </p>
        </div>
        <PhotoColumns
          className="hidden h-[30rem] self-center lg:flex"
          images={[
            { src: "/images/company/award-master.jpg", alt: "" },
            { src: "/images/company/award-esg.png", alt: "" },
            { src: "/images/company/story.jpg", alt: "" },
            { src: "/images/company/award-mcmv.jpg", alt: "" },
            { src: "/images/company/award-coop.png", alt: "" },
            { src: "/images/company/award-incontec.png", alt: "" },
          ]}
        />
      </div>

      {/* Expanding panels: the open one shows the story, the others stay as labelled strips. */}
      <div className="container-x relative mt-16">
        <ul className="flex h-[46rem] flex-col gap-3 lg:h-[34rem] lg:flex-row">
          {awards.map((a, i) => {
            const open = active === i;
            return (
              <li
                key={a.name}
                className={`relative min-h-0 min-w-0 overflow-hidden rounded-[2rem] transition-[flex-grow] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${open ? "grow-[5]" : "grow"}`}
                style={{ flexBasis: 0 }}
                onMouseEnter={() => setActive(i)}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={open}
                  className="absolute inset-0 text-left"
                >
                  <Image src={a.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className={`object-cover transition duration-700 ${open ? "scale-100" : "scale-110 grayscale-[60%]"}`} />
                  <span className={`absolute inset-0 transition duration-700 ${open ? "bg-gradient-to-t from-forest via-forest/30 to-transparent" : "bg-forest/70"}`} />

                  {/* Collapsed label */}
                  <span
                    className={`display-soft absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-xl text-paper/90 transition duration-300 lg:left-1/2 lg:top-auto lg:bottom-8 lg:origin-left lg:-translate-x-0 lg:translate-y-0 lg:-rotate-90 ${open ? "opacity-0" : "opacity-100 delay-300"}`}
                  >
                    {a.name}
                  </span>

                  {/* Open content */}
                  <span className={`absolute inset-x-0 bottom-0 block p-6 transition duration-500 sm:p-8 ${open ? "translate-y-0 opacity-100 delay-300" : "translate-y-6 opacity-0"}`}>
                    <span className="mono block text-paineira">{a.edition}</span>
                    <span className="display mt-2 block text-[clamp(2.2rem,4vw,4rem)]">{a.name}</span>
                    <span className="mt-3 block max-w-md text-paper/80">{a.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="container-x relative mt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3 className="display-soft text-3xl sm:text-4xl">
            Qualidade <span className="accent text-paineira">certificada</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/premiacoes" className="rounded-full bg-paper px-6 py-3 font-semibold text-forest transition hover:bg-paineira">Ver premiações</Link>
            <Link href="/certificacoes" className="rounded-full px-6 py-3 font-semibold ring-1 ring-line-inv transition hover:bg-paper hover:text-forest">O que os selos garantem</Link>
          </div>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-[2rem] bg-line-inv sm:grid-cols-2 lg:grid-cols-4">
          {seals.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.06} className="bg-forest p-7">
              <p className="display text-3xl">{s.name}</p>
              <p className="mono mt-3 text-paper/55">{s.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
