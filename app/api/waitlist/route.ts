import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), "waitlist.json");

async function getEmails(): Promise<string[]> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const emails = await getEmails();

  if (emails.includes(email.toLowerCase())) {
    return NextResponse.json(
      { message: "You're already on the waitlist!" },
      { status: 200 }
    );
  }

  emails.push(email.toLowerCase());
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(emails, null, 2));

  return NextResponse.json(
    { message: "You're on the list! We'll be in touch soon." },
    { status: 201 }
  );
}
