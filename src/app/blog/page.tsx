import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/content";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHeader eyebrow={`Blog · ${posts.length} artigos`} title="Para decidir" accent="com calma">
        Plantas, localização, financiamento e vida em condomínio, explicados para quem está escolhendo onde morar.
      </PageHeader>

      <section aria-label="Artigo mais recente" className="container-x pb-6">
        <p className="mono mb-4 text-ink-soft">Mais recente</p>
        <PostCard post={featured} featured />
      </section>

      <section aria-label="Outros artigos" className="container-x pb-24 pt-8">
        <p className="mono mb-4 text-ink-soft">Todos os artigos</p>
        <ul className="grid gap-3 lg:grid-cols-2">
          {rest.map((p, i) => (
            <li key={p.slug} className="reveal min-w-0" style={{ animationDelay: `${i * 40}ms` }}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
