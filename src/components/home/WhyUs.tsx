import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const reasons = [
  {
    title: "Her bütçeye uygun fabrikalar",
    desc: "Küçük atölyeden büyük üretim tesisine, farklı ölçek ve bütçelere uygun geniş portföy.",
    icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  },
  {
    title: "İhtiyacınıza uygun çözümler",
    desc: "Vinç, trafo, tavan yüksekliği, imar gibi teknik kriterlere göre doğru eşleştirme.",
    icon: <path d="M14.7 6.3a4 4 0 00-5.4 5.4l-6 6 2.7 2.7 6-6a4 4 0 005.4-5.4l-2.5 2.5-2.2-2.2 2.5-2.5z" />,
  },
  {
    title: "Sabit hizmet garantisi",
    desc: "Uzun yıllara dayanan tecrübeyle, süreç boyunca yanınızda olan istikrarlı bir çözüm ortağı.",
    icon: <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" />,
  },
];

export default function WhyUs() {
  return (
    <section className="bg-white">
      <Container className="py-20 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">Neden Biz?</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Sanayiciyi anlayan bir çözüm ortağı
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal as="div" key={r.title} delay={i * 0.1} className="border-l-2 border-brand pl-6">
              <span className="flex h-12 w-12 items-center justify-center bg-bone text-brand">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {r.icon}
                </svg>
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-steel-light">{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
