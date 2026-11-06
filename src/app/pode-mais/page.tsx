import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Pode+" };

export default function PodeMaisPage() {
  return (
    <>
      <PageHeader eyebrow="Empresa · Pode+" title="Morar bem" accent="desde o começo">
        A Pode+ é a marca da empresa para tornar a moradia mais acessível e transformar sonhos em conquistas reais.
      </PageHeader>
      <section className="container-x grid gap-4 pb-24 lg:grid-cols-2">
        <Reveal className="rounded-[2.5rem] bg-paper-deep p-8 sm:p-12">
          <p className="mono text-teal-deep">Para quem</p>
          <h2 className="display mt-5 text-[clamp(2.4rem,4.5vw,4.5rem)] text-forest">Quem quer sair do aluguel</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Pessoas que estão conquistando independência, comprando o primeiro imóvel ou começando uma nova fase da vida, com projetos pensados em localização, funcionalidade dos espaços e qualidade de vida.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[2.5rem] bg-forest p-8 text-paper sm:p-12">
          <p className="mono text-leaf">Primeiro empreendimento</p>
          <h2 className="display mt-5 text-[clamp(2.4rem,4.5vw,4.5rem)]">
            Parque dos <span className="text-paineira">Coqueiros</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/75">
            Condomínio clube com lazer completo e apartamentos de 2 quartos, perto da praia de Maria Farinha. Voltado especialmente a clientes das faixas 1 e 2 dos programas federais de moradia.
          </p>
          <Link href="/contato" className="mt-10 inline-flex rounded-full bg-paper px-7 py-3.5 font-semibold text-forest transition hover:bg-paineira">
            Falar com um consultor
          </Link>
        </Reveal>
      </section>
    </>
  );
}
