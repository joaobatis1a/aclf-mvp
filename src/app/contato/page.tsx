import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contato" };

export default function ContatoPage() {
  const channels = [
    { label: "SAC no WhatsApp", value: site.whatsappLabel, href: site.whatsappHref },
    { label: "Telefone", value: site.phone, href: site.phoneHref },
    { label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <>
      <PageHeader eyebrow="Contato" title="Fale com a gente.">
        Compra, pós-venda ou imprensa: escolha o canal mais rápido para você.
      </PageHeader>
      <div className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <ul className="space-y-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href} className="block rounded-2xl border border-line bg-white p-5 transition hover:border-teal">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-deep">{c.label}</span>
                  <span className="mt-1 block font-display text-2xl font-semibold">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl bg-paper-deep p-5 text-sm leading-relaxed">
            <p className="font-semibold">Horário de atendimento</p>
            {site.hours.map((h) => (
              <p key={h}>{h}</p>
            ))}
            <p className="mt-3 font-semibold">Endereço</p>
            <p>{site.address}</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
