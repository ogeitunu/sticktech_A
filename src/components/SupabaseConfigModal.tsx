import React, { useState, useEffect } from 'react';
import { X, Database, CheckCircle2, AlertTriangle, Code, Copy, Check, RefreshCw, Key, Link as LinkIcon, Sparkles } from 'lucide-react';
import { getSavedSupabaseConfig, saveSupabaseConfig, checkSupabaseConnection, SUPABASE_SQL_SCHEMA } from '../lib/supabase';
import { SupabaseConfig } from '../types';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: (config: SupabaseConfig) => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved
}) => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<SupabaseConfig | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedSupabaseConfig();
      setUrl(saved.url);
      setKey(saved.key);
      runCheck();
    }
  }, [isOpen]);

  const runCheck = async () => {
    setTesting(true);
    const res = await checkSupabaseConnection();
    setStatus(res);
    setTesting(false);
    onConfigSaved(res);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(url, key);
    await runCheck();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0D66]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0A0D66] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-2 border-[#D4AF37] shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1116A6] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-grotesk text-white flex items-center gap-2">
                Supabase Database Setup
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </h3>
              <p className="text-xs text-white/70 font-mono">
                Connect your lead form to your live Supabase project
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-white/60 hover:text-white bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Panel */}
        {status && (
          <div className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
            status.isConnected
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
              : 'bg-amber-950/80 border-amber-500/50 text-amber-200'
          }`}>
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-2">
                {status.isConnected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
                <span>Status: {status.isConnected ? 'Connected & Verified' : 'Configuration Notice'}</span>
              </span>
              <button
                type="button"
                onClick={runCheck}
                disabled={testing}
                className="text-[10px] underline flex items-center gap-1 hover:text-white"
              >
                <RefreshCw className={`w-3 h-3 ${testing ? 'animate-spin' : ''}`} />
                <span>Re-Test</span>
              </button>
            </div>
            <p>{status.statusText}</p>
          </div>
        )}

        {/* Credential Inputs Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5" />
              Supabase Project URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://cgccrpkvoupltyolaepj.supabase.co"
              className="w-full px-4 py-2.5 rounded-xl bg-[#060833] border border-white/20 text-xs font-mono text-white placeholder:text-white/30 focus:border-[#D4AF37] outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              Supabase Anon Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#060833] border border-white/20 text-xs font-mono text-white placeholder:text-white/30 focus:border-[#D4AF37] outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={testing}
              className="flex-1 bg-[#D4AF37] hover:bg-[#c29e2f] text-[#0A0D66] font-bold py-2.5 rounded-xl font-grotesk text-sm"
            >
              Save Credentials & Connect
            </button>
          </div>
        </form>

        {/* SQL Table Creation Code Box */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" />
              Required SQL Schema for 'leads' table
            </span>
            <button
              onClick={handleCopySql}
              className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1 bg-[#1116A6] px-2 py-1 rounded border border-white/20"
            >
              {copiedSql ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-3 bg-[#060833] rounded-xl border border-white/10 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-40">
            {SUPABASE_SQL_SCHEMA}
          </pre>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="bg-[#1116A6] hover:bg-white/20 text-white font-mono text-xs px-5 py-2 rounded-xl border border-white/20"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
