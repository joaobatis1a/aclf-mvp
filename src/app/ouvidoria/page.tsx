import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Ouvidoria" };

export default function OuvidoriaPage() {
  return (
    <>
      <PageHeader eyebrow="Políticas · Ouvidoria" title="Fale com" accent="segurança">
        Canal confidencial para colaboradores, fornecedores, clientes e outras partes interessadas relatarem condutas inadequadas, violações de normas ou questões éticas.
      </PageHeader>
      <section className="container-x grid gap-4 pb-24 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[2.5rem] bg-forest p-8 text-paper sm:p-12">
          <p className="mono text-leaf">Denúncia</p>
          <h2 className="display mt-5 text-[clamp(2.4rem,4.5vw,4.5rem)]">
            Sua identidade <span className="text-paineira">é opcional</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/75">
            Todas as denúncias são investigadas de forma imparcial e as informações são tratadas com máxima confidencialidade.
          </p>
          <a href={site.ouvidoriaUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-4 font-semibold text-forest hover:bg-paineira">
            Abrir formulário <span aria-hidden>↗</span>
          </a>
        </div>
        <dl className="rounded-[2.5rem] bg-paper-deep p-8 sm:p-12">
          <p className="mono text-teal-deep">Outros canais</p>
          {[
            ["Telefone", site.phone],
            ["E-mail", site.email],
            ["Endereço", site.address],
          ].map(([k, v]) => (
            <div key={k} className="mt-6 border-t border-line pt-4">
              <dt className="mono text-ink-soft">{k}</dt>
              <dd className="display-soft mt-1 break-words text-2xl text-forest">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
