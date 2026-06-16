"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/ilanlar", label: "İlanlar" },
  { href: "/degerlendir", label: "Fabrikamı Değerlendir" },
  { href: "/kesif", label: "Keşif Talebi" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Ana sayfada hero üstünde şeffaf başlasın; diğer sayfalarda hep katı.
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-black/5 bg-white/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} ana sayfa`}>
          <span className="flex h-9 w-9 items-center justify-center bg-brand text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M3 21V10l6-4 6 4v11M9 21v-5h4v5M15 21V12l5-3v12" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className={`block font-display text-base font-extrabold ${solid ? "text-ink" : "text-white"}`}>
              GÖKSEL EMLAK
            </span>
            <span className={`block text-[11px] font-semibold tracking-widest ${solid ? "text-steel-light" : "text-white/70"}`}>
              OTOMOTİV · SİLİVRİ
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
          {nav.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-semibold transition-colors hover:text-brand ${
                  active ? "text-brand" : solid ? "text-steel" : "text-white/90"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phones[0].tel}`}
            className="hidden items-center gap-2 rounded-sm bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:inline-flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {site.phones[0].label}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden ${solid ? "text-ink" : "text-white"}`}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-black/5 bg-white px-5 py-4 lg:hidden" aria-label="Mobil menü">
          <div className="flex flex-col">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-b border-black/5 py-3 text-sm font-semibold text-steel last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phones[0].tel}`}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-brand px-4 py-3 text-sm font-semibold text-white"
            >
              Hemen Ara · {site.phones[0].label}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
