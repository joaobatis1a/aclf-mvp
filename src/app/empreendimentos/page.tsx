import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PropertyExplorer from "@/components/PropertyExplorer";

export const metadata: Metadata = { title: "Empreendimentos" };

export default function EmpreendimentosPage() {
  return (
    <>
      <PageHeader eyebrow="Empreendimentos" title="Encontre o endereço certo para a sua família.">
        Lançamentos, obras em andamento, imóveis prontos para morar e tudo o que já entregamos.
      </PageHeader>
      <div className="container-x py-12">
        <Suspense fallback={<p className="text-ink-soft">Carregando empreendimentos…</p>}>
          <PropertyExplorer />
        </Suspense>
      </div>
    </>
  );
}
