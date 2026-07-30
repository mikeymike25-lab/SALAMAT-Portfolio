import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';

const Hero = ({ history, executeCommand, hideTerminal, visitorCount, promptPrefix, placeholder, currentDir }) => {
  const [inputVal, setInputVal] = useState('');
  const historyContainerRef = useRef(null);

  // Auto-scroll internally inside the terminal box (prevents the entire webpage from scrolling down)
  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      executeCommand('__CTRL_C__');
      setInputVal('');
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-28 pb-12 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.01);
          }
        }
        @keyframes scan {
          0%, 100% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 242, 254, 0.15);
            border-color: rgba(0, 242, 254, 0.3);
          }
          50% {
            box-shadow: 0 0 35px rgba(0, 242, 254, 0.45);
            border-color: rgba(0, 242, 254, 0.7);
          }
        }
      `}</style>
      {/* Background glow elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[auto_1fr_auto] gap-8 xl:gap-6 2xl:gap-12 items-center">
        
        {/* Left Column (Image Container): Visible only on xl (1280px) and up */}
        <div className="hidden xl:flex justify-center w-full xl:w-auto">
          <div className="relative w-52 h-52 xl:w-52 xl:h-52 2xl:w-80 2xl:h-80 3xl:w-[400px] 3xl:h-[400px] overflow-hidden rounded-xl border bg-black/40 animate-[pulse-glow_4s_ease-in-out_infinite]">
            {/* The actual profile image - bright and high contrast */}
            <img 
              src="/assets/newIntroImage.jpg" 
              alt="AI Hologram Profile" 
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover filter saturate-110 contrast-105 brightness-110 animate-[float_12s_ease-in-out_infinite]" 
            />
            {/* Hologram scan line overlay */}
            <div className="absolute left-0 w-full h-1.5 bg-accent/60 shadow-[0_0_12px_#00f2fe] animate-[scan_4s_ease-in-out_infinite] z-10"></div>
            {/* Grid overlay to look like digital screen */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2fe06_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe06_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40"></div>
            
            {/* Sci-fi Corner Brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent/70 pointer-events-none"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-accent/70 pointer-events-none"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-accent/70 pointer-events-none"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-accent/70 pointer-events-none"></div>
            
            {/* Cyber Scanning HUD overlays */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-accent/60 bg-black/40 px-2 py-0.5 rounded border border-accent/20 tracking-widest uppercase animate-pulse">
              System Scan Active
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-mono text-accent/50 tracking-widest bg-black/30 px-1.5 rounded">
              AI_COPY_v1.0.4
            </div>
          </div>
        </div>

        {/* Middle Column (Text Info): Takes full remaining space on lg, and centers on xl */}
        <div className="space-y-8 z-10 relative order-2 lg:order-none">
          
          {/* Image Container A: Visible on mobile, tablet, and lg desktop (hidden on xl) */}
          <div className="xl:hidden flex justify-center w-full mb-6">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 overflow-hidden rounded-xl border bg-black/40 animate-[pulse-glow_4s_ease-in-out_infinite]">
              <img 
                src="/assets/newIntroImage.jpg" 
                alt="AI Hologram Profile" 
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover filter saturate-110 contrast-105 brightness-110 animate-[float_12s_ease-in-out_infinite]" 
              />
              {/* Hologram scan line overlay */}
              <div className="absolute left-0 w-full h-1.5 bg-accent/60 shadow-[0_0_12px_#00f2fe] animate-[scan_4s_ease-in-out_infinite] z-10"></div>
              {/* Grid overlay to look like digital screen */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2fe06_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe06_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40"></div>
              
              {/* Sci-fi Corner Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent/70 pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-accent/70 pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-accent/70 pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-accent/70 pointer-events-none"></div>
              
              {/* Cyber Scanning HUD overlays */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-accent/60 bg-black/40 px-2 py-0.5 rounded border border-accent/20 tracking-widest uppercase animate-pulse">
                System Scan Active
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-mono text-accent/50 tracking-widest bg-black/30 px-1.5 rounded">
                AI_COPY_v1.0.4
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-accent/30 text-accent font-mono text-sm relative z-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Open for Opportunities
            </div>
            {visitorCount !== null && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-gray-800 text-gray-400 font-mono text-sm relative z-10">
                <span className="text-accent font-semibold">visits:</span>
                <span className="text-white font-bold">{visitorCount.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold leading-tight relative z-10">
            Mike Angelo Salamat
            <a 
              href="#about" 
              className="text-accent text-lg sm:text-xl md:text-3xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl block mt-3 font-mono hover:text-blue-400 transition-colors duration-300 w-fit"
            >
              Full-Stack Developer & Cybersecurity Enthusiast
            </a>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl relative z-10">
            Developing high-performance full-stack web applications and securing them through active web exploitation, threat auditing, and digital forensics.
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 relative z-10">
            <a href="#projects" className="px-4 py-2 sm:px-8 sm:py-3 bg-accent text-background text-sm sm:text-base font-bold rounded-lg shadow-glow hover:shadow-glow-strong hover:-translate-y-1 transition-all duration-300 flex items-center gap-1.5 sm:gap-2">
              View Work <ChevronRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
            <a href="#contact" className="px-4 py-2 sm:px-8 sm:py-3 bg-surface border border-gray-700 text-white text-sm sm:text-base font-bold rounded-lg hover:border-accent transition-all duration-300">
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Column: Terminal Console */}
        <div 
          id="hero-terminal" 
          className={`hidden md:block relative z-10 w-full max-w-md xl:max-w-[350px] 2xl:max-w-[450px] 3xl:max-w-lg mx-auto lg:ml-auto transition-all duration-500 ease-in-out order-3 lg:order-none ${
            hideTerminal ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className="rounded-xl overflow-hidden bg-[#0A0D14] border border-gray-800 shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 font-mono text-xs select-none">
                <Terminal size={14} /> mike@dev-env: {currentDir || '~'}
              </div>
              <div className="w-12"></div> {/* Spacer balance */}
            </div>
            
            {/* Terminal Interactive History */}
            <div 
              ref={historyContainerRef}
              className="p-6 font-mono text-sm h-[320px] overflow-y-auto flex flex-col gap-1 select-text scroll-smooth"
            >
              {history.map((line, idx) => {
                let colorClass = 'text-gray-300';
                if (line.type === 'input') colorClass = 'text-accent';
                else if (line.type === 'error') colorClass = 'text-red-500 font-semibold';

                return (
                  <div 
                    key={idx} 
                    className={`${colorClass} whitespace-pre-wrap`}
                  >
                    {line.text}
                  </div>
                );
              })}
            </div>

            {/* Terminal Input Box */}
            <div className="p-4 bg-background border-t border-gray-800 flex items-start gap-2">
              <span className="text-accent font-mono font-bold select-none whitespace-nowrap flex-shrink-0 pt-0.5">{promptPrefix || '$'}</span>
              <textarea 
                rows={Math.min(4, inputVal.split('\n').length || 1)}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none border-none p-0 focus:ring-0 resize-none h-auto min-h-[1.5rem] leading-normal scrollbar-none"
                placeholder={placeholder || "Type 'help' or commands..."}
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
