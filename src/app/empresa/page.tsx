import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CompanyHero from "@/components/company/CompanyHero";
import CountUp from "@/components/company/CountUp";
import Trajectory from "@/components/home/Trajectory";
import { Reveal } from "@/components/motion/Reveal";
import LinkRows from "@/components/ui/LinkRows";
import { properties } from "@/data/properties";

export const metadata: Metadata = { title: "Nossa história" };

const values = ["Ética e transparência", "Mentalidade de dono", "Foco no cliente", "Crença no empreendedorismo", "Juntos somos mais fortes"];

const cityPhoto: Record<string, string> = {
  Paulista: "/images/properties/mirante-paineiras-01.jpg",
  Recife: "/images/properties/belem-02.jpg",
  Caruaru: "/images/properties/star-concept-01.jpg",
};

export default function EmpresaPage() {
  const cities = ["Paulista", "Recife", "Caruaru", "Fortaleza"].map((c) => ({
    name: c,
    count: properties.filter((p) => p.city === c).length,
    photo: cityPhoto[c],
  }));

  return (
    <>
      <CompanyHero />

      {/* Numbers */}
      <section aria-label="Números" className="px-3 sm:px-5">
        <dl className="grid overflow-hidden rounded-[2.5rem] bg-forest text-paper sm:grid-cols-2 lg:grid-cols-4">
          {[
            { node: <CountUp to={1999} format={false} />, label: "ano em que tudo começou" },
            { node: <CountUp to={18} suffix="+" />, label: "grandes empreendimentos" },
            { node: <CountUp to={8000} />, label: "unidades habitacionais" },
            { node: <CountUp to={800} suffix=" mil m²" />, label: "de área construída" },
          ].map((n, i) => (
            <div key={n.label} className={`px-8 py-12 ${i > 0 ? "border-t border-line-inv sm:border-l sm:border-t-0" : ""} ${i === 2 ? "sm:border-l-0 sm:border-t lg:border-l lg:border-t-0" : ""} ${i === 3 ? "sm:border-t lg:border-t-0" : ""}`}>
              <dd className="display text-[clamp(3rem,5vw,5rem)] text-paineira">{n.node}</dd>
              <dt className="mono mt-3 text-paper/60">{n.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Mission as a quote */}
      <section aria-labelledby="missao" className="container-x py-28 sm:py-36">
        <h2 id="missao" className="mono text-center text-teal-deep">Nossa missão</h2>
        <Reveal>
          <blockquote className="mx-auto mt-8 max-w-5xl text-center">
            <p className="display-soft text-[clamp(1.9rem,4.2vw,4rem)] leading-[1.08] text-forest">
              <span className="accent text-paineira">“</span>Entregar imóveis de qualidade a preços competitivos, <span className="accent text-teal-deep">cuidar das pessoas</span>, inovar e contribuir para o bem-estar das regiões onde atuamos.<span className="accent text-paineira">”</span>
            </p>
          </blockquote>
        </Reveal>
      </section>

      {/* Values belt */}
      <section aria-label="Valores" className="overflow-hidden border-y border-line bg-paper-deep py-6">
        <div className="marquee flex w-max gap-12 whitespace-nowrap" style={{ animationDuration: "30s" }}>
          {[0, 1, 2, 3].map((k) => (
            <span key={k} aria-hidden={k > 0 || undefined} className="flex gap-12">
              {values.map((v) => (
                <span key={v + k} className="display flex items-center gap-12 text-[clamp(2rem,4vw,3.6rem)] text-forest">
                  {v} <span className="accent text-paineira">✺</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* Where */}
      <section aria-labelledby="onde" className="container-x py-24 sm:py-32">
        <p className="mono text-teal-deep">Onde atuamos</p>
        <h2 id="onde" className="display mt-5 text-[clamp(2.8rem,7vw,7rem)] text-forest">
          Quatro cidades, <span className="accent text-teal-deep">um jeito de construir</span>
        </h2>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 0.06}>
              {c.count > 0 ? (
                <Link href={`/empreendimentos?cidade=${c.name}`} className="group relative block aspect-[3/4] overflow-hidden rounded-[2rem] bg-forest text-paper">
                  {c.photo && <Image src={c.photo} alt="" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover opacity-80 transition duration-500 group-hover:opacity-100" />}
                  <span className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
                  <span className="absolute inset-x-6 bottom-6">
                    <span className="display block text-5xl">{c.name}</span>
                    <span className="mono mt-2 flex items-center gap-2 text-paper/75">
                      {c.count} {c.count === 1 ? "empreendimento" : "empreendimentos"} <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              ) : (
                <div className="relative flex aspect-[3/4] flex-col justify-end rounded-[2rem] bg-paper-deep p-6">
                  <span className="display block text-5xl text-forest">{c.name}</span>
                  <span className="mono mt-2 text-ink-soft">Atuação do grupo</span>
                </div>
              )}
            </Reveal>
          ))}
        </ul>
      </section>

      <Trajectory />

      {/* Group */}
      <section aria-labelledby="grupo" className="container-x pb-24 sm:pb-32">
        <p className="mono text-teal-deep">O grupo</p>
        <h2 id="grupo" className="display mt-5 text-[clamp(2.8rem,7vw,7rem)] text-forest">
          Mais do que <span className="accent text-teal-deep">incorporação</span>
        </h2>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <Reveal className="relative min-h-[26rem] overflow-hidden rounded-[2rem] text-paper lg:col-span-2">
            <Image src="/images/properties/shopping-cover.jpeg" alt="Paulista North Way Shopping" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="mono text-paineira">Paulista North Way Shopping</p>
              <p className="display mt-2 text-6xl">55 mil m²</p>
              <p className="mt-2 text-paper/75">de área construída em Paulista.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col justify-between rounded-[2rem] bg-paper-deep p-8">
            <p className="mono text-teal-deep">Fazenda Camarave · RN</p>
            <div>
              <p className="display text-7xl text-forest">600 ha</p>
              <p className="mt-2 text-ink-soft">de carcinicultura no Rio Grande do Norte.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col justify-between rounded-[2rem] bg-paper-deep p-8">
            <p className="mono text-teal-deep">Pessoas</p>
            <div>
              <p className="display text-7xl text-forest">1.000+</p>
              <p className="mt-2 text-ink-soft">colaboradores no grupo.</p>
            </div>
          </Reveal>
          <Reveal delay={0.16} className="flex flex-col justify-between rounded-[2rem] bg-paineira/25 p-8 lg:col-span-2">
            <p className="mono text-forest">Liderança</p>
            <div>
              <p className="display text-7xl text-forest">
                50%<span className="accent">+</span>
              </p>
              <p className="mt-2 max-w-md text-forest/80">das posições de liderança ocupadas por mulheres.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-24">
        <LinkRows
          rows={[
            { title: "Premiações", text: "Cinco troféus no 30º Troféu ADEMI-PE, incluindo o Troféu Master.", href: "/premiacoes", cta: "Ver" },
            { title: "Certificações", text: "ISO 9001, PBQP-H nível A, NDT-I e Selo Casa Azul + Caixa.", href: "/certificacoes", cta: "Entender" },
            { title: "Pode+", text: "A marca para quem está comprando o primeiro imóvel.", href: "/pode-mais", cta: "Conhecer" },
            { title: "Trabalhe conosco", text: "Vagas abertas no grupo.", href: "/trabalhe-conosco", cta: "Ver vagas" },
          ]}
        />
      </section>
    </>
  );
}
