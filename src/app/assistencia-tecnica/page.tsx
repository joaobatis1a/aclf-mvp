import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Assistência técnica" };

const checks = [
  "O serviço ainda está dentro da garantia? Consulte a tabela do Manual do Proprietário.",
  "As condições de garantia foram cumpridas, como as manutenções periódicas?",
  "Houve reforma que alterou o projeto original? Trocar piso, danificar portas e janelas ou mexer nas instalações hidráulicas e elétricas faz perder a garantia.",
  "As manutenções foram feitas por empresas especializadas, com ART? Danos causados por terceiros contratados não são cobertos.",
];

const rules = [
  "Os reparos acontecem em dias úteis, em horário comercial, na data marcada.",
  "Sem o proprietário ou um representante no local, não há visita nem reparo.",
  "Chamado procedente recebe agendamento de vistoria e reparo.",
  "Chamado improcedente, ou falta no horário agendado, gera taxa de R$ 100,00. Se faltar, o chamado é encerrado e você precisa abrir outro.",
];

export default function AssistenciaPage() {
  return (
    <>
      <PageHeader eyebrow="Portal do cliente" title="Assistência técnica">
        Antes de abrir um chamado, confira se o problema é de responsabilidade da construtora. Isso agiliza o atendimento.
      </PageHeader>
      <div className="container-x grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-12">
          <section aria-labelledby="antes">
            <h2 id="antes" className="font-display text-3xl font-semibold text-forest">1. Confira antes de abrir</h2>
            <ul className="mt-6 space-y-3">
              {checks.map((c) => (
                <li key={c} className="flex gap-4 rounded-2xl bg-white p-5">
                  <span className="mt-2 size-2.5 shrink-0 rounded-full bg-teal" aria-hidden />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="regras">
            <h2 id="regras" className="font-display text-3xl font-semibold text-forest">2. Como o atendimento funciona</h2>
            <ul className="mt-6 space-y-3">
              {rules.map((c) => (
                <li key={c} className="border-b border-line pb-3 leading-relaxed">{c}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="h-fit rounded-[2rem] bg-forest p-8 text-white lg:sticky lg:top-32">
          <h2 className="font-display text-3xl font-semibold">Abrir chamado</h2>
          <p className="mt-3 text-white/75">
            Use a plataforma de solicitação indicada pelo SAC do seu empreendimento ou fale com o atendimento.
          </p>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-full bg-teal px-6 py-3.5 text-center font-semibold hover:bg-teal-deep">
            SAC no WhatsApp
          </a>
          <p className="mt-6 text-sm text-white/70">
            {site.phone} · {site.email}
            <br />
            {site.hours.join(" · ")}
          </p>
          <p className="mt-6 text-xs text-white/55">
            O endereço assistenciatecnica@aclf.com.br só envia avisos automáticos. Cadastre-o como remetente seguro para receber a abertura, o agendamento e o encerramento do chamado.
          </p>
        </aside>
      </div>
    </>
  );
}
