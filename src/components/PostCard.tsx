import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/content";

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-paper-deep">
        <Image src={post.image} alt="" fill sizes="(min-width: 768px) 24rem, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-teal-deep">
        {post.categories[0]} · <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold leading-snug transition group-hover:text-brand">{post.title}</h3>
    </Link>
  );
}
