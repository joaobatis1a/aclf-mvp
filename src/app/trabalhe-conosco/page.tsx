import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Trabalhe conosco" };

const reasons = [
  { value: "1.000+", title: "colaboradores", text: "Uma equipe grande, com obras e operações em vários estados." },
  { value: "50%+", title: "da liderança é feminina", text: "Mais da metade das posições de liderança é ocupada por mulheres." },
  { value: "5", title: "valores no dia a dia", text: "Ética, mentalidade de dono, foco no cliente, empreendedorismo e a crença de que juntos somos mais fortes." },
];

export default function TrabalheConoscoPage() {
  return (
    <>
      <PageHeader eyebrow="Carreiras" title="Construa" accent="com a gente" image="/images/company/story.jpg">
        As vagas abertas ficam na plataforma de atração de talentos do grupo.
      </PageHeader>
      <section className="container-x pb-16">
        <dl className="grid border-t border-line md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08} className="border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <dd className="display text-7xl text-brand">{r.value}</dd>
              <dt className="display-soft mt-2 text-2xl text-forest">{r.title}</dt>
              <p className="mt-3 leading-relaxed text-ink-soft">{r.text}</p>
            </Reveal>
          ))}
        </dl>
      </section>
      <section className="container-x pb-24">
        <a
          href={site.jobsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between gap-8 rounded-[2.5rem] bg-forest p-8 text-paper transition hover:bg-brand sm:flex-row sm:items-end sm:p-14"
        >
          <span className="display text-[clamp(2.6rem,6vw,6rem)]">
            Ver vagas <span className="text-paineira">abertas</span>
          </span>
          <span className="mono flex items-center gap-2">
            Abre em nova aba <span aria-hidden className="text-2xl transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </span>
        </a>
      </section>
    </>
  );
}
