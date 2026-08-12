import React, { useState } from 'react';
import { X, Github, Copy, Check, Download, FileCode, Terminal, Sparkles } from 'lucide-react';
import { SUPABASE_SQL_SCHEMA } from '../lib/supabase';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'git' | 'index' | 'css' | 'js'>('git');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Code generator for zero-build HTML5 static setup
  const standaloneHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StickTech Africa | EdTech & AI Solutions</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brandBlue: '#1116A6',
            brandGold: '#D4AF37',
            brandDark: '#0A0D66',
            slateGray: '#4B5568',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            grotesk: ['Space Grotesk', 'sans-serif'],
            mono: ['IBM Plex Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  <!-- Supabase JS Client -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <link rel="stylesheet" href="style.css" />
</head>
<body class="bg-white text-slateGray antialiased">

  <!-- HEADER -->
  <header class="sticky top-0 z-50 bg-[#1116A6] border-b border-[#0A0D66] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
      <a href="#" className="flex items-center gap-3 font-grotesk font-bold text-xl text-white">
        <span className="w-10 h-10 rounded-lg bg-[#0A0D66] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center font-mono text-lg">ST</span>
        <span>StickTech <span className="text-[#D4AF37]">Africa</span></span>
      </a>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <a href="#programs" className="hover:text-[#D4AF37]">Programs</a>
        <a href="#contact" className="hover:text-[#D4AF37]">High Schools</a>
        <a href="#contact" className="hover:text-[#D4AF37]">Graduates</a>
        <a href="#contact" className="hover:text-[#D4AF37]">SMEs</a>
      </nav>
      <a href="#contact" className="bg-[#D4AF37] text-[#0A0D66] font-bold px-5 py-2.5 rounded-lg font-grotesk text-sm hover:bg-[#c29e2f]">Get in Touch</a>
    </div>
  </header>

  <!-- HERO -->
  <section className="bg-[#1116A6] text-white py-20 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
      <span className="inline-block px-3 py-1 bg-[#0A0D66] text-[#D4AF37] font-mono text-xs rounded-full border border-[#D4AF37]/30 uppercase">
        EDTECH & AI SOLUTIONS · BUILT IN AFRICA
      </span>
      <h1 className="text-4xl sm:text-6xl font-extrabold font-grotesk leading-tight">
        Practical tech & AI skills, <br/><span className="text-[#D4AF37]">built where students</span> already are.
      </h1>
      <p className="text-lg text-white/85 max-w-2xl">
        StickTech Africa trains high school students and graduates in game development, mobile apps, and AI agents inside the schools they already attend, then channels that same talent into real solutions for SMEs.
      </p>
      <div className="pt-4 flex flex-wrap gap-4">
        <a href="#contact" onclick="preselectAudience('School Owner / Proprietor')" className="bg-[#D4AF37] text-[#0A0D66] font-bold px-7 py-3.5 rounded-xl font-grotesk">Partner Your School</a>
        <a href="#programs" className="border border-white/40 text-white font-medium px-6 py-3.5 rounded-xl hover:bg-white/10">Explore Programs</a>
      </div>
    </div>
  </section>

  <!-- CONTACT FORM WITH SUPABASE -->
  <section id="contact" className="py-20 bg-[#0A0D66] text-white">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white text-slateGray p-8 sm:p-10 rounded-3xl border-2 border-[#D4AF37] shadow-2xl">
        <h2 className="text-3xl font-bold font-grotesk text-[#0A0D66] mb-2">Let's build something together</h2>
        <form id="contact-form" className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-[#0A0D66] uppercase mb-1">Full Name</label>
            <input type="text" id="full_name" required className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-[#0A0D66]" placeholder="e.g. Dr. Emmanuel Adeleke" />
          </div>
          <div>
            <label className="block text-xs font-mono font-bold text-[#0A0D66] uppercase mb-1">Email Address</label>
            <input type="email" id="email" required className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-[#0A0D66]" placeholder="you@school.edu.ng" />
          </div>
          <div>
            <label className="block text-xs font-mono font-bold text-[#0A0D66] uppercase mb-1">I am a...</label>
            <select id="audience_type" required className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-[#0A0D66]">
              <option value="School Owner / Proprietor">School Owner / Proprietor</option>
              <option value="Graduate">Graduate</option>
              <option value="SME / Business Owner">SME / Business Owner</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono font-bold text-[#0A0D66] uppercase mb-1">Message</label>
            <textarea id="message" rows="4" required className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-[#0A0D66]" placeholder="Tell us about your needs..."></textarea>
          </div>
          <button type="submit" id="submit-btn" className="w-full bg-[#D4AF37] text-[#0A0D66] font-extrabold py-4 rounded-xl font-grotesk text-base hover:bg-[#c29e2f]">Send Message</button>
        </form>
      </div>
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>`;

  const standaloneJs = `// StickTech Africa Supabase Integration Script
const SUPABASE_URL = 'https://cgccrpkvoupltyolaepj.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabaseClient = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        full_name: document.getElementById('full_name').value,
        email: document.getElementById('email').value,
        audience_type: document.getElementById('audience_type').value,
        message: document.getElementById('message').value
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending to Supabase...';
      }

      let success = false;

      if (supabaseClient) {
        const { data, error } = await supabaseClient.from('leads').insert([formData]);
        if (!error) {
          success = true;
        } else {
          console.error('Supabase error:', error);
        }
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Send Message';
      }

      if (success) {
        alert('Thank you! Your submission has been saved directly to Supabase. StickTech Africa will contact you shortly.');
        contactForm.reset();
      } else {
        alert('Opening mail app to complete submission...');
        window.location.href = \`mailto:sticktechafrica@gmail.com?subject=Inquiry from \${encodeURIComponent(formData.full_name)}&body=\${encodeURIComponent(formData.message)}\`;
      }
    });
  }
});

function preselectAudience(audience) {
  const selectElem = document.getElementById('audience_type');
  if (selectElem) selectElem.value = audience;
}
`;

  const standaloneCss = `/* Custom Circuit animations & Brand Overrides */
body {
  font-family: 'Inter', sans-serif;
  color: #4B5568;
}
h1, h2, h3, h4, .font-grotesk {
  font-family: 'Space Grotesk', sans-serif;
}
.font-mono {
  font-family: 'IBM Plex Mono', monospace;
}
`;

  const gitCommands = `# 1. Initialize local repository
git init

# 2. Add all files to staging
git add .

# 3. Commit changes
git commit -m "Initial commit: StickTech Africa dual-engine website"

# 4. Rename main branch
git branch -M main

# 5. Connect to your GitHub repository (ogeitunu/sticktech-africa)
git remote add origin https://github.com/ogeitunu/sticktech-africa.git

# 6. Push to GitHub
git push -u origin main
`;

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'index': return standaloneHtml;
      case 'js': return standaloneJs;
      case 'css': return standaloneCss;
      default: return gitCommands;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0D66]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0A0D66] text-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border-2 border-[#D4AF37] shadow-2xl relative space-y-6 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1116A6] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-grotesk text-white flex items-center gap-2">
                GitHub Repository Exporter
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </h3>
              <p className="text-xs text-white/70 font-mono">
                Clean, zero-build structure ready to push directly to GitHub
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('git')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ${
              activeTab === 'git'
                ? 'bg-[#D4AF37] text-[#0A0D66]'
                : 'bg-[#1116A6] text-white/80 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Git Commands</span>
          </button>

          <button
            onClick={() => setActiveTab('index')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ${
              activeTab === 'index'
                ? 'bg-[#D4AF37] text-[#0A0D66]'
                : 'bg-[#1116A6] text-white/80 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>index.html</span>
          </button>

          <button
            onClick={() => setActiveTab('js')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ${
              activeTab === 'js'
                ? 'bg-[#D4AF37] text-[#0A0D66]'
                : 'bg-[#1116A6] text-white/80 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>script.js</span>
          </button>

          <button
            onClick={() => setActiveTab('css')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ${
              activeTab === 'css'
                ? 'bg-[#D4AF37] text-[#0A0D66]'
                : 'bg-[#1116A6] text-white/80 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>style.css</span>
          </button>
        </div>

        {/* Code View Area */}
        <div className="relative bg-[#060833] rounded-xl border border-white/10 p-4 font-mono text-xs overflow-auto flex-1 text-emerald-300 leading-relaxed max-h-96">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 bg-[#1116A6] hover:bg-[#D4AF37] hover:text-[#0A0D66] text-white font-mono text-xs px-3 py-1.5 rounded border border-white/20 flex items-center gap-1.5 transition-all z-10"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <pre className="whitespace-pre-wrap">{getCurrentContent()}</pre>
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => downloadFile('index.html', standaloneHtml)}
              className="bg-[#1116A6] hover:bg-white/20 text-white font-mono text-xs px-3 py-2 rounded-lg border border-white/20 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>index.html</span>
            </button>
            <button
              onClick={() => downloadFile('script.js', standaloneJs)}
              className="bg-[#1116A6] hover:bg-white/20 text-white font-mono text-xs px-3 py-2 rounded-lg border border-white/20 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>script.js</span>
            </button>
            <button
              onClick={() => downloadFile('style.css', standaloneCss)}
              className="bg-[#1116A6] hover:bg-white/20 text-white font-mono text-xs px-3 py-2 rounded-lg border border-white/20 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>style.css</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="bg-[#D4AF37] text-[#0A0D66] font-bold px-5 py-2 rounded-lg font-grotesk text-sm hover:bg-[#c29e2f]"
          >
            Close Exporter
          </button>
        </div>

      </div>
    </div>
  );
};
