import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_EMAIL, // NOTE: configure this correctly for your Gmail account
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    console.log("📩 New contact form submission:", { name, email, phone, message });

    await transporter.sendMail({
      from: `"AquaSense Form" <dapecarlos@gmail.com>`, // Must match authenticated user
      to: "dapecarlos@gmail.com", // Where you want to receive the leads
      subject: `New Contact Request: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #0f172a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <div style="background: linear-gradient(to right, #004789, #00aeef); background-color: #004789; padding: 30px 40px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">AQUASENSE</h2>
              <p style="color: #bae6fd; margin: 8px 0 0 0; font-size: 14px;">Incoming Lead / Contact Request</p>
            </div>
            
            <div style="padding: 40px;">
              <p style="font-size: 16px; margin: 0 0 24px 0; color: #334155;">Hello Team,<br><br>You just received a new submission from the contact form.</p>
              
              <div style="background-color: #f8fafc; border-left: 4px solid #f57e25; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
                <p style="margin: 0 0 12px 0; font-size: 15px;"><strong>🙎‍♂️ Name:</strong> <span style="color: #004789;">${name}</span></p>
                <p style="margin: 0 0 12px 0; font-size: 15px;"><strong>✉️ Email:</strong> <a href="mailto:${email}" style="color: #00aeef; text-decoration: underline;">${email}</a></p>
                <p style="margin: 0; font-size: 15px;"><strong>📞 Phone:</strong> ${phone || '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}</p>
              </div>

              <h4 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin: 0 0 15px 0; font-size: 18px;">Message</h4>
              <div style="line-height: 1.6; color: #475569; font-size: 15px; background-color: #ffffff; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">This notification was generated automatically from your website.</p>
            </div>

          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}

