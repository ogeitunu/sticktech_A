// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record; // The newly inserted row from Supabase

    if (!record || !record.email) {
      return new Response(JSON.stringify({ error: "No email found in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Call Resend API to send confirmation email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Inquiries <onboarding@resend.dev>", // Replace with your domain once verified on Resend
        to: [record.email],
        subject: "We received your inquiry!",
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #0A0D66; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #0A0D66; margin-bottom: 8px;">Thank you for reaching out, ${record.full_name}!</h2>
            <p style="color: #4B5568; font-size: 14px;">We have successfully received your inquiry regarding <strong>${record.audience_type}</strong>.</p>
            
            <div style="background: #f8fafc; padding: 16px; border-left: 4px solid #D4AF37; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #334155; font-style: italic; font-size: 13px;">"${record.message}"</p>
            </div>

            <p style="color: #4B5568; font-size: 14px;">Our team is currently reviewing your submission and will get back to you shortly.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">This is an automated confirmation message sent upon form submission.</p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});