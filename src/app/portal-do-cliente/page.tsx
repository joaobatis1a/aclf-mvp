import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LinkRows from "@/components/ui/LinkRows";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Portal do cliente" };

export default function PortalPage() {
  return (
    <>
      <PageHeader eyebrow="Portal do cliente" title="Depois da" accent="assinatura">
        Acompanhe seu contrato, peça assistência técnica e fale com o atendimento. Tudo começa aqui.
      </PageHeader>
      <section className="container-x pb-24">
        <LinkRows
          rows={[
            { title: "Área do cliente", text: "Entre com seu usuário e senha para acompanhar o contrato. Abre em um sistema externo.", href: site.clientAreaUrl, external: true, cta: "Entrar" },
            { title: "Assistência técnica", text: "Peça reparos em imóvel entregue. Veja antes o que a garantia cobre.", href: "/assistencia-tecnica", cta: "Abrir chamado" },
            { title: "Atendimento", text: "SAC por WhatsApp, telefone e e-mail, em horário comercial.", href: "/contato", cta: "Falar com a gente" },
            { title: "Ouvidoria", text: "Canal confidencial para relatar condutas inadequadas.", href: "/ouvidoria", cta: "Registrar" },
          ]}
        />
      </section>
    </>
  );
}
