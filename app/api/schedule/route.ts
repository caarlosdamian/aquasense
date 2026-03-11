import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, date, time, topic, notes } = body;

    if (!name || !email || !date || !time || !topic) {
      return NextResponse.json(
        { error: "Name, email, date, time, and topic are required." },
        { status: 400 }
      );
    }

    // TODO: Integrate your email / calendar service here
    // e.g. send confirmation email, create calendar event, etc.
    console.log("📅 New meeting request:", { name, email, date, time, topic, notes });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
