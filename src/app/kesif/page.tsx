import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import LeadForm from "@/components/forms/LeadForm";
import { regions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Keşif Talebi — Sahada Birlikte Keşfedelim",
  description:
    "Aradığınız bölgede ya da ilgilendiğiniz mülkte ekibimiz sahada keşif yapsın. Keşif talebinizi iletin, sizinle iletişime geçelim.",
};

export default function KesifPage() {
  return (
    <>
      <PageHero
        eyebrow="Alıcı & Kiracı"
        title="Keşif Talep Et"
        description="Ekibimiz mülkünüzde ya da aradığınız bölgede sahada keşif yapsın; doğru mülkü birlikte bulalım."
      />
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Keşif nasıl işler?</h2>
            <ol className="mt-6 space-y-6">
              {[
                ["Talebinizi iletin", "Aradığınız mülk tipini, bölgeyi ve beklentilerinizi paylaşın."],
                ["Sizi arayalım", "Kriterlerinize uygun portföyümüzü ve seçenekleri konuşalım."],
                ["Sahada keşif", "Uygun mülklerde birlikte yerinde keşif planlayalım."],
                ["Aksiyon", "Doğru mülkte hızlı ve güvenli şekilde anlaşmaya varalım."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink font-display font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-ink">{t}</h3>
                    <p className="mt-1 text-sm text-steel-light">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-l-2 border-brand bg-bone p-5 text-sm text-steel">
              <p className="font-semibold text-ink">Faaliyet bölgelerimiz</p>
              <p className="mt-1">{regions.map((r) => r.name).join(" · ")}</p>
            </div>
          </div>

          <div className="border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm kind="kesif" />
          </div>
        </div>
      </Container>
    </>
  );
}
