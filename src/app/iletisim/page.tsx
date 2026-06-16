import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import PropertyMapClient from "@/components/map/PropertyMapClient";
import LeadForm from "@/components/forms/LeadForm";
import { site } from "@/lib/site";
import type { Listing } from "@/lib/listings";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${site.name} iletişim bilgileri. ${site.address} — ${site.phones[0].label}`,
};

// Ofis konumunu haritada göstermek için tek noktalık temsilî kayıt.
const officePin: Listing = {
  id: "ofis",
  slug: "#",
  title: site.name,
  type: "kiralik-fabrika",
  status: "kiralik",
  priceLabel: site.address,
  location: { bolge: "Ofis", ilce: site.district, sehir: site.city, lat: site.geo.lat, lng: site.geo.lng },
  area: { toplamM2: 0 },
  imarDurumu: "-",
  images: ["/listings/placeholder-1.svg"],
  description: site.address,
};

export default function IletisimPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Bize Ulaşın"
        description="Sorularınız ve talepleriniz için bize ulaşın; en kısa sürede dönüş yapalım."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="space-y-7">
              <InfoBlock title="Adres">
                <p>{site.address}</p>
              </InfoBlock>
              <InfoBlock title="Telefon">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="block font-semibold text-ink transition-colors hover:text-brand">
                    {p.label}
                  </a>
                ))}
              </InfoBlock>
              <InfoBlock title="E-posta">
                {/* TODO: gerçek e-posta teyit edilecek */}
                <a href={`mailto:${site.email}`} className="font-semibold text-ink transition-colors hover:text-brand">
                  {site.email}
                </a>
              </InfoBlock>
              <InfoBlock title="Sosyal Medya">
                <div className="flex gap-4">
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink transition-colors hover:text-brand">
                    Instagram {site.social.instagramHandle}
                  </a>
                </div>
                <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-ink transition-colors hover:text-brand">
                  TikTok {site.social.tiktokHandle}
                </a>
              </InfoBlock>
            </div>

            <div className="mt-8 overflow-hidden border border-black/10">
              <PropertyMapClient listings={[officePin]} showRegions={false} className="h-[300px]" />
            </div>
          </div>

          <div className="border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">Mesaj Bırakın</h2>
            <p className="mt-2 text-sm text-steel-light">
              Talebinizi iletin; ekibimiz en kısa sürede sizinle iletişime geçsin.
            </p>
            <div className="mt-6">
              <LeadForm kind="kesif" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-widest text-brand">{title}</h2>
      <div className="mt-2 text-steel-light">{children}</div>
    </div>
  );
}
