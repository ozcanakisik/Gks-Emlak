"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListingCard from "@/components/listings/ListingCard";
import PropertyMapClient from "@/components/map/PropertyMapClient";
import {
  listings,
  propertyTypeLabels,
  statusLabels,
  type ListingStatus,
  type PropertyType,
} from "@/lib/listings";

type View = "grid" | "harita";

const allTypes = Object.keys(propertyTypeLabels) as PropertyType[];
const ilceler = Array.from(new Set(listings.map((l) => l.location.ilce))).sort();
const imarlar = Array.from(new Set(listings.map((l) => l.imarDurumu))).sort();

export default function ListingsBrowser() {
  const params = useSearchParams();

  const [view, setView] = useState<View>(
    params.get("gorunum") === "harita" ? "harita" : "grid",
  );
  const [type, setType] = useState<PropertyType | "">(
    (params.get("tip") as PropertyType) || "",
  );
  const [status, setStatus] = useState<ListingStatus | "">(
    (params.get("status") as ListingStatus) || "",
  );
  const [ilce, setIlce] = useState<string>(params.get("ilce") || "");
  const [imar, setImar] = useState<string>("");
  const [minM2, setMinM2] = useState<string>("");
  const [maxM2, setMaxM2] = useState<string>("");

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (type && l.type !== type) return false;
      if (status && l.status !== status) return false;
      if (ilce && l.location.ilce !== ilce) return false;
      if (imar && l.imarDurumu !== imar) return false;
      if (minM2 && l.area.toplamM2 < Number(minM2)) return false;
      if (maxM2 && l.area.toplamM2 > Number(maxM2)) return false;
      return true;
    });
  }, [type, status, ilce, imar, minM2, maxM2]);

  const reset = () => {
    setType("");
    setStatus("");
    setIlce("");
    setImar("");
    setMinM2("");
    setMaxM2("");
  };

  const hasFilters = type || status || ilce || imar || minM2 || maxM2;

  return (
    <div>
      {/* Filtre çubuğu */}
      <div className="border border-black/10 bg-white p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          <Select label="Durum" value={status} onChange={(v) => setStatus(v as ListingStatus | "")}>
            <option value="">Tümü</option>
            {(Object.keys(statusLabels) as ListingStatus[]).map((s) => (
              <option key={s} value={s}>{statusLabels[s]}</option>
            ))}
          </Select>

          <Select label="Tür" value={type} onChange={(v) => setType(v as PropertyType | "")}>
            <option value="">Tümü</option>
            {allTypes.map((t) => (
              <option key={t} value={t}>{propertyTypeLabels[t]}</option>
            ))}
          </Select>

          <Select label="İlçe" value={ilce} onChange={setIlce}>
            <option value="">Tümü</option>
            {ilceler.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </Select>

          <Select label="İmar" value={imar} onChange={setImar}>
            <option value="">Tümü</option>
            {imarlar.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </Select>

          <NumberField label="Min m²" value={minM2} onChange={setMinM2} />
          <NumberField label="Max m²" value={maxM2} onChange={setMaxM2} />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4">
          <p className="text-sm text-steel-light">
            <span className="font-bold text-ink">{filtered.length}</span> ilan listeleniyor
            {hasFilters && (
              <button onClick={reset} className="ml-3 font-semibold text-brand hover:underline">
                Filtreleri temizle
              </button>
            )}
          </p>

          <div className="inline-flex overflow-hidden border border-black/15" role="tablist" aria-label="Görünüm">
            {(["grid", "harita"] as View[]).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  view === v ? "bg-ink text-white" : "bg-white text-steel hover:bg-bone"
                }`}
              >
                {v === "grid" ? "Liste" : "Harita"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sonuçlar */}
      <div className="mt-8">
        {view === "grid" ? (
          filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          ) : (
            <EmptyState onReset={reset} />
          )
        ) : (
          <div className="overflow-hidden border border-black/10">
            <PropertyMapClient listings={filtered} className="h-[600px]" />
          </div>
        )}
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-semibold text-steel">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-black/15 bg-white px-3 py-2.5 text-ink outline-none focus:border-brand"
      >
        {children}
      </select>
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-semibold text-steel">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full border border-black/15 bg-white px-3 py-2.5 text-ink outline-none focus:border-brand"
      />
    </label>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border border-dashed border-black/15 bg-bone py-20 text-center">
      <p className="font-display text-lg font-bold text-ink">Sonuç bulunamadı</p>
      <p className="mt-2 text-sm text-steel-light">
        Seçtiğiniz kriterlere uygun ilan yok. Filtreleri genişletmeyi deneyin.
      </p>
      <button onClick={onReset} className="mt-4 text-sm font-semibold text-brand hover:underline">
        Filtreleri temizle
      </button>
    </div>
  );
}
