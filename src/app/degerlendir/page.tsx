import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import LeadForm from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Fabrikamı Değerlendir — Doğru Fiyata Profesyonel Değerlendirme",
  description:
    "Fabrikanızı, arsanızı ya da deponuzu doğru fiyata, profesyonelce değerlendirelim. Mülk bilgilerinizi iletin, ücretsiz değerlendirme için sizinle iletişime geçelim.",
};

export default function DegerlendirPage() {
  return (
    <>
      <PageHero
        eyebrow="Mülk Sahipleri İçin"
        title="Fabrikanızı Değerlendirelim"
        description="Fabrikanız Bizden, Gücünüz Sizden. Mülkünüzü doğru fiyata, güvenle ve hızlıca değerlendirelim."
      />
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Neden bizimle değerlendirmelisiniz?</h2>
            <ul className="mt-6 space-y-5">
              {[
                ["Gerçek piyasa değeri", "Bölgeyi ve sanayiyi bilen ekiple, mülkünüzü doğru konumlandırıyoruz."],
                ["Gerçek alıcı/kiracı ağı", "Aktif sanayici talebiyle, mülkünüzü doğru kişiyle buluşturuyoruz."],
                ["Şeffaf süreç", "Her adımda bilgilendirme; sürpriz yok, net iletişim var."],
                ["Sabit hizmet garantisi", "Uzun yıllara dayanan tecrübeyle, süreç boyunca yanınızdayız."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E2231A" strokeWidth="3" className="mt-0.5 shrink-0" aria-hidden>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-display font-bold text-ink">{t}</h3>
                    <p className="mt-1 text-sm text-steel-light">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">Mülk bilgilerinizi paylaşın</h2>
            <p className="mt-2 text-sm text-steel-light">
              Formu doldurun; ücretsiz değerlendirme için en kısa sürede sizinle iletişime geçelim.
            </p>
            <div className="mt-6">
              <LeadForm kind="degerlendir" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
