"use client";

import { useForm, type FieldValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { kesifSchema, degerlendirSchema } from "@/lib/leadSchema";
import { propertyTypeLabels, type Listing } from "@/lib/listings";

type Kind = "kesif" | "degerlendir";

export default function LeadForm({
  kind,
  listing,
  compact = false,
}: {
  kind: Kind;
  listing?: Listing; // keşif formunda ilgili ilan otomatik gelir
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    // Tek bir form bileşeni iki şemayı yönetiyor; resolver'ı FieldValues'a uyarlıyoruz.
    resolver: zodResolver(
      kind === "kesif" ? kesifSchema : degerlendirSchema,
    ) as unknown as Resolver<FieldValues>,
    defaultValues:
      kind === "kesif"
        ? {
            kind: "kesif",
            mulkTipi: listing?.type ?? "",
            ilanId: listing?.id ?? "",
            ilanBaslik: listing?.title ?? "",
            bolge: listing?.location.bolge ?? "",
            kvkk: false,
          }
        : { kind: "degerlendir", mulkTipi: "", islem: "satilik", kvkk: false },
  });

  const onSubmit = async (values: FieldValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center border border-brand/30 bg-bone px-6 py-14 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-ink">Talebiniz alındı</h3>
        <p className="mt-2 max-w-sm text-sm text-steel-light">
          En kısa sürede sizinle iletişime geçeceğiz. İlginiz için teşekkür ederiz.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-brand hover:underline"
        >
          Yeni talep oluştur
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}
    >
      {kind === "kesif" && listing && (
        <div className="sm:col-span-2 border border-black/10 bg-bone px-4 py-3 text-sm">
          <span className="text-steel-light">İlgilenilen ilan:</span>{" "}
          <span className="font-semibold text-ink">{listing.title}</span>
        </div>
      )}

      <Field label="Ad Soyad" error={errors.adSoyad?.message as string} required>
        <input {...register("adSoyad")} className={inputCls} autoComplete="name" />
      </Field>

      <Field label="Telefon" error={errors.telefon?.message as string} required>
        <input {...register("telefon")} className={inputCls} inputMode="tel" autoComplete="tel" placeholder="0532 000 00 00" />
      </Field>

      <Field label="E-posta" error={errors.email?.message as string}>
        <input {...register("email")} className={inputCls} inputMode="email" autoComplete="email" />
      </Field>

      <Field label="Mülk Tipi" error={errors.mulkTipi?.message as string} required>
        <select {...register("mulkTipi")} className={inputCls} defaultValue="">
          <option value="">Seçiniz</option>
          {kind === "kesif" && <option value="farketmez">Farketmez</option>}
          {Object.entries(propertyTypeLabels).map(([v, label]) => (
            <option key={v} value={v}>{label}</option>
          ))}
        </select>
      </Field>

      {kind === "kesif" ? (
        <Field label="Bölge / Lokasyon" error={errors.bolge?.message as string} required>
          <input {...register("bolge")} className={inputCls} placeholder="Örn. Silivri Değirmenköy" />
        </Field>
      ) : (
        <>
          <Field label="Mülkün Lokasyonu" error={errors.lokasyon?.message as string} required>
            <input {...register("lokasyon")} className={inputCls} placeholder="İlçe / bölge" />
          </Field>
          <Field label="Yaklaşık m²" error={errors.m2?.message as string}>
            <input {...register("m2")} className={inputCls} inputMode="numeric" placeholder="Örn. 2500" />
          </Field>
          <Field label="İşlem" error={errors.islem?.message as string} className="sm:col-span-2">
            <div className="flex gap-3">
              {([
                ["satilik", "Satmak istiyorum"],
                ["kiralik", "Kiraya vermek istiyorum"],
              ] as const).map(([v, label]) => (
                <label key={v} className="flex flex-1 cursor-pointer items-center gap-2 border border-black/15 px-4 py-3 text-sm font-medium has-[:checked]:border-brand has-[:checked]:bg-brand/5">
                  <input type="radio" value={v} {...register("islem")} className="accent-brand" />
                  {label}
                </label>
              ))}
            </div>
          </Field>
        </>
      )}

      <Field label="Açıklama / Notlar" className="sm:col-span-2" error={errors.notlar?.message as string}>
        <textarea {...register("notlar")} rows={4} className={inputCls} placeholder="İhtiyaçlarınız, teknik beklentileriniz, bütçe vb." />
      </Field>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-2.5 text-sm text-steel">
          <input type="checkbox" {...register("kvkk")} className="mt-0.5 h-4 w-4 accent-brand" />
          <span>
            <a href="#" className="font-semibold text-brand hover:underline">KVKK Aydınlatma Metni</a>
            &apos;ni okudum; verilerimin talebimin değerlendirilmesi amacıyla işlenmesine onay veriyorum.{" "}
            {/* TODO: gerçek KVKK metni / sayfası bağlanacak */}
          </span>
        </label>
        {errors.kvkk?.message && (
          <p className="mt-1.5 text-sm text-brand">{errors.kvkk.message as string}</p>
        )}
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 border border-brand/40 bg-brand/5 px-4 py-3 text-sm text-brand">
          Bir sorun oluştu, lütfen tekrar deneyin veya telefonla ulaşın.
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-brand px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Gönderiliyor…" : kind === "kesif" ? "Keşif Talebi Gönder" : "Değerlendirme Talebi Gönder"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full border border-black/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand";

function Field({
  label,
  error,
  required,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-semibold text-steel">
        {label} {required && <span className="text-brand">*</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-brand">{error}</span>}
    </label>
  );
}
