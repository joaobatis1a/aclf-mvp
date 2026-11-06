import Link from "next/link";

export type LinkRow = { title: string; text: string; href: string; external?: boolean; cta: string };

/** Large typographic rows whose background floods on hover. Used for portals and hubs. */
export default function LinkRows({ rows }: { rows: LinkRow[] }) {
  return (
    <ul className="border-t border-line">
      {rows.map((r) => {
        const inner = (
          <>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-forest transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100" aria-hidden />
            <span className="relative grid gap-3 py-8 transition-colors duration-300 group-hover:text-paper group-focus-visible:text-paper sm:grid-cols-[1.2fr_1fr_auto] sm:items-center sm:gap-10 sm:px-6">
              <span className="display text-[clamp(2.2rem,5vw,4.5rem)]">{r.title}</span>
              <span className="text-ink-soft transition-colors group-hover:text-paper/75">{r.text}</span>
              <span className="mono flex items-center gap-2">
                {r.cta} <span aria-hidden className="transition group-hover:translate-x-1">{r.external ? "↗" : "→"}</span>
              </span>
            </span>
          </>
        );
        return (
          <li key={r.title} className="border-b border-line">
            {r.external ? (
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden">
                {inner}
              </a>
            ) : (
              <Link href={r.href} className="group relative block overflow-hidden">
                {inner}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
