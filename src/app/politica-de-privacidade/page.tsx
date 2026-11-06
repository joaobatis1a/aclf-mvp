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
      <PageHeader eyebrow="Políticas" title="Política de privacidade">
        Um resumo de como tratamos os seus dados. Este texto é um resumo para a proposta de redesign; vale o documento oficial da empresa.
      </PageHeader>
      <div className="container-x max-w-4xl space-y-12 py-16">
        {blocks.map((b) => (
          <section key={b.title}>
            <h2 className="font-display text-3xl font-semibold text-forest">{b.title}</h2>
            <ul className="mt-5 space-y-3">
              {b.items.map((i) => (
                <li key={i} className="border-b border-line pb-3 leading-relaxed">{i}</li>
              ))}
            </ul>
          </section>
        ))}
        <section className="rounded-3xl bg-paper-deep p-8">
          <h2 className="font-display text-2xl font-semibold text-forest">Como exercer seus direitos</h2>
          <p className="mt-3 leading-relaxed">
            Envie um e-mail para o encarregado de dados em <a className="font-semibold text-brand underline" href={`mailto:${site.dpoEmail}`}>{site.dpoEmail}</a> informando o dado e o direito que quer exercer. Pediremos uma comprovação de identidade.
          </p>
        </section>
      </div>
    </>
  );
}
