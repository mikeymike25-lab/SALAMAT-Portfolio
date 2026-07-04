import React, { useState, useEffect, useRef } from 'react';
import { Code2, Shield, Cpu } from 'lucide-react';

// Custom inline SVG logos for tailored developer and security tools
const AntigravityLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="none" stroke="url(#antigravity-grad)" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" fill="none" stroke="url(#antigravity-grad)" strokeWidth="2" className="animate-pulse" />
    <path d="M12 7V17M7 12H17" stroke="url(#antigravity-grad)" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="antigravity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F2FE" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
);

const GeminiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#79A1EB]" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a1 1 0 0 1 .927.625l1.984 4.887 4.887 1.984a1 1 0 0 1 0 1.854l-4.887 1.984-1.984 4.887a1 1 0 0 1-1.854 0l-1.984-4.887-4.887-1.984a1 1 0 0 1 0-1.854l4.887-1.984 1.984-4.887A1 1 0 0 1 12 2z" />
  </svg>
);

const StitchLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#FF6B6B]" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#FF6B6B" />
    <path d="M3 9h18M9 21V9" stroke="#FF6B6B" opacity="0.6" />
    <path d="M16 12a.5.5 0 0 1 .463.313l.992 2.443 2.443.992a.5.5 0 0 1 0 .927l-2.443.992-.992 2.443a.5.5 0 0 1-.927 0l-.992-2.443-2.443-.992a.5.5 0 0 1 0-.927l2.443-.992.992-2.443A.5.5 0 0 1 16 12z" fill="#FF8E8E" stroke="none" />
  </svg>
);

const SQLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#00758F]" xmlns="http://www.w3.org/2000/svg" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
  </svg>
);

const KaliLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#00F2FE]" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8F93A2" />
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7" stroke="#00F2FE" strokeWidth="2" />
    <path d="M12 7L9 10L12 13" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BurpSuiteLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FF6600" />
    <path d="M8 8h5c1.66 0 3 1.34 3 3v2c0 1.66-1.34 3-3 3H8V8zm2 2v4h3.5c.83 0 1.5-.67 1.5-1.5v-1c0-.83-.67-1.5-1.5-1.5H10z" fill="#FFFFFF" />
  </svg>
);

const WiresharkLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 8 8 8 13C8 17.5 11.5 21 16 21C20.5 21 21 16 21 16C21 16 16.5 17 14 14C11.5 11 12 2 12 2Z" fill="#005F9E" />
    <path d="M12 2C12 2 13.5 6.5 11.5 10C9.5 13.5 5 15.5 5 15.5C5 15.5 7.5 13.5 8 10C8.5 6.5 12 2 12 2Z" fill="#00F2FE" opacity="0.6" />
  </svg>
);

const NmapLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#00D2FE]" xmlns="http://www.w3.org/2000/svg" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
  </svg>
);

const NiktoLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#00FF66]" xmlns="http://www.w3.org/2000/svg" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v20M2 12h20" />
  </svg>
);

const SQLmapLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="7" ry="2" fill="none" stroke="#FF4444" strokeWidth="2" />
    <path d="M5 5v5c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5" fill="none" stroke="#FF4444" strokeWidth="2" />
    <path d="M12 11v8m-3 3h6" fill="none" stroke="#FF4444" strokeWidth="2" />
  </svg>
);

const TorLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#7D4698]" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" stroke="#8B5CF6" />
    <path d="M12 5c-3.87 0-7 3.13-7 7s3.13 7 7 7" stroke="#A78BFA" />
    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4" stroke="#C4B5FD" />
    <circle cx="12" cy="12" r="1.5" fill="#C4B5FD" />
  </svg>
);

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#cc582f] stroke-none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5V7a1.5 1.5 0 0 1-3 0V3.5A1.5 1.5 0 0 1 12 2zm0 15a1.5 1.5 0 0 1 1.5 1.5v3.5a1.5 1.5 0 0 1-3 0v-3.5A1.5 1.5 0 0 1 12 17zm7.071-12.071a1.5 1.5 0 0 1 0 2.122l-2.475 2.475a1.5 1.5 0 0 1-2.121-2.122l2.474-2.475a1.5 1.5 0 0 1 2.122 0zm-10.606 10.606a1.5 1.5 0 0 1 0 2.122L5.99 20.13a1.5 1.5 0 0 1-2.121-2.121l2.475-2.475a1.5 1.5 0 0 1 2.122 0zM22 12a1.5 1.5 0 0 1-1.5 1.5H17a1.5 1.5 0 0 1 0-3h3.5A1.5 1.5 0 0 1 22 12zM7 12a1.5 1.5 0 0 1-1.5 1.5H2a1.5 1.5 0 0 1 0-3h3.5A1.5 1.5 0 0 1 7 12zm12.071 7.071a1.5 1.5 0 0 1-2.122 0l-2.475-2.475a1.5 1.5 0 0 1 2.121-2.121l2.475 2.475a1.5 1.5 0 0 1 0 2.121zM8.464 8.464a1.5 1.5 0 0 1-2.121 0L3.868 5.99a1.5 1.5 0 0 1 2.121-2.122l2.475 2.475a1.5 1.5 0 0 1 0 2.121z" />
  </svg>
);

const SkillsColumn = ({ children, shadowColor, slideDirection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(domRef.current);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  let slideClass;
  if (slideDirection === 'left') {
    slideClass = isVisible 
      ? 'opacity-100 translate-x-0 translate-y-0' 
      : 'opacity-0 translate-y-12 lg:translate-y-0 lg:-translate-x-16';
  } else if (slideDirection === 'right') {
    slideClass = isVisible 
      ? 'opacity-100 translate-x-0 translate-y-0' 
      : 'opacity-0 translate-y-12 lg:translate-y-0 lg:translate-x-16';
  } else {
    // center
    slideClass = isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-16';
  }

  let borderHoverClass;
  let bracketClass;
  if (shadowColor === 'accent') {
    borderHoverClass = 'hover:border-accent/40 hover:shadow-[0_0_35px_rgba(0,242,254,0.08)]';
    bracketClass = 'border-accent/30 group-hover:border-accent/80';
  } else if (shadowColor === 'red') {
    borderHoverClass = 'hover:border-red-500/40 hover:shadow-[0_0_35px_rgba(239,68,68,0.08)]';
    bracketClass = 'border-red-500/30 group-hover:border-red-500/80';
  } else {
    borderHoverClass = 'hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.08)]';
    bracketClass = 'border-violet-500/30 group-hover:border-violet-500/80';
  }


  return (
    <div 
      ref={domRef}
      className={`bg-surface/30 backdrop-blur-md border border-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-1000 ease-out transform ${slideClass} ${borderHoverClass} relative group overflow-hidden h-full`}
    >
      {/* Design Corner Brackets */}
      <div className={`absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 ${bracketClass} transition-colors duration-500`}></div>
      <div className={`absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 ${bracketClass} transition-colors duration-500`}></div>
      <div className={`absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 ${bracketClass} transition-colors duration-500`}></div>
      <div className={`absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 ${bracketClass} transition-colors duration-500`}></div>

      {children}
    </div>
  );
};

const Skills = () => {
  const languagesSkills = [
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      desc: "ES6+ syntax for frontend behavior and backend logic",
      shadow: "hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:border-yellow-400/50"
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      desc: "Creating component-driven responsive single-page apps",
      shadow: "hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] hover:border-accent/50"
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      desc: "Server runtime environments for backend API scripting",
      shadow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.25)] hover:border-green-500/50"
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      desc: "Scripting game behaviors, CTF helpers, and automations",
      shadow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:border-blue-500/50"
    },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      desc: "Utility-first styles for modern component prototyping",
      shadow: "hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:border-sky-400/50"
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      desc: "Static typing extension for scalable web applications",
      shadow: "hover:shadow-[0_0_20px_rgba(29,78,216,0.25)] hover:border-blue-700/50"
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      desc: "Object-oriented structures for secure backend logic",
      shadow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:border-red-500/50"
    },
    {
      name: "HTML5 / CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      desc: "Semantic interface templates and fluid layouts",
      shadow: "hover:shadow-[0_0_20px_rgba(234,88,12,0.25)] hover:border-orange-500/50"
    }
  ];

  const cyberSkills = [
    { 
      name: "Kali Linux", 
      customLogo: KaliLogo, 
      desc: "Standard operating system used for defensive audits & pen testing", 
      shadow: "hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] hover:border-accent/50" 
    },
    { 
      name: "Burp Suite", 
      customLogo: BurpSuiteLogo, 
      desc: "Proxy server to inspect, intercept, and modify network traffic", 
      shadow: "hover:shadow-[0_0_20px_rgba(255,102,0,0.25)] hover:border-[#FF6600]/50" 
    },
    { 
      name: "Wireshark", 
      customLogo: WiresharkLogo, 
      desc: "Analyzing live network packet streams for forensically valid logs", 
      shadow: "hover:shadow-[0_0_20px_rgba(0,95,158,0.25)] hover:border-[#005F9E]/50" 
    },
    { 
      name: "Nmap", 
      customLogo: NmapLogo, 
      desc: "Port mapping scanner to discover active hosts and services", 
      shadow: "hover:shadow-[0_0_20px_rgba(0,210,254,0.25)] hover:border-[#00D2FE]/50" 
    },
    { 
      name: "Nikto", 
      customLogo: NiktoLogo, 
      desc: "Web server assessment tool to scan for vulnerability exposures", 
      shadow: "hover:shadow-[0_0_20px_rgba(0,255,102,0.25)] hover:border-[#00FF66]/50" 
    },
    { 
      name: "SQLmap", 
      customLogo: SQLmapLogo, 
      desc: "Automated engine used to audit applications for SQL Injection bugs", 
      shadow: "hover:shadow-[0_0_20px_rgba(255,68,68,0.25)] hover:border-[#FF4444]/50" 
    },
    {
      name: "Tor Browser",
      customLogo: TorLogo,
      desc: "Onion routing for secure anonymity audits and privacy diagnostics",
      shadow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:border-[#8B5CF6]/50"
    },
    { 
      name: "Windows VM", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg", 
      desc: "Sandbox environments to execute threat analysis scripts", 
      shadow: "hover:shadow-[0_0_20px_rgba(0,164,239,0.25)] hover:border-[#00A4EF]/50" 
    }
  ];

  const infrastructureSkills = [
    { 
      name: "Antigravity", 
      customLogo: AntigravityLogo, 
      desc: "AI coding agent co-piloting development of this site", 
      shadow: "hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] hover:border-accent/50" 
    },
    { 
      name: "Gemini CLI", 
      customLogo: GeminiLogo, 
      desc: "Interfacing with Google Flash AI modules directly from terminal", 
      shadow: "hover:shadow-[0_0_20px_rgba(121,161,235,0.25)] hover:border-[#79A1EB]/50" 
    },
    { 
      name: "Stitch AI", 
      customLogo: StitchLogo, 
      desc: "Generative AI platform used to prototype and draft UI designs", 
      shadow: "hover:shadow-[0_0_20px_rgba(255,107,107,0.25)] hover:border-[#FF6B6B]/50" 
    },
    { 
      name: "Supabase", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", 
      desc: "Configured to record secure client-visit audit logs", 
      shadow: "hover:shadow-[0_0_20px_rgba(62,207,142,0.25)] hover:border-[#3ECF8E]/50" 
    },
    { 
      name: "Firebase", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", 
      desc: "Hosting application assets and database management", 
      shadow: "hover:shadow-[0_0_20px_rgba(255,202,40,0.25)] hover:border-[#FFCA28]/50" 
    },
    {
      name: "Claude AI",
      customLogo: ClaudeLogo,
      desc: "Leveraging Anthropic model APIs for prompt engineering and logic design",
      shadow: "hover:shadow-[0_0_20px_rgba(204,88,47,0.25)] hover:border-[#cc582f]/50"
    },
    { 
      name: "SQL Databases", 
      customLogo: SQLLogo, 
      desc: "Structuring database tables, constraints, and relationships", 
      shadow: "hover:shadow-[0_0_20px_rgba(0,117,143,0.25)] hover:border-[#00758F]/50" 
    },
    {
      name: "Vite / Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      desc: "Local project versioning and fast frontend dev environment",
      shadow: "hover:shadow-[0_0_20px_rgba(244,63,94,0.25)] hover:border-rose-500/50"
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
          <span className="text-accent font-mono text-2xl">02.</span> Technical Matrix
          <div className="h-px bg-gray-800 flex-grow ml-4 max-w-xs"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Languages & Frameworks */}
          <SkillsColumn shadowColor="accent" slideDirection="left">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                <Code2 className="text-accent" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Languages & Frameworks</h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Core coding & interface tools</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Programming languages, core frameworks, and design engines I use to build full-stack web applications.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {languagesSkills.map((skill, idx) => (
                <div 
                  key={idx}
                  className={`flex flex-col gap-2 p-2.5 sm:p-4 bg-surface/50 border border-gray-800 rounded-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group/item ${skill.shadow}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center p-1.5 border border-gray-800/60 group-hover/item:border-accent/30 transition-colors duration-300">
                      <img 
                        src={skill.logo} 
                        alt={skill.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h4 className="font-mono text-xs font-semibold text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      {skill.name}
                    </h4>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal font-sans group-hover/item:text-gray-400 transition-colors duration-300">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </SkillsColumn>

          {/* Column 2: Security & Auditing Tools */}
          <SkillsColumn shadowColor="red" slideDirection="center">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <Shield className="text-[#FF4A4A]" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Security & Audits</h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">OS environments, sniffers & fuzzers</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Operating systems, packet sniffers, and automated scripts I utilize to check application layers and trace bugs.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {cyberSkills.map((skill, idx) => {
                const CustomLogoComponent = skill.customLogo;
                return (
                  <div 
                    key={idx}
                    className={`flex flex-col gap-2 p-2.5 sm:p-4 bg-surface/50 border border-gray-800 rounded-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group/item ${skill.shadow}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center p-1.5 border border-gray-800/60 group-hover/item:border-red-500/30 transition-colors duration-300">
                        {skill.logo ? (
                          <img 
                            src={skill.logo} 
                            alt={skill.name} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <CustomLogoComponent />
                        )}
                      </div>
                      <h4 className="font-mono text-xs font-semibold text-gray-300 group-hover/item:text-white transition-colors duration-300">
                        {skill.name}
                      </h4>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-normal font-sans group-hover/item:text-gray-400 transition-colors duration-300">
                      {skill.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </SkillsColumn>

          {/* Column 3: AI & Platform Infrastructure */}
          <SkillsColumn shadowColor="violet" slideDirection="right">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
                <Cpu className="text-[#A78BFA]" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">AI & Platforms</h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Database services, host clouds & AI</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Backends, serverless setups, hosting platforms, and agentic AI tools driving app development and logging.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {infrastructureSkills.map((skill, idx) => {
                const CustomLogoComponent = skill.customLogo;
                return (
                  <div 
                    key={idx}
                    className={`flex flex-col gap-2 p-2.5 sm:p-4 bg-surface/50 border border-gray-800 rounded-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group/item ${skill.shadow}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center p-1.5 border border-gray-800/60 group-hover/item:border-violet-500/30 transition-colors duration-300">
                        {skill.logo ? (
                          <img 
                            src={skill.logo} 
                            alt={skill.name} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <CustomLogoComponent />
                        )}
                      </div>
                      <h4 className="font-mono text-xs font-semibold text-gray-300 group-hover/item:text-white transition-colors duration-300">
                        {skill.name}
                      </h4>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-normal font-sans group-hover/item:text-gray-400 transition-colors duration-300">
                      {skill.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </SkillsColumn>

        </div>
      </div>
    </section>
  );
};

export default Skills;
