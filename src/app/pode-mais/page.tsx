import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Pode+" };

export default function PodeMaisPage() {
  return (
    <>
      <PageHeader eyebrow="Empresa" title="Pode+: morar bem também é para quem está começando.">
        Marca da empresa para tornar a moradia mais acessível e transformar sonhos em conquistas reais.
      </PageHeader>
      <div className="container-x grid gap-10 py-16 lg:grid-cols-2">
        <section className="rounded-[2rem] bg-white p-8 sm:p-10">
          <p className="eyebrow">Para quem</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-forest">Quem quer sair do aluguel</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Pessoas que estão conquistando independência, comprando o primeiro imóvel ou começando uma nova fase da vida, com projetos pensados em localização, funcionalidade dos espaços e qualidade de vida.
          </p>
        </section>
        <section className="rounded-[2rem] bg-forest p-8 text-white sm:p-10">
          <p className="eyebrow !text-leaf">Primeiro empreendimento</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Parque dos Coqueiros</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Condomínio clube com lazer completo e apartamentos de 2 quartos, perto da praia de Maria Farinha. Voltado especialmente a clientes das faixas 1 e 2 dos programas federais de moradia.
          </p>
          <Link href="/contato" className="mt-8 inline-block rounded-full bg-teal px-7 py-3.5 font-semibold transition hover:bg-teal-deep">Falar com um consultor</Link>
        </section>
      </div>
      <CtaBand />
    </>
  );
}
