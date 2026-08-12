import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { LeadFormData, LeadRecord, SupabaseConfig } from '../types';

const STORAGE_KEY_URL = 'sticktech_supabase_url';
const STORAGE_KEY_ANON = 'sticktech_supabase_anon_key';

// Default / standard SQL schema required for StickTech Africa tables
export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- STICKTECH AFRICA — SUPABASE DATABASE SCHEMA & RLS
-- ==========================================

-- 1. GAMELAB APPLICATIONS (Learner Sign-ups)
CREATE TABLE IF NOT EXISTS gamelab_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  age_education_level TEXT,
  school TEXT,
  track_interest TEXT, -- 'Game Development', 'Mobile Apps', 'AI Agents'
  preferred_mode TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' NOT NULL -- 'new', 'contacted', 'enrolled', 'closed'
);

-- 2. SCHOOL PARTNERSHIPS (School Partnership Enquiries)
CREATE TABLE IF NOT EXISTS school_partnerships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  school_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  role TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  student_count TEXT,
  location TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL -- 'new', 'contacted', 'in_discussion', 'partnered', 'closed'
);

-- 3. BUSINESS CONSULTATIONS (SME & AI-Agent Enquiries)
CREATE TABLE IF NOT EXISTS business_consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  business_type TEXT,
  need_description TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL -- 'new', 'contacted', 'proposal_sent', 'active_client', 'closed'
);

-- 4. CONTACT MESSAGES (General Enquiries)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL -- 'new', 'responded', 'closed'
);

-- 5. LEADS (Consolidated / Backwards-Compatible Lead Table)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  audience_type TEXT NOT NULL, -- 'School Owner / Proprietor', 'Graduate', 'SME / Business Owner', 'Other'
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Security: Anonymous users can ONLY INSERT.
-- NO SELECT, UPDATE, or DELETE access is granted to public/anon.
-- ==========================================

ALTER TABLE gamelab_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert only on gamelab_applications"
  ON gamelab_applications FOR INSERT TO public WITH CHECK (true);

ALTER TABLE school_partnerships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert only on school_partnerships"
  ON school_partnerships FOR INSERT TO public WITH CHECK (true);

ALTER TABLE business_consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert only on business_consultations"
  ON business_consultations FOR INSERT TO public WITH CHECK (true);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert only on contact_messages"
  ON contact_messages FOR INSERT TO public WITH CHECK (true);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert only on leads"
  ON leads FOR INSERT TO public WITH CHECK (true);
`;

export function getSavedSupabaseConfig(): { url: string; key: string } {
  const metaEnv = (import.meta as any).env || {};
  const url = localStorage.getItem(STORAGE_KEY_URL) || metaEnv.VITE_SUPABASE_URL || 'https://sfglqcallsmrdccnbkoa.supabase.co';
  const key = localStorage.getItem(STORAGE_KEY_ANON) || metaEnv.VITE_SUPABASE_ANON_KEY || '';
  return { url, key };
}

export function saveSupabaseConfig(url: string, key: string) {
  if (url) localStorage.setItem(STORAGE_KEY_URL, url.trim());
  else localStorage.removeItem(STORAGE_KEY_URL);

  if (key) localStorage.setItem(STORAGE_KEY_ANON, key.trim());
  else localStorage.removeItem(STORAGE_KEY_ANON);
}

export function getSupabaseInstance(): SupabaseClient | null {
  const { url, key } = getSavedSupabaseConfig();
  if (url && key && url.startsWith('http')) {
    try {
      return createClient(url, key);
    } catch (e) {
      console.warn('Failed to create Supabase client instance:', e);
    }
  }
  return null;
}

export async function checkSupabaseConnection(): Promise<SupabaseConfig> {
  const { url, key } = getSavedSupabaseConfig();
  
  if (!url || !key) {
    return {
      url: url || '',
      anonKey: key || '',
      isConnected: false,
      statusText: 'No credentials set (Local fallback active)'
    };
  }

  const client = getSupabaseInstance();
  if (!client) {
    return {
      url,
      anonKey: key,
      isConnected: false,
      statusText: 'Invalid Supabase URL format'
    };
  }

  try {
    const { error } = await client.from('leads').select('count', { count: 'exact', head: true });
    if (error) {
      if (error.code === '42P01') {
        return {
          url,
          anonKey: key,
          isConnected: false,
          statusText: "Connected to Supabase, but 'leads' table missing (Click 'View SQL Schema' to create)"
        };
      }
      return {
        url,
        anonKey: key,
        isConnected: false,
        statusText: `Supabase Error: ${error.message}`
      };
    }
    return {
      url,
      anonKey: key,
      isConnected: true,
      statusText: "Connected & Verified live table 'leads'"
    };
  } catch (err: any) {
    return {
      url,
      anonKey: key,
      isConnected: false,
      statusText: `Network Connection Error: ${err.message || 'Failed to ping'}`
    };
  }
}

export async function submitLeadToSupabase(lead: LeadFormData): Promise<{
  success: boolean;
  insertedToSupabase: boolean;
  message: string;
  record?: LeadRecord;
  errorDetails?: string;
}> {
  const client = getSupabaseInstance();
  
  if (client) {
    try {
      // 1. Insert into general 'leads' table
      const { data: leadsData, error: leadsError } = await client
        .from('leads')
        .insert([
          {
            full_name: lead.full_name,
            email: lead.email,
            phone: lead.phone,
            audience_type: lead.audience_type,
            message: lead.message,
            status: 'new'
          }
        ])
        .select();

      // 2. Also route to domain-specific table based on audience type
      try {
        if (lead.audience_type === 'Graduate') {
          await client.from('gamelab_applications').insert([
            {
              name: lead.full_name,
              email: lead.email,
              phone: lead.phone,
              message: lead.message,
              status: 'new'
            }
          ]);
        } else if (lead.audience_type === 'School Owner / Proprietor') {
          await client.from('school_partnerships').insert([
            {
              school_name: lead.full_name,
              contact_person: lead.full_name,
              email: lead.email,
              phone: lead.phone,
              message: lead.message,
              status: 'new'
            }
          ]);
        } else if (lead.audience_type === 'SME / Business Owner') {
          await client.from('business_consultations').insert([
            {
              name: lead.full_name,
              email: lead.email,
              phone: lead.phone,
              need_description: lead.message,
              status: 'new'
            }
          ]);
        } else {
          await client.from('contact_messages').insert([
            {
              name: lead.full_name,
              email: lead.email,
              subject: 'General Inquiry',
              message: lead.message,
              status: 'new'
            }
          ]);
        }
      } catch (err) {
        console.warn('Optional domain table insertion notice:', err);
      }

      if (!leadsError && leadsData && leadsData.length > 0) {
        return {
          success: true,
          insertedToSupabase: true,
          message: 'Inquiry saved directly to Supabase!',
          record: leadsData[0] as LeadRecord
        };
      } else if (leadsError) {
        console.warn('Direct Supabase leads insert failed, trying proxy:', leadsError);
      }
    } catch (e: any) {
      console.warn('Supabase JS client exception:', e);
    }
  }

  // Fallback to Express backend server API which persists in local store
  try {
    const { url, key } = getSavedSupabaseConfig();
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-supabase-url': url,
        'x-supabase-key': key
      },
      body: JSON.stringify({
        ...lead,
        custom_supabase_url: url,
        custom_supabase_key: key
      })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      return {
        success: true,
        insertedToSupabase: data.supabaseInserted || false,
        message: data.supabaseInserted 
          ? 'Saved directly to Supabase!' 
          : 'Submission received! (Saved to local database & ready for review)',
        record: data.lead,
        errorDetails: data.supabaseError
      };
    }
  } catch (err: any) {
    console.error('Server API submit failed:', err);
  }

  // Emergency local storage backup
  const fallbackRecord: LeadRecord = {
    ...lead,
    id: 'local-' + Date.now(),
    created_at: new Date().toISOString(),
    source: 'Browser Local Storage'
  };

  const storedStr = localStorage.getItem('sticktech_leads_backup') || '[]';
  const storedList: LeadRecord[] = JSON.parse(storedStr);
  storedList.unshift(fallbackRecord);
  localStorage.setItem('sticktech_leads_backup', JSON.stringify(storedList));

  return {
    success: true,
    insertedToSupabase: false,
    message: 'Submitted locally! (Network issue encountered; stored in local session)',
    record: fallbackRecord
  };
}
