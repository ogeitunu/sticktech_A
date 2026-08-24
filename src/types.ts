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
}

export interface Course {
  id: string;
  title: string;
  description: string;
  tools: string[];
  studentOutput: string;
  badge: string;
}