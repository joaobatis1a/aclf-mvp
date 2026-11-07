import Image from "@/components/ui/Img";
import Link from "next/link";
import { byPhase, type Property } from "@/data/properties";

// Covers re-sourced in high resolution can be shown wide; the rest stay portrait so they keep their sharpness.
const isWide = (p: Property) => p.cover.endsWith("-photo.jpg");

/**
 * Delivered projects as two endless belts running in opposite directions.
 * Hovering a belt pauses it and dims the other cards so the one under the pointer stands out.
 */
export default function PortfolioIndex() {
  const list = byPhase("portfolio");
  const half = Math.ceil(list.length / 2);
  const rows = [list.slice(0, half), list.slice(half)];

  return (
    <section aria-labelledby="entregues" className="overflow-hidden bg-paper py-24 sm:py-32">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mono text-teal-deep">Portfólio · {list.length} obras entregues</p>
          <h2 id="entregues" className="display mt-5 text-[clamp(2.8rem,8vw,8rem)] text-forest">
            Chaves <span className="accent text-teal-deep">entregues</span>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-4 sm:items-end">
          <p className="max-w-xs text-ink-soft sm:text-right">Condomínios, residenciais e um shopping que já fazem parte da paisagem de Paulista e região.</p>
          <Link href="/empreendimentos/portfolio" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest transition hover:bg-forest hover:text-paper">
            Ver portfólio completo
          </Link>
        </div>
      </div>

      <div className="mt-14 space-y-4">
        {rows.map((row, r) => (
          <Belt key={r} items={row} reverse={r === 1} />
        ))}
      </div>
    </section>
  );
}

function Belt({ items, reverse }: { items: Property[]; reverse: boolean }) {
  // Repeat the set so the loop never shows a gap; only the first copy is reachable by keyboard.
  const copies = [items, items, items, items];
  return (
    <div className="group/belt relative">
      <ul
        className={`marquee flex w-max gap-4 group-hover/belt:[animation-play-state:paused] group-focus-within/belt:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:px-4 ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ animationDuration: `${items.length * 11}s` }}
      >
        {copies.flatMap((set, c) =>
          set.map((p) => (
            <li key={`${c}-${p.slug}`} aria-hidden={c > 0 || undefined} className={`shrink-0 ${isWide(p) ? "w-[22rem] sm:w-[30rem]" : "w-[15rem] sm:w-[19rem]"}`}>
              <Link
                href={`/imovel/${p.slug}`}
                tabIndex={c > 0 ? -1 : undefined}
                className="group/card relative block h-[19rem] overflow-hidden rounded-[1.75rem] bg-paper-deep transition duration-500 group-hover/belt:opacity-50 hover:!opacity-100 sm:h-[23rem]"
              >
                <Image src={p.cover} alt={c > 0 ? "" : p.name} fill sizes={isWide(p) ? "30rem" : "19rem"} className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/5 to-transparent" />
                {p.videos?.length ? (
                  <span className="mono absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-forest">
                    <svg viewBox="0 0 24 24" className="size-3" aria-hidden>
                      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                    </svg>
                    Vídeo
                  </span>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-paper">
                  <div className="min-w-0">
                    <p className="mono text-paper/70">{p.city ?? "Pernambuco"} · entregue</p>
                    <p className="display mt-1 text-2xl leading-[0.92] sm:text-3xl">{p.name}</p>
                  </div>
                  <span className="grid size-10 shrink-0 translate-y-2 place-items-center rounded-full bg-paper text-forest opacity-0 transition duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
