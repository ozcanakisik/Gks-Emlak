import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ListingCard from "@/components/listings/ListingCard";
import { ButtonLink } from "@/components/ui/Button";
import { featuredListings } from "@/lib/listings";

export default function FeaturedListings() {
  return (
    <section className="bg-bone">
      <Container className="py-20 sm:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand">Portföyden Seçmeler</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Öne Çıkan İlanlar
            </h2>
          </div>
          <ButtonLink href="/ilanlar" variant="outline">
            Tüm İlanlar
          </ButtonLink>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings.map((l, i) => (
            <Reveal as="div" key={l.id} delay={(i % 3) * 0.08}>
              <ListingCard listing={l} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
