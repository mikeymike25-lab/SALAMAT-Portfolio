import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

// --- Chart Components --------------------------------------------------------

const ArchitectureChart = () => (
  <div className="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 320 220" className="w-full max-w-sm" fill="none">
      <defs>
        <filter id="glow-c">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect x="10" y="85" width="90" height="50" rx="6" stroke="#00f2fe" strokeWidth="1.5" fill="#00f2fe0a" filter="url(#glow-c)" />
      <text x="55" y="107" textAnchor="middle" fill="#00f2fe" fontSize="9" fontFamily="monospace" fontWeight="bold">FRONTEND</text>
      <text x="55" y="121" textAnchor="middle" fill="#00f2fe99" fontSize="7.5" fontFamily="monospace">React / Next.js</text>
      <line x1="100" y1="110" x2="130" y2="110" stroke="#00f2fe" strokeWidth="1" strokeDasharray="4 2" />
      <polygon points="130,106 138,110 130,114" fill="#00f2fe" />
      <circle r="3.5" fill="#00f2fe" opacity="0.9">
        <animateMotion dur="2s" repeatCount="indefinite" path="M100,110 L138,110" />
      </circle>
      <rect x="138" y="85" width="90" height="50" rx="6" stroke="#a78bfa" strokeWidth="1.5" fill="#a78bfa0a" filter="url(#glow-c)" />
      <text x="183" y="107" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace" fontWeight="bold">API GATEWAY</text>
      <text x="183" y="121" textAnchor="middle" fill="#a78bfa99" fontSize="7.5" fontFamily="monospace">REST / GraphQL</text>
      <line x1="228" y1="110" x2="258" y2="110" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 2" />
      <polygon points="258,106 266,110 258,114" fill="#a78bfa" />
      <circle r="3.5" fill="#a78bfa" opacity="0.9">
        <animateMotion dur="2s" begin="0.7s" repeatCount="indefinite" path="M228,110 L266,110" />
      </circle>
      <rect x="266" y="85" width="44" height="50" rx="6" stroke="#34d399" strokeWidth="1.5" fill="#34d3990a" filter="url(#glow-c)" />
      <text x="288" y="104" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">DB</text>
      <text x="288" y="118" textAnchor="middle" fill="#34d39999" fontSize="6.5" fontFamily="monospace">Supabase</text>
      <text x="288" y="129" textAnchor="middle" fill="#34d39999" fontSize="6.5" fontFamily="monospace">Firebase</text>
      <text x="55" y="155" textAnchor="middle" fill="#ffffff40" fontSize="7" fontFamily="monospace">PRESENTATION</text>
      <text x="183" y="155" textAnchor="middle" fill="#ffffff40" fontSize="7" fontFamily="monospace">BUSINESS LOGIC</text>
      <text x="288" y="155" textAnchor="middle" fill="#ffffff40" fontSize="7" fontFamily="monospace">PERSISTENCE</text>
    </svg>
  </div>
);

const ComponentTreeChart = () => (
  <div className="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 300 220" className="w-full max-w-sm" fill="none">
      <defs>
        <filter id="glow-t">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect x="100" y="10" width="100" height="34" rx="5" stroke="#00f2fe" strokeWidth="1.5" fill="#00f2fe0d" filter="url(#glow-t)" />
      <text x="150" y="29" textAnchor="middle" fill="#00f2fe" fontSize="9" fontFamily="monospace" fontWeight="bold">App.jsx</text>
      <line x1="150" y1="44" x2="150" y2="60" stroke="#00f2fe55" strokeWidth="1" />
      <line x1="150" y1="60" x2="60" y2="60" stroke="#00f2fe55" strokeWidth="1" />
      <line x1="150" y1="60" x2="240" y2="60" stroke="#00f2fe55" strokeWidth="1" />
      <line x1="60" y1="60" x2="60" y2="75" stroke="#00f2fe55" strokeWidth="1" />
      <line x1="240" y1="60" x2="240" y2="75" stroke="#a78bfa55" strokeWidth="1" />
      <rect x="20" y="75" width="80" height="30" rx="5" stroke="#00f2fe" strokeWidth="1.2" fill="#00f2fe0a" filter="url(#glow-t)">
        <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="60" y="93" textAnchor="middle" fill="#00f2fe" fontSize="8" fontFamily="monospace">Navbar</text>
      <rect x="150" y="75" width="90" height="30" rx="5" stroke="#a78bfa" strokeWidth="1.2" fill="#a78bfa0a" filter="url(#glow-t)">
        <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2.4s" begin="0.3s" repeatCount="indefinite" />
      </rect>
      <text x="195" y="93" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">Terminal</text>
      <line x1="60" y1="105" x2="60" y2="115" stroke="#00f2fe55" strokeWidth="1" />
      <line x1="60" y1="115" x2="30" y2="115" stroke="#00f2fe55" strokeWidth="1" />
      <line x1="60" y1="115" x2="90" y2="115" stroke="#00f2fe55" strokeWidth="1" />
      <line x1="30" y1="115" x2="30" y2="127" stroke="#00f2fe55" strokeWidth="1" />
      <line x1="90" y1="115" x2="90" y2="127" stroke="#00f2fe55" strokeWidth="1" />
      <rect x="5" y="127" width="50" height="26" rx="4" stroke="#34d399" strokeWidth="1" fill="#34d3990a" filter="url(#glow-t)">
        <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
      </rect>
      <text x="30" y="143" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">Hero</text>
      <rect x="65" y="127" width="50" height="26" rx="4" stroke="#34d399" strokeWidth="1" fill="#34d3990a" filter="url(#glow-t)">
        <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2.2s" begin="0.9s" repeatCount="indefinite" />
      </rect>
      <text x="90" y="143" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">Projects</text>
      <text x="150" y="195" textAnchor="middle" fill="#ffffff30" fontSize="7.5" fontFamily="monospace">state flows top to down</text>
    </svg>
  </div>
);

const CICDChart = () => (
  <div className="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 300 220" className="w-full max-w-sm" fill="none">
      <defs>
        <filter id="glow-ci">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="150" cy="110" r="80" stroke="#ffffff10" strokeWidth="1" />
      <path d="M150,30 A80,80 0 0,1 230,110" stroke="#00f2fe" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
      <path d="M230,110 A80,80 0 0,1 150,190" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
      <path d="M150,190 A80,80 0 0,1 70,110" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
      <path d="M70,110 A80,80 0 0,1 150,30" stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
      <circle r="5" fill="#00f2fe" filter="url(#glow-ci)">
        <animateMotion dur="4s" repeatCount="indefinite" path="M150,30 A80,80 0 0,1 230,110 A80,80 0 0,1 150,190 A80,80 0 0,1 70,110 A80,80 0 0,1 150,30" />
      </circle>
      <circle cx="150" cy="30" r="18" stroke="#00f2fe" strokeWidth="1.5" fill="#00f2fe15" filter="url(#glow-ci)" />
      <text x="150" y="27" textAnchor="middle" fill="#00f2fe" fontSize="8" fontFamily="monospace" fontWeight="bold">COMMIT</text>
      <text x="150" y="38" textAnchor="middle" fill="#00f2fe80" fontSize="6.5" fontFamily="monospace">git push</text>
      <circle cx="230" cy="110" r="18" stroke="#a78bfa" strokeWidth="1.5" fill="#a78bfa15" filter="url(#glow-ci)" />
      <text x="230" y="107" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="bold">TEST</text>
      <text x="230" y="118" textAnchor="middle" fill="#a78bfa80" fontSize="6.5" fontFamily="monospace">CI lint</text>
      <circle cx="150" cy="190" r="18" stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b15" filter="url(#glow-ci)" />
      <text x="150" y="187" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">BUILD</text>
      <text x="150" y="198" textAnchor="middle" fill="#f59e0b80" fontSize="6.5" fontFamily="monospace">vite</text>
      <circle cx="70" cy="110" r="18" stroke="#34d399" strokeWidth="1.5" fill="#34d39915" filter="url(#glow-ci)" />
      <text x="70" y="107" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">DEPLOY</text>
      <text x="70" y="118" textAnchor="middle" fill="#34d39980" fontSize="6.5" fontFamily="monospace">prod</text>
    </svg>
  </div>
);

const ReconChart = () => (
  <div className="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 280 220" className="w-full max-w-sm" fill="none">
      <defs>
        <radialGradient id="radarSweep" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
        </radialGradient>
        <filter id="glow-r">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="140" cy="110" r="90" stroke="#00f2fe20" strokeWidth="1" />
      <circle cx="140" cy="110" r="65" stroke="#00f2fe25" strokeWidth="1" />
      <circle cx="140" cy="110" r="40" stroke="#00f2fe30" strokeWidth="1" />
      <circle cx="140" cy="110" r="15" stroke="#00f2fe50" strokeWidth="1.5" fill="#00f2fe0a" />
      <line x1="140" y1="20" x2="140" y2="200" stroke="#00f2fe15" strokeWidth="1" />
      <line x1="50" y1="110" x2="230" y2="110" stroke="#00f2fe15" strokeWidth="1" />
      <path d="M140,110 L140,20 A90,90 0 0,1 218,154 Z" fill="url(#radarSweep)" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" from="0 140 110" to="360 140 110" dur="3s" repeatCount="indefinite" />
      </path>
      <circle cx="185" cy="68" r="4" fill="#ef4444" filter="url(#glow-r)">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="108" cy="145" r="3" fill="#f59e0b" filter="url(#glow-r)">
        <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="170" cy="130" r="3.5" fill="#ef4444" filter="url(#glow-r)">
        <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="1.2s" repeatCount="indefinite" />
      </circle>
      <text x="140" y="210" textAnchor="middle" fill="#00f2fe40" fontSize="7" fontFamily="monospace">OSINT SURFACE SCAN</text>
    </svg>
  </div>
);

const ExploitChart = () => (
  <div className="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 300 200" className="w-full max-w-sm" fill="none">
      <defs>
        <filter id="glow-e">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect x="10" y="78" width="55" height="44" rx="5" stroke="#ef4444" strokeWidth="1.5" fill="#ef44440d" filter="url(#glow-e)" />
      <text x="37" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace" fontWeight="bold">ATTACKER</text>
      <text x="37" y="111" textAnchor="middle" fill="#ef444480" fontSize="7" fontFamily="monospace">Kali Linux</text>
      <rect x="110" y="70" width="35" height="60" rx="4" stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b0d" filter="url(#glow-e)" />
      <text x="127" y="103" textAnchor="middle" fill="#f59e0b" fontSize="7.5" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 127 100)">FIREWALL</text>
      <rect x="225" y="78" width="60" height="44" rx="5" stroke="#ef4444" strokeWidth="1.5" fill="#ef44440d" filter="url(#glow-e)" />
      <text x="255" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace" fontWeight="bold">SERVER</text>
      <text x="255" y="111" textAnchor="middle" fill="#ef444480" fontSize="7" fontFamily="monospace">EXPOSED</text>
      <line x1="65" y1="94" x2="110" y2="94" stroke="#ffffff20" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M65,110 Q90,155 127,155 Q165,155 190,130 Q210,115 225,110" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 2" filter="url(#glow-e)" opacity="0.8" />
      <circle r="4" fill="#ef4444" filter="url(#glow-e)">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M65,110 Q90,155 127,155 Q165,155 190,130 Q210,115 225,110" />
      </circle>
      <text x="127" y="188" textAnchor="middle" fill="#ef444440" fontSize="7.5" fontFamily="monospace">EXPLOIT CHAIN</text>
    </svg>
  </div>
);

const RemediationChart = () => (
  <div className="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 280 200" className="w-full max-w-sm" fill="none">
      <defs>
        <filter id="glow-rm">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect x="15" y="65" width="90" height="70" rx="6" stroke="#ef4444" strokeWidth="1.5" fill="#ef44440a" filter="url(#glow-rm)">
        <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" />
      </rect>
      <text x="60" y="88" textAnchor="middle" fill="#ef4444" fontSize="8.5" fontFamily="monospace" fontWeight="bold">VULNERABLE</text>
      <text x="60" y="102" textAnchor="middle" fill="#ef444480" fontSize="7" fontFamily="monospace">SQL Injection</text>
      <text x="60" y="115" textAnchor="middle" fill="#ef444480" fontSize="7" fontFamily="monospace">XSS / CSRF</text>
      <text x="60" y="128" textAnchor="middle" fill="#ef444480" fontSize="7" fontFamily="monospace">Open Ports</text>
      <text x="60" y="155" textAnchor="middle" fill="#ef444440" fontSize="7" fontFamily="monospace">BEFORE</text>
      <line x1="105" y1="100" x2="135" y2="100" stroke="#ffffff30" strokeWidth="1.5" />
      <polygon points="135,96 143,100 135,104" fill="#ffffff50" />
      <rect x="115" y="82" width="20" height="26" rx="2" stroke="#ffffff40" strokeWidth="1" fill="none" />
      <line x1="118" y1="90" x2="132" y2="90" stroke="#ffffff30" strokeWidth="0.8" />
      <line x1="118" y1="95" x2="132" y2="95" stroke="#ffffff30" strokeWidth="0.8" />
      <line x1="118" y1="100" x2="127" y2="100" stroke="#ffffff30" strokeWidth="0.8" />
      <text x="125" y="118" textAnchor="middle" fill="#ffffff30" fontSize="6" fontFamily="monospace">REPORT</text>
      <rect x="155" y="65" width="110" height="70" rx="6" stroke="#34d399" strokeWidth="1.5" fill="#34d3990a" filter="url(#glow-rm)" />
      <path d="M205,80 L220,85 L220,97 Q220,106 205,112 Q190,106 190,97 L190,85 Z" stroke="#34d399" strokeWidth="1.5" fill="#34d39920" filter="url(#glow-rm)" />
      <text x="205" y="100" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">+</text>
      <text x="205" y="123" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">SECURED</text>
      <text x="205" y="155" textAnchor="middle" fill="#34d39940" fontSize="7" fontFamily="monospace">AFTER</text>
    </svg>
  </div>
);

// --- Data ------------------------------------------------------------------

const WEB_STEPS = [
  {
    tag: 'SDLC Phase: Design to Implementation',
    title: 'System Architecture & Design',
    body: 'Before writing a single line of code, I map out scalable architectures — defining clear data contracts, UI/UX workflows, and service boundaries between frontend, API, and database layers.',
    Chart: ArchitectureChart,
  },
  {
    tag: 'SDLC Phase: Implementation',
    title: 'Component-Driven Development',
    body: 'Translating system designs into accessible, responsive React components with optimized state management. Every module is isolated, testable, and composed with reusability in mind.',
    Chart: ComponentTreeChart,
  },
  {
    tag: 'SDLC Phase: Testing to Maintenance',
    title: 'Secure Deployment & CI/CD',
    body: 'Establishing automated pipelines that lint, test, build, and deploy code securely — ensuring zero-downtime continuous delivery and a stable production environment.',
    Chart: CICDChart,
  },
];

const PEN_STEPS = [
  {
    tag: 'Phase 1: Reconnaissance',
    title: 'OSINT & Surface Mapping',
    body: "Mapping the target's entire attack surface through active and passive intelligence gathering — identifying exposed endpoints, open ports, and third-party dependencies before any exploitation begins.",
    Chart: ReconChart,
  },
  {
    tag: 'Phase 2: Exploitation',
    title: 'Vulnerability Exploitation',
    body: 'Probing for misconfigurations, injection flaws, and broken access controls, then ethically weaponizing them to demonstrate real-world impact and validate business risk.',
    Chart: ExploitChart,
  },
  {
    tag: 'Phase 3: Remediation',
    title: 'Forensic Reporting & Patch',
    body: 'Producing detailed forensic write-ups with root cause analysis and prioritized remediation steps — permanently eliminating vulnerabilities and hardening the application surface.',
    Chart: RemediationChart,
  },
];

// --- Step sub-components -----------------------------------------------------

const StepText = ({ step, index, totalSteps, scrollProgress, accent }) => {
  const stepSize = 1 / totalSteps;
  const start = index * stepSize;
  const end = start + stepSize;
  const midStart = start + stepSize * 0.15;
  const midEnd = end - stepSize * 0.15;
  const opacity = useTransform(scrollProgress, [start, midStart, midEnd, end], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [start, midStart], [24, 0]);
  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center" style={{ opacity, y }}>
      <span className={`text-xs font-mono uppercase tracking-widest mb-3 ${accent.text}`}>{step.tag}</span>
      <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">{step.title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed max-w-md">{step.body}</p>
    </motion.div>
  );
};

const StepChart = ({ step, index, totalSteps, scrollProgress }) => {
  const stepSize = 1 / totalSteps;
  const start = index * stepSize;
  const end = start + stepSize;
  const midStart = start + stepSize * 0.15;
  const midEnd = end - stepSize * 0.15;
  const opacity = useTransform(scrollProgress, [start, midStart, midEnd, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [start, midStart], [0.9, 1]);
  const { Chart } = step;
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity, scale }}>
      <Chart />
    </motion.div>
  );
};

const StepDot = ({ index, totalSteps, scrollProgress, accentDot }) => {
  const stepSize = 1 / totalSteps;
  const start = index * stepSize;
  const midStart = start + stepSize * 0.15;
  const end = start + stepSize;
  const midEnd = end - stepSize * 0.15;
  const opacity = useTransform(scrollProgress, [start, midStart, midEnd, end], [0.3, 1, 1, 0.3]);
  const scaleVal = useTransform(scrollProgress, [start, midStart, midEnd, end], [1, 1.6, 1.6, 1]);
  return (
    <motion.div className={`w-2 h-2 rounded-full ${accentDot}`} style={{ opacity, scale: scaleVal }} />
  );
};

// --- Scrolly Section ---------------------------------------------------------

const ACCENT_MAP = {
  cyan: { text: 'text-accent', border: 'border-accent/40', bg: 'bg-accent/10', dot: 'bg-accent' },
  red: { text: 'text-red-400', border: 'border-red-500/40', bg: 'bg-red-500/10', dot: 'bg-red-400' },
};

const ScrollySection = ({ sectionRef, steps, accentColor, introTag, introText, title, subtitle, stepCount, scrollProgress }) => {
  const accent = ACCENT_MAP[accentColor];
  return (
    <div ref={sectionRef} style={{ height: `${100 + stepCount * 130}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-16 mb-6 flex items-center gap-4">
          <span className={`text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${accent.border} ${accent.bg} ${accent.text}`}>{subtitle}</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        <div className="px-6 md:px-16 mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-500 text-sm max-w-lg">
            <span className={`font-mono font-semibold ${accent.text}`}>[{introTag}]</span>{' '}
            {introText}
          </p>
        </div>
        <div className="flex-1 flex items-center px-6 md:px-16 max-h-[55vh]">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative h-52 flex items-center">
              {steps.map((step, i) => (
                <StepText key={i} step={step} index={i} totalSteps={stepCount} scrollProgress={scrollProgress} accent={accent} />
              ))}
            </div>
            <div className="relative h-52 hidden lg:flex items-center justify-center">
              {steps.map((step, i) => (
                <StepChart key={i} step={step} index={i} totalSteps={stepCount} scrollProgress={scrollProgress} />
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 md:px-16 mt-6 flex items-center gap-3">
          {steps.map((_, i) => (
            <StepDot key={i} index={i} totalSteps={stepCount} scrollProgress={scrollProgress} accentDot={accent.dot} />
          ))}
          <span className="ml-4 text-xs font-mono text-gray-600 select-none">scroll to advance</span>
        </div>
      </div>
    </div>
  );
};

// --- Main Component --------------------------------------------------------

const Methodology = () => {
  const webRef = useRef(null);
  const penRef = useRef(null);

  const { scrollYProgress: webProgress } = useScroll({
    target: webRef,
    offset: ['start start', 'end end'],
  });
  const { scrollYProgress: penProgress } = useScroll({
    target: penRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="methodology">
      <div className="py-20 px-6 text-center">
        <span className="inline-block px-3 py-1 text-xs font-mono text-accent border border-accent/30 rounded-full bg-accent/10 tracking-widest uppercase mb-4">
          Process
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          How I <span className="text-accent">Think</span> &amp; <span className="text-accent">Execute</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          Scroll through each section to see the methodologies behind my work — from engineering architecture to offensive security.
        </p>
      </div>

      <ScrollySection
        sectionRef={webRef}
        steps={WEB_STEPS}
        accentColor="cyan"
        introTag="Software Development Life Cycle"
        introText="I follow the formal 6-phase SDLC — Planning, Analysis, Design, Implementation, Testing & Maintenance. Scroll to see how I execute the core technical phases."
        title="How I Build"
        subtitle="Engineering & Architecture"
        stepCount={3}
        scrollProgress={webProgress}
      />

      <ScrollySection
        sectionRef={penRef}
        steps={PEN_STEPS}
        accentColor="red"
        introTag="Penetration Testing Methodology"
        introText="Based on industry frameworks (PTES, OWASP). Scroll to trace the full offensive security lifecycle from recon to remediation."
        title="How I Pen Test"
        subtitle="Offensive Security & Forensics"
        stepCount={3}
        scrollProgress={penProgress}
      />
    </section>
  );
};

export default Methodology;
