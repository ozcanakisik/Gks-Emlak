// İlan veri modeli — ileride CMS'e taşınabilir olacak şekilde tipli tutuldu.
// NOT (spec madde 11): Fiyat/m² gibi gerçek olmayan kesin rakamlar uydurulmadı.
// Fiyatlar "Fiyat için iletişime geçin" olarak bırakıldı; teknik değerler temsilî
// olup gerçek ilan girişinde güncellenmeli. // TODO: gerçek ilan verileriyle değiştirilecek.

export type PropertyType =
  | "sanayi-arsasi"
  | "arsa"
  | "tarla"
  | "depo"
  | "fabrika-deposu"
  | "antre"
  | "kiralik-fabrika"
  | "satilik-fabrika";

export type ListingStatus = "satilik" | "kiralik";

export interface Listing {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  status: ListingStatus;
  priceLabel: string;
  location: {
    bolge: string;
    ilce: string;
    sehir: string;
    lat: number;
    lng: number;
  };
  area: { acikM2?: number; kapaliM2?: number; toplamM2: number };
  imarDurumu: string;
  tapuDurumu?: string;
  osb?: string | null;
  yolaCephe?: boolean;
  tavanYuksekligiM?: number;
  vincKapasitesi?: string;
  trafoGucu?: string;
  altyapi?: { dogalgaz?: boolean; elektrik?: boolean; su?: boolean };
  ruhsat?: string;
  images: string[];
  description: string;
  featured?: boolean;
}

export const propertyTypeLabels: Record<PropertyType, string> = {
  "sanayi-arsasi": "Sanayi Arsası",
  arsa: "Arsa",
  tarla: "Tarla",
  depo: "Depo",
  "fabrika-deposu": "Fabrika Deposu",
  antre: "Antre",
  "kiralik-fabrika": "Kiralık Fabrika",
  "satilik-fabrika": "Satılık Fabrika",
};

export const statusLabels: Record<ListingStatus, string> = {
  satilik: "Satılık",
  kiralik: "Kiralık",
};

const PRICE_ON_REQUEST = "Fiyat için iletişime geçin";
// Paylaşılan placeholder görseller. // TODO: gerçek görsel
const ph = (n: number) => `/listings/placeholder-${n}.svg`;

export const listings: Listing[] = [
  {
    id: "1",
    slug: "degirmenkoy-sanayi-arsasi-yola-cepheli",
    title: "Değirmenköy Sanayi Bölgesi'nde Yola Cepheli Sanayi Arsası",
    type: "sanayi-arsasi",
    status: "satilik",
    priceLabel: PRICE_ON_REQUEST,
    location: {
      bolge: "Silivri Değirmenköy Sanayi Bölgesi",
      ilce: "Silivri",
      sehir: "İstanbul",
      lat: 41.1112,
      lng: 28.2759,
    },
    area: { toplamM2: 5200 },
    imarDurumu: "Sanayi",
    tapuDurumu: "Müstakil tapu",
    osb: null,
    yolaCephe: true,
    altyapi: { dogalgaz: true, elektrik: true, su: true },
    images: [ph(1), ph(2), ph(3)],
    description:
      "Değirmenköy sanayi koridorunda, ana yola cepheli, sanayi imarlı arsa. Altyapısı tamamlanmış bölgede üretim tesisi kurmaya uygun konum.",
    featured: true,
  },
  {
    id: "2",
    slug: "alipasa-kiralik-fabrika-vincli",
    title: "Alipaşa'da Vinçli Kiralık Fabrika",
    type: "kiralik-fabrika",
    status: "kiralik",
    priceLabel: PRICE_ON_REQUEST,
    location: {
      bolge: "Silivri Alipaşa",
      ilce: "Silivri",
      sehir: "İstanbul",
      lat: 41.1349,
      lng: 28.2044,
    },
    area: { acikM2: 1800, kapaliM2: 3200, toplamM2: 5000 },
    imarDurumu: "Sanayi",
    osb: null,
    yolaCephe: true,
    tavanYuksekligiM: 9,
    vincKapasitesi: "10 ton köprü vinç",
    trafoGucu: "630 kVA",
    altyapi: { dogalgaz: true, elektrik: true, su: true },
    ruhsat: "Yapı ruhsatı mevcut",
    images: [ph(2), ph(3), ph(1)],
    description:
      "Üretime hazır, köprü vinçli kapalı imalat alanı. Yüksek tavan ve güçlü trafo kapasitesiyle ağır sanayi imalatına uygun kiralık fabrika.",
    featured: true,
  },
  {
    id: "3",
    slug: "cerkezkoy-osb-satilik-fabrika",
    title: "Çerkezköy OSB'de Satılık Komple Fabrika",
    type: "satilik-fabrika",
    status: "satilik",
    priceLabel: PRICE_ON_REQUEST,
    location: {
      bolge: "Çerkezköy Organize Sanayi Bölgesi",
      ilce: "Çerkezköy",
      sehir: "Tekirdağ",
      lat: 41.2881,
      lng: 28.0001,
    },
    area: { acikM2: 4000, kapaliM2: 8500, toplamM2: 12500 },
    imarDurumu: "Sanayi (OSB)",
    osb: "Çerkezköy OSB",
    yolaCephe: true,
    tavanYuksekligiM: 11,
    vincKapasitesi: "2 x 16 ton köprü vinç",
    trafoGucu: "1600 kVA",
    altyapi: { dogalgaz: true, elektrik: true, su: true },
    ruhsat: "İskânlı",
    images: [ph(3), ph(1), ph(2)],
    description:
      "Çerkezköy OSB içinde, iskânlı, doğalgaz hattı bağlı komple üretim tesisi. İdari bina, sosyal alanlar ve geniş manevra sahası mevcut.",
    featured: true,
  },
  {
    id: "4",
    slug: "corlu-kiralik-depo-fabrika-deposu",
    title: "Çorlu'da Yüksek Tavanlı Kiralık Fabrika Deposu",
    type: "fabrika-deposu",
    status: "kiralik",
    priceLabel: PRICE_ON_REQUEST,
    location: {
      bolge: "Çorlu Sanayi",
      ilce: "Çorlu",
      sehir: "Tekirdağ",
      lat: 41.1598,
      lng: 27.798,
    },
    area: { kapaliM2: 6000, toplamM2: 7500 },
    imarDurumu: "Sanayi",
    osb: null,
    yolaCephe: true,
    tavanYuksekligiM: 10,
    trafoGucu: "800 kVA",
    altyapi: { elektrik: true, su: true },
    images: [ph(1), ph(3), ph(2)],
    description:
      "Lojistik ve depolama için ideal, yüksek tavanlı, tır manevrasına uygun rampalı kapalı depo alanı. D-100 ve TEM bağlantılarına yakın.",
    featured: true,
  },
  {
    id: "5",
    slug: "hadimkoy-satilik-sanayi-arsasi",
    title: "Hadımköy'de Yatırımlık Satılık Sanayi Arsası",
    type: "sanayi-arsasi",
    status: "satilik",
    priceLabel: PRICE_ON_REQUEST,
    location: {
      bolge: "Hadımköy",
      ilce: "Arnavutköy",
      sehir: "İstanbul",
      lat: 41.1285,
      lng: 28.6729,
    },
    area: { toplamM2: 9800 },
    imarDurumu: "Sanayi",
    tapuDurumu: "Hisseli değil, müstakil",
    osb: null,
    yolaCephe: true,
    altyapi: { elektrik: true, su: true },
    images: [ph(2), ph(1), ph(3)],
    description:
      "Hadımköy lojistik koridorunda, gelişen sanayi bölgesinde yatırımlık büyük arsa. Ulaşım akslarına yakın, değer artış potansiyeli yüksek.",
  },
  {
    id: "6",
    slug: "degirmenkoy-tarla-imar-potansiyelli",
    title: "Değirmenköy'de İmar Potansiyelli Tarla",
    type: "tarla",
    status: "satilik",
    priceLabel: PRICE_ON_REQUEST,
    location: {
      bolge: "Silivri Değirmenköy",
      ilce: "Silivri",
      sehir: "İstanbul",
      lat: 41.1051,
      lng: 28.2702,
    },
    area: { toplamM2: 15000 },
    imarDurumu: "Tarım",
    tapuDurumu: "Tarla vasıflı",
    osb: null,
    yolaCephe: true,
    images: [ph(3), ph(2), ph(1)],
    description:
      "Sanayi bölgesine komşu konumda, yola cepheli geniş tarla. Uzun vadeli yatırım ve dönüşüm potansiyeli açısından değerlendirilebilir.",
  },
  {
    id: "7",
    slug: "corlu-kiralik-antre-uretim-alani",
    title: "Çorlu'da Kiralık Antre / Üretim Alanı",
    type: "antre",
    status: "kiralik",
    priceLabel: PRICE_ON_REQUEST,
    location: {
      bolge: "Çorlu Sanayi",
      ilce: "Çorlu",
      sehir: "Tekirdağ",
      lat: 41.1635,
      lng: 27.8051,
    },
    area: { kapaliM2: 1200, toplamM2: 1500 },
    imarDurumu: "Sanayi",
    osb: null,
    tavanYuksekligiM: 6,
    trafoGucu: "250 kVA",
    altyapi: { elektrik: true, su: true },
    images: [ph(1), ph(2), ph(3)],
    description:
      "Küçük ve orta ölçekli imalat için uygun, bölünebilir antre / üretim alanı. Hızlı taşınıma hazır, esnek kullanım imkânı.",
  },
  {
    id: "8",
    slug: "cerkezkoy-kiralik-depo",
    title: "Çerkezköy'de Lojistiğe Uygun Kiralık Depo",
    type: "depo",
    status: "kiralik",
    priceLabel: PRICE_ON_REQUEST,
    location: {
      bolge: "Çerkezköy",
      ilce: "Çerkezköy",
      sehir: "Tekirdağ",
      lat: 41.2835,
      lng: 27.9921,
    },
    area: { kapaliM2: 3500, toplamM2: 4200 },
    imarDurumu: "Sanayi",
    osb: null,
    yolaCephe: true,
    tavanYuksekligiM: 8,
    altyapi: { elektrik: true, su: true },
    images: [ph(2), ph(3), ph(1)],
    description:
      "Yükleme rampalı, geniş manevra alanlı kiralık depo. Dağıtım ve depolama operasyonları için elverişli konum ve altyapı.",
  },
];

export const featuredListings = listings.filter((l) => l.featured);

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function formatArea(area: Listing["area"]): string {
  return `${area.toplamM2.toLocaleString("tr-TR")} m²`;
}
