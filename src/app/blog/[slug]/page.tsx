import type { Metadata } from "next";
import Image from "@/components/ui/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaskText } from "@/components/motion/Reveal";
import HoverPreviewList from "@/components/ui/HoverPreviewList";
import { site } from "@/config/site";
import { formatDate, getPost, posts } from "@/data/content";

// Pages are fully prerendered via generateStaticParams, so blocking validation is unnecessary.
export const instant = false;

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
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <>
      <article className="pb-20 pt-12 lg:pt-40">
        <header className="container-x max-w-5xl">
          <Link href="/blog" className="mono text-teal-deep hover:underline">← Blog</Link>
          <p className="mono mt-8 text-ink-soft">
            {post.categories.join(" · ")} · <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h1 className="display-soft mt-5 text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.02] text-forest">
            <MaskText text={post.title} />
          </h1>
        </header>
        <div className="container-x mt-12">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] bg-paper-deep">
            <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
        <div className="container-x mt-14 max-w-3xl">
          <p className="display-soft text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug text-forest">{post.excerpt}</p>
          <p className="mt-8 text-lg leading-relaxed text-ink-soft">
            O artigo completo será publicado aqui. Enquanto isso, fale com um consultor para tirar dúvidas sobre o assunto e conhecer os empreendimentos que combinam com o que você procura.
          </p>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-forest px-7 py-3.5 font-semibold text-paper hover:bg-brand">
            Falar com um consultor
          </a>
        </div>
      </article>

      <section aria-labelledby="mais" className="container-x pb-24">
        <h2 id="mais" className="display mb-8 text-[clamp(2.4rem,5vw,4.5rem)] text-forest">Continue lendo</h2>
        <HoverPreviewList
          size="md"
          items={more.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, image: p.image, meta: `${p.categories[0]} · ${formatDate(p.date)}` }))}
        />
      </section>
    </>
  );
}
