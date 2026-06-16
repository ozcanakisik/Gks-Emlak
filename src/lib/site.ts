// Gerçek marka bilgileri — yalnızca buradan kullanılacak (bkz. spec madde 10).
export const site = {
  name: "Göksel Emlak Otomotiv",
  shortName: "Göksel Emlak",
  description:
    "Fabrika & Gayrimenkul ihtiyacınıza özel profesyonel çözümler ile yanınızdayız.",
  url: "https://gokselemlakotomotiv.com", // TODO: gerçek domain teyit edilecek
  city: "İstanbul",
  district: "Silivri",
  address:
    "Silivri Mimar Sinan Mah. Şehit Necati Sandıkçı Sok. No:41, Silivri / İstanbul",
  // Silivri merkez koordinatı (harita varsayılan merkezi için yaklaşık)
  geo: { lat: 41.0735, lng: 28.2466 },
  phones: [
    { label: "0538 061 45 89", tel: "+905380614589" },
    { label: "0532 232 69 13", tel: "+905322326913" },
  ],
  email: "info@gokselemlakotomotiv.com", // TODO: gerçek e-posta teyit edilecek
  social: {
    instagram: "https://instagram.com/gokselemlakotomotiv",
    instagramHandle: "@gokselemlakotomotiv",
    tiktok: "https://www.tiktok.com/@gokselemlakotomotiv",
    tiktokHandle: "@gokselemlakotomotiv",
  },
  slogans: [
    "Fabrika Kiralamada Uzman Çözüm Ortağınız",
    "Fabrikanız Bizden, Gücünüz Sizden",
    "Kiralık fabrika ihtiyaçlarınız için çözüme açılan kapınız",
    "Doğru Fabrika, Güçlü Gelecek",
  ],
} as const;

// Faaliyet bölgeleri / koridorlar (harita ve filtre için).
export const regions = [
  { id: "silivri-degirmenkoy", name: "Silivri Değirmenköy", lat: 41.1108, lng: 28.2747 },
  { id: "silivri-alipasa", name: "Silivri Alipaşa", lat: 41.1342, lng: 28.2031 },
  { id: "corlu", name: "Çorlu", lat: 41.159, lng: 27.7967 },
  { id: "cerkezkoy", name: "Çerkezköy", lat: 41.2872, lng: 27.9986 },
  { id: "hadimkoy", name: "Hadımköy", lat: 41.1278, lng: 28.6717 },
] as const;
