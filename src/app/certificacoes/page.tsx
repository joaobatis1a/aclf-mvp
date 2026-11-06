import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
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

export default function CertificacoesPage() {
  return (
    <>
      <PageHeader eyebrow="Empresa" title="O que os selos da Caixa significam para quem compra.">
        Um empreendimento certificado passa por avaliações do projeto à entrega. Veja o que isso muda na prática.
      </PageHeader>
      <div className="container-x py-16">
        <div className="relative mb-12 aspect-[21/6] overflow-hidden rounded-3xl bg-forest">
          <Image src="/images/company/seals-caixa.png" alt="Selos e certificações Caixa" fill sizes="(min-width: 1024px) 70rem, 100vw" className="object-contain p-4" />
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <li key={b.title} className="rounded-3xl border border-line bg-white p-7">
              <span className="block size-3 rounded-full bg-teal" aria-hidden />
              <h2 className="mt-5 font-display text-2xl font-semibold text-forest">{b.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{b.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 rounded-3xl bg-paper-deep p-7 text-lg leading-relaxed">
          <strong>Graus do selo Casa Azul:</strong> Mirante do Frio Residence e Mirante dos Corais têm o nível Safira. O Vila do Frio Condomínio Clube tem o nível Topázio.
        </p>
      </div>
      <CtaBand />
    </>
  );
}
