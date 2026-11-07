import Image from "@/components/ui/Img";
import { MaskText, Reveal } from "@/components/motion/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  accent,
  image,
  aside,
  compact = false,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Optional second line rendered in the accent colour. */
  accent?: string;
  image?: string;
  /** Replaces the image column with custom content. */
  aside?: React.ReactNode;
  /** Shorter header for listing pages, so results show above the fold. */
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`relative overflow-hidden bg-paper ${compact ? "pb-8 pt-12 lg:pt-36" : "pb-14 pt-14 sm:pb-20 lg:pt-44"}`}>
      <div className={`container-x grid gap-10 ${image || aside ? "lg:grid-cols-[1.6fr_1fr] lg:items-end" : ""}`}>
        <div>
          <p className="mono text-teal-deep">{eyebrow}</p>
          <h1 className={`display mt-6 text-forest ${compact ? "text-[clamp(2.8rem,6vw,5.5rem)]" : "text-[clamp(3rem,9vw,9rem)]"}`}>
            <MaskText text={title} />
            {accent && (
              <>
                <br />
                <MaskText text={accent} className="text-teal-deep" delay={0.12} />
              </>
            )}
          </h1>
          {children && (
            <Reveal delay={0.25} className={`max-w-2xl text-lg leading-relaxed text-ink-soft ${compact ? "mt-4" : "mt-8"}`}>
              {children}
            </Reveal>
          )}
        </div>
        {aside}
        {image && !aside && (
          <Reveal delay={0.15} className="arch relative hidden aspect-[3/4] lg:block">
            <Image src={image} alt="" fill priority sizes="30vw" className="object-cover" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
