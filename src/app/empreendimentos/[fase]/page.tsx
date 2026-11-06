import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PropertyExplorer from "@/components/PropertyExplorer";
import { phaseLabel, phaseOrder, type Phase } from "@/data/properties";

const intro: Record<Phase, string> = {
  lancamento: "Os projetos que acabaram de chegar ao mercado.",
  "em-construcao": "Obras em andamento, já com unidades à venda.",
  "pronto-para-morar": "Chave na mão: mude-se sem esperar a obra.",
  portfolio: "Tudo o que já construímos e entregamos.",
};

export function generateStaticParams() {
  return phaseOrder.map((fase) => ({ fase }));
}

export async function generateMetadata({ params }: PageProps<"/empreendimentos/[fase]">): Promise<Metadata> {
  const { fase } = await params;
  return { title: phaseLabel[fase as Phase] ?? "Empreendimentos" };
}

export default async function FasePage({ params }: PageProps<"/empreendimentos/[fase]">) {
  const { fase } = await params;
  if (!phaseOrder.includes(fase as Phase)) notFound();
  const phase = fase as Phase;
  return (
    <>
      <PageHeader eyebrow="Empreendimentos" title={phaseLabel[phase] === "Entregue" ? "Portfólio" : phaseLabel[phase]}>
        {intro[phase]}
      </PageHeader>
      <div className="container-x py-12">
        <Suspense fallback={<p className="text-ink-soft">Carregando empreendimentos…</p>}>
          <PropertyExplorer initialPhase={phase} />
        </Suspense>
      </div>
    </>
  );
}
