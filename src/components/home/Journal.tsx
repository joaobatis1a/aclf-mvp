import Link from "next/link";
import PostCard from "@/components/PostCard";
import { Reveal } from "@/components/motion/Reveal";
import { posts } from "@/data/content";

export default function Journal() {
  const [lead, ...others] = posts;
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

        <div className="mt-12 grid gap-3 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <PostCard post={lead} featured />
          </Reveal>
          <ul className="grid gap-3">
            {others.slice(0, 3).map((p, i) => (
              <Reveal as="li" key={p.slug} delay={0.06 * (i + 1)} className="min-w-0">
                <PostCard post={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
