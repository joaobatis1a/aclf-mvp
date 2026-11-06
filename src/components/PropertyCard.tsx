import Image from "next/image";
import Link from "next/link";
import { phaseLabel, type Property } from "@/data/properties";

const phaseStyle: Record<Property["phase"], string> = {
  lancamento: "bg-teal text-white",
  "em-construcao": "bg-white text-forest",
  "pronto-para-morar": "bg-brand text-white",
  portfolio: "bg-forest/80 text-white",
};

export function specsOf(p: Property) {
  const parts: string[] = [];
  if (p.areaLabel) parts.push(p.areaLabel);
  if (p.bedrooms) parts.push(`${p.bedrooms}${p.area && p.area.length > 1 ? " ou 3" : ""} quartos`);
  if (p.suites) parts.push(`${p.suites} suíte`);
  return parts;
}

export default function PropertyCard({ property: p, priority = false }: { property: Property; priority?: boolean }) {
  const where = [p.neighborhood, p.city].filter(Boolean).join(" · ");
  const specs = specsOf(p);
  return (
    <Link href={`/imovel/${p.slug}`} className="group block">
      <div className="arch relative aspect-[4/5] bg-paper-deep">
        <Image
          src={p.cover}
          alt={`Fachada ou área de lazer do ${p.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        <span className={`absolute left-1/2 top-5 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${phaseStyle[p.phase]}`}>
          {phaseLabel[p.phase]}
        </span>
      </div>
      <div className="px-2 pt-4 text-center">
        <h3 className="font-display text-xl font-semibold leading-tight transition group-hover:text-brand">{p.name}</h3>
        {where && <p className="mt-1 text-sm text-ink-soft">{where}</p>}
        {specs.length > 0 && <p className="mt-2 text-xs font-medium uppercase tracking-wider text-teal-deep">{specs.join(" · ")}</p>}
      </div>
    </Link>
  );
}
