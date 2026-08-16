export type AudienceType = 
  | "School Owner / Proprietor" 
  | "Graduate" 
  | "SME / Business Owner" 
  | "Other";

export interface LeadFormData {
  full_name: string;
  email: string;
  phone: string;
  audience_type: AudienceType;
  message: string;
}

export interface LeadRecord extends LeadFormData {
  id: string;
  created_at: string;
  source?: string;
  auto_response_sent?: boolean;
  auto_response_subject?: string;
  response_sent_at?: string;
  email_response?: EmailResponseDetails;
}

export interface EmailResponseDetails {
  sent: boolean;
  subject: string;
  recipientEmail: string;
  recipientName: string;
  timestamp: string;
  deliveryMethod: "smtp" | "resend" | "supabase_logged";
  messagePreview: string;
  htmlContent?: string;
  error?: string;
}

export interface EmailLogRecord {
  id: string;
  lead_id?: string;
  created_at: string;
  recipient_email: string;
  recipient_name: string;
  subject: string;
  delivery_status: "sent" | "logged" | "queued" | "failed";
  email_body?: string;
  error_message?: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
  statusText: string;
}

export interface ProgramTrack {
  id: string;
  title: string;
  iconName: string;
  category: "Academy" | "Solutions" | "Core";
  description: string;
  tools: string[];
  studentOutput: string;
  badge: string;
}
