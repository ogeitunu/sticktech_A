import { handleStickTechAIChat, ChatMessage } from '../server/geminiService';

/**
 * Next.js / Vercel Serverless Function API Route Handler
 * POST /api/chat
 */
export async function POST(req: Request): Promise<Response> {
  const cleanNumber = "2348067901364";
  const defaultWhatsAppLink = `https://wa.me/${cleanNumber}`;

  try {
    const body = await req.json();
    const messages = (body?.messages || []) as ChatMessage[];

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Invalid or empty messages array provided."
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract the most recent user prompt
    const lastUserMessage = messages
      .filter((m: any) => m.role === 'user')
      .pop()?.content?.trim() || "";

    // Generate the URL-encoded dynamic WhatsApp link
    const encodedText = encodeURIComponent(
      `Hi StickTech Africa, I was just chatting on your website regarding: "${lastUserMessage}" and would like to speak with a specialist.`
    );
    const whatsappLink = `https://wa.me/${cleanNumber}?text=${encodedText}`;

    // Call the intelligent StickTech AI chat engine with fallback cascade
    const result = await handleStickTechAIChat(messages);

    return new Response(
      JSON.stringify({
        reply: result.reply,
        showWhatsAppHandoff: result.showWhatsAppHandoff,
        whatsappLink: whatsappLink
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error("API /api/chat route error:", error);

    return new Response(
      JSON.stringify({
        reply: "I'd love to connect you directly with a specialist from our team at StickTech Africa! You can seamlessly transfer this conversation to our official WhatsApp line below.",
        showWhatsAppHandoff: true,
        whatsappLink: defaultWhatsAppLink
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
