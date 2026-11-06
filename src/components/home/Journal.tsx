import Link from "next/link";
import HoverPreviewList from "@/components/ui/HoverPreviewList";
import { formatDate, posts } from "@/data/content";

export default function Journal() {
  return (
    <section aria-labelledby="blog" className="bg-paper py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="mono text-teal-deep">Blog</p>
          <h2 id="blog" className="display mt-5 text-[clamp(2.8rem,6vw,6rem)] text-forest">
            Para decidir <span className="text-teal">com calma</span>
          </h2>
          <Link href="/blog" className="mt-8 inline-flex rounded-full border border-forest px-7 py-3.5 font-semibold text-forest transition hover:bg-forest hover:text-paper">
            Todos os artigos
          </Link>
        </div>
        <HoverPreviewList
          size="md"
          items={posts.slice(0, 4).map((p) => ({
            href: `/blog/${p.slug}`,
            title: p.title,
            image: p.image,
            meta: `${p.categories[0]} · ${formatDate(p.date)}`,
          }))}
        />
      </div>
    </section>
  );
}
