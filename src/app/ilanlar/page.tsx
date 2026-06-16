import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import ListingsBrowser from "@/components/listings/ListingsBrowser";

export const metadata: Metadata = {
  title: "İlanlar — Kiralık & Satılık Fabrika, Sanayi Arsası, Depo",
  description:
    "Silivri, Çorlu, Çerkezköy ve Hadımköy bölgelerinde kiralık/satılık fabrika, sanayi arsası, depo ve tarla ilanları. Türe, bölgeye ve metrekareye göre filtreleyin.",
};

export default function IlanlarPage() {
  return (
    <>
      <PageHero
        eyebrow="Portföy"
        title="Sanayi & Fabrika İlanları"
        description="Türe, bölgeye, duruma ve metrekareye göre filtreleyin; liste veya harita üzerinde inceleyin."
      />
      <Container className="py-12 sm:py-16">
        <Suspense
          fallback={<div className="py-20 text-center text-steel-light">Yükleniyor…</div>}
        >
          <ListingsBrowser />
        </Suspense>
      </Container>
    </>
  );
}
