import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

// Satıcı / mal sahibi birincil dönüşüm bandı.
export default function SellerCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="blueprint-grid absolute inset-0 opacity-50" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand/15 to-transparent" />
      <Container className="relative py-20 sm:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">
            Mülk Sahibi misiniz?
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Fabrikanız Bizden, Gücünüz Sizden.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Fabrikanızı, arsanızı ya da deponuzu doğru fiyata, profesyonelce ve
            güvenle değerlendirelim. Bölgeyi, alıcıyı ve gerçek piyasayı bilen bir
            ekiple çalışmanın farkını yaşayın.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              "Ücretsiz yerinde değerlendirme",
              "Doğru fiyat & gerçek alıcı ağı",
              "Şeffaf ve hızlı süreç",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm font-medium text-white/85">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E2231A" strokeWidth="3" className="mt-0.5 shrink-0" aria-hidden>
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/degerlendir" variant="primary">
              Fabrikamı Değerlendir
            </ButtonLink>
            <ButtonLink href="/kesif" variant="ghost">
              Keşif Talep Et
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
