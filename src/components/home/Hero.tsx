"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function Hero() {
  const reduce = useReducedMotion();
  // Blueprint çizimi bitince true. reduced-motion'da direkt geç.
  const [drawn, setDrawn] = useState<boolean>(!!reduce);

  const skip = () => setDrawn(true);

  // İçerik blueprint çizimi sonrası belirir (~1.2sn). reduced-motion'da anında.
  const contentDelay = reduce ? 0 : 1.15;

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
      aria-label="Tanıtım"
    >
      {/* Sinematik gerçek hero görseli */}
      {/* TODO: gerçek görsel — /public/hero/ altına eklenecek (fabrika silüeti, gün batımı) */}
      <Image
        src="/hero/hero.svg"
        alt="Fabrika silüeti ve sanayi bölgesi"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" />
      <div className="blueprint-grid absolute inset-0 opacity-40" />

      {/* Blueprint açılış animasyonu — "çözüme açılan kapı" metaforu */}
      {!drawn && !reduce && (
        <motion.svg
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.15, duration: 0.5 }}
          onAnimationComplete={() => setDrawn(true)}
          aria-hidden
        >
          <motion.g
            fill="none"
            stroke="#E2231A"
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.05, ease: "easeInOut" }}
          >
            {/* Fabrika gövdesi + testere çatı */}
            <motion.path d="M380 520V360h440v160" />
            <motion.path d="M380 360l60-50h320l60 50" />
            {/* Kapı (çözüme açılan kapı) */}
            <motion.path d="M560 520V410h80v110" />
            {/* Baca */}
            <motion.path d="M740 310v-70h34v70" />
            {/* Zemin çizgisi */}
            <motion.path d="M250 520h700" />
          </motion.g>
        </motion.svg>
      )}

      {/* İçerik */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-28 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 border border-brand/50 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
            <span className="h-1.5 w-1.5 bg-brand" /> Silivri · Sanayi & Fabrika Gayrimenkulü
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            İşinizi Büyüten Metrekareler:{" "}
            <span className="text-brand">Doğru Fabrika, Güçlü Gelecek.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            {site.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/degerlendir" variant="primary">
              Fabrikanızı Değerlendirelim
            </ButtonLink>
            <ButtonLink href="/ilanlar" variant="ghost">
              İlanları Keşfet
            </ButtonLink>
          </div>
        </motion.div>
      </div>

      {!drawn && !reduce && (
        <button
          onClick={skip}
          className="absolute bottom-6 right-6 z-30 rounded-sm border border-white/30 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10"
        >
          Geç →
        </button>
      )}
    </section>
  );
}
