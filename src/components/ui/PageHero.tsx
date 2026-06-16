import Container from "@/components/ui/Container";

// Alt sayfalar için üst başlık bandı (header katı olduğu için üstte boşluk bırakır).
export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-28 pb-14 text-white sm:pt-32 sm:pb-16">
      <div className="blueprint-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand/15 to-transparent" />
      <Container className="relative">
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-widest text-brand">{eyebrow}</p>
        )}
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>
        )}
      </Container>
    </section>
  );
}
