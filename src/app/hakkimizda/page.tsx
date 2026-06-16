import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Göksel Emlak Otomotiv — Silivri merkezli, sanayi ve fabrika gayrimenkulünde uzman çözüm ortağınız.",
};

export default function HakkimizdaPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Fabrika Kiralamada Uzman Çözüm Ortağınız"
        description={site.description}
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold text-ink">
              Sanayinin dilinden anlayan bir ekip
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-steel">
              <p>
                {site.name} olarak Silivri ve çevresinde; sanayi arsası, arsa,
                tarla, depo, fabrika deposu, antre ile kiralık ve satılık fabrika
                alanında profesyonel çözümler sunuyoruz.
              </p>
              <p>
                Hedefimiz net: Mülk sahipleri için doğru fiyata, güvenli ve şeffaf
                bir değerlendirme; alıcı ve kiracılar için ise teknik ihtiyaçlarına
                tam uyan mülkü en kısa sürede bulmak. Vinç kapasitesinden trafo
                gücüne, imar durumundan tavan yüksekliğine kadar sanayicinin
                gerçekten önem verdiği detayları biliyoruz.
              </p>
              <p>
                Uzun yıllara dayanan tecrübemiz ve sabit hizmet anlayışımızla,
                süreç boyunca yanınızda olan güvenilir bir çözüm ortağıyız.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/degerlendir" variant="primary">Fabrikamı Değerlendir</ButtonLink>
              <ButtonLink href="/ilanlar" variant="outline">İlanları Keşfet</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-black/10 bg-bone p-8">
              <h3 className="font-display text-lg font-bold text-ink">İlkelerimiz</h3>
              <ul className="mt-5 space-y-4">
                {[
                  ["Güven", "Mülk sahibinin ve alıcının çıkarını her zaman önceliklendiririz."],
                  ["Uzmanlık", "Sanayi gayrimenkulünün teknik gerekliliklerine hâkimiz."],
                  ["Şeffaflık", "Süreç boyunca açık ve dürüst iletişim kurarız."],
                  ["Hız", "Doğru mülkü ve doğru alıcıyı zaman kaybetmeden buluştururuz."],
                ].map(([t, d]) => (
                  <li key={t} className="border-l-2 border-brand pl-4">
                    <p className="font-display font-bold text-ink">{t}</p>
                    <p className="text-sm text-steel-light">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>

      <section className="bg-ink">
        <Container className="py-14 text-center">
          <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            “{site.slogans[3]}”
          </p>
        </Container>
      </section>
    </>
  );
}
