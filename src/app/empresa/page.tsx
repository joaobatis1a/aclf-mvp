import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Trajectory from "@/components/home/Trajectory";
import { Reveal } from "@/components/motion/Reveal";
import PageHeader from "@/components/PageHeader";
import { numbers } from "@/data/content";

export const metadata: Metadata = { title: "Nossa história" };

const values = ["Ética e transparência", "Mentalidade de dono", "Foco no cliente", "Crença no empreendedorismo", "Juntos somos mais fortes"];

const group = [
  { value: "55 mil m²", label: "de área construída no Paulista North Way Shopping" },
  { value: "600 ha", label: "na fazenda Camarave, no Rio Grande do Norte" },
  { value: "1.000+", label: "colaboradores" },
  { value: "50%+", label: "da liderança formada por mulheres" },
];

export default function EmpresaPage() {
  return (
    <>
      <PageHeader eyebrow="Empresa · desde 1999" title="Crescemos junto" accent="com o litoral norte" image="/images/company/story.jpg">
        Atuamos em Paulista, Recife, Caruaru e Fortaleza com o mesmo propósito: imóveis de qualidade a preços competitivos, cuidando das pessoas.
      </PageHeader>

      <section aria-labelledby="missao" className="bg-forest py-24 text-paper sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="mono text-leaf">Missão</p>
            <h2 id="missao" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)]">
              Por que <span className="text-paineira">construímos</span>
            </h2>
          </div>
          <div>
            <Reveal>
              <p className="display-soft text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15]">
                Entregar imóveis de qualidade a preços competitivos, cuidar das pessoas, inovar e contribuir para o desenvolvimento sustentável e o bem-estar das regiões onde atuamos.
              </p>
            </Reveal>
            <p className="mono mt-12 text-leaf">Valores</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {values.map((v) => (
                <li key={v} className="rounded-full border border-line-inv px-5 py-2.5 text-sm">{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="Números" className="container-x py-24">
        <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.label} className="border-b border-line py-8 pr-4 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <dd className="display text-[clamp(2.6rem,5.5vw,5rem)] text-brand">{n.value}</dd>
              <dt className="mono mt-2 text-ink-soft">{n.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <Trajectory />

      <section aria-labelledby="grupo" className="container-x grid gap-14 py-24 sm:py-32 lg:grid-cols-2 lg:items-center">
        <Reveal className="arch relative aspect-[4/5]">
          <Image src="/images/properties/shopping-cover.jpeg" alt="Paulista North Way Shopping" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </Reveal>
        <div>
          <p className="mono text-teal-deep">O grupo</p>
          <h2 id="grupo" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)] text-forest">
            Mais do que <span className="text-teal-deep">incorporação</span>
          </h2>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2">
            {group.map((g) => (
              <div key={g.label} className="bg-paper p-6">
                <dd className="display text-5xl text-brand">{g.value}</dd>
                <dt className="mt-2 text-sm text-ink-soft">{g.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/premiacoes" className="rounded-full bg-forest px-7 py-3.5 font-semibold text-paper hover:bg-brand">Premiações</Link>
            <Link href="/certificacoes" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest hover:bg-forest hover:text-paper">Certificações</Link>
            <Link href="/pode-mais" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest hover:bg-forest hover:text-paper">Pode+</Link>
          </div>
        </div>
      </section>
    </>
  );
}
