import Image from "next/image";
import Link from "next/link";
import { phaseDot, phaseLabel, specList, type Property } from "@/data/properties";

export function Chips({ p }: { p: Property }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      <span className="mono flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-forest">
        <span className={`size-1.5 rounded-full ${phaseDot[p.phase]}`} aria-hidden />
        {phaseLabel[p.phase]}
      </span>
      {p.videos?.length ? (
        <span className="mono flex items-center gap-1 rounded-full bg-forest/70 px-3 py-1.5 text-paper backdrop-blur">
          <svg viewBox="0 0 24 24" className="size-3" aria-hidden>
            <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
          </svg>
          Vídeo
        </span>
      ) : null}
    </span>
  );
}

export function Specs({ p }: { p: Property }) {
  const specs = specList(p).filter((s) => s.k !== "Cidade");
  if (!specs.length) return null;
  return (
    <span className="flex flex-wrap gap-1.5">
      {specs.map((s) => (
        <span key={s.k} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-paper ring-1 ring-white/20 backdrop-blur">
          {s.v}
          {s.k === "Quartos" ? " quartos" : s.k === "Suíte" ? " suíte" : ""}
        </span>
      ))}
    </span>
  );
}

/** A card that is entirely the photo of the place, with the information set in white on top. */
export default function PropertyTile({ property: p, priority = false }: { property: Property; priority?: boolean }) {
  const where = [p.neighborhood, p.city].filter(Boolean).join(" · ");
  return (
    <Link href={`/imovel/${p.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-forest text-paper sm:aspect-[4/3]">
      <Image src={p.hero ?? p.cover} alt="" fill priority={priority} sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
      <span className="absolute inset-0 bg-gradient-to-t from-forest via-forest/25 to-forest/10" />
      <span className="absolute left-4 top-4">
        <Chips p={p} />
      </span>
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-6">
        {where && <span className="mono text-paper/75">{where}</span>}
        <span className="display text-[clamp(2rem,6vw,2.8rem)] leading-[0.9]">{p.name}</span>
        <span className="flex items-end justify-between gap-3">
          <Specs p={p} />
          <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-paper text-forest transition group-hover:translate-x-1">→</span>
        </span>
      </span>
    </Link>
  );
}
