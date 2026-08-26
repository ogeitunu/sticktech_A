export type AudienceType =
  | "School Owner / Proprietor"
  | "Graduate"
  | "SME / Business Owner"
  | "Other";

export interface LeadFormData {
  full_name: string;
  email: string;
  audience_type: AudienceType;
  message: string;
  phone?: string; // Optional field
}

export interface LeadRecord extends LeadFormData {
  id: string;
  created_at: string;
  source?: string;
  auto_response_sent?: boolean;
  auto_response_subject?: string;
  response_sent_at?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  tools: string[];
  studentOutput: string;
  badge: string;
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

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
  statusText: string;
}