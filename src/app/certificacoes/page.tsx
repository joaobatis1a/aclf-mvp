import type { Metadata } from "next";
import Image from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Certificações e selos Caixa" };

const benefits = [
  { title: "Qualidade técnica reconhecida", text: "Certificação NDT-I, o nível máximo de desempenho técnico, que avalia da etapa de projeto ao pós-venda. Fomos a primeira empresa de Pernambuco a obtê-la." },
  { title: "Sustentabilidade na prática", text: "Selo Casa Azul + Caixa: paisagismo com flora nativa, estratégias bioclimáticas, coleta seletiva, reúso de água da chuva na irrigação e dispositivos que economizam água e energia." },
  { title: "Obra fiscalizada", text: "O selo Habitar só é concedido depois da obra, se ela seguir o que foi previsto no projeto, com a execução verificada em vistorias." },
  { title: "Gestão certificada", text: "ISO 9001:2015 e PBQP-H SIAC Nível A: processos controlados e entregas alinhadas ao padrão de qualidade esperado." },
  { title: "Conforto e lazer", text: "Áreas de esporte e lazer, elevadores eficientes e wi-fi nas áreas comuns." },
  { title: "Inovação e comunidade", text: "BIM na gestão do empreendimento e inclusão de trabalhadores e fornecedores locais, com ações de integração comunitária." },
];

const grades = [
  { level: "Safira", projects: "Mirante do Frio Residence e Mirante dos Corais" },
  { level: "Topázio", projects: "Vila do Frio Condomínio Clube" },
];

export default function CertificacoesPage() {
  return (
    <>
      <PageHeader eyebrow="Empresa · Certificações" title="O que os selos" accent="garantem a você">
        Um empreendimento certificado passa por avaliações do projeto à entrega. Veja o que isso muda para quem compra.
      </PageHeader>

      <section aria-label="Selos" className="bg-forest py-10">
        <div className="container-x relative aspect-[21/5] min-h-28">
          <Image src="/images/company/seals-caixa.png" alt="Selos e certificações Caixa" fill sizes="86rem" className="object-contain" />
        </div>
      </section>

      <section className="container-x py-24">
        <ul className="grid border-t border-line md:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 2) * 0.08} className="border-b border-line py-10 md:odd:border-r md:odd:pr-10 md:even:pl-10">
              <h2 className="display text-[clamp(2rem,3.4vw,3.2rem)] text-forest">{b.title}</h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="graus" className="container-x pb-24">
        <p className="mono text-teal-deep">Selo Casa Azul</p>
        <h2 id="graus" className="display mt-4 text-[clamp(2.6rem,5.5vw,5.5rem)] text-forest">Graus conquistados</h2>
        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {grades.map((g) => (
            <div key={g.level} className="rounded-[2rem] bg-paper-deep p-8">
              <dt className="display text-6xl text-teal-deep">{g.level}</dt>
              <dd className="mt-3 text-lg text-ink-soft">{g.projects}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
