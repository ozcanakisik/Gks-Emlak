import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink text-white">
      <div className="mx-auto max-w-xl px-5 text-center">
        <p className="font-display text-6xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Sayfa bulunamadı</h1>
        <p className="mt-3 text-white/70">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/" variant="primary">Ana Sayfa</ButtonLink>
          <ButtonLink href="/ilanlar" variant="ghost">İlanlar</ButtonLink>
        </div>
      </div>
    </section>
  );
}
