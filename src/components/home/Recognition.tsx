import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { awards, certifications } from "@/data/content";

export default function Recognition() {
  return (
    <section aria-labelledby="reconhecimento" className="overflow-hidden bg-paper-deep">
      <div aria-hidden className="border-y border-line bg-forest py-4 text-paper">
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-10">
              {certifications.map((c) => (
                <span key={c + k} className="display-soft flex items-center gap-10 text-2xl">
                  {c} <span className="text-paineira">✺</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="container-x grid gap-14 py-24 sm:py-32 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mono text-teal-deep">Reconhecimento</p>
          <h2 id="reconhecimento" className="display mt-5 text-[clamp(2.8rem,6.5vw,6.5rem)] text-forest">
            5 troféus <span className="text-teal-deep">numa noite</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            No 30º Troféu ADEMI-PE, a maior premiação do mercado imobiliário pernambucano, o Mirante do Frio Residence levou o Troféu Master.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/premiacoes" className="rounded-full bg-forest px-7 py-3.5 font-semibold text-paper transition hover:bg-brand">Ver premiações</Link>
            <Link href="/certificacoes" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest transition hover:bg-forest hover:text-paper">O que os selos garantem</Link>
          </div>
        </div>

        <ul className="space-y-4">
          {awards.map((a, i) => (
            <Reveal as="li" key={a.name} delay={i * 0.05}>
              <article className="group grid grid-cols-[6rem_1fr] items-center gap-5 rounded-3xl bg-paper p-4 transition hover:bg-white sm:grid-cols-[9rem_1fr] sm:gap-7">
                <div className="arch-sm relative aspect-[3/4]">
                  <Image src={a.image} alt="" fill sizes="9rem" className="object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div>
                  <p className="mono text-teal-deep">{a.edition}</p>
                  <h3 className="display-soft mt-1 text-2xl text-forest sm:text-3xl">{a.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
