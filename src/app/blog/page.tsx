import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/content";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Conteúdo para quem está escolhendo onde morar.">
        Dicas sobre plantas, localização, financiamento e vida em condomínio.
      </PageHeader>
      <div className="container-x py-14">
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
