import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Portal do cliente" };

const cards = [
  { title: "Área do cliente", text: "Acesse com seu usuário e senha para acompanhar seu contrato.", href: site.clientAreaUrl, label: "Entrar", external: true },
  { title: "Assistência técnica", text: "Peça reparos em imóvel entregue. Veja antes o que a garantia cobre.", href: "/assistencia-tecnica", label: "Abrir chamado", external: false },
  { title: "Atendimento", text: "SAC por WhatsApp, telefone e e-mail, em horário comercial.", href: "/contato", label: "Falar com a gente", external: false },
  { title: "Ouvidoria", text: "Canal confidencial para relatar condutas inadequadas.", href: "/ouvidoria", label: "Registrar", external: false },
];

export default function PortalPage() {
  return (
    <>
      <PageHeader eyebrow="Portal do cliente" title="Tudo o que você precisa depois de assinar o contrato.">
        Acompanhe seu contrato, peça assistência técnica e fale com o atendimento.
      </PageHeader>
      <div className="container-x py-16">
        <ul className="grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <li key={c.title} className="flex flex-col rounded-[2rem] border border-line bg-white p-8">
              <h2 className="font-display text-3xl font-semibold text-forest">{c.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{c.text}</p>
              {c.external ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block self-start rounded-full bg-brand px-7 py-3 font-semibold text-white hover:bg-forest">
                  {c.label}
                </a>
              ) : (
                <Link href={c.href} className="mt-8 inline-block self-start rounded-full border border-forest px-7 py-3 font-semibold text-forest hover:bg-forest hover:text-white">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-soft">A área do cliente abre em um sistema externo, em uma nova aba.</p>
      </div>
    </>
  );
}
