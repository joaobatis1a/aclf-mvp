import Link from "next/link";
import HoverPreviewList from "@/components/ui/HoverPreviewList";
import { byPhase } from "@/data/properties";

export default function PortfolioIndex() {
  const list = byPhase("portfolio");
  return (
    <section aria-labelledby="entregues" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono text-teal-deep">Portfólio · {list.length} obras entregues</p>
            <h2 id="entregues" className="display mt-5 text-[clamp(2.8rem,7vw,7rem)] text-forest">
              Chaves <span className="text-teal-deep">entregues</span>
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">Passe o cursor sobre um nome para ver a obra. Cada um abre a página do empreendimento.</p>
        </div>
        <div className="mt-14">
          <HoverPreviewList
            items={list.map((p) => ({
              href: `/imovel/${p.slug}`,
              title: p.name,
              image: p.cover,
              aside: p.city ?? "Entregue",
            }))}
          />
        </div>
        <Link href="/empreendimentos/portfolio" className="mono mt-8 inline-block text-forest underline-offset-4 hover:underline">
          Ver portfólio em galeria →
        </Link>
      </div>
    </section>
  );
}
