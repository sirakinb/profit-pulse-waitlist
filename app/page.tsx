"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ══════════════════════════════════════════════════════════════════
   WAITLIST FORM
   ══════════════════════════════════════════════════════════════════ */

function WaitlistForm({ variant = "hero" }: { variant?: "hero" | "inline" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-3 rounded-lg px-5 py-3 bg-white/10 backdrop-blur-sm">
        <svg className="w-5 h-5 flex-shrink-0 text-[#43A047]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="font-body text-[14px] font-medium text-white">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-xl">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
        placeholder="Enter your email address"
        required
        className={`flex-1 rounded-lg px-4 py-2.5 text-[14px] font-body outline-none transition-all ${
          variant === "hero"
            ? "bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:border-[#E65100] focus:ring-1 focus:ring-[#E65100]"
            : "bg-white text-text-primary placeholder-text-muted border border-border focus:border-[#E65100] focus:ring-1 focus:ring-[#E65100]"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-out px-6 py-2.5 text-[15px] bg-orange text-white hover:bg-[#BF4400] active:bg-[#A33B00] shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
      >
        {status === "loading" ? "Joining..." : "Join the Waitlist"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-[12px] mt-1">{message}</p>
      )}
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */

const benefits = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" stroke="#E65100" strokeWidth="2.5" fill="#FFF8F5" />
        <path d="M18 9v9l6 3.5" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "One number. Total clarity.",
    description:
      "Your Health Score tells you exactly where your business stands\u2014on a simple 0 to 100 scale. Green means thriving. Amber means caution. Red means act now.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="4" y="7" width="28" height="22" rx="3" stroke="#E65100" strokeWidth="2.5" fill="#FFF8F5" />
        <path d="M10 16h16M10 21h10" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Your numbers, translated.",
    description:
      "AI reads your financials and tells you what they actually mean\u2014in plain English. No jargon. No charts you don\u2019t understand. Just answers.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M7 29V16l7-9 7 13 8-13v22" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    title: "Test the big decisions first.",
    description:
      "\u201CCan I hire a $55K employee?\u201D \u201CWhat happens if revenue drops 20%?\u201D Run the scenario. See the math. Decide with confidence\u2014not anxiety.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M18 5v7M18 24v7M5 18h7M24 18h7" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18" cy="18" r="5.5" stroke="#E65100" strokeWidth="2.5" fill="#FFF8F5" />
      </svg>
    ),
    title: "Problems caught early.",
    description:
      "Cash dropping below $10K? Expenses up 30% this month? You\u2019ll know before it hurts\u2014not after the damage is done.",
  },
];

const steps = [
  { num: "01", title: "Upload Your Data", description: "Upload a spreadsheet in one click. It takes 5 minutes." },
  { num: "02", title: "Get Your Health Score", description: "AI analyzes your revenue, expenses, and cash flow\u2014then scores your financial health from 0 to 100." },
  { num: "03", title: "Make Better Decisions", description: "Run scenarios, see recommendations, and act with confidence. No more guessing. No more sleepless nights." },
];

const scenarios = [
  {
    title: "Can I Afford This Hire?",
    description: "Enter a salary and see if your numbers support it\u2014before you sign the offer letter.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="10" r="5" stroke="#E65100" strokeWidth="2" />
        <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    mini: (
      <div className="mt-3 space-y-1.5">
        <div className="flex justify-between text-[11px]"><span className="text-white/40">Salary</span><span className="text-white/70">$65,000</span></div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[72%] bg-gradient-to-r from-[#43A047] to-[#FB8C00] rounded-full" /></div>
        <div className="text-[10px] text-white/30">Runway impact: -2.1 months</div>
      </div>
    ),
  },
  {
    title: "What\u2019s My Break-Even?",
    description: "Find the exact number where you stop losing money and start keeping it.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 24L14 14L20 18L26 8" stroke="#E65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 28h20" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    mini: (
      <div className="mt-3 space-y-1.5">
        <div className="flex justify-between text-[11px]"><span className="text-white/40">Break-even</span><span className="text-[#43A047]">$38,200/mo</span></div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[85%] bg-[#43A047] rounded-full" /></div>
        <div className="text-[10px] text-white/30">Current: $41,500/mo (above target)</div>
      </div>
    ),
  },
  {
    title: "How Long Is My Runway?",
    description: "See how many months of cash you have left at your current burn rate.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="#E65100" strokeWidth="2" />
        <path d="M12 16h8M16 12v8" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    mini: (
      <div className="mt-3 space-y-1.5">
        <div className="flex justify-between text-[11px]"><span className="text-white/40">Months left</span><span className="text-[#FB8C00]">5.4 months</span></div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[45%] bg-[#FB8C00] rounded-full" /></div>
        <div className="text-[10px] text-white/30">Burn rate: $8,700/mo</div>
      </div>
    ),
  },
  {
    title: "Will I Hit My Revenue Goal?",
    description: "Track progress toward your target and see exactly what\u2019s needed to close the gap.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="10" stroke="#E65100" strokeWidth="2" />
        <circle cx="16" cy="16" r="5" stroke="#E65100" strokeWidth="2" />
        <circle cx="16" cy="16" r="1.5" fill="#E65100" />
      </svg>
    ),
    mini: (
      <div className="mt-3 space-y-1.5">
        <div className="flex justify-between text-[11px]"><span className="text-white/40">Goal</span><span className="text-white/70">$500K annual</span></div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[63%] bg-gradient-to-r from-[#E65100] to-[#FF7A00] rounded-full" /></div>
        <div className="text-[10px] text-white/30">63% on track ($315K YTD)</div>
      </div>
    ),
  },
];

const faqs = [
  { q: "Do I need accounting experience?", a: "Not at all. ProfitPulse translates everything into plain English. If you can read a text message, you can understand your financial health." },
  { q: "How does the Health Score work?", a: "It\u2019s a 0\u2013100 composite score based on three things: cash runway (35% weight), profit margin (30% weight), and receivables health (35% weight). Green means thriving. Amber means caution. Red means act now." },
  { q: "What\u2019s a scenario calculator?", a: "It\u2019s a what-if tool. Ask \u201CCan I afford this hire?\u201D or \u201CWhat if revenue drops 20%?\u201D and see the financial math instantly\u2014before you commit real money." },
  { q: "Is my data secure?", a: "Absolutely. Bank-grade encryption in transit and at rest. We never store your login credentials. Read-only access to your books\u2014we can\u2019t change a thing." },
  { q: "Can I upload a spreadsheet instead?", a: "Yes. CSV and Excel files are fully supported. Smart column detection maps your data automatically\u2014no reformatting needed." },
  { q: "Can I cancel anytime?", a: "Yes. No contracts, no setup fees, no cancellation fees. Cancel in two clicks from your settings page. Your data stays yours." },
];

/* ══════════════════════════════════════════════════════════════════
   UTILITY ICONS
   ══════════════════════════════════════════════════════════════════ */

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="M5 8l5 5 5-5" stroke="#6B6560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DASHBOARD PREVIEW
   ══════════════════════════════════════════════════════════════════ */

function DashboardPreview() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-6 rounded-[28px] opacity-25 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #E65100 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative bg-surface rounded-xl shadow-elevated border border-[#F0EDE8] p-6 md:p-8">
        <p className="font-body text-small text-text-muted mb-1">Good morning, Jessica</p>
        <p className="font-body text-small text-text-muted mb-5">Monday, February 19, 2026</p>

        <div className="flex items-center gap-6 mb-6">
          <div className="relative w-[100px] h-[100px] flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="#1a1a2e" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#43A047" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${0.82 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-[28px] text-white">82</span>
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-small font-semibold bg-[#43A047]/10 text-[#43A047] mb-2">Healthy</span>
            <p className="font-body text-small text-text-muted">+5 from last month</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Profit", value: "$12,400", status: "Strong" },
            { label: "Cash Flow", value: "$8,200", status: "Positive" },
            { label: "Runway", value: "7.2 mo", status: "Safe" },
          ].map((m) => (
            <div key={m.label} className="bg-background rounded-lg p-3">
              <p className="font-body text-[11px] text-text-muted mb-1">{m.label}</p>
              <p className="font-display text-[18px] text-text-primary">{m.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 rounded-full bg-[#43A047]" />
                <span className="font-body text-[11px] text-text-muted">{m.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-background rounded-lg p-3 border border-[#F0EDE8]">
          <div className="flex items-start gap-2">
            <span className="text-[16px] mt-[1px]" aria-hidden="true">&#128161;</span>
            <p className="font-body text-[12px] text-text-secondary leading-[1.5]">
              Your cash position is strong at $47,300. At current spending, you can operate for 7+ months without new revenue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SCROLL-REVEAL
   ══════════════════════════════════════════════════════════════════ */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════ */

export default function WaitlistPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Scenarios", href: "#scenarios" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#2D2A26]/80 via-[#2D2A26]/40 to-transparent backdrop-blur-[2px]">
        <nav className="max-w-6xl mx-auto px-2 md:px-6 flex items-center justify-between h-[110px]">
          <Image src="/full-logo.png" alt="ProfitPulse" width={900} height={200} className="h-[150px] md:h-[190px] w-auto" priority />

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="font-body text-body text-white/80 hover:text-white transition-colors">{link.label}</a>
            ))}
            <a href="#join" className="inline-flex items-center justify-center font-medium rounded-lg px-3 py-1.5 text-[13px] bg-orange text-white hover:bg-[#BF4400] active:bg-[#A33B00] shadow-sm hover:shadow-md transition-all duration-150 ease-out">
              Join Waitlist
            </a>
          </div>

          <button className="lg:hidden p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#2D2A26]/95 backdrop-blur-sm border-t border-white/10 px-2 py-4 space-y-2">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="block font-body text-body text-white/70 hover:text-white py-1" onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
            ))}
            <a href="#join" className="block w-full text-center font-medium rounded-lg px-3 py-1.5 text-[13px] bg-orange text-white hover:bg-[#BF4400]" onClick={() => setMobileMenuOpen(false)}>
              Join Waitlist
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2A26]/90 via-[#2D2A26]/70 to-[#2D2A26]/40" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-6xl mx-auto px-2 md:px-6 pt-[130px] pb-8 md:pt-[140px] md:pb-2xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="font-body text-[14px] md:text-[16px] uppercase tracking-[0.2em] text-[#E65100] mb-4 font-bold">
                CEO Dashboard for Service Businesses
              </p>
              <h1 className="font-display text-[32px] md:text-[48px] leading-[1.1] text-white mb-4">
                You didn&rsquo;t start a business to stare at spreadsheets.
              </h1>
              <p className="font-body text-[16px] md:text-[18px] leading-[1.7] text-white/80 mb-2">
                You&rsquo;re good at what you do. Engineering. Dentistry. Construction. Consulting.
              </p>
              <p className="font-body text-[16px] md:text-[18px] leading-[1.7] text-white/80 mb-2">
                But every month, the same knot in your stomach:{" "}
                <em className="text-white/90">&ldquo;Am I actually making money? Can I afford that hire? How long until cash runs out?&rdquo;</em>
              </p>
              <p className="font-body text-[16px] md:text-[18px] leading-[1.7] text-white font-medium mb-6">
                ProfitPulse gives you a single health score and plain-English answers&mdash;so you stop guessing and start deciding.
              </p>

              <div id="join">
                <WaitlistForm variant="hero" />
              </div>
              <p className="font-body text-small text-white/40 mt-4">
                Be the first to know when we launch. No spam, ever.
              </p>
            </div>

            <div className="hidden lg:block lg:scale-[1.15] lg:origin-center lg:translate-x-6">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile dashboard preview */}
      <section className="lg:hidden px-2 py-6 bg-background">
        <DashboardPreview />
      </section>

      {/* FEATURES */}
      <section id="features" className="py-8 md:py-[112px] scroll-mt-[120px]">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <RevealSection>
            <div className="text-center mb-8 md:mb-[72px]">
              <p className="font-body text-small uppercase tracking-[0.2em] text-[#E65100] mb-2">Built for Business Owners</p>
              <h2 className="font-display text-h2 md:text-[36px] text-text-primary mb-2">What ProfitPulse Does For You</h2>
              <p className="font-body text-body md:text-[16px] text-text-secondary max-w-xl mx-auto">Not another accounting tool. A dashboard built for the person who <em>runs</em> the business.</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <RevealSection key={benefit.title} delay={i * 100}>
                <div className="flex gap-4 items-start h-full rounded-xl p-6 bg-surface border border-border-light shadow-card hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
                  <div className="flex-shrink-0 w-[56px] h-[56px] bg-[#FFF8F5] rounded-lg flex items-center justify-center border border-[#E65100]/10">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-h3 text-text-primary mb-1">{benefit.title}</h3>
                    <p className="font-body text-body text-text-secondary leading-[1.7]">{benefit.description}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-8 md:py-[112px] bg-surface scroll-mt-[120px]">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <RevealSection>
            <div className="text-center mb-8 md:mb-[72px]">
              <p className="font-body text-small uppercase tracking-[0.2em] text-[#E65100] mb-2">Simple Setup</p>
              <h2 className="font-display text-h2 md:text-[36px] text-text-primary mb-2">Three Steps to Clarity</h2>
              <p className="font-body text-body md:text-[16px] text-text-secondary max-w-xl mx-auto">From confusion to confidence in under 5 minutes.</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative">
            <div className="hidden md:block absolute top-[40px] left-[16.67%] right-[16.67%] h-[2px] bg-[#F0EDE8]" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E65100]/30 via-[#E65100]/50 to-[#E65100]/30" />
            </div>
            {steps.map((step, i) => (
              <RevealSection key={step.num} delay={i * 150}>
                <div className="text-center relative">
                  <div className="inline-flex items-center justify-center w-[80px] h-[80px] rounded-full bg-[#FFF8F5] border-2 border-[#E65100]/20 mb-4 relative z-10">
                    <span className="font-display text-[28px] text-[#E65100]">{step.num}</span>
                  </div>
                  <h3 className="font-display text-h3 text-text-primary mb-1">{step.title}</h3>
                  <p className="font-body text-body text-text-secondary leading-[1.7] max-w-[300px] mx-auto">{step.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section id="scenarios" className="py-8 md:py-[112px] bg-[#2D2A26] scroll-mt-[120px]">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <RevealSection>
            <div className="text-center mb-8 md:mb-[72px]">
              <p className="font-body text-small uppercase tracking-[0.2em] text-[#E65100] mb-2">What-If Calculators</p>
              <h2 className="font-display text-h2 md:text-[36px] text-white mb-2">Test Every Decision Before You Make It</h2>
              <p className="font-body text-body md:text-[16px] text-white/60 max-w-xl mx-auto">Stop losing sleep over &ldquo;what ifs.&rdquo; Run the numbers in seconds.</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scenarios.map((s, i) => (
              <RevealSection key={s.title} delay={i * 100}>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 h-full group">
                  <div className="w-[48px] h-[48px] bg-[#E65100]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#E65100]/15 transition-colors duration-300">{s.icon}</div>
                  <h3 className="font-display text-h3 text-white mb-1">{s.title}</h3>
                  <p className="font-body text-body text-white/60 leading-[1.7]">{s.description}</p>
                  {s.mini}
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={400}>
            <div className="text-center mt-8">
              <a href="#join" className="inline-flex items-center justify-center font-medium rounded-lg px-6 py-2.5 text-[15px] bg-orange text-white hover:bg-[#BF4400] active:bg-[#A33B00] shadow-sm hover:shadow-md transition-all duration-150 ease-out">
                Join Waitlist for Early Access
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* AI INSIGHTS */}
      <section className="py-8 md:py-[112px]">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <RevealSection>
            <div className="text-center mb-8 md:mb-[72px]">
              <p className="font-body text-small uppercase tracking-[0.2em] text-[#E65100] mb-2">AI-Powered Insights</p>
              <h2 className="font-display text-h2 md:text-[36px] text-text-primary mb-2">Like Having a CFO On Speed Dial</h2>
              <p className="font-body text-body md:text-[16px] text-text-secondary max-w-xl mx-auto">No jargon. No charts you don&rsquo;t understand. Just answers.</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            <RevealSection delay={0}>
              <div className="h-full">
                <p className="font-body text-small font-semibold text-text-muted uppercase tracking-wider mb-2">Before ProfitPulse</p>
                <div className="bg-[#F5F3F0] rounded-lg p-4 border border-[#E8E4DF] h-[calc(100%-28px)]">
                  <div className="space-y-3">
                    {["2,847 transactions across 14 categories...", "Revenue: $184,293.47 (QoQ delta -3.2%)", "OPEX ratio 0.73, AR aging 45+ days...", "Accrual-basis adj. EBITDA margin...", "Depreciation schedule vs. capex forecast..."].map((line) => (
                      <div key={line} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-error/20" />
                        <p className="font-body text-body text-text-secondary">{line}</p>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-[#E0DCD7]">
                      <p className="font-body text-small text-text-muted italic">&ldquo;What does any of this mean? Am I okay or not?&rdquo;</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="h-full">
                <p className="font-body text-small font-semibold text-[#E65100] uppercase tracking-wider mb-2">With ProfitPulse</p>
                <div className="bg-surface rounded-lg p-4 border-2 border-[#E65100]/20 shadow-soft h-[calc(100%-28px)]">
                  <div className="space-y-3">
                    {[
                      { text: "You can hire. Your numbers support it.", color: "#43A047" },
                      { text: "Runway stays above 6 months after the hire.", color: "#43A047" },
                      { text: "Risk level: Low.", color: "#43A047" },
                      { text: "Watch: Receivables are aging. Follow up on 3 invoices.", color: "#FB8C00" },
                      { text: "Profit margin is healthy at 18.4%.", color: "#43A047" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <p className="font-body text-body text-text-primary font-medium">{item.text}</p>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-[#F0EDE8]">
                      <p className="font-body text-small text-[#E65100] font-medium">Clear answers. Confident decisions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section className="py-8 md:py-[112px] bg-[#2D2A26]">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <RevealSection>
              <div>
                <p className="font-body text-small uppercase tracking-[0.2em] text-[#E65100] mb-2">Live Preview</p>
                <h2 className="font-display text-h2 md:text-[36px] text-white mb-4 leading-[1.15]">What If You Hired a Senior Developer?</h2>
                <p className="font-body text-[16px] md:text-[18px] leading-[1.7] text-white/70 mb-2">Before you commit to a $95K salary, see exactly how it impacts your cash flow, runway, and risk level.</p>
                <p className="font-body text-[16px] md:text-[18px] leading-[1.7] text-white/70 mb-6">ProfitPulse runs the numbers in seconds&mdash;so you decide with data, not hope.</p>
                <a href="#join" className="inline-flex items-center justify-center font-medium rounded-lg px-6 py-2.5 text-[15px] bg-orange text-white hover:bg-[#BF4400] active:bg-[#A33B00] shadow-sm hover:shadow-md transition-all duration-150 ease-out">
                  Join Waitlist for Early Access
                </a>
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[24px] opacity-15 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, #E65100 0%, transparent 70%)" }} aria-hidden="true" />
                <div className="relative bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 md:p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <div>
                      <p className="font-body text-small text-white/40 uppercase tracking-wider mb-1">Scenario</p>
                      <p className="font-display text-h3 text-white">New Hire Analysis</p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-small font-semibold bg-[#FB8C00]/15 text-[#FB8C00]">HIGH RISK</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Position", value: "Senior Developer" },
                      { label: "Annual Salary", value: "$95,000/yr" },
                      { label: "Monthly Cost", value: "$7,917/mo" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center">
                        <span className="font-body text-body text-white/60">{row.label}</span>
                        <span className="font-body text-body text-white font-medium">{row.value}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-body text-body text-white/60">Revenue Needed</span>
                        <span className="font-body text-body text-[#E65100] font-medium">+$11,500/mo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-body text-body text-white/60">Current Runway</span>
                        <div className="flex items-center gap-2">
                          <span className="font-body text-body text-white/40 line-through">7.2 mo</span>
                          <span className="font-body text-body text-white">&#8594;</span>
                          <span className="font-body text-body text-[#FB8C00] font-medium">4.8 mo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Runway After Hire</span>
                      <span className="text-[#FB8C00]">4.8 months</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[40%] bg-gradient-to-r from-[#FB8C00] to-[#E53935] rounded-full" />
                    </div>
                  </div>
                  <div className="mt-4 bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-start gap-2">
                      <span className="text-[14px] mt-[1px]" aria-hidden="true">&#9888;&#65039;</span>
                      <p className="font-body text-[12px] text-white/70 leading-[1.6]">This hire would reduce runway below 6 months. Consider waiting until monthly revenue exceeds $45K or exploring a contract-to-hire arrangement.</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="py-8 md:py-[112px] bg-surface scroll-mt-[120px]">
        <div className="max-w-3xl mx-auto px-2 md:px-6">
          <RevealSection>
            <div className="text-center mb-8 md:mb-[72px]">
              <p className="font-body text-small uppercase tracking-[0.2em] text-[#E65100] mb-2">FAQ</p>
              <h2 className="font-display text-h2 md:text-[36px] text-text-primary mb-2">Common Questions</h2>
              <p className="font-body text-body md:text-[16px] text-text-secondary">Everything you need to know before getting started.</p>
            </div>
          </RevealSection>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <RevealSection key={i} delay={i * 50}>
                <div className="border-b border-[#F0EDE8]">
                  <button className="w-full flex items-center justify-between py-4 text-left group cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                    <span className="font-body text-[16px] text-text-primary font-medium pr-4 group-hover:text-[#E65100] transition-colors">{faq.q}</span>
                    <ChevronIcon open={openFaq === i} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${openFaq === i ? "max-h-[300px] opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
                    <p className="font-body text-body text-text-secondary leading-[1.7]">{faq.a}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-8 md:py-[120px] bg-[#2D2A26] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(230,81,0,0.15) 0%, transparent 70%)" }} aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto px-2 md:px-6 text-center">
          <RevealSection>
            <p className="font-body text-small uppercase tracking-[0.2em] text-[#E65100] mb-4">Ready?</p>
            <h2 className="font-display text-h2 md:text-[44px] text-white leading-[1.12] mb-4">Stop Guessing.<br />Start Deciding.</h2>
            <p className="font-body text-[16px] md:text-[18px] text-white/60 leading-[1.7] mb-2 max-w-2xl mx-auto">Join hundreds of service-based business owners who finally understand their numbers&mdash;and make better decisions because of it.</p>
            <p className="font-body text-[14px] text-white/40 mb-6">Be the first to know when we launch. No credit card required.</p>
            <div className="flex justify-center">
              <WaitlistForm variant="hero" />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1E1C19] py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
            <div className="md:col-span-1">
              <p className="font-body text-small text-white/40 leading-[1.6]">Finally understand your numbers&mdash;without the accounting degree.</p>
            </div>
            <div>
              <p className="font-body text-small font-semibold text-white/60 uppercase tracking-wider mb-4">Product</p>
              <ul className="space-y-2">
                <li><a href="#features" className="font-body text-body text-white/40 hover:text-white/70 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="font-body text-body text-white/40 hover:text-white/70 transition-colors">How It Works</a></li>
                <li><a href="#scenarios" className="font-body text-body text-white/40 hover:text-white/70 transition-colors">Scenarios</a></li>
                <li><a href="#faq" className="font-body text-body text-white/40 hover:text-white/70 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-body text-small font-semibold text-white/60 uppercase tracking-wider mb-4">Legal</p>
              <ul className="space-y-2">
                <li><a href="#" className="font-body text-body text-white/40 hover:text-white/70 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="font-body text-body text-white/40 hover:text-white/70 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/symbol-logo.png" alt="ProfitPulse" width={40} height={40} className="h-[120px] w-auto opacity-40" />
              <span className="font-body text-body text-white/30">&copy; 2026 ProfitPulse. All rights reserved.</span>
            </div>
            <p className="font-body text-body text-white/30">Built for service-based business owners who want clarity, not complexity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
