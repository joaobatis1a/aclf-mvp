import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/data/content";

export { formatDate };

/** Compact article row: small thumbnail, category and date, title, a two-line summary. */
export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group grid h-full items-center gap-4 rounded-[1.75rem] bg-paper p-3 ring-1 ring-line transition duration-300 hover:bg-white hover:ring-forest/40 sm:gap-6 ${
        featured ? "sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" : "grid-cols-[6.5rem_1fr] sm:grid-cols-[9rem_1fr]"
      }`}
    >
      <div className={`relative overflow-hidden rounded-[1.25rem] bg-paper-deep ${featured ? "aspect-[16/10] sm:aspect-auto sm:h-64" : "aspect-square"}`}>
        <Image src={post.image} alt="" fill sizes={featured ? "(min-width: 640px) 32rem, 100vw" : "9rem"} className="object-cover" />
      </div>
      <div className={`min-w-0 ${featured ? "p-2 sm:p-4" : "pr-2"}`}>
        <p className="mono flex flex-wrap gap-x-2 text-teal-deep">
          <span>{post.categories[0]}</span>
          <span className="text-ink-soft">· <time dateTime={post.date}>{formatDate(post.date)}</time></span>
        </p>
        <h3 className={`display-soft mt-2 leading-tight text-forest ${featured ? "text-[clamp(1.6rem,2.6vw,2.4rem)]" : "text-lg sm:text-xl"}`}>{post.title}</h3>
        <p className={`mt-2 text-sm leading-relaxed text-ink-soft ${featured ? "line-clamp-3" : "line-clamp-2 max-sm:hidden"}`}>{post.excerpt}</p>
        {featured && (
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-paper transition group-hover:bg-brand">
            Ler artigo <span aria-hidden className="transition group-hover:translate-x-1">→</span>
          </span>
        )}
      </div>
    </Link>
  );
}
