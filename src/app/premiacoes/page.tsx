import type { Metadata } from "next";
import Image from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import PageHeader from "@/components/PageHeader";
import PhotoColumns from "@/components/ui/PhotoColumns";
import { awards } from "@/data/content";

export const metadata: Metadata = { title: "Premiações" };

export default function PremiacoesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Empresa · Premiações"
        title="Cinco troféus"
        accent="numa noite"
        aside={<PhotoColumns className="hidden h-[28rem] justify-self-end lg:flex" images={awards.map((a) => ({ src: a.image, alt: "" })).concat({ src: "/images/company/story.jpg", alt: "" })} />}
      >
        No 30º Troféu ADEMI-PE, a maior premiação do mercado imobiliário de Pernambuco, a empresa saiu com cinco reconhecimentos.
      </PageHeader>
      <section className="container-x space-y-24 pb-24 sm:space-y-32">
        {awards.map((a, i) => (
          <article key={a.name} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <Reveal className={`relative aspect-[4/3] overflow-hidden ${i % 2 ? "arch" : "rounded-[2rem]"}`}>
              <Image src={a.image} alt={a.name} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mono text-teal-deep">{a.edition}</p>
              <h2 className="display mt-4 text-[clamp(2.6rem,5.5vw,5.5rem)] text-forest">{a.name}</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">{a.text}</p>
            </Reveal>
          </article>
        ))}
      </section>
    </>
  );
}
