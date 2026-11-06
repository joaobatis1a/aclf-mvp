import Image from "next/image";
import Link from "next/link";
import { phaseDot, phaseLabel, specList, type Property } from "@/data/properties";

export default function PropertyCard({ property: p, priority = false }: { property: Property; priority?: boolean }) {
  const where = [p.neighborhood, p.city].filter(Boolean).join(" · ");
  const specs = specList(p);
  return (
    <Link href={`/imovel/${p.slug}`} className="group block">
      <div className="arch relative aspect-[4/5] bg-paper-deep">
        <Image
          src={p.cover}
          alt={`Imagem do ${p.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105"
        />
        {specs.length > 0 && (
          <dl className="absolute inset-x-3 bottom-3 grid translate-y-4 grid-cols-2 gap-px overflow-hidden rounded-2xl bg-forest/20 opacity-0 backdrop-blur-md transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {specs.map((s) => (
              <div key={s.k} className="bg-forest/75 px-4 py-3 text-paper">
                <dt className="mono text-paper/60">{s.k}</dt>
                <dd className="display-soft text-lg">{s.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <p className="mono mt-5 flex items-center gap-2 text-ink-soft">
        <span className={`size-2 rounded-full ${phaseDot[p.phase]}`} aria-hidden />
        {phaseLabel[p.phase]}
        {where && <span className="truncate">· {where}</span>}
      </p>
      <h3 className="display mt-2 text-[clamp(2rem,3vw,2.8rem)] text-forest transition group-hover:text-brand">{p.name}</h3>
    </Link>
  );
}
