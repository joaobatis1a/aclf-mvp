import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Assistência técnica" };

const steps = [
  {
    title: "Confira a garantia",
    items: [
      "O serviço ainda está dentro do prazo? Consulte a tabela do Manual do Proprietário.",
      "As condições foram cumpridas, como as manutenções periódicas?",
      "Houve reforma que alterou o projeto original? Trocar piso, danificar portas e janelas ou mexer nas instalações hidráulicas e elétricas faz perder a garantia.",
      "As manutenções foram feitas por empresas especializadas, com ART? Danos causados por terceiros contratados não são cobertos.",
    ],
  },
  {
    title: "Abra o chamado",
    items: [
      "Use a plataforma de solicitação indicada pelo SAC do seu empreendimento, ou fale com o atendimento.",
      "Cadastre assistenciatecnica@aclf.com.br como remetente seguro. Esse endereço só envia avisos automáticos de abertura, agendamento e encerramento.",
    ],
  },
  {
    title: "Receba a equipe",
    items: [
      "Chamado procedente recebe agendamento de vistoria e reparo, em dias úteis e horário comercial.",
      "Sem o proprietário ou um representante no local, não há visita nem reparo.",
      "Chamado improcedente, ou falta no horário agendado, gera taxa de R$ 100,00. Se faltar, o chamado é encerrado e é preciso abrir outro.",
    ],
  },
];

export default function AssistenciaPage() {
  return (
    <>
      <PageHeader eyebrow="Portal do cliente" title="Assistência" accent="técnica">
        Três passos para um atendimento rápido. Antes de abrir o chamado, confira se o reparo é de responsabilidade da construtora.
      </PageHeader>

      <section className="container-x grid gap-14 pb-24 lg:grid-cols-[1.6fr_1fr]">
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="rounded-[2rem] bg-paper-deep p-8 sm:p-10">
              <p className="mono text-teal-deep">Passo {i + 1} de {steps.length}</p>
              <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.8rem)] text-forest">{s.title}</h2>
              <ul className="mt-6 space-y-3">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-4 leading-relaxed">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-paineira" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <aside className="h-fit rounded-[2rem] bg-forest p-8 text-paper lg:sticky lg:top-28">
          <p className="mono text-leaf">SAC</p>
          <p className="display mt-4 text-5xl">Precisa de ajuda?</p>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-7 block rounded-full bg-teal px-6 py-4 text-center font-semibold hover:bg-leaf text-forest">
            WhatsApp {site.whatsappLabel}
          </a>
          <a href={site.phoneHref} className="mt-3 block rounded-full px-6 py-4 text-center ring-1 ring-line-inv hover:bg-paper hover:text-forest">
            {site.phone}
          </a>
          <p className="mono mt-6 text-paper/60">{site.hours.join(" · ")}</p>
        </aside>
      </section>
    </>
  );
}
