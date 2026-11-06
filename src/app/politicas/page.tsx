import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import PageHeader from "@/components/PageHeader";
import LinkRows from "@/components/ui/LinkRows";

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
      <PageHeader eyebrow="Políticas" title="Sete" accent="compromissos">
        A política de qualidade que orienta cada obra, do projeto à entrega.
      </PageHeader>
      <section id="qualidade" aria-label="Política de qualidade" className="container-x scroll-mt-32 pb-20">
        <ul className="border-t border-line">
          {commitments.map((c, i) => (
            <Reveal as="li" key={c} delay={i * 0.03} className="grid gap-4 border-b border-line py-8 sm:grid-cols-[6rem_1fr] sm:items-baseline">
              <span className="display text-5xl text-teal-deep" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <p className="display-soft text-[clamp(1.4rem,2.6vw,2.4rem)] leading-tight text-forest">{c}</p>
            </Reveal>
          ))}
        </ul>
      </section>
      <section className="container-x pb-24">
        <LinkRows
          rows={[
            { title: "Privacidade", text: "Como tratamos os seus dados e como exercer os seus direitos.", href: "/politica-de-privacidade", cta: "Ler" },
            { title: "Ouvidoria", text: "Canal confidencial para relatar condutas inadequadas.", href: "/ouvidoria", cta: "Acessar" },
          ]}
        />
      </section>
    </>
  );
}
