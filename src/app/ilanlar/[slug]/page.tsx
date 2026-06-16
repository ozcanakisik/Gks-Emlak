import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Gallery from "@/components/listings/Gallery";
import PropertyMapClient from "@/components/map/PropertyMapClient";
import LeadForm from "@/components/forms/LeadForm";
import {
  listings,
  getListingBySlug,
  formatArea,
  propertyTypeLabels,
  statusLabels,
} from "@/lib/listings";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getListingBySlug(slug);
  if (!l) return { title: "İlan bulunamadı" };
  return {
    title: l.title,
    description: l.description,
    openGraph: { title: l.title, description: l.description, images: l.images.slice(0, 1) },
  };
}

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getListingBySlug(slug);
  if (!l) notFound();

  const specs: { label: string; value?: string | number | boolean }[] = [
    { label: "İlan Türü", value: propertyTypeLabels[l.type] },
    { label: "Durum", value: statusLabels[l.status] },
    { label: "Toplam Alan", value: formatArea(l.area) },
    { label: "Kapalı Alan", value: l.area.kapaliM2 ? `${l.area.kapaliM2.toLocaleString("tr-TR")} m²` : undefined },
    { label: "Açık Alan", value: l.area.acikM2 ? `${l.area.acikM2.toLocaleString("tr-TR")} m²` : undefined },
    { label: "İmar Durumu", value: l.imarDurumu },
    { label: "Tapu Durumu", value: l.tapuDurumu },
    { label: "OSB", value: l.osb ?? "Hayır" },
    { label: "Yola Cephe", value: l.yolaCephe === undefined ? undefined : l.yolaCephe ? "Var" : "Yok" },
    { label: "Tavan Yüksekliği", value: l.tavanYuksekligiM ? `${l.tavanYuksekligiM} m` : undefined },
    { label: "Vinç Kapasitesi", value: l.vincKapasitesi },
    { label: "Trafo Gücü", value: l.trafoGucu },
    { label: "Ruhsat", value: l.ruhsat },
  ];

  const altyapi = l.altyapi
    ? [
        ["Doğalgaz", l.altyapi.dogalgaz],
        ["Elektrik", l.altyapi.elektrik],
        ["Su", l.altyapi.su],
      ].filter(([, v]) => v).map(([k]) => k as string)
    : [];

  return (
    <article>
      {/* Üst bilgi bandı */}
      <section className="bg-ink pt-28 pb-10 text-white sm:pt-32">
        <Container>
          <nav className="mb-4 text-sm text-white/50" aria-label="Konum izi">
            <Link href="/ilanlar" className="hover:text-brand">İlanlar</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{propertyTypeLabels[l.type]}</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex gap-2">
                <span className="bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wide">{statusLabels[l.status]}</span>
                <span className="bg-white/10 px-3 py-1 text-xs font-semibold">{propertyTypeLabels[l.type]}</span>
              </div>
              <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                {l.title}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-white/70">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {l.location.bolge}, {l.location.ilce} / {l.location.sehir}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wide text-white/50">Fiyat</div>
              <div className="font-display text-xl font-bold text-brand">{l.priceLabel}</div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Sol kolon */}
          <div>
            <Gallery images={l.images} title={l.title} />

            <h2 className="mt-10 font-display text-2xl font-bold text-ink">Açıklama</h2>
            <p className="mt-3 leading-relaxed text-steel">{l.description}</p>

            <h2 className="mt-10 font-display text-2xl font-bold text-ink">Teknik Özellikler</h2>
            <dl className="mt-4 grid grid-cols-1 overflow-hidden border border-black/10 sm:grid-cols-2">
              {specs
                .filter((s) => s.value !== undefined && s.value !== "")
                .map((s, i) => (
                  <div key={s.label} className={`flex justify-between gap-4 border-black/10 px-4 py-3 text-sm ${i % 2 === 0 ? "sm:border-r" : ""} border-b`}>
                    <dt className="text-steel-light">{s.label}</dt>
                    <dd className="text-right font-semibold text-ink">{String(s.value)}</dd>
                  </div>
                ))}
            </dl>

            {altyapi.length > 0 && (
              <div className="mt-6">
                <h3 className="font-display text-lg font-bold text-ink">Altyapı</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {altyapi.map((a) => (
                    <li key={a} className="inline-flex items-center gap-1.5 border border-black/10 bg-bone px-3 py-1.5 text-sm font-medium text-steel">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E2231A" strokeWidth="3" aria-hidden>
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <h2 className="mt-10 font-display text-2xl font-bold text-ink">Konum</h2>
            <div className="mt-4 overflow-hidden border border-black/10">
              <PropertyMapClient listings={[l]} showRegions={false} className="h-[360px]" />
            </div>
          </div>

          {/* Sağ kolon — keşif formu (yapışkan) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-ink">Bu mülk için Keşif Talep Et</h2>
              <p className="mt-2 text-sm text-steel-light">
                Ekibimiz sizinle iletişime geçsin, sahada birlikte keşfedelim.
              </p>
              <div className="mt-5">
                <LeadForm kind="kesif" listing={l} compact />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
