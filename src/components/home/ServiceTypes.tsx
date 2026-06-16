import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import type { PropertyType } from "@/lib/listings";

const services: { type: PropertyType; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    type: "sanayi-arsasi",
    title: "Sanayi Arsası",
    desc: "Üretim tesisinizi sıfırdan kurmak için imarlı, altyapısı hazır arsalar.",
    icon: <path d="M3 21V8l9-5 9 5v13M3 21h18M9 21v-6h6v6" />,
  },
  {
    type: "arsa",
    title: "Tarla / Arsa",
    desc: "Yatırım ve dönüşüm potansiyeli yüksek arsa ve tarla portföyü.",
    icon: <path d="M2 20h20M4 20l4-9 4 5 3-7 5 11" />,
  },
  {
    type: "depo",
    title: "Depo",
    desc: "Lojistik ve depolamaya uygun, rampalı ve yüksek tavanlı alanlar.",
    icon: <path d="M3 21V9l9-5 9 5v12M3 21h18M7 21v-7h10v7M7 14h10" />,
  },
  {
    type: "fabrika-deposu",
    title: "Fabrika Deposu",
    desc: "Üretim hattınızı destekleyen geniş kapalı depolama çözümleri.",
    icon: <path d="M2 21V11l5-3 5 3 5-3 5 3v10M2 21h20M6 21v-6h4v6M14 21v-6h4v6" />,
  },
  {
    type: "kiralik-fabrika",
    title: "Kiralık Fabrika",
    desc: "Vinçli, trafolu, üretime hazır kiralık imalat tesisleri.",
    icon: <path d="M3 21V10l6-4 6 4v11M9 21v-5h4v5M15 21V12l5-3v12M3 21h18M3 6h7" />,
  },
  {
    type: "satilik-fabrika",
    title: "Satılık Fabrika",
    desc: "İskânlı, anahtar teslim, komple satılık üretim tesisleri.",
    icon: <path d="M3 21V10l6-4 6 4v11M9 21v-5h4v5M15 21V12l5-3v12M3 21h18M16 7l2-2 2 2" />,
  },
];

export default function ServiceTypes() {
  return (
    <section id="hizmetler" className="scroll-mt-24 bg-white">
      <Container className="py-20 sm:py-24">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-brand">Hizmet Alanlarımız</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Sanayi gayrimenkulünün her türünde uzman çözüm
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              as="div"
              key={s.type}
              delay={(i % 3) * 0.07}
              className="group bg-white"
            >
              <Link
                href={`/ilanlar?tip=${s.type}`}
                className="flex h-full flex-col p-7 transition-colors hover:bg-bone"
              >
                <span className="flex h-12 w-12 items-center justify-center bg-ink text-white transition-colors group-hover:bg-brand">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {s.icon}
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-light">{s.desc}</p>
                <span className="mt-4 text-sm font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  İlanları gör →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
