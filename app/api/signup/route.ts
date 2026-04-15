import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email, selectedPlan,
      fullName, phone, address,
      poolShape, petName,
      gateAccess, gateCode, gateNotes,
      timeSlot1, timeSlot2, timeNotes,
    } = body;

    if (!email || !fullName || !phone || !address) {
      return NextResponse.json(
        { error: "Email, full name, phone, and address are required." },
        { status: 400 }
      );
    }

    console.log("📩 New membership signup:", body);

    await transporter.sendMail({
      from: `"AquaSense Signup" <${process.env.GOOGLE_EMAIL}>`,
      to: process.env.GOOGLE_EMAIL,
      subject: `New Membership Signup: ${fullName}`,
      text: `
New Membership Signup
=====================
Plan: ${selectedPlan === "yearly" ? "Yearly Membership ($49.99/yr)" : "Monthly Service ($69.99/mo)"}

Contact Info
------------
Name:    ${fullName}
Email:   ${email}
Phone:   ${phone}
Address: ${address}

Pool Details
------------
Shape:   ${poolShape}
Pet:     ${petName || "None"}

Gate Access
-----------
Access:  ${gateAccess}
Code:    ${gateCode || "None"}
Notes:   ${gateNotes || "None"}

Time Preference
---------------
Slot 1:  ${timeSlot1}
Slot 2:  ${timeSlot2}
Notes:   ${timeNotes || "None"}
      `.trim(),
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #0f172a;">
          <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">

            <div style="background: linear-gradient(to right, #1d4ed8, #06b6d4); padding: 30px 40px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">AQUASENSE</h2>
              <p style="color: #bae6fd; margin: 8px 0 0 0; font-size: 14px;">New Membership Signup 🎉</p>
            </div>

            <div style="padding: 32px 40px;">

              <table style="width:100%; border-collapse:collapse; margin-bottom:24px; background:#eff6ff; border-radius:8px; overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px; font-size:13px; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Plan Selected</td>
                  <td style="padding:16px 20px; font-size:16px; font-weight:700; color:#1d4ed8;">
                    ${selectedPlan === "yearly" ? "⭐ Yearly Membership — $49.99/yr" : "📆 Monthly Service — $69.99/mo"}
                  </td>
                </tr>
              </table>

              <h3 style="color:#0f172a; font-size:16px; border-bottom:2px solid #e2e8f0; padding-bottom:8px; margin:0 0 16px 0;">Contact Information</h3>
              <table style="width:100%; border-collapse:collapse; margin-bottom:28px;">
                <tr><td style="padding:6px 0; color:#64748b; width:100px;">👤 Name</td><td style="padding:6px 0; color:#0f172a; font-weight:600;">${fullName}</td></tr>
                <tr><td style="padding:6px 0; color:#64748b;">✉️ Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#06b6d4;">${email}</a></td></tr>
                <tr><td style="padding:6px 0; color:#64748b;">📞 Phone</td><td style="padding:6px 0; color:#0f172a;">${phone}</td></tr>
                <tr><td style="padding:6px 0; color:#64748b;">📍 Address</td><td style="padding:6px 0; color:#0f172a;">${address}</td></tr>
              </table>

              <h3 style="color:#0f172a; font-size:16px; border-bottom:2px solid #e2e8f0; padding-bottom:8px; margin:0 0 16px 0;">Pool Details</h3>
              <table style="width:100%; border-collapse:collapse; margin-bottom:28px;">
                <tr><td style="padding:6px 0; color:#64748b; width:100px;">🏊 Shape</td><td style="padding:6px 0; color:#0f172a; font-weight:600;">${poolShape}</td></tr>
                <tr><td style="padding:6px 0; color:#64748b;">🐾 Pet</td><td style="padding:6px 0; color:#0f172a;">${petName || "None"}</td></tr>
              </table>

              <h3 style="color:#0f172a; font-size:16px; border-bottom:2px solid #e2e8f0; padding-bottom:8px; margin:0 0 16px 0;">Gate Access</h3>
              <table style="width:100%; border-collapse:collapse; margin-bottom:28px;">
                <tr><td style="padding:6px 0; color:#64748b; width:100px;">🚪 Access</td><td style="padding:6px 0; color:#0f172a; font-weight:600;">${gateAccess}</td></tr>
                <tr><td style="padding:6px 0; color:#64748b;">🔐 Code</td><td style="padding:6px 0; color:#0f172a;">${gateCode || "None"}</td></tr>
                <tr><td style="padding:6px 0; color:#64748b;">📝 Notes</td><td style="padding:6px 0; color:#0f172a;">${gateNotes || "None"}</td></tr>
              </table>

              <h3 style="color:#0f172a; font-size:16px; border-bottom:2px solid #e2e8f0; padding-bottom:8px; margin:0 0 16px 0;">Time Preference</h3>
              <table style="width:100%; border-collapse:collapse; margin-bottom:28px;">
                <tr><td style="padding:6px 0; color:#64748b; width:100px;">🕐 Slot 1</td><td style="padding:6px 0; color:#0f172a; font-weight:600;">${timeSlot1}</td></tr>
                <tr><td style="padding:6px 0; color:#64748b;">🕑 Slot 2</td><td style="padding:6px 0; color:#0f172a; font-weight:600;">${timeSlot2}</td></tr>
                <tr><td style="padding:6px 0; color:#64748b;">📝 Notes</td><td style="padding:6px 0; color:#0f172a;">${timeNotes || "None"}</td></tr>
              </table>

            </div>

            <div style="background-color: #f1f5f9; padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">AquaSense Membership Signup — generated automatically.</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Signup email error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
