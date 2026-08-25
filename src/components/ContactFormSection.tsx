import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser'; // 1. EmailJS Import
import { AudienceType, LeadFormData, LeadRecord } from '../types';
import { submitLeadToSupabase } from '../lib/supabase';
import { Send, Mail, Phone, CheckCircle2, AlertCircle, Loader2, User, MessageSquare, ShieldCheck } from 'lucide-react';

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
    audience_type: selectedAudience,
    message: '',
  } as LeadFormData);
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
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

    // Spam / Bot trap check
    if (honeypot) {
      setIsSubmitted(true);
      setSubmittedEmail(formData.email);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        audience_type: selectedAudience || 'School Owner / Proprietor',
        message: ''
      });
      return;
    }

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.phone?.trim() || !formData.message.trim()) {
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
      // 1. Submit lead to Supabase database
      const result = await submitLeadToSupabase(formData);
      
      if (result.success) {

        // 2. Dispatch Auto-Reply Email via EmailJS
        try {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              full_name: formData.full_name,
              email: formData.email,
              phone: formData.phone || 'N/A',
              audience_type: formData.audience_type,
              message: formData.message,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        } catch (emailErr) {
          console.error('EmailJS dispatch error:', emailErr);
        }

        setSubmittedEmail(formData.email.trim());
        setIsSubmitted(true);
        
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
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'Network error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0A0D66] text-white relative overflow-hidden">
      
      {/* Background glowing ambient elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1116A6] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Notification Toast */}
      {isSubmitted && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-full shadow-2xl border border-emerald-400 flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>Confirmation email dispatched to <strong>{submittedEmail}</strong></span>
          </div>
        </div>
      )}

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

          {/* Right Column - Form Container */}
          <div className="lg:col-span-7">
            <div className="bg-white text-[#4B5568] rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#D4AF37]">
              
              {isSubmitted ? (
                /* Compact Success Screen */
                <div className="py-12 px-4 text-center space-y-4 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-extrabold font-grotesk text-[#0A0D66]">
                    Thank you, Inquiry sent!
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4B5568] max-w-md leading-relaxed">
                    A confirmation message has been sent to <strong className="text-[#0A0D66]">{submittedEmail}</strong>. Please check your inbox or spam folder for next steps.
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#0A0D66] text-white text-xs font-bold font-grotesk hover:bg-[#1116A6] transition-all shadow-md"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                /* Interactive Form */
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold font-grotesk text-[#0A0D66]">
                      Send Us an Inquiry
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5568]">
                      Fill out the details below. We log your inquiry in our database and instantly send a personalized response email to your inbox.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                    
                    {/* Bot-Trap Honeypot Field */}
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
                          value={formData.phone || ''}
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
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A0D66] focus:border-transparent text-sm text-[#0A0D66] outline-none transition-all font-semibold"
                      >
                        <option value="School Owner / Proprietor">School Owner / Proprietor</option>
                        <option value="Graduate">Graduate</option>
                        <option value="SME / Business Owner">SME / Business Owner</option>
                        <option value="Other">Other</option>
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
                          <span>Sending Email...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <span className="text-[11px] text-[#4B5568] block">
                        Trouble submitting? <a href={`mailto:sticktechafrica@gmail.com?subject=Inquiry from ${encodeURIComponent(formData.full_name || 'Website Visitor')}&body=${encodeURIComponent(formData.message || 'Hello,')}`} className="text-[#1116A6] font-bold underline">Click here to send email directly</a>
                      </span>
                    </div>

                  </form>
                </>
              )}

            </div>
          </div>

        </div>

      </div>

    </section>
  );
};