import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { formatDate, posts } from "@/data/content";

export default function Journal() {
  const [lead, ...others] = posts;
  const side = others.slice(0, 3);

  return (
    <section aria-labelledby="blog" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono text-teal-deep">Blog · guia de quem vai comprar</p>
            <h2 id="blog" className="display mt-5 text-[clamp(2.8rem,7vw,7rem)] text-forest">
              Para decidir <span className="accent text-teal-deep">com calma</span>
            </h2>
          </div>
          <Link href="/blog" className="rounded-full border border-forest px-7 py-3.5 font-semibold text-forest transition hover:bg-forest hover:text-paper">
            Todos os artigos
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link href={`/blog/${lead.slug}`} className="group block">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-paper-deep">
                <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105" />
                <span className="mono absolute left-5 top-5 rounded-full bg-paper px-4 py-2 text-forest">{lead.categories[0]}</span>
              </div>
              <p className="mono mt-6 text-ink-soft">
                <time dateTime={lead.date}>{formatDate(lead.date)}</time>
              </p>
              <h3 className="display-soft mt-3 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.05] text-forest transition group-hover:text-brand">{lead.title}</h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{lead.excerpt}</p>
            </Link>
          </Reveal>

          <ul className="flex flex-col gap-6 lg:col-span-5">
            {side.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={0.08 * (i + 1)} className="border-b border-line pb-6 last:border-b-0">
                <Link href={`/blog/${p.slug}`} className="group grid grid-cols-[7.5rem_1fr] items-center gap-5 sm:grid-cols-[10rem_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-paper-deep">
                    <Image src={p.image} alt="" fill sizes="10rem" className="object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <div>
                    <p className="mono text-teal-deep">{p.categories[0]}</p>
                    <h3 className="display-soft mt-2 text-xl leading-tight text-forest transition group-hover:text-brand sm:text-2xl">{p.title}</h3>
                    <p className="mono mt-3 flex items-center gap-2 text-ink-soft">
                      {formatDate(p.date)} <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
