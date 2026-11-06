import Image from "next/image";
import { MaskText, Reveal } from "@/components/motion/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  accent,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Optional second line rendered in the accent colour. */
  accent?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-paper pb-14 pt-36 sm:pb-20 sm:pt-44">
      <div className={`container-x grid gap-10 ${image ? "lg:grid-cols-[1.6fr_1fr] lg:items-end" : ""}`}>
        <div>
          <p className="mono text-teal-deep">{eyebrow}</p>
          <h1 className="display mt-6 text-[clamp(3rem,9vw,9rem)] text-forest">
            <MaskText text={title} />
            {accent && (
              <>
                <br />
                <MaskText text={accent} className="text-teal-deep" delay={0.12} />
              </>
            )}
          </h1>
          {children && (
            <Reveal delay={0.25} className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {children}
            </Reveal>
          )}
        </div>
        {image && (
          <Reveal delay={0.15} className="arch relative hidden aspect-[3/4] lg:block">
            <Image src={image} alt="" fill priority sizes="30vw" className="object-cover" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
