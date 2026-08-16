import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { sendAndLogAutomatedEmailResponse } from "./server/emailService";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory lead storage fallback for immediate out-of-the-box preview and local testing
interface Lead {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone?: string;
  audience_type: string;
  message: string;
  source?: string;
  auto_response_sent?: boolean;
  auto_response_subject?: string;
  response_sent_at?: string;
}

const localLeadsStore: Lead[] = [
  {
    id: "demo-lead-1",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    full_name: "Dr. Emmanuel Adeleke",
    email: "e.adeleke@graceacademy.edu.ng",
    phone: "+234 806 790 1364",
    audience_type: "School Owner / Proprietor",
    message: "Interested in integrating Game Dev and AI Agent curriculum for our Senior High School cohort.",
    source: "Local Preview",
    auto_response_sent: true,
    auto_response_subject: "Thank you for connecting with StickTech Africa — School Partnership Inquiry",
    response_sent_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "demo-lead-2",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    full_name: "Amina Yusuf",
    email: "amina.yusuf@gmail.com",
    phone: "+234 801 234 5678",
    audience_type: "Graduate",
    message: "Recent secondary graduate eager to join the upcoming AI Agent & Mobile App cohort.",
    source: "Local Preview",
    auto_response_sent: true,
    auto_response_subject: "Application Received: StickTech Africa GameLab & AI Cohort",
    response_sent_at: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

function getSupabaseClient(customUrl?: string, customKey?: string) {
  const url = customUrl || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = customKey || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (url && key && url.startsWith("http")) {
    try {
      return createClient(url, key);
    } catch (err) {
      console.warn("Failed to initialize Supabase client:", err);
    }
  }
  return null;
}

// Health Check API
app.get("/api/health", (req, res) => {
  const supabase = getSupabaseClient();
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    supabaseConfigured: !!supabase,
    smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS)
  });
});

// Config Status API
app.get("/api/config", (req, res) => {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const hasKey = !!(process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY);
  const smtpConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
  
  res.json({
    supabaseConfigured: !!(url && hasKey),
    supabaseUrl: url ? url.substring(0, 15) + "..." : null,
    smtpConfigured,
    leadsCount: localLeadsStore.length
  });
});

// GET /api/leads - Fetch lead records (from Supabase if configured, otherwise local store)
app.get("/api/leads", async (req, res) => {
  const customUrl = req.headers["x-supabase-url"] as string;
  const customKey = req.headers["x-supabase-key"] as string;
  const supabase = getSupabaseClient(customUrl, customKey);

  if (supabase) {
    try {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return res.json({ success: true, source: "supabase", leads: data });
      }
    } catch (e) {
      console.warn("Supabase fetch failed, returning local store:", e);
    }
  }

  res.json({ success: true, source: "local", leads: localLeadsStore });
});

// POST /api/leads - Submit a new lead, send automated response email, and log to Supabase
app.post("/api/leads", async (req, res) => {
  const { full_name, email, phone, audience_type, message, lead_id, custom_supabase_url, custom_supabase_key } = req.body;

  if (!full_name || !email || !phone || !message) {
    return res.status(400).json({ error: "Missing required fields: full_name, email, phone, message" });
  }

  const generatedId = lead_id || ("lead-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7));
  const supabase = getSupabaseClient(custom_supabase_url, custom_supabase_key);
  let supabaseInserted = false;
  let supabaseError = null;
  let insertedSupabaseId = lead_id;

  // 1. If not already inserted by frontend Supabase client, insert to Supabase 'leads' table
  if (supabase && !lead_id) {
    try {
      const { data, error } = await supabase.from("leads").insert([
        {
          full_name,
          email,
          phone,
          audience_type: audience_type || "Other",
          message,
          status: "new",
          auto_response_sent: false
        }
      ]).select();

      if (error) {
        supabaseError = error.message;
        console.error("Supabase insert error:", error);
      } else if (data && data.length > 0) {
        supabaseInserted = true;
        insertedSupabaseId = data[0].id;
      }
    } catch (err: any) {
      supabaseError = err.message || "Network/Supabase error";
      console.error("Supabase exception:", err);
    }
  }

  // 2. Dispatch automated personalized response email & record log in Supabase backend
  let emailResponse = null;
  try {
    emailResponse = await sendAndLogAutomatedEmailResponse(
      {
        recipientEmail: email,
        recipientName: full_name,
        phone,
        audienceType: audience_type || "Other",
        inquiryMessage: message,
        leadId: insertedSupabaseId || generatedId
      },
      supabase
    );
  } catch (emailErr: any) {
    console.error("Automated email dispatch error:", emailErr);
  }

  const newLead: Lead = {
    id: insertedSupabaseId || generatedId,
    created_at: new Date().toISOString(),
    full_name,
    email,
    phone,
    audience_type: audience_type || "Other",
    message,
    source: "API Submission",
    auto_response_sent: emailResponse?.sent || true,
    auto_response_subject: emailResponse?.subject,
    response_sent_at: emailResponse?.timestamp
  };

  // Add to local store immediately
  localLeadsStore.unshift(newLead);

  res.json({
    success: true,
    message: "Lead received and automated confirmation email dispatched!",
    lead: newLead,
    emailResponse,
    supabaseInserted,
    supabaseError,
    fallbackMailto: `mailto:sticktechafrica@gmail.com?subject=Inquiry from ${encodeURIComponent(full_name)} (${encodeURIComponent(audience_type || "Inquiry")})&body=${encodeURIComponent(message)}`
  });
});

// POST /api/send-email - Standalone endpoint to dispatch automated response email
app.post("/api/send-email", async (req, res) => {
  const { recipientEmail, recipientName, phone, audienceType, inquiryMessage, leadId } = req.body;

  if (!recipientEmail || !recipientName || !inquiryMessage) {
    return res.status(400).json({ error: "Missing required fields for email dispatch" });
  }

  const supabase = getSupabaseClient();
  try {
    const emailResult = await sendAndLogAutomatedEmailResponse(
      {
        recipientEmail,
        recipientName,
        phone,
        audienceType: audienceType || "Other",
        inquiryMessage,
        leadId
      },
      supabase
    );

    res.json({
      success: true,
      emailResponse: emailResult
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || "Failed to process automated email response"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StickTech Africa Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

