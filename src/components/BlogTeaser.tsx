import Link from "next/link";
import PostCard from "./PostCard";
import { posts } from "@/data/content";

export default function BlogTeaser() {
  return (
    <section className="container-x pb-20" aria-labelledby="novidades">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Blog</p>
          <h2 id="novidades" className="mt-2 font-display text-4xl font-semibold tracking-tight text-forest sm:text-5xl">Para decidir com calma.</h2>
        </div>
        <Link href="/blog" className="font-semibold text-brand underline-offset-4 hover:underline">Ver todos os artigos →</Link>
      </div>
      <ul className="mt-10 grid gap-8 md:grid-cols-3">
        {posts.slice(0, 3).map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
