import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Numbers from "@/components/Numbers";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Nossa história" };

const timeline = [
  { year: "1999", text: "Fundação, para conduzir a requalificação urbana de Paulista e do litoral norte de Pernambuco." },
  { year: "Grupo", text: "A empresa passa a integrar um grupo que inclui a fazenda de camarão Camarave e o Paulista North Way Shopping." },
  { year: "Pioneira", text: "Primeira empresa do estado a conquistar a certificação NDT 1, além de ISO 9001:2015, PBQP-H nível A e Selo Casa Azul + Caixa." },
  { year: "30º ADEMI-PE", text: "Troféu Master pelo Mirante do Frio Residence e mais quatro prêmios: Residencial MCMV, Cooperada do Ano, Incontec e ESG." },
  { year: "2026", text: "Lançamento do Paineiras Bairro-Parque, o primeiro bairro-parque de Pernambuco." },
];

const values = ["Ética e transparência", "Mentalidade de dono", "Foco no cliente", "Crença no empreendedorismo", "Juntos somos mais fortes"];

const group = [
  { value: "55 mil m²", label: "de área construída no Paulista North Way Shopping" },
  { value: "600 ha", label: "na fazenda Camarave, no Rio Grande do Norte" },
  { value: "1.000+", label: "colaboradores" },
  { value: "50%+", label: "das posições de liderança ocupadas por mulheres" },
];

export default function EmpresaPage() {
  return (
    <>
      <PageHeader eyebrow="Empresa" title="Uma construtora que cresceu junto com o litoral norte.">
        Atuamos em Paulista, Recife, Caruaru e Fortaleza, sempre com o mesmo propósito: entregar imóveis de qualidade a preços competitivos e cuidar das pessoas.
      </PageHeader>

      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
          <Image src="/images/company/story.jpg" alt="Equipe da empresa reunida" fill sizes="(min-width: 1024px) 38rem, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow">Missão</p>
          <p className="mt-3 font-display text-3xl font-semibold leading-snug text-forest sm:text-4xl">
            Entregar imóveis de qualidade a preços competitivos, cuidar das pessoas, inovar e contribuir para o desenvolvimento sustentável e o bem-estar das regiões onde atuamos.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {values.map((v) => (
              <li key={v} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium">{v}</li>
            ))}
          </ul>
        </div>
      </section>

      <Numbers />

      <section className="bg-forest py-20 text-white" aria-labelledby="linha-do-tempo">
        <div className="container-x">
          <p className="eyebrow !text-leaf">Trajetória</p>
          <h2 id="linha-do-tempo" className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Marcos que construíram a marca</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/15 md:grid-cols-5">
            {timeline.map((t) => (
              <li key={t.year} className="bg-forest p-6">
                <p className="font-display text-2xl font-semibold text-teal">{t.year}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20" aria-labelledby="grupo">
        <p className="eyebrow">O grupo</p>
        <h2 id="grupo" className="mt-2 font-display text-4xl font-semibold tracking-tight text-forest sm:text-5xl">Mais do que incorporação.</h2>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {group.map((g) => (
            <div key={g.label} className="rounded-3xl border border-line bg-white p-6">
              <dd className="font-display text-4xl font-semibold text-brand">{g.value}</dd>
              <dt className="mt-2 text-sm text-ink-soft">{g.label}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/premiacoes" className="rounded-full bg-forest px-7 py-3.5 font-semibold text-white hover:bg-brand">Ver premiações</Link>
          <Link href="/certificacoes" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest hover:bg-forest hover:text-white">Certificações</Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
