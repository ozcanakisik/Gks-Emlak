# Göksel Emlak Otomotiv

Silivri merkezli **sanayi & fabrika gayrimenkulü** sitesi. Sanayi arsası, arsa, tarla, depo, fabrika deposu, antre ve kiralık/satılık fabrika ilanları; mülk sahipleri için değerlendirme akışı, alıcı/kiracı için keşif talebi ve interaktif harita.

## Teknolojiler

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **framer-motion** (hero blueprint animasyonu, scroll-reveal)
- **react-leaflet** + OpenStreetMap (interaktif harita)
- **react-hook-form** + **zod** (form & doğrulama)

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production derleme
```

## Yapı

```
src/
  app/                # sayfalar (App Router) + /api/lead
  components/         # layout, home, listings, forms, map, ui
  lib/                # site sabitleri, ilan veri modeli, form şemaları
public/               # hero & ilan placeholder görselleri
```

## Yapılacaklar (TODO)

- [ ] Gerçek hero ve ilan görsellerini `public/` altına ekle
- [ ] `src/lib/listings.ts` — ilanları gerçek veriyle güncelle (fiyatlar "Fiyat için iletişime geçin")
- [ ] `src/app/api/lead/route.ts` — e-posta servisi (Resend/Nodemailer) bağla
- [ ] Logo ve marka kırmızısının net hex değeri
- [ ] KVKK aydınlatma metni sayfası

## İletişim

Göksel Emlak Otomotiv — Silivri / İstanbul · 0538 061 45 89 · 0532 232 69 13
