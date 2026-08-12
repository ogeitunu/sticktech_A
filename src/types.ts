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
