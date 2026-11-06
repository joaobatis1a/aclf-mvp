import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PropertyExplorer from "@/components/PropertyExplorer";
import { properties } from "@/data/properties";

export const metadata: Metadata = { title: "Empreendimentos" };

export default function EmpreendimentosPage() {
  return (
    <>
      <PageHeader eyebrow={`Empreendimentos · ${properties.length}`} title="Escolha onde" accent="a vida acontece">
        Lançamentos, obras em andamento, imóveis prontos para morar e tudo o que já entregamos. Filtre ou troque para o índice.
      </PageHeader>
      <div className="container-x pb-24">
        <Suspense fallback={<p className="mono text-ink-soft">Carregando empreendimentos…</p>}>
          <PropertyExplorer />
        </Suspense>
      </div>
    </>
  );
}
