import { NextResponse } from "next/server";
import { after } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const normalizedEmail = email.toLowerCase().trim();
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (webhookUrl) {
    after(async () => {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: normalizedEmail,
            source: "profit-pulse-waitlist",
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) {
          console.error("GHL webhook failed", res.status, await res.text());
        }
      } catch (err) {
        console.error("GHL webhook error", err);
      }
    });
  } else {
    console.warn("GHL_WEBHOOK_URL not set — skipping forward");
  }

  return NextResponse.json(
    { message: "You're on the list! We'll be in touch soon." },
    { status: 201 }
  );
}
