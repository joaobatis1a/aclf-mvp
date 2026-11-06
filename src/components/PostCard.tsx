import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/data/content";

export { formatDate };

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="arch-sm relative aspect-[4/5] bg-paper-deep">
        <Image src={post.image} alt="" fill sizes="(min-width: 768px) 28rem, 100vw" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105" />
      </div>
      <p className="mono mt-5 text-teal-deep">
        {post.categories[0]} · <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h3 className="display-soft mt-2 text-2xl leading-tight text-forest transition group-hover:text-brand">{post.title}</h3>
    </Link>
  );
}
