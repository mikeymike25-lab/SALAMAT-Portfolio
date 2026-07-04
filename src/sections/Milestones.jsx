import React, { useState, useEffect, useRef } from 'react';

const MilestoneImage = ({ src, alt }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-gray-900 border border-gray-800/30 flex items-center justify-center flex-shrink-0 p-4 m-1">
        <span className="text-accent/40 font-mono text-xs">MAS</span>
      </div>
    );
  }

  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-gray-900 overflow-hidden flex-shrink-0 border border-gray-800/50 flex items-center justify-center m-1 p-2">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-contain" 
        onError={() => setError(true)}
      />
    </div>
  );
};

const MilestoneItem = ({ item, idx }) => {
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
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
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

  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Timeline Dot with entry animation */}
      <div className={`absolute left-[-9px] md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-accent z-10 transition-all duration-700 ${
        isVisible ? 'scale-100 opacity-100 shadow-glow' : 'scale-0 opacity-0'
      } group-hover:scale-150 group-hover:shadow-glow`}></div>
      
      {/* Content Box with premium slide + fade animation */}
      <div 
        ref={domRef}
        className={`w-full md:w-[45%] pl-8 md:pl-0 transition-all duration-1000 ease-out transform ${
          isVisible 
            ? 'opacity-100 translate-x-0 translate-y-0' 
            : idx % 2 === 0 
              ? 'opacity-0 translate-y-12 md:translate-y-0 md:translate-x-16' 
              : 'opacity-0 translate-y-12 md:translate-y-0 md:-translate-x-16'
        }`}
      >
        <div className={`p-2 bg-surface rounded-xl border border-gray-800 hover:border-accent hover:shadow-glow-sm transition-all duration-300 flex flex-col sm:flex-row gap-4 items-center text-left ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
          <MilestoneImage src={item.imageSrc} alt={item.title} />
          <div className="flex-grow p-3 flex flex-col justify-center space-y-1">
            <span className="text-accent font-mono text-sm block">{item.date}</span>
            <h3 className="text-xl font-bold text-white mb-0.5">{item.title}</h3>
            <h4 className="text-gray-400 text-sm mb-2">{item.organization}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

const Milestones = () => {
  const achievementsList = [
    {
      title: "Incoming Front-End AI Engineering Intern",
      organization: "FlyRank AI",
      date: "Incoming (June 2026)",
      description: "Incoming intern for the FlyRank AI Internship Program. Will be designing and building high-performance frontend interfaces integrated with AI autopilot systems for organic growth workflows.",
      imageSrc: "/assets/FlyRank.jpg"
    },
    {
      title: "Incoming Auditor Officer",
      organization: "JISSA (Junior Information Systems Security Association)",
      date: "Incoming (SY 2026 - 2027)",
      description: "Incoming officer for JISSA. Will be directing financial audits, administrative compliance, and system resource tracking to maintain high structural integrity and transparency.",
      imageSrc: "/assets/JISSA.png"
    },
    {
      title: "Academic Phase",
      organization: "Hidden Investigations",
      date: "Currently",
      description: "Currently studying advanced digital forensics, threat auditing, and web exploitation pathways in preparation to become an official CTF player for the team.",
      imageSrc: "/assets/HiddenInvestigations.png"
    },
    {
      title: "Core Member",
      organization: "ALOA",
      date: "Currently",
      description: "Serving as an official speaker representing the team during seminars, and competing as one of the primary CTF and hackathon players.",
      imageSrc: "/assets/ALOA.jpg"
    },
    {
      title: "Partnership Officer",
      organization: "JISSA",
      date: "SY 2025 - 2026 (2nd Sem)",
      description: "Coordinated corporate alliances, cybersecurity industry speaker panels, and sponsorships for student training summits.",
      imageSrc: "/assets/JISSA.png"
    },
    {
      title: "Full-Stack Dev & Cloud Discovery",
      organization: "Advanced Technical Exploration",
      date: "SY 2025 - 2026 (2nd Year)",
      description: "Discovered a passion and aptitude for software development. Conducted self-directed study into Google Cloud, AWS cloud infrastructures, and Agentic AI workflows.",
      imageSrc: "/assets/TIP.png"
    },
    {
      title: "Foundational Study & Resilience",
      organization: "Academic Inception",
      date: "SY 2024 - 2025 (1st Year)",
      description: "Lacking a laptop setup, I watched coding tutorials and studied programming foundations on my phone, building a strong baseline through pure resourcefulness.",
      imageSrc: "/assets/TIP.png"
    }
  ];

  return (
    <section id="milestones" className="py-24 bg-surface/30">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4 justify-center animate-fade-in">
          <span className="text-accent font-mono text-2xl">05.</span> Academic & Professional Milestones
        </h2>
        
        <div className="relative border-l-2 border-gray-800 ml-4 md:ml-0 md:border-none">
          {/* Glowing central track (visible on desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-800 shadow-[0_0_10px_rgba(0,242,254,0.5)]"></div>
          
          <div className="space-y-12">
            {achievementsList.map((item, idx) => (
              <MilestoneItem key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;
