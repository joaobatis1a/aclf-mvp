export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-deep/60">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-0 size-80 rounded-full bg-leaf/20 blur-3xl" />
      <div className="container-x relative py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-forest sm:text-6xl">
          {title}
        </h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{children}</div>}
      </div>
    </section>
  );
}
