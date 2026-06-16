import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

// Rakamlar placeholder — gerçek değerlerle güncellenecek. // TODO
const stats = [
  { value: "Uzun Yıllar", label: "Sektörde tecrübe" },
  { value: "%100", label: "Sabit hizmet garantisi" },
  { value: "5+ Bölge", label: "Aktif faaliyet koridoru" },
  { value: "Geniş", label: "Sanayi portföyü" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-black/10 bg-bone">
      <Container className="py-10">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal as="div" key={s.label} delay={i * 0.08} className="text-center md:text-left">
              <dt className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm font-medium text-steel-light">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
