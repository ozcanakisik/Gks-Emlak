import { z } from "zod";

// TR telefon: 10-11 hane, boşluk/parantez/+90 toleranslı.
const phoneRegex = /^(\+?90[\s-]?)?0?[\s-]?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

const adSoyad = z.string().trim().min(2, "Lütfen ad soyad girin.");
const telefon = z
  .string()
  .trim()
  .regex(phoneRegex, "Geçerli bir cep telefonu girin (örn. 0532 000 00 00).");
const email = z
  .string()
  .trim()
  .email("Geçerli bir e-posta girin.")
  .optional()
  .or(z.literal(""));
const kvkk = z.literal(true, {
  message: "Devam etmek için KVKK aydınlatma metnini onaylayın.",
});

// Keşif talebi: alıcı/kiracı sahaya keşif çağırır veya bir ilanla ilgilenir.
export const kesifSchema = z.object({
  kind: z.literal("kesif"),
  adSoyad,
  telefon,
  email,
  mulkTipi: z.string().min(1, "Mülk tipi seçin."),
  bolge: z.string().trim().min(2, "İlgilendiğiniz bölge/lokasyonu yazın."),
  notlar: z.string().trim().max(1000).optional().or(z.literal("")),
  ilanId: z.string().optional(),
  ilanBaslik: z.string().optional(),
  kvkk,
});

// Fabrikamı değerlendir: satıcı / mal sahibi akışı.
export const degerlendirSchema = z.object({
  kind: z.literal("degerlendir"),
  adSoyad,
  telefon,
  email,
  mulkTipi: z.string().min(1, "Mülk tipi seçin."),
  lokasyon: z.string().trim().min(2, "Mülkün bulunduğu lokasyonu yazın."),
  m2: z.string().trim().optional().or(z.literal("")),
  islem: z.enum(["satilik", "kiralik"], {
    message: "Satmak mı kiralamak mı istediğinizi seçin.",
  }),
  notlar: z.string().trim().max(1000).optional().or(z.literal("")),
  kvkk,
});

export const leadSchema = z.discriminatedUnion("kind", [kesifSchema, degerlendirSchema]);

export type KesifInput = z.infer<typeof kesifSchema>;
export type DegerlendirInput = z.infer<typeof degerlendirSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
