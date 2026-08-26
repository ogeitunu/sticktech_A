import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "StickTech AI", the official virtual assistant for StickTech Africa.

# Role & Persona
- Your goal is to warmly welcome website visitors, answer their initial questions about StickTech Africa's services and programs, build trust, and seamlessly transfer them to a human representative on WhatsApp when they are ready or require custom assistance.
- Tone & Style: Warm, professional, helpful, and concise. Direct and clear—avoid unnecessary jargon or overly long paragraphs. Reflect African innovation, tech excellence, and high customer support standards.
- Always keep responses under 3–4 sentences before offering the next logical step.

# Key Business Information
- Company: StickTech Africa
- Dual Strategic Engines:
  1. Academy (EdTech): Practical hands-on training for high school students & university/secondary graduates. Programs include Game Development (Godot/Unity), AI Agents & Full-Stack Web/Mobile, Digital Marketing & Media Tracks, IoT & Robotics, Data Analytics, and UI/UX Design.
  2. Solutions (SME Agency): Enterprise-grade digital solutions for SMEs & businesses, including Custom WhatsApp AI Bots, Website Development, Cloud Systems, Graphic Branding, and Digital Marketing Retainers.
  3. Institutional Partnerships: Turn-key curriculum, computer lab setup, and teacher enablement for primary and secondary schools.
- Official WhatsApp Handle: +2348067901364
- Official WhatsApp Link: https://wa.me/2348067901364?text=Hi%20StickTech%20Africa,%20I%20was%20just%20chatting%20on%20your%20website%20and%20would%20like%20to%20continue%20here.

# Behavior & Conversation Flow
1. Greeting & Intake:
   - Greet the user warmly and concisely.
   - Ask how you can assist them today (e.g., tech training, software/AI solutions, school partnerships, or general inquiries).
2. Information & Qualification:
   - Answer standard questions directly and clearly in under 3-4 sentences.
   - If the user asks for pricing, custom project quotes, deep technical consultation, or wants to talk to a live team member, prepare them for a direct WhatsApp transfer.
3. Automation & Handoff Trigger:
   - When a user shows interest in proceeding, enrolling, booking a consultation, requesting a custom build, or asking for human assistance, present them with the WhatsApp handoff link.
   - Handoff Message Template:
     "I'd love to connect you directly with one of our lead specialists at StickTech Africa! You can continue this conversation seamlessly on WhatsApp."
   - Always include the WhatsApp link: https://wa.me/2348067901364?text=Hi%20StickTech%20Africa,%20I%20was%20just%20chatting%20on%20your%20website%20and%20would%20like%20to%20continue%20here.

# Guardrails
- If you do not know the answer to a specific question, do not make up details. Politely invite the user to chat directly with the team on WhatsApp at +2348067901364.
- Always keep responses under 3–4 sentences.`;

export interface ChatMessage {
  role: 'user' | 'model' | 'assistant';
  content: string;
}

const WHATSAPP_LINK = "https://wa.me/2348067901364?text=Hi%20StickTech%20Africa,%20I%20was%20just%20chatting%20on%20your%20website%20and%20would%20like%20to%20continue%20here.";
const WHATSAPP_NUMBER = "+2348067901364";

/**
 * Intelligent domain-aware response generator as fallback when Gemini API key is not present
 */
function generateFallbackResponse(userMessage: string): { reply: string; showWhatsAppHandoff: boolean } {
  const lower = userMessage.toLowerCase().trim();

  // 1. Human handoff / Talk to team / WhatsApp / Booking / Quote
  if (
    lower.includes("whatsapp") ||
    lower.includes("human") ||
    lower.includes("agent") ||
    lower.includes("representative") ||
    lower.includes("talk to") ||
    lower.includes("speak to") ||
    lower.includes("specialist") ||
    lower.includes("call") ||
    lower.includes("phone") ||
    lower.includes("quote") ||
    lower.includes("pricing") ||
    lower.includes("cost") ||
    lower.includes("price") ||
    lower.includes("hire") ||
    lower.includes("book") ||
    lower.includes("register") ||
    lower.includes("enroll") ||
    lower.includes("apply")
  ) {
    return {
      reply: `I'd love to connect you directly with one of our lead specialists at StickTech Africa! You can continue this conversation seamlessly on WhatsApp.`,
      showWhatsAppHandoff: true
    };
  }

  // 2. Training / Academy / Courses / Curriculum
  if (
    lower.includes("course") ||
    lower.includes("program") ||
    lower.includes("train") ||
    lower.includes("learn") ||
    lower.includes("student") ||
    lower.includes("graduate") ||
    lower.includes("curriculum") ||
    lower.includes("academy") ||
    lower.includes("game dev") ||
    lower.includes("ai agent") ||
    lower.includes("coding")
  ) {
    return {
      reply: `StickTech Africa offers industry-aligned training in Game Development, AI Agents & Full-Stack Development, IoT & Robotics, and Digital Media. Our hands-on cohorts are tailored for secondary graduates and students building real-world portfolios. Would you like our syllabus or to connect directly with admissions on WhatsApp?`,
      showWhatsAppHandoff: false
    };
  }

  // 3. SME / Business / AI Solutions / Website
  if (
    lower.includes("sme") ||
    lower.includes("business") ||
    lower.includes("solution") ||
    lower.includes("bot") ||
    lower.includes("software") ||
    lower.includes("website") ||
    lower.includes("marketing") ||
    lower.includes("retainer") ||
    lower.includes("agency")
  ) {
    return {
      reply: `Our Tech Solutions wing builds custom AI WhatsApp bots, responsive web applications, and full-stack digital infrastructure for SMEs and scaling businesses. We also provide monthly digital marketing and growth retainers. Would you like a customized quote from our technical lead on WhatsApp?`,
      showWhatsAppHandoff: true
    };
  }

  // 4. School partnerships
  if (
    lower.includes("school") ||
    lower.includes("partner") ||
    lower.includes("proprietor") ||
    lower.includes("teacher") ||
    lower.includes("institution") ||
    lower.includes("lab")
  ) {
    return {
      reply: `We partner with schools to integrate turn-key coding, AI, and game design curricula into their classrooms, complete with teacher training and lab modernizations. We'd love to discuss how to bring StickTech to your institution. Shall we connect you with our Education Director on WhatsApp?`,
      showWhatsAppHandoff: true
    };
  }

  // 5. Greeting
  if (lower.match(/^(hi|hello|hey|good day|good morning|good afternoon|good evening|howdy)/)) {
    return {
      reply: `Hello and welcome to StickTech Africa! I'm StickTech AI, your virtual assistant. How can I assist you today with our tech training programs, SME software & AI solutions, or school partnerships?`,
      showWhatsAppHandoff: false
    };
  }

  // 6. Default Fallback
  return {
    reply: `StickTech Africa powers practical tech education for young innovators and builds enterprise AI & software solutions for growing businesses. For detailed consultations or custom inquiries, our team is always available on WhatsApp at ${WHATSAPP_NUMBER}.`,
    showWhatsAppHandoff: true
  };
}

/**
 * Handle incoming user chat with Gemini API or intelligent fallback
 */
export async function handleStickTechAIChat(
  messages: ChatMessage[]
): Promise<{ reply: string; showWhatsAppHandoff: boolean; whatsappLink: string }> {
  const latestMessage = messages[messages.length - 1]?.content || "";

  // Check if API key is available
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const fallback = generateFallbackResponse(latestMessage);
    return {
      reply: fallback.reply,
      showWhatsAppHandoff: fallback.showWhatsAppHandoff,
      whatsappLink: WHATSAPP_LINK
    };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Format conversation history for Gemini
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : m.role,
      parts: [{ text: m.content }]
    }));

    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.5-pro",
      "gemini-1.5-flash"
    ];

    let replyText = "";

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents as any,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          }
        });

        if (response.text && response.text.trim()) {
          replyText = response.text.trim();
          break;
        }
      } catch (modelErr: any) {
        // If high-demand 503 or transient error, try next candidate model
        const errMsg = modelErr?.message || String(modelErr);
        if (errMsg.includes("503") || errMsg.includes("429") || errMsg.includes("UNAVAILABLE") || errMsg.includes("high demand") || errMsg.includes("RESOURCE_EXHAUSTED")) {
          continue;
        }
        // For other fatal issues, continue to next model as well
        continue;
      }
    }

    if (!replyText) {
      const fallback = generateFallbackResponse(latestMessage);
      return {
        reply: fallback.reply,
        showWhatsAppHandoff: fallback.showWhatsAppHandoff,
        whatsappLink: WHATSAPP_LINK
      };
    }

    const showHandoff = replyText.toLowerCase().includes("whatsapp") ||
      replyText.includes("wa.me") ||
      replyText.includes("+2348067901364") ||
      latestMessage.toLowerCase().includes("quote") ||
      latestMessage.toLowerCase().includes("price") ||
      latestMessage.toLowerCase().includes("human") ||
      latestMessage.toLowerCase().includes("specialist");

    return {
      reply: replyText,
      showWhatsAppHandoff: showHandoff,
      whatsappLink: WHATSAPP_LINK
    };
  } catch (error: any) {
    console.warn("Gemini API call failed, using intelligent fallback:", error?.message || error);
    const fallback = generateFallbackResponse(latestMessage);
    return {
      reply: fallback.reply,
      showWhatsAppHandoff: fallback.showWhatsAppHandoff,
      whatsappLink: WHATSAPP_LINK
    };
  }
}
