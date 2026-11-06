import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Ouvidoria" };

export default function OuvidoriaPage() {
  return (
    <>
      <PageHeader eyebrow="Políticas" title="Ouvidoria">
        Canal seguro e confidencial para colaboradores, fornecedores, clientes e outras partes interessadas relatarem condutas inadequadas, violações de normas ou questões éticas.
      </PageHeader>
      <div className="container-x grid gap-8 py-16 md:grid-cols-2">
        <section className="rounded-[2rem] bg-forest p-8 text-white sm:p-10">
          <h2 className="font-display text-3xl font-semibold">Registre sua denúncia</h2>
          <p className="mt-4 leading-relaxed text-white/80">
            Todas as denúncias são investigadas de forma imparcial. Informar sua identidade é opcional e os dados são tratados com máxima confidencialidade.
          </p>
          <a href={site.ouvidoriaUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-teal px-7 py-3.5 font-semibold hover:bg-teal-deep">
            Abrir formulário
          </a>
        </section>
        <section className="rounded-[2rem] border border-line bg-white p-8 sm:p-10">
          <h2 className="font-display text-3xl font-semibold text-forest">Outros canais</h2>
          <dl className="mt-6 space-y-4">
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-teal-deep">Telefone</dt><dd>{site.phone}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-teal-deep">E-mail</dt><dd>{site.email}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-teal-deep">Endereço</dt><dd>{site.address}</dd></div>
          </dl>
        </section>
      </div>
    </>
  );
}
