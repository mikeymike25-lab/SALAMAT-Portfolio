import React, { useState, useEffect, useRef } from 'react';

const RobotDrone = ({ scrollProgress, activeSection, isTerminalOpen }) => {
  // Starts slightly lower (15vh) to sit above the image, then sweeps horizontally
  const posX = 15 + Math.sin(scrollProgress * Math.PI) * 60; 
  const posY = 15 + scrollProgress * 75; // 15vh to 90vh
  const tilt = Math.cos(scrollProgress * Math.PI * 2) * 15; // Bobbing tilt
  
  // Deterministic flicker and movement based on scroll
  const flameFlicker = 0.8 + Math.abs(Math.sin(scrollProgress * 200)) * 0.6;
  const eyePosX = 40 + (Math.sin(scrollProgress * Math.PI * 4) + 1) * 10; // Eye sweeps back and forth
  const armSwing = Math.sin(scrollProgress * 80) * 25; // Arms swing much slower when scrolling

  // Dynamic transform that seamlessly interpolates between scrolling position and terminal docking position
  const transformStyle = isTerminalOpen 
    ? `translate(calc(100vw - clamp(160px, 25vw, 260px)), calc(100vh - 540px)) rotate(${Math.sin(Date.now() / 500) * 5}deg)` 
    : `translate(${posX}vw, ${posY}vh) rotate(${tilt}deg)`;

  return (
    <div 
      className={`absolute w-24 h-24 md:w-32 md:h-32 z-10 ease-out will-change-transform drop-shadow-[0_0_15px_rgba(0,242,254,0.4)] ${isTerminalOpen ? 'transition-all duration-700' : 'transition-transform duration-75'}`}
      style={{
        left: 0,
        top: 0,
        transform: transformStyle,
      }}
    >
      {/* Auto-sizing HTML Holographic Sign */}
      <div 
        className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0B0F17] border border-[#00F2FE] rounded-md px-4 py-1.5 flex flex-col items-center justify-center whitespace-nowrap shadow-[0_0_10px_rgba(0,242,254,0.5)] z-20"
        style={{ transform: `translate(-50%, ${Math.sin(scrollProgress * 150) * 4}px)` }}
      >
        <span className="text-[#00F2FE] font-mono text-xs md:text-sm font-bold uppercase tracking-widest drop-shadow-[0_0_2px_#00F2FE]">
          {activeSection || 'HOME'}
        </span>
        {/* Dotted Connector Line */}
        <div className="absolute top-full left-1/2 w-[2px] h-8 border-l-2 border-dotted border-[#00F2FE] -translate-x-1/2 opacity-80"></div>
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        
        {/* Left Arm (swings) */}
        <g style={{ transform: `rotate(${-armSwing}deg)`, transformOrigin: '30px 65px' }}>
          <rect x="18" y="60" width="14" height="26" rx="7" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Inner arm cyan accent */}
          <rect x="22" y="62" width="6" height="15" rx="3" fill="#00F2FE" opacity="0.6" />
        </g>
        
        {/* Right Arm (swings) */}
        <g style={{ transform: `rotate(${armSwing}deg)`, transformOrigin: '70px 65px' }}>
          <rect x="68" y="60" width="14" height="26" rx="7" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Inner arm cyan accent */}
          <rect x="72" y="62" width="6" height="15" rx="3" fill="#00F2FE" opacity="0.6" />
        </g>
        
        {/* Main Body */}
        {/* Cute rounded egg-shaped body */}
        <path d="M 30 55 C 25 95 75 95 70 55 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        
        {/* Chest Cyan Accent (like Eilik's bib) */}
        <path d="M 38 55 Q 50 75 62 55 Z" fill="#00F2FE" />
        <circle cx="50" cy="72" r="1.5" fill="#0F172A" opacity="0.3" />
        
        {/* Physical Name Tag */}
        <rect x="34" y="78" width="32" height="10" rx="3" fill="#1E293B" stroke="#00F2FE" strokeWidth="0.5" />
        <text x="50" y="85.5" fill="#00F2FE" fontSize="6" fontWeight="900" fontFamily="monospace" textAnchor="middle" letterSpacing="1">
          SYLPHY
        </text>
        
        {/* Head */}
        <rect x="20" y="10" width="60" height="48" rx="24" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        
        {/* Ear accents */}
        <path d="M 20 28 A 4 8 0 0 0 16 36 A 4 8 0 0 0 20 44 Z" fill="#CBD5E1" />
        <path d="M 80 28 A 4 8 0 0 1 84 36 A 4 8 0 0 1 80 44 Z" fill="#CBD5E1" />

        {/* Black Screen Face */}
        <rect x="26" y="16" width="48" height="35" rx="17.5" fill="#0B0F17" />
        
        {/* Glowing Smiling Eyes (Slightly tracks scroll horizontally) */}
        <g style={{ transform: `translateX(${(Math.sin(scrollProgress * Math.PI * 4)) * 2}px)` }}>
          {/* Left Eye */}
          <path 
            d="M 33 34 Q 39 26 45 34" 
            fill="none" 
            stroke="#00F2FE" 
            strokeWidth="4" 
            strokeLinecap="round" 
            style={{ filter: 'drop-shadow(0 0 4px #00F2FE)' }} 
          />
          {/* Right Eye */}
          <path 
            d="M 55 34 Q 61 26 67 34" 
            fill="none" 
            stroke="#00F2FE" 
            strokeWidth="4" 
            strokeLinecap="round" 
            style={{ filter: 'drop-shadow(0 0 4px #00F2FE)' }} 
          />
        </g>
      </svg>
    </div>
  );
};

const ScrollBackground = ({ isTerminalOpen }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDir, setScrollDir] = useState(1);
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollY = useRef(0);

  const scrollProgressRef = useRef(0);
  const scrollDirRef = useRef(1);
  const isTerminalOpenRef = useRef(isTerminalOpen);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const pathHistory = useRef([]);
  const requestRef = useRef(null);
  const lastRobotPos = useRef({ x: 0, y: 0 });

  // Sync state to refs for the animation loop
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
    scrollDirRef.current = scrollDir;
    isTerminalOpenRef.current = isTerminalOpen;
  }, [scrollProgress, scrollDir, isTerminalOpen]);

  // Scroll and Section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > lastScrollY.current) {
        setScrollDir(1);
      } else if (scrollY < lastScrollY.current) {
        setScrollDir(-1);
      }
      lastScrollY.current = scrollY;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      setScrollProgress(progress);
    };
    
    // Intersection Observer for Active Section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || 'home');
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('section').forEach(sec => observer.observe(sec));

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer.disconnect();
    };
  }, []);

  // High-performance Canvas Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const render = () => {
      // Clear canvas entirely each frame for sharp particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const progress = scrollProgressRef.current;
      const vw = canvas.width;
      const vh = canvas.height;
      
      const isMd = vw >= 768; // tailwind 'md' breakpoint
      const offset = isMd ? 64 : 48; // half width of robot

      // Calculate current robot pixel center
      const robotX = ((15 + Math.sin(progress * Math.PI) * 60) / 100 * vw) + offset;
      const robotY = ((15 + progress * 75) / 100 * vh) + offset;

      // Calculate velocity/distance since last frame
      const dx = robotX - lastRobotPos.current.x;
      const dy = robotY - lastRobotPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Record path history for the glowing ribbon
      if (!isTerminalOpenRef.current && lastRobotPos.current.x !== 0 && speed > 0.5) {
         pathHistory.current.push({ x: robotX, y: robotY, life: 1 });
      }

      // Update and filter path history
      for (let i = 0; i < pathHistory.current.length; i++) {
         pathHistory.current[i].life -= 0.02; // Fades out smoothly over 50 frames
      }
      pathHistory.current = pathHistory.current.filter(p => p.life > 0);

      // Only spawn dust particles if moving
      if (!isTerminalOpenRef.current && lastRobotPos.current.x !== 0 && speed > 0.5) {
         const spawnCount = Math.max(1, Math.min(8, Math.floor(speed / 4))); // fewer particles
         
         for (let j = 0; j < spawnCount; j++) {
            const spawnX = lastRobotPos.current.x + dx * (j / spawnCount);
            const spawnY = lastRobotPos.current.y + dy * (j / spawnCount);
            
            // Very gentle scatter, mostly just inheriting backward inertia
            const vx = (Math.random() - 0.5) * 1.5 - (dx * 0.03);
            const vy = (Math.random() - 0.5) * 1.5 - (dy * 0.03);
            
            particlesRef.current.push({
               x: spawnX, y: spawnY, vx, vy,
               size: Math.random() * 2 + 1, // 1px to 3px
               life: 1,
               decay: Math.random() * 0.03 + 0.015,
               color: Math.random() > 0.65 ? '255, 255, 255' : '0, 242, 254'
            });
         }
      }
      
      lastRobotPos.current = { x: robotX, y: robotY };

      // Render the glowing light ribbon
      if (pathHistory.current.length > 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        for (let i = 1; i < pathHistory.current.length; i++) {
          const p = pathHistory.current[i];
          const prev = pathHistory.current[i - 1];
          const opacity = Math.max(0, p.life);
          
          // Use quadratic curves for an ultra-smooth, continuous ribbon
          const midX = (prev.x + p.x) / 2;
          const midY = (prev.y + p.y) / 2;
          
          // Outer Purple/Blue Glow
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.quadraticCurveTo(midX, midY, p.x, p.y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.4})`; // Deep blue
          ctx.lineWidth = 18 * opacity;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#2563EB';
          ctx.stroke();

          // Inner Cyan Core
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.quadraticCurveTo(midX, midY, p.x, p.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
          ctx.lineWidth = 6 * opacity;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00F2FE';
          ctx.stroke();
          
          // Bright White Center
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.quadraticCurveTo(midX, midY, p.x, p.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
          ctx.lineWidth = 2 * opacity;
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#FFFFFF';
          ctx.stroke();
        }
      }

      // Update and draw dust particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = `rgba(${p.color}, ${p.life})`;
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />
      
      {/* Orb 1: Cyan, starts top-left, moves down and right, shifts hue */}
      <div 
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[180px] opacity-40 will-change-transform"
        style={{
          background: `radial-gradient(circle, #00F2FE 0%, transparent 70%)`,
          transform: `translate(calc(-20% + ${scrollProgress * 60}vw), calc(-20% + ${scrollProgress * 60}vh)) scale(${1 + scrollProgress * 0.5})`,
          filter: `hue-rotate(${scrollProgress * 120}deg)`
        }}
      />
      
      {/* Orb 2: Purple, starts top-right, moves down and left, shifts hue */}
      <div 
        className="absolute right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[100px] md:blur-[150px] opacity-30 will-change-transform"
        style={{
          background: `radial-gradient(circle, #8B5CF6 0%, transparent 70%)`,
          transform: `translate(calc(20% - ${scrollProgress * 50}vw), calc(10% + ${scrollProgress * 70}vh)) scale(${1 + scrollProgress * 0.3})`,
          filter: `hue-rotate(${scrollProgress * -90}deg)`
        }}
      />
      
      {/* Orb 3: Reddish, starts bottom-left, moves up */}
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] md:blur-[160px] opacity-20 will-change-transform"
        style={{
          background: `radial-gradient(circle, #FF6B6B 0%, transparent 70%)`,
          transform: `translate(calc(-10% + ${scrollProgress * 30}vw), calc(20% - ${scrollProgress * 50}vh))`,
        }}
      />

      {/* Dynamic Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] will-change-transform"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `translateY(-${scrollProgress * 200}px)`
        }}
      />


      {/* Floating Cyber Drone */}
      <RobotDrone scrollProgress={scrollProgress} activeSection={activeSection} isTerminalOpen={isTerminalOpen} />
    </div>
  );
};

export default ScrollBackground;
