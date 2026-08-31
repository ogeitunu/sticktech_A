import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "StickTech AI", the official intelligent virtual assistant for StickTech Africa (an EdTech and technology solutions company headquartered in Nigeria).

# Core Mission
- Welcome website visitors, answer questions regarding StickTech Africa's services, build immediate trust, and smoothly hand off interested prospects to a live human representative on WhatsApp.
- Tone & Style: Professional, warm, clear, empowering, and culturally aligned with African technology excellence. Keep responses concise, direct, and conversational (3–4 sentences maximum per turn).

# Business Knowledge Base
- Company: StickTech Africa
- Official WhatsApp Business Handle: +2348067901364 (Clean format: 2348067901364)
- Primary Offerings:
  1. EdTech & Digital Skills Training: DigiSkills programs, cohort bootcamps (graphic design, software development, AI workflows, digital marketing) for students, graduates, and aspiring professionals.
  2. Software & AI Solutions: Custom web/mobile applications, business automation tools, custom AI agents, and corporate tech integrations for SMEs and scaling businesses.
  3. Consultation & Strategic Partnerships: Direct business consultations, institutional/school tech partnerships, and custom solution quotes.

# Key Guidelines & Conversation Rules
1. Intake & Qualification:
   - Greet visitors warmly and ask how StickTech Africa can assist them today.
   - Address general queries directly and clearly in 3-4 sentences maximum.
2. Automated WhatsApp Handoff Trigger:
   - If a user asks for specific pricing, custom quotes, deep technical consultation, partnership details, or explicitly requests human assistance, provide a helpful summary answer and immediately offer the WhatsApp transition.
   - Handoff Text Template: "I'd love to connect you directly with a specialist from our team at StickTech Africa! You can seamlessly transfer this conversation to our official WhatsApp line below."
   - Always instruct the system to trigger the WhatsApp link using the clean number format: 2348067901364.
3. Guardrails:
   - Never fabricate details, specific pricing numbers, or contractual guarantees.
   - If a request is unclear or out of scope, politely direct the user to connect with the team directly on WhatsApp (+2348067901364).
   - Strict limit: Keep responses under 3–4 sentences.`;

export interface ChatMessage {
  role: 'user' | 'model' | 'assistant';
  content: string;
}

export const CLEAN_WHATSAPP_NUMBER = "2348067901364";
export const DISPLAY_WHATSAPP_NUMBER = "+234 806 790 1364";

/**
 * Creates a contextual pre-filled WhatsApp link based on the user's latest query or topic
 */
export function buildContextualWhatsAppLink(userQuery?: string): string {
  if (!userQuery || userQuery.trim().length === 0) {
    return `https://wa.me/${CLEAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi StickTech Africa, I was just chatting on your website and would like to continue here."
    )}`;
  }

  const prefilled = `Hi StickTech Africa, I was just chatting on your website regarding: "${userQuery.trim()}" and would like to speak with a specialist.`;
  return `https://wa.me/${CLEAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilled)}`;
}

/**
 * Intelligent domain-aware response generator as fallback when Gemini API is unavailable
 */
function generateFallbackResponse(userMessage: string): { reply: string; showWhatsAppHandoff: boolean } {
  const lower = userMessage.toLowerCase().trim();

  // 1. Human handoff / Talk to team / WhatsApp / Booking / Quote / Pricing
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
      reply: `I'd love to connect you directly with a specialist from our team at StickTech Africa! You can seamlessly transfer this conversation to our official WhatsApp line below.`,
      showWhatsAppHandoff: true
    };
  }

  // 2. Training / EdTech / DigiSkills / Bootcamps / Courses
  if (
    lower.includes("digiskill") ||
    lower.includes("bootcamp") ||
    lower.includes("course") ||
    lower.includes("program") ||
    lower.includes("train") ||
    lower.includes("learn") ||
    lower.includes("graphic design") ||
    lower.includes("software development") ||
    lower.includes("ai workflow") ||
    lower.includes("digital marketing") ||
    lower.includes("student") ||
    lower.includes("graduate") ||
    lower.includes("academy") ||
    lower.includes("coding")
  ) {
    return {
      reply: `StickTech Africa offers premier DigiSkills programs and cohort bootcamps covering Software Development, AI Workflows, Graphic Design, and Digital Marketing. Our practical cohorts are built to equip learners with high-demand tech skills and real portfolios. Would you like syllabus details or to connect with admissions directly on WhatsApp?`,
      showWhatsAppHandoff: false
    };
  }

  // 3. Software & AI Solutions / SME Automation / Apps / Agents
  if (
    lower.includes("sme") ||
    lower.includes("business") ||
    lower.includes("solution") ||
    lower.includes("automation") ||
    lower.includes("agent") ||
    lower.includes("app") ||
    lower.includes("bot") ||
    lower.includes("software") ||
    lower.includes("website") ||
    lower.includes("web") ||
    lower.includes("integration") ||
    lower.includes("agency")
  ) {
    return {
      reply: `Our Software & AI Solutions division engineers custom web and mobile applications, business automation pipelines, custom AI agents, and corporate integrations. We help SMEs scale operations and deliver modern digital customer experiences. Shall I transfer you to our technical lead on WhatsApp for a consultation?`,
      showWhatsAppHandoff: true
    };
  }

  // 4. Consultation & School / Institutional Partnerships
  if (
    lower.includes("school") ||
    lower.includes("partner") ||
    lower.includes("institution") ||
    lower.includes("proprietor") ||
    lower.includes("consult") ||
    lower.includes("lab")
  ) {
    return {
      reply: `We partner with schools, institutions, and corporate bodies for curriculum integration, lab modernizations, and strategic digital transformation. We'd be thrilled to explore how StickTech Africa can support your organization. Would you like to connect directly with our partnership director on WhatsApp?`,
      showWhatsAppHandoff: true
    };
  }

  // 5. Greeting
  if (lower.match(/^(hi|hello|hey|good day|good morning|good afternoon|good evening|howdy)/)) {
    return {
      reply: `Hello and welcome to StickTech Africa! I'm StickTech AI, your virtual assistant. How can StickTech Africa assist you today with our DigiSkills training, custom software & AI solutions, or strategic partnerships?`,
      showWhatsAppHandoff: false
    };
  }

  // 6. Default Fallback
  return {
    reply: `StickTech Africa powers practical tech education and builds enterprise AI & software solutions for growing businesses. For personalized consultation and custom project quotes, our team is directly reachable on WhatsApp at ${DISPLAY_WHATSAPP_NUMBER}.`,
    showWhatsAppHandoff: true
  };
}

/**
 * Handle incoming user chat with Gemini API or intelligent fallback
 */
export async function handleStickTechAIChat(
  messages: ChatMessage[]
): Promise<{ reply: string; showWhatsAppHandoff: boolean; whatsappLink: string; whatsappNumber: string }> {
  const latestMessage = messages[messages.length - 1]?.content || "";
  const contextualLink = buildContextualWhatsAppLink(latestMessage);

  // Check if API key is available
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const fallback = generateFallbackResponse(latestMessage);
    return {
      reply: fallback.reply,
      showWhatsAppHandoff: fallback.showWhatsAppHandoff,
      whatsappLink: contextualLink,
      whatsappNumber: CLEAN_WHATSAPP_NUMBER
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
        const errMsg = modelErr?.message || String(modelErr);
        if (
          errMsg.includes("503") ||
          errMsg.includes("429") ||
          errMsg.includes("UNAVAILABLE") ||
          errMsg.includes("high demand") ||
          errMsg.includes("RESOURCE_EXHAUSTED")
        ) {
          continue;
        }
        continue;
      }
    }

    if (!replyText) {
      const fallback = generateFallbackResponse(latestMessage);
      return {
        reply: fallback.reply,
        showWhatsAppHandoff: fallback.showWhatsAppHandoff,
        whatsappLink: contextualLink,
        whatsappNumber: CLEAN_WHATSAPP_NUMBER
      };
    }

    const showHandoff =
      replyText.toLowerCase().includes("whatsapp") ||
      replyText.includes("2348067901364") ||
      replyText.includes("specialist") ||
      latestMessage.toLowerCase().includes("quote") ||
      latestMessage.toLowerCase().includes("price") ||
      latestMessage.toLowerCase().includes("cost") ||
      latestMessage.toLowerCase().includes("human") ||
      latestMessage.toLowerCase().includes("partner") ||
      latestMessage.toLowerCase().includes("specialist");

    return {
      reply: replyText,
      showWhatsAppHandoff: showHandoff,
      whatsappLink: contextualLink,
      whatsappNumber: CLEAN_WHATSAPP_NUMBER
    };
  } catch (error: any) {
    console.warn("Gemini API call failed, using intelligent fallback:", error?.message || error);
    const fallback = generateFallbackResponse(latestMessage);
    return {
      reply: fallback.reply,
      showWhatsAppHandoff: fallback.showWhatsAppHandoff,
      whatsappLink: contextualLink,
      whatsappNumber: CLEAN_WHATSAPP_NUMBER
    };
  }
}

