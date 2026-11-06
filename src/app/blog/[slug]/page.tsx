import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import PostCard, { formatDate } from "@/components/PostCard";
import { getPost, posts } from "@/data/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="container-x max-w-3xl py-14">
        <Link href="/blog" className="text-sm font-medium text-brand hover:underline">← Voltar ao blog</Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-teal-deep">
          {post.categories.join(" · ")} · <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-forest sm:text-5xl">{post.title}</h1>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-paper-deep">
          <Image src={post.image} alt="" fill priority sizes="48rem" className="object-cover" />
        </div>
        <p className="mt-10 font-display text-2xl leading-snug text-ink">{post.excerpt}</p>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          O artigo completo será publicado aqui. Enquanto isso, fale com um consultor para tirar dúvidas sobre
          o assunto e conhecer os empreendimentos que combinam com o que você procura.
        </p>
      </article>

      <section className="container-x pb-16" aria-labelledby="mais">
        <h2 id="mais" className="mb-8 font-display text-3xl font-semibold">Continue lendo</h2>
        <ul className="grid gap-8 md:grid-cols-3">
          {more.map((p) => (
            <li key={p.slug}><PostCard post={p} /></li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
