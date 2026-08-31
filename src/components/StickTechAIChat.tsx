import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  PhoneCall,
  RotateCcw,
  Minimize2
} from 'lucide-react';

export interface ChatMessageItem {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
  showWhatsAppHandoff?: boolean;
  whatsappLink?: string;
}

const CLEAN_WHATSAPP_NUMBER = "2348067901364";
const DISPLAY_WHATSAPP_NUMBER = "+234 806 790 1364";

const DEFAULT_WHATSAPP_LINK = `https://wa.me/${CLEAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi StickTech Africa, I was just chatting on your website and would like to speak with a specialist."
)}`;

/**
 * Enhanced local contextual WhatsApp link generator:
 * Preserves full message text without harsh truncation and falls back to history if needed.
 */
function buildLocalContextualWhatsAppLink(query?: string, messageHistory?: ChatMessageItem[]): string {
  let activeQuery = query?.trim();

  // If query is omitted/empty, search history for the most recent user prompt
  if (!activeQuery && messageHistory && messageHistory.length > 0) {
    const lastUserMessage = messageHistory
      .slice()
      .reverse()
      .find((m) => m.role === 'user');
    if (lastUserMessage) {
      activeQuery = lastUserMessage.content.trim();
    }
  }

  if (!activeQuery) return DEFAULT_WHATSAPP_LINK;

  const prefilledMessage = `Hi StickTech Africa, I was just chatting on your website regarding: "${activeQuery}". I would like to speak directly with a specialist.`;

  return `https://wa.me/${CLEAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`;
}

const INITIAL_MESSAGE: ChatMessageItem = {
  id: 'init-msg',
  role: 'assistant',
  content: "Hello and welcome to StickTech Africa! 👋 I'm StickTech AI, your virtual assistant. How can StickTech Africa assist you today with our DigiSkills training, custom software & AI solutions, or strategic partnerships?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  showWhatsAppHandoff: false,
  whatsappLink: DEFAULT_WHATSAPP_LINK
};

const SUGGESTED_PROMPTS = [
  "🎓 DigiSkills & Bootcamps",
  "⚡ Custom Software & AI Agents",
  "🤝 Institutional Partnerships",
  "💬 Talk to a specialist on WhatsApp"
];

export const StickTechAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    setInputText('');

    // Handle direct WhatsApp prompt shortcut
    if (query.toLowerCase().includes('whatsapp') && query.length < 40) {
      const userMsg: ChatMessageItem = {
        id: 'msg-' + Date.now(),
        role: 'user',
        content: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const contextualLink = buildLocalContextualWhatsAppLink(query, messages);
      const assistantMsg: ChatMessageItem = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: "I'd love to connect you directly with a specialist from our team at StickTech Africa! You can seamlessly transfer this conversation to our official WhatsApp line below.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showWhatsAppHandoff: true,
        whatsappLink: contextualLink
      };

      setMessages(prev => [...prev, userMsg, assistantMsg]);
      return;
    }

    const userMsg: ChatMessageItem = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Send conversation payload to server-side endpoint
      const payload = updatedMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload })
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }

      const data = await res.json();
      const dynamicLink = data.whatsappLink || buildLocalContextualWhatsAppLink(query, updatedMessages);

      const assistantMsg: ChatMessageItem = {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: data.reply || "I'd love to connect you directly with a specialist from our team at StickTech Africa! You can seamlessly transfer this conversation to our official WhatsApp line below.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showWhatsAppHandoff: data.showWhatsAppHandoff ?? true,
        whatsappLink: dynamicLink
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('StickTech AI request fallback:', err);
      const assistantMsg: ChatMessageItem = {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: "I'd love to connect you directly with a specialist from our team at StickTech Africa! You can seamlessly transfer this conversation to our official WhatsApp line below.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showWhatsAppHandoff: true,
        whatsappLink: buildLocalContextualWhatsAppLink(query, updatedMessages)
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: 'msg-reset-' + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {!isOpen && (
          <div 
            className="mb-3 hidden sm:flex items-center gap-2 bg-[#0A0D66] text-white px-4 py-2 rounded-full shadow-2xl border border-[#D4AF37]/40 animate-bounce cursor-pointer hover:bg-[#1116A6] transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold">Chat with StickTech AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        )}

        <button
          id="sticktech-ai-launcher"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close StickTech AI chat" : "Open StickTech AI chat"}
          className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
            isOpen 
              ? 'bg-slate-800 text-white hover:bg-slate-900 rotate-90' 
              : 'bg-[#0A0D66] text-white hover:bg-[#1116A6] border-2 border-[#D4AF37]'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <Bot className="w-7 h-7 text-[#D4AF37]" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </>
          )}
        </button>
      </div>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-5 duration-200 font-sans">
          
          {/* Header */}
          <div className="bg-[#0A0D66] text-white p-4 border-b-2 border-[#D4AF37] flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1116A6] to-[#D4AF37] flex items-center justify-center shadow-inner">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0A0D66] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white tracking-wide">StickTech AI</h3>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#D4AF37] text-[#0A0D66] font-extrabold rounded">Assistant</span>
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online &middot; StickTech Africa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                aria-label="Restart conversation"
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                aria-label="Minimize chat"
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* WhatsApp Direct Header Strip */}
          <a
            href={DEFAULT_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-b border-emerald-200 px-4 py-2 flex items-center justify-between text-xs font-semibold transition-colors group"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official WhatsApp: {DISPLAY_WHATSAPP_NUMBER}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Conversation Message Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-start gap-2 max-w-[85%]">
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-[#0A0D66] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div>
                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#1116A6] text-white rounded-br-none shadow-md font-medium'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Rich WhatsApp Transfer Card when triggered */}
                      {msg.role === 'assistant' && msg.showWhatsAppHandoff && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <a
                            href={msg.whatsappLink || DEFAULT_WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all w-full justify-center group"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Transfer to WhatsApp ({DISPLAY_WHATSAPP_NUMBER})</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      )}
                    </div>

                    <span
                      className={`text-[10px] text-slate-400 mt-1 block ${
                        msg.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing / Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs pl-9">
                <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1116A6]" />
                </div>
                <span>StickTech AI is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto scrollbar-none flex gap-2">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt.replace(/^[^\w\s]+/, '').trim())}
                disabled={isLoading}
                className="whitespace-nowrap text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-medium transition-colors border border-slate-200 flex-shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question or type a message..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1116A6] focus:border-transparent transition-all disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              aria-label="Send message"
              className="p-2.5 bg-[#0A0D66] hover:bg-[#1116A6] text-[#D4AF37] rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center justify-center cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>

        </div>
      )}
    </>
  );
};