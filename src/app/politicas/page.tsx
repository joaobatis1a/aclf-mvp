import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Políticas" };

const commitments = [
  "Atender bem os clientes com obras de qualidade e manter parcerias de longo prazo.",
  "Manter relações transparentes com todas as partes interessadas, baseadas em diálogo e confiança.",
  "Agir de forma socialmente e ambientalmente responsável, seguindo as normas aplicáveis.",
  "Cumprir a legislação de segurança para os colaboradores.",
  "Avançar tecnologicamente nos processos.",
  "Melhorar continuamente o sistema de gestão da qualidade.",
  "Garantir rentabilidade adequada e crescimento sustentável.",
];

export default function PoliticasPage() {
  return (
    <>
      <PageHeader eyebrow="Políticas" title="Os compromissos que orientam cada obra." />
      <div className="container-x py-16">
        <section id="qualidade" aria-labelledby="qualidade-titulo" className="scroll-mt-32">
          <h2 id="qualidade-titulo" className="font-display text-3xl font-semibold text-forest">Política de qualidade</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {commitments.map((c, i) => (
              <li key={c} className="flex gap-5 rounded-2xl bg-white p-6">
                <span className="font-display text-3xl font-semibold text-teal">{i + 1}</span>
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ol>
        </section>
        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/politica-de-privacidade" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest hover:bg-forest hover:text-white">Política de privacidade</Link>
          <Link href="/ouvidoria" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest hover:bg-forest hover:text-white">Ouvidoria</Link>
        </div>
      </div>
    </>
  );
}
