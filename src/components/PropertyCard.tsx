import Image from "next/image";
import Link from "next/link";
import { phaseDot, phaseLabel, specList, type Property } from "@/data/properties";

/** Compact listing card: photo on the left, the essentials on the right. */
export default function PropertyCard({ property: p, priority = false }: { property: Property; priority?: boolean }) {
  const where = [p.neighborhood, p.city].filter(Boolean).join(" · ");
  const specs = specList(p).filter((s) => s.k !== "Cidade");
  return (
    <Link
      href={`/imovel/${p.slug}`}
      className="group grid h-full grid-cols-[7.5rem_1fr] gap-4 rounded-[1.75rem] bg-paper p-3 ring-1 ring-line transition duration-300 hover:bg-white hover:ring-forest/40 focus-visible:ring-teal sm:grid-cols-[11rem_1fr] sm:gap-6"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-paper-deep">
        <Image src={p.hero ?? p.cover} alt="" fill priority={priority} sizes="(min-width: 640px) 11rem, 7.5rem" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-col py-1 pr-2">
        <p className="mono flex items-center gap-2 text-ink-soft">
          <span className={`size-2 shrink-0 rounded-full ${phaseDot[p.phase]}`} aria-hidden />
          {phaseLabel[p.phase]}
        </p>
        <h3 className="display mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[0.9] text-forest">{p.name}</h3>
        {where && <p className="mt-2 truncate text-sm text-ink-soft">{where}</p>}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
          {specs.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {specs.map((s) => (
                <li key={s.k} className="rounded-full bg-paper-deep px-3 py-1 text-xs font-medium">
                  {s.v}
                  {s.k === "Quartos" ? " quartos" : s.k === "Suíte" ? " suíte" : ""}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-xs text-ink-soft">{p.summary}</span>
          )}
          <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-forest text-paper transition duration-300 group-hover:translate-x-1 group-hover:bg-brand">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
