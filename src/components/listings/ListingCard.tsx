import Image from "next/image";
import Link from "next/link";
import {
  formatArea,
  propertyTypeLabels,
  statusLabels,
  type Listing,
} from "@/lib/listings";

export default function ListingCard({ listing }: { listing: Listing }) {
  const l = listing;
  return (
    <Link
      href={`/ilanlar/${l.slug}`}
      className="group flex flex-col overflow-hidden border border-black/10 bg-white transition-all hover:border-brand/40 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-steel">
        <Image
          src={l.images[0]}
          alt={l.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-0 top-0 flex">
          <span className="bg-brand px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            {statusLabels[l.status]}
          </span>
          <span className="bg-ink/85 px-3 py-1.5 text-xs font-semibold text-white">
            {propertyTypeLabels[l.type]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-brand">
          {l.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-steel-light">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {l.location.bolge}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-black/5 py-3 text-center">
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-steel-light">Toplam</dt>
            <dd className="font-display text-sm font-bold text-ink">{formatArea(l.area)}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-steel-light">İmar</dt>
            <dd className="font-display text-sm font-bold text-ink">{l.imarDurumu}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-steel-light">
              {l.area.kapaliM2 ? "Kapalı" : "Cephe"}
            </dt>
            <dd className="font-display text-sm font-bold text-ink">
              {l.area.kapaliM2 ? `${l.area.kapaliM2.toLocaleString("tr-TR")} m²` : l.yolaCephe ? "Var" : "—"}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm font-semibold text-brand">{l.priceLabel}</span>
          <span className="text-sm font-semibold text-steel transition-colors group-hover:text-brand">
            Detay →
          </span>
        </div>
      </div>
    </Link>
  );
}
