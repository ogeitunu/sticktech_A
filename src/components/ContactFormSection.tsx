import React, { useState, useEffect } from 'react';
import { AudienceType, LeadFormData, LeadRecord } from '../types';
import { submitLeadToSupabase } from '../lib/supabase';
import { Send, Mail, Phone, CheckCircle2, AlertCircle, Loader2, Sparkles, User, MessageSquare, Inbox, Eye, ExternalLink, ShieldCheck } from 'lucide-react';

interface ContactFormSectionProps {
  selectedAudience: AudienceType;
  onAudienceChange: (audience: AudienceType) => void;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  selectedAudience,
  onAudienceChange
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    full_name: '',
    email: '',
    phone: '',
    audience_type: selectedAudience,
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [inlineSuccess, setInlineSuccess] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<{ open: boolean; message: string; record?: LeadRecord } | null>(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync prop changes to form state
  useEffect(() => {
    if (selectedAudience) {
      setFormData(prev => ({ ...prev, audience_type: selectedAudience }));
    }
  }, [selectedAudience]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInlineSuccess(null);
    setShowEmailPreview(false);

    // Spam / Bot trap check
    if (honeypot) {
      // Silently pretend success to fool bots
      setInlineSuccess('Thank you for reaching out!');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        audience_type: selectedAudience || 'School Owner / Proprietor',
        message: ''
      });
      return;
    }

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (including Phone Number).');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const result = await submitLeadToSupabase(formData);
      
      if (result.success) {
        setInlineSuccess(`Inquiry received and automated confirmation email dispatched to ${formData.email.trim()}!`);
        setSuccessModal({
          open: true,
          message: result.message,
          record: result.record
        });
        
        // Reset form inputs but preserve selected audience type
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          audience_type: selectedAudience || 'School Owner / Proprietor',
          message: ''
        });
      } else {
        setErrorMessage(result.errorDetails || 'Failed to submit lead. Please try again or email us directly.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred during submission. Your input has been saved so you can retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0A0D66] text-white relative overflow-hidden">
      
      {/* Background glowing ambient elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1116A6] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1116A6] text-[#D4AF37] text-xs font-mono font-semibold tracking-wider uppercase border border-[#D4AF37]/30">
                <span>LEARN MORE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-grotesk text-white tracking-tight">
                Let's build <br className="hidden sm:inline" />
                <span className="text-[#D4AF37]">something together.</span>
              </h2>

              <p className="text-base text-white/85 leading-relaxed">
                Whether you're a school proprietor, a graduate ready to build, or an SME looking for practical AI support, tell us what you need and our system will instantly send a confirmation email with next steps.
              </p>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-[#1116A6]/90 border border-white/10 rounded-2xl p-6 space-y-4">
              
              {/* Phone Line */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A0D66] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-white/60 block">Direct Phone & WhatsApp</span>
                  <a
                    href="tel:+2348067901364"
                    className="text-lg font-bold font-grotesk text-[#D4AF37] hover:underline"
                  >
                    +234 806 790 1364
                  </a>
                </div>
              </div>

              {/* Email Line */}
              <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#0A0D66] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-white/60 block">Direct Email Contact</span>
                  <a
                    href="mailto:sticktechafrica@gmail.com"
                    className="text-base sm:text-lg font-bold font-grotesk text-[#D4AF37] hover:underline"
                  >
                    sticktechafrica@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-[#D4AF37]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Instant automated response email dispatched upon form submission</span>
              </div>
            </div>

          </div>

          {/* Right Column - Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-[#4B5568] rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#D4AF37]">
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-grotesk text-[#0A0D66]">
                  Send Us an Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5568]">
                  Fill out the details below. We log your inquiry in our database and instantly send a personalized response email to your inbox.
                </p>
              </div>

              {inlineSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span>{inlineSuccess}</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                
                {/* Bot-Trap Honeypot Field (Hidden from humans) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_hp">Leave this empty</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                
                {/* Field 1: Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="full_name" className="block text-xs font-mono font-bold text-[#0A0D66] uppercase">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="e.g. Dr. Emmanuel Adeleke or Amina Yusuf"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#1116A6] focus:ring-2 focus:ring-[#1116A6]/20 text-sm outline-none transition-all pl-10 text-[#0A0D66] font-medium"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* Field 2: Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono font-bold text-[#0A0D66] uppercase">
                    Email Address (Where you'll receive your confirmation) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@school.edu.ng or name@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#1116A6] focus:ring-2 focus:ring-[#1116A6]/20 text-sm outline-none transition-all pl-10 text-[#0A0D66] font-medium"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* Field 3: Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-mono font-bold text-[#0A0D66] uppercase">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 801 234 5678 or 08012345678"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#1116A6] focus:ring-2 focus:ring-[#1116A6]/20 text-sm outline-none transition-all pl-10 text-[#0A0D66] font-medium"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* Field 4: I am a... */}
                <div className="space-y-1.5">
                  <label htmlFor="audience_type" className="block text-xs font-mono font-bold text-[#0A0D66] uppercase">
                    I am a... <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="audience_type"
                    name="audience_type"
                    required
                    value={formData.audience_type}
                    onChange={(e) => {
                      const val = e.target.value as AudienceType;
                      setFormData({ ...formData, audience_type: val });
                      onAudienceChange(val);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#1116A6] focus:ring-2 focus:ring-[#1116A6]/20 text-sm outline-none transition-all text-[#0A0D66] font-semibold bg-white"
                  >
                    <option value="School Owner / Proprietor">School Owner / Proprietor (School Partnership)</option>
                    <option value="Graduate">Graduate (Cohort Application)</option>
                    <option value="SME / Business Owner">SME / Business Owner (Solutions & Retainer Quote)</option>
                    <option value="Other">Other / General Inquiry</option>
                  </select>
                </div>

                {/* Field 5: Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-mono font-bold text-[#0A0D66] uppercase">
                    What would you like to know? <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your school, project timeline, or specific SME service needs..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#1116A6] focus:ring-2 focus:ring-[#1116A6]/20 text-sm outline-none transition-all pl-10 text-[#0A0D66] font-medium"
                    />
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4AF37] hover:bg-[#c29e2f] text-[#0A0D66] font-extrabold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-base font-grotesk shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#0A0D66]" />
                      <span>Dispatching to Supabase & Sending Email...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry & Get Response Email</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-[#4B5568] block">
                    Trouble submitting? <a href={`mailto:sticktechafrica@gmail.com?subject=Inquiry from ${encodeURIComponent(formData.full_name || 'Website Visitor')}&body=${encodeURIComponent(formData.message || 'Hello StickTech Africa,')}`} className="text-[#1116A6] font-bold underline">Click here to send email directly</a>
                  </span>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Interactive Success & Automated Email Preview Modal */}
      {successModal && successModal.open && (
        <div className="fixed inset-0 z-50 bg-[#0A0D66]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-[#D4AF37] text-center space-y-5 text-[#4B5568] my-8">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-grotesk text-[#0A0D66]">
                Inquiry Received & Logged!
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                <Inbox className="w-3.5 h-3.5 text-emerald-600" />
                <span>Automated Response Email Dispatched</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#4B5568]">
                We have saved your submission in the Supabase database and dispatched an automated confirmation email to <strong>{successModal.record?.email}</strong>.
              </p>
            </div>

            {/* Submission Record Summary Card */}
            <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-200 text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="text-[#0A0D66] font-bold">Supabase Database Record:</span>
                <span className="text-[10px] bg-blue-100 text-[#0A0D66] px-2 py-0.5 rounded font-bold">Active</span>
              </div>
              <p className="text-[#4B5568]"><strong>Name:</strong> {successModal.record?.full_name}</p>
              <p className="text-[#4B5568]"><strong>Email:</strong> {successModal.record?.email}</p>
              <p className="text-[#4B5568]"><strong>Phone:</strong> {successModal.record?.phone}</p>
              <p className="text-[#4B5568]"><strong>Category:</strong> {successModal.record?.audience_type}</p>
              <p className="text-[#4B5568] truncate"><strong>Subject:</strong> {successModal.record?.auto_response_subject || 'Inquiry Confirmation — StickTech Africa'}</p>
              <p className="text-[#4B5568]"><strong>Ref ID:</strong> {successModal.record?.id}</p>
            </div>

            {/* Toggle View for Full HTML Email Preview */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShowEmailPreview(!showEmailPreview)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-300 hover:border-[#1116A6] text-xs font-semibold text-[#0A0D66] bg-slate-100/70 hover:bg-slate-100 transition-colors"
              >
                <Eye className="w-4 h-4 text-[#1116A6]" />
                <span>{showEmailPreview ? 'Hide Automated Email Preview' : 'Preview Sent Confirmation Email'}</span>
              </button>

              {showEmailPreview && (
                <div className="text-left bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 text-xs space-y-3 max-h-60 overflow-y-auto font-sans shadow-inner">
                  <div className="border-b border-slate-700 pb-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>To: {successModal.record?.email}</span>
                    <span className="text-[#D4AF37]">From: StickTech Africa</span>
                  </div>
                  <div className="font-bold text-[#D4AF37] text-sm">
                    {successModal.record?.auto_response_subject || 'Inquiry Confirmation — StickTech Africa'}
                  </div>
                  <div className="text-slate-300 space-y-2 leading-relaxed">
                    <p>Hello <strong>{successModal.record?.full_name}</strong>,</p>
                    <p>
                      Thank you for contacting StickTech Africa regarding <strong>{successModal.record?.audience_type}</strong>. We have logged your request into our database.
                    </p>
                    <p className="p-2 bg-slate-800 rounded border-l-2 border-[#D4AF37] text-slate-200">
                      &ldquo;{successModal.record?.message}&rdquo;
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Our coordinators are reviewing your submission and will reach out via WhatsApp/Phone at {successModal.record?.phone} within 24 hours.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Action Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={`mailto:sticktechafrica@gmail.com?subject=Follow up on Ref: ${encodeURIComponent(successModal.record?.id || '')}`}
                className="w-full bg-[#1116A6] hover:bg-[#0A0D66] text-white font-bold py-3 px-4 rounded-xl transition-all text-xs font-grotesk flex items-center justify-center gap-2"
              >
                <span>Reply / Open Mail Client</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>

              <button
                type="button"
                onClick={() => setSuccessModal(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#0A0D66] font-semibold py-2.5 rounded-xl transition-all text-xs font-grotesk"
              >
                Close & Return
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

