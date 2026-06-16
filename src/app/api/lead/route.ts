import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leadSchema";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Form doğrulanamadı.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // TODO: e-posta servisi (Resend/Nodemailer) bağlanacak.
  // Örn: await sendMail({ to: site.email, subject: ..., text: JSON.stringify(lead) })
  // Şimdilik sunucu loguna yazıyoruz ki gönderim akışı uçtan uca çalışsın.
  console.log("[lead] yeni talep alındı:", JSON.stringify(lead, null, 2));

  return NextResponse.json({ ok: true });
}
