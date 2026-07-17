import React, { useState, useEffect, useRef } from 'react';
import { Code2, Shield, Cpu } from 'lucide-react';

// Custom inline SVG logos for tailored developer and security tools scaled to w-full h-full
const AntigravityLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
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
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-[#79A1EB]" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a1 1 0 0 1 .927.625l1.984 4.887 4.887 1.984a1 1 0 0 1 0 1.854l-4.887 1.984-1.984 4.887a1 1 0 0 1-1.854 0l-1.984-4.887-4.887-1.984a1 1 0 0 1 0-1.854l4.887-1.984 1.984-4.887A1 1 0 0 1 12 2z" />
  </svg>
);

const StitchLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#FF6B6B]" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#FF6B6B" />
    <path d="M3 9h18M9 21V9" stroke="#FF6B6B" opacity="0.6" />
    <path d="M16 12a.5.5 0 0 1 .463.313l.992 2.443 2.443.992a.5.5 0 0 1 0 .927l-2.443.992-.992 2.443a.5.5 0 0 1-.927 0l-.992-2.443-2.443-.992a.5.5 0 0 1 0-.927l2.443-.992.992-2.443A.5.5 0 0 1 16 12z" fill="#FF8E8E" stroke="none" />
  </svg>
);

const SQLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#00758F]" xmlns="http://www.w3.org/2000/svg" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
  </svg>
);

const KaliLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#00F2FE]" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8F93A2" />
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7" stroke="#00F2FE" strokeWidth="2" />
    <path d="M12 7L9 10L12 13" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BurpSuiteLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FF6600" />
    <path d="M8 8h5c1.66 0 3 1.34 3 3v2c0 1.66-1.34 3-3 3H8V8zm2 2v4h3.5c.83 0 1.5-.67 1.5-1.5v-1c0-.83-.67-1.5-1.5-1.5H10z" fill="#FFFFFF" />
  </svg>
);

const WiresharkLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 8 8 8 13C8 17.5 11.5 21 16 21C20.5 21 21 16 21 16C21 16 16.5 17 14 14C11.5 11 12 2 12 2Z" fill="#005F9E" />
    <path d="M12 2C12 2 13.5 6.5 11.5 10C9.5 13.5 5 15.5 5 15.5C5 15.5 7.5 13.5 8 10C8.5 6.5 12 2 12 2Z" fill="#00F2FE" opacity="0.6" />
  </svg>
);

const NmapLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#00D2FE]" xmlns="http://www.w3.org/2000/svg" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
  </svg>
);

const NiktoLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#00FF66]" xmlns="http://www.w3.org/2000/svg" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v20M2 12h20" />
  </svg>
);

const SQLmapLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="7" ry="2" fill="none" stroke="#FF4444" strokeWidth="2" />
    <path d="M5 5v5c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5" fill="none" stroke="#FF4444" strokeWidth="2" />
    <path d="M12 11v8m-3 3h6" fill="none" stroke="#FF4444" strokeWidth="2" />
  </svg>
);

const TorLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#7D4698]" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" stroke="#8B5CF6" />
    <path d="M12 5c-3.87 0-7 3.13-7 7s3.13 7 7 7" stroke="#A78BFA" />
    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4" stroke="#C4B5FD" />
    <circle cx="12" cy="12" r="1.5" fill="#C4B5FD" />
  </svg>
);

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-[#cc582f] stroke-none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5V7a1.5 1.5 0 0 1-3 0V3.5A1.5 1.5 0 0 1 12 2zm0 15a1.5 1.5 0 0 1 1.5 1.5v3.5a1.5 1.5 0 0 1-3 0v-3.5A1.5 1.5 0 0 1 12 17zm7.071-12.071a1.5 1.5 0 0 1 0 2.122l-2.475 2.475a1.5 1.5 0 0 1-2.121-2.122l2.474-2.475a1.5 1.5 0 0 1 2.122 0zm-10.606 10.606a1.5 1.5 0 0 1 0 2.122L5.99 20.13a1.5 1.5 0 0 1-2.121-2.121l2.475-2.475a1.5 1.5 0 0 1 2.122 0zM22 12a1.5 1.5 0 0 1-1.5 1.5H17a1.5 1.5 0 0 1 0-3h3.5A1.5 1.5 0 0 1 22 12zM7 12a1.5 1.5 0 0 1-1.5 1.5H2a1.5 1.5 0 0 1 0-3h3.5A1.5 1.5 0 0 1 7 12zm12.071 7.071a1.5 1.5 0 0 1-2.122 0l-2.475-2.475a1.5 1.5 0 0 1 2.121-2.121l2.475 2.475a1.5 1.5 0 0 1 0 2.121zM8.464 8.464a1.5 1.5 0 0 1-2.121 0L3.868 5.99a1.5 1.5 0 0 1 2.121-2.122l2.475 2.475a1.5 1.5 0 0 1 0 2.121z" />
  </svg>
);

// Individual Skill Card inside the marquee
const SkillCard = ({ skill, hoverColor }) => {
  const CustomLogoComponent = skill.customLogo;
  let shadowClass;
  if (hoverColor === 'accent') {
    shadowClass = 'hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] hover:border-accent/50';
  } else if (hoverColor === 'red') {
    shadowClass = 'hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:border-red-500/50';
  } else {
    shadowClass = 'hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:border-violet-500/50';
  }

  return (
    <div className={`w-28 h-28 flex flex-col items-center justify-center p-3 bg-surface/50 border border-gray-800 rounded-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group/item ${shadowClass}`}>
      <div className="w-12 h-12 rounded-lg bg-black/40 flex items-center justify-center p-2 border border-gray-800/60 group-hover/item:border-gray-700 transition-colors duration-300 mb-2">
        {skill.logo ? (
          <img 
            src={skill.logo} 
            alt={skill.name} 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full text-gray-400 group-hover/item:text-white transition-colors duration-300 flex items-center justify-center">
            <CustomLogoComponent />
          </div>
        )}
      </div>
      <span className="font-mono text-[10px] sm:text-xs font-semibold text-gray-400 group-hover/item:text-white text-center line-clamp-1 transition-colors duration-300">
        {skill.name}
      </span>
    </div>
  );
};

// Row Wrapper with corner brackets and IntersectionObserver animations (slide out from back of previous row)
const SkillsRow = ({ children, shadowColor, slideDirection, zIndex }) => {
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
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
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
  if (slideDirection === 'first') {
    // Row 1 slides up and stretches slightly
    slideClass = isVisible 
      ? 'opacity-100 translate-y-0 scale-100' 
      : 'opacity-0 translate-y-12 scale-[0.98]';
  } else {
    // Row 2 and 3 slide down out from behind the preceding row
    slideClass = isVisible 
      ? 'opacity-100 translate-y-0 scale-100' 
      : 'opacity-0 -translate-y-24 scale-[0.98]';
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
      style={{ zIndex }}
      className={`bg-surface/30 backdrop-blur-md border border-gray-800 rounded-2xl p-5 sm:p-6 md:p-8 transition-slide-out transform ${slideClass} ${borderHoverClass} relative group overflow-hidden`}
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
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
    },
    {
      name: "HTML5 / CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
    }
  ];

  const cyberSkills = [
    { 
      name: "Kali Linux", 
      customLogo: KaliLogo 
    },
    { 
      name: "Burp Suite", 
      customLogo: BurpSuiteLogo 
    },
    { 
      name: "Wireshark", 
      customLogo: WiresharkLogo 
    },
    { 
      name: "Nmap", 
      customLogo: NmapLogo 
    },
    { 
      name: "Nikto", 
      customLogo: NiktoLogo 
    },
    { 
      name: "SQLmap", 
      customLogo: SQLmapLogo 
    },
    {
      name: "Tor Browser",
      customLogo: TorLogo
    },
    { 
      name: "Windows VM", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg" 
    }
  ];

  const infrastructureSkills = [
    { 
      name: "Antigravity", 
      customLogo: AntigravityLogo 
    },
    { 
      name: "Gemini CLI", 
      customLogo: GeminiLogo 
    },
    { 
      name: "Stitch AI", 
      customLogo: StitchLogo 
    },
    { 
      name: "Supabase", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" 
    },
    { 
      name: "Firebase", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" 
    },
    {
      name: "Claude AI",
      customLogo: ClaudeLogo
    },
    { 
      name: "SQL Databases", 
      customLogo: SQLLogo 
    },
    {
      name: "Vite / Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
    }
  ];

  // Helper component to render the infinite scrolling list
  const SkillMarquee = ({ skills, direction, hoverColor }) => {
    // Duplicate lists to ensure seamless looping on all screens
    const doubledSkills = [...skills, ...skills];
    const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

    return (
      <div className="relative w-full overflow-hidden py-4 mask-fade-edges">
        <div className={`${animationClass} flex gap-6 hover:[animation-play-state:paused]`}>
          {doubledSkills.map((skill, idx) => (
            <SkillCard key={`${skill.name}-${idx}`} skill={skill} hoverColor={hoverColor} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* CSS Styles injected inline for self-contained custom marquee animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .transition-slide-out {
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out, border-color 0.3s ease, box-shadow 0.3s ease;
        }
      `}} />

      {/* Visual background accents */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
          <span className="text-accent font-mono text-2xl">02.</span> Technical Matrix
          <div className="h-px bg-gray-800 flex-grow ml-4 max-w-xs"></div>
        </h2>

        <div className="flex flex-col gap-10">
          
          {/* Row 1: Languages & Frameworks (Moving Right) - z-30 (Top layer) */}
          <SkillsRow shadowColor="accent" slideDirection="first" zIndex={30}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                  <Code2 className="text-accent" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">Languages & Frameworks</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">Core coding & interface tools</p>
                </div>
              </div>
            </div>
            
            <SkillMarquee skills={languagesSkills} direction="right" hoverColor="accent" />
          </SkillsRow>

          {/* Row 2: Security & Audits (Moving Left) - z-20 (Slides out from behind Row 1) */}
          <SkillsRow shadowColor="red" slideDirection="subsequent" zIndex={20}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <Shield className="text-[#FF4A4A]" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">Security & Audits</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">OS environments, sniffers & fuzzers</p>
                </div>
              </div>
            </div>

            <SkillMarquee skills={cyberSkills} direction="left" hoverColor="red" />
          </SkillsRow>

          {/* Row 3: AI & Platforms (Moving Right) - z-10 (Slides out from behind Row 2) */}
          <SkillsRow shadowColor="violet" slideDirection="subsequent" zIndex={10}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
                  <Cpu className="text-[#A78BFA]" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">AI & Platforms</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">Database services, host clouds & AI</p>
                </div>
              </div>
            </div>

            <SkillMarquee skills={infrastructureSkills} direction="right" hoverColor="violet" />
          </SkillsRow>

        </div>
      </div>
    </section>
  );
};

export default Skills;
