import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Trabalhe conosco" };

const reasons = [
  { title: "Mais de 1.000 colaboradores", text: "Uma equipe grande, com obras e operações em vários estados." },
  { title: "Liderança diversa", text: "Mais de 50% das posições de liderança são ocupadas por mulheres." },
  { title: "Valores que se vivem", text: "Ética, mentalidade de dono, foco no cliente e a crença de que juntos somos mais fortes." },
];

export default function TrabalheConoscoPage() {
  return (
    <>
      <PageHeader eyebrow="Carreiras" title="Construa a sua carreira com a gente.">
        As vagas abertas ficam em uma plataforma de atração de talentos do grupo.
      </PageHeader>
      <div className="container-x py-16">
        <ul className="grid gap-6 md:grid-cols-3">
          {reasons.map((r) => (
            <li key={r.title} className="rounded-3xl border border-line bg-white p-7">
              <h2 className="font-display text-2xl font-semibold text-forest">{r.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{r.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 rounded-[2rem] bg-brand p-10 text-white">
          <h2 className="font-display text-3xl font-semibold">Veja as vagas abertas</h2>
          <p className="mt-3 max-w-xl text-white/80">O link abre a plataforma de vagas em uma nova aba.</p>
          <a href={site.jobsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-forest hover:bg-paper-deep">
            Ver vagas
          </a>
        </div>
      </div>
    </>
  );
}
