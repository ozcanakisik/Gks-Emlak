import Link from "next/link";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-brand bg-ink text-white/80">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-xl font-extrabold text-white">{site.name}</div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            <p className="mt-5 text-sm font-semibold text-brand">
              {site.slogans[2]}
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Menü
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/ilanlar", label: "İlanlar" },
                { href: "/degerlendir", label: "Fabrikamı Değerlendir" },
                { href: "/kesif", label: "Keşif Talebi" },
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/iletisim", label: "İletişim" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              İletişim
            </h3>
            <address className="mt-4 space-y-2.5 text-sm not-italic text-white/60">
              <p>{site.address}</p>
              <p className="space-x-2">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="block transition-colors hover:text-brand">
                    {p.label}
                  </a>
                ))}
              </p>
              <div className="flex gap-4 pt-2">
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">
                  Instagram
                </a>
                <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">
                  TikTok
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {year} {site.name}. Tüm hakları saklıdır.</p>
          <p>Silivri / İstanbul · Sanayi & Fabrika Gayrimenkulü</p>
        </div>
      </Container>
    </footer>
  );
}
