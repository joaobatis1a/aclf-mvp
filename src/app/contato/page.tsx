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
      <PageHeader eyebrow="Contato" title="Vamos" accent="conversar">
        Compra, pós-venda ou imprensa: escolha o canal mais rápido para você.
      </PageHeader>
      <section className="container-x grid gap-14 pb-24 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <ul className="border-t border-line">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-line">
                <a href={c.href} className="group block py-6">
                  <span className="mono text-teal-deep">{c.label}</span>
                  <span className="display mt-2 block break-words text-[clamp(1.8rem,3.6vw,3.2rem)] text-forest transition group-hover:translate-x-2 group-hover:text-brand">
                    {c.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="mono text-teal-deep">Horário</dt>
              <dd className="mt-2 leading-relaxed">{site.hours.map((h) => <span key={h} className="block">{h}</span>)}</dd>
            </div>
            <div>
              <dt className="mono text-teal-deep">Endereço</dt>
              <dd className="mt-2 leading-relaxed">{site.address}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
