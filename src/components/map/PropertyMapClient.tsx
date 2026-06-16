"use client";

import dynamic from "next/dynamic";
import type { Listing } from "@/lib/listings";

// Leaflet 'window' gerektirir; SSR kapalı dinamik import zorunlu.
const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] w-full items-center justify-center bg-bone text-sm text-steel-light">
      Harita yükleniyor…
    </div>
  ),
});

export default function PropertyMapClient(props: {
  listings: Listing[];
  showRegions?: boolean;
  className?: string;
}) {
  return <PropertyMap {...props} />;
}
