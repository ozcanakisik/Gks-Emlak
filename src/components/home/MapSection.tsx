import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PropertyMapClient from "@/components/map/PropertyMapClient";
import { ButtonLink } from "@/components/ui/Button";
import { listings } from "@/lib/listings";
import { regions } from "@/lib/site";

export default function MapSection() {
  return (
    <section className="bg-bone">
      <Container className="py-20 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">Faaliyet Bölgelerimiz</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Sanayinin kalbindeki koridorlar
          </h2>
          <p className="mt-4 text-steel-light">
            {regions.map((r) => r.name).join(" · ")} hattında aktif portföyümüzü
            harita üzerinde inceleyin.
          </p>
        </Reveal>

        <Reveal className="mt-10 overflow-hidden border border-black/10 shadow-sm">
          <PropertyMapClient listings={listings} className="h-[460px] sm:h-[540px]" />
        </Reveal>

        <div className="mt-8 text-center">
          <ButtonLink href="/ilanlar?gorunum=harita" variant="outline">
            Haritada Tüm İlanlar
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
