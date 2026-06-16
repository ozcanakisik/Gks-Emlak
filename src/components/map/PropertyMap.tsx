"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import { site, regions } from "@/lib/site";
import {
  formatArea,
  propertyTypeLabels,
  statusLabels,
  type Listing,
} from "@/lib/listings";

// Marka kırmızısı özel pin (Leaflet'in kırık varsayılan ikon yolu sorununu da çözer).
const brandIcon = L.divIcon({
  className: "",
  html: `<div style="position:relative;width:30px;height:42px">
    <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="#E2231A"/>
      <circle cx="15" cy="15" r="6" fill="#ffffff"/>
    </svg>
  </div>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38],
});

// Filtre değişince görünür pinlere göre haritayı sığdırır.
function FitToListings({ listings }: { listings: Listing[] }) {
  const map = useMap();
  useEffect(() => {
    if (listings.length === 0) return;
    const bounds = L.latLngBounds(
      listings.map((l) => [l.location.lat, l.location.lng] as [number, number]),
    );
    map.fitBounds(bounds.pad(0.25), { animate: true, maxZoom: 12 });
  }, [listings, map]);
  return null;
}

export default function PropertyMap({
  listings,
  showRegions = true,
  className = "h-[480px]",
}: {
  listings: Listing[];
  showRegions?: boolean;
  className?: string;
}) {
  return (
    <MapContainer
      center={[site.geo.lat, site.geo.lng]}
      zoom={9}
      scrollWheelZoom={false}
      className={`${className} w-full`}
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Faaliyet bölgeleri / koridorlar */}
      {showRegions &&
        regions.map((r) => (
          <Circle
            key={r.id}
            center={[r.lat, r.lng]}
            radius={3500}
            pathOptions={{
              color: "#1A1D21",
              weight: 1,
              fillColor: "#E2231A",
              fillOpacity: 0.08,
            }}
          />
        ))}

      {/* İlan pinleri */}
      {listings.map((l) => (
        <Marker key={l.id} position={[l.location.lat, l.location.lng]} icon={brandIcon}>
          <Popup>
            <div style={{ width: 200 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.images[0]}
                alt={l.title}
                style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: "8px 2px 2px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#E2231A", textTransform: "uppercase" }}>
                  {statusLabels[l.status]} · {propertyTypeLabels[l.type]}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, margin: "3px 0", color: "#1A1D21", lineHeight: 1.3 }}>
                  {l.title}
                </div>
                <div style={{ fontSize: 12, color: "#5b626b" }}>
                  {formatArea(l.area)} · {l.priceLabel}
                </div>
                <Link
                  href={`/ilanlar/${l.slug}`}
                  style={{ display: "inline-block", marginTop: 6, fontSize: 12, fontWeight: 700, color: "#E2231A" }}
                >
                  Detayları gör →
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      <FitToListings listings={listings} />
    </MapContainer>
  );
}
