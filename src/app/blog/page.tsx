import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { formatDate, posts } from "@/data/content";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHeader eyebrow={`Blog · ${posts.length} artigos`} title="Para decidir" accent="com calma">
        Plantas, localização, financiamento e vida em condomínio, explicados para quem está escolhendo onde morar.
      </PageHeader>

      <section className="container-x pb-20">
        <Link href={`/blog/${featured.slug}`} className="group grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-paper-deep">
            <Image src={featured.image} alt="" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
          </div>
          <div>
            <p className="mono text-teal-deep">Mais recente · {formatDate(featured.date)}</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,4.4vw,4.4rem)] text-forest transition group-hover:text-brand">{featured.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{featured.excerpt}</p>
          </div>
        </Link>
      </section>

      <section aria-label="Outros artigos" className="container-x pb-24">
        <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
