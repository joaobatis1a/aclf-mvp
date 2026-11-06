import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Política de privacidade" };

const blocks = [
  { title: "Dados que coletamos", items: ["Dados informados por você: identificação, endereço, telefone, e-mail, estado civil e comprovante de renda.", "Dados enviados por corretores e outros terceiros, com verificação de que o titular sabe da indicação.", "Dados gerados na interação: registros de contato, imóveis adquiridos e dados de navegação por cookies, como páginas acessadas, navegador e dispositivo."] },
  { title: "Para que usamos", items: ["Venda de imóveis: análise de crédito, contratos, ITBI e registro em cartório.", "Atendimento a interesses enviados pelo site ou pelos estandes.", "Campanhas de marketing, com o seu consentimento.", "Métricas do site, cadastro de fornecedores e processos seletivos.", "Cumprimento de obrigações legais e defesa em processos judiciais."] },
  { title: "Seus direitos", items: ["Acessar, corrigir, anonimizar, bloquear ou eliminar seus dados.", "Pedir portabilidade, revogar consentimento e revisar decisões automatizadas.", "Deixar de receber comunicações publicitárias."] },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHeader eyebrow="Políticas" title="Privacidade">
        Um resumo de como tratamos os seus dados. Vale o documento oficial da empresa.
      </PageHeader>
      <div className="container-x grid gap-14 pb-24 lg:grid-cols-[1fr_2fr]">
        <nav aria-label="Nesta página" className="lg:sticky lg:top-28 lg:self-start">
          <p className="mono text-teal-deep">Nesta página</p>
          <ul className="mt-4 space-y-2">
            {blocks.map((b, i) => (
              <li key={b.title}>
                <a href={`#p${i}`} className="display-soft text-2xl text-forest hover:text-brand">{b.title}</a>
              </li>
            ))}
            <li>
              <a href="#direitos" className="display-soft text-2xl text-forest hover:text-brand">Como exercer</a>
            </li>
          </ul>
        </nav>
        <div className="space-y-16">
          {blocks.map((b, i) => (
            <section key={b.title} id={`p${i}`} className="scroll-mt-28">
              <h2 className="display text-[clamp(2.4rem,4.5vw,4rem)] text-forest">{b.title}</h2>
              <ul className="mt-6 border-t border-line">
                {b.items.map((it) => (
                  <li key={it} className="border-b border-line py-4 text-lg leading-relaxed">{it}</li>
                ))}
              </ul>
            </section>
          ))}
          <section id="direitos" className="scroll-mt-28 rounded-[2rem] bg-forest p-8 text-paper sm:p-10">
            <h2 className="display text-4xl">Como exercer seus direitos</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              Envie um e-mail ao encarregado de dados informando o dado e o direito que quer exercer. Pediremos uma comprovação de identidade.
            </p>
            <a className="mt-6 inline-flex rounded-full bg-paper px-6 py-3.5 font-semibold text-forest hover:bg-paineira" href={`mailto:${site.dpoEmail}`}>
              {site.dpoEmail}
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
