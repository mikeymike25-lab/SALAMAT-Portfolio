import React, { useState, useEffect, useRef } from 'react';

const ScrollBackground = ({ isTerminalOpen }) => {
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollY = useRef(0);

  const scrollProgressRef = useRef(0);
  const scrollDirRef = useRef(1);
  const isTerminalOpenRef = useRef(isTerminalOpen);
  
  // Element Refs for manual DOM updates (bypassing React re-renders)
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const pathHistory = useRef([]);
  const requestRef = useRef(null);
  const lastRobotPos = useRef({ x: 0, y: 0 });

  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const gridRef = useRef(null);

  const droneRootRef = useRef(null);
  const droneNametagRef = useRef(null);
  const droneLeftArmRef = useRef(null);
  const droneRightArmRef = useRef(null);
  const droneEyesRef = useRef(null);

  useEffect(() => {
    isTerminalOpenRef.current = isTerminalOpen;
  }, [isTerminalOpen]);

  // Scroll and Section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > lastScrollY.current) {
        scrollDirRef.current = 1;
      } else if (scrollY < lastScrollY.current) {
        scrollDirRef.current = -1;
      }
      lastScrollY.current = scrollY;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      
      // Update ref instead of state to prevent massive React re-renders on mobile
      scrollProgressRef.current = progress;
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

  // High-performance Rendering Engine (Canvas + DOM)
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const progress = scrollProgressRef.current;
      const vw = canvas.width;
      const vh = canvas.height;
      const isMobile = vw < 768; // tailwind 'md' breakpoint
      
      // --- UPDATE DOM ELEMENTS DIRECTLY (O(1) updates, completely skips React) ---
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(calc(-20% + ${progress * 60}vw), calc(-20% + ${progress * 60}vh)) scale(${1 + progress * 0.5})`;
        orb1Ref.current.style.filter = `hue-rotate(${progress * 120}deg)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(calc(20% - ${progress * 50}vw), calc(10% + ${progress * 70}vh)) scale(${1 + progress * 0.3})`;
        orb2Ref.current.style.filter = `hue-rotate(${progress * -90}deg)`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(calc(-10% + ${progress * 30}vw), calc(20% - ${progress * 50}vh))`;
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(-${progress * 200}px)`;
      }

      // Calculate current robot pixel center and animate body parts
      const offset = isMobile ? 48 : 64; // half width of robot
      const robotX = ((15 + Math.sin(progress * Math.PI) * 60) / 100 * vw) + offset;
      const robotY = ((15 + progress * 75) / 100 * vh) + offset;

      if (!isTerminalOpenRef.current && droneRootRef.current) {
         const posX = 15 + Math.sin(progress * Math.PI) * 60; 
         const posY = 15 + progress * 75; // 15vh to 90vh
         const tilt = Math.cos(progress * Math.PI * 2) * 15;
         
         const armSwing = Math.sin(progress * 80) * 25;
         const eyePosX = (Math.sin(progress * Math.PI * 4)) * 2;
         const nametagY = Math.sin(progress * 150) * 4;

         droneRootRef.current.style.transform = `translate(${posX}vw, ${posY}vh) rotate(${tilt}deg)`;
         if (droneNametagRef.current) droneNametagRef.current.style.transform = `translate(-50%, ${nametagY}px)`;
         if (droneLeftArmRef.current) droneLeftArmRef.current.style.transform = `rotate(${-armSwing}deg)`;
         if (droneRightArmRef.current) droneRightArmRef.current.style.transform = `rotate(${armSwing}deg)`;
         if (droneEyesRef.current) droneEyesRef.current.style.transform = `translateX(${eyePosX}px)`;
      } else if (isTerminalOpenRef.current && droneRootRef.current) {
         droneRootRef.current.style.transform = `translate(calc(100vw - clamp(160px, 25vw, 260px)), calc(100vh - 540px)) rotate(${Math.sin(Date.now() / 500) * 5}deg)`;
         if (droneLeftArmRef.current) droneLeftArmRef.current.style.transform = `rotate(0deg)`;
         if (droneRightArmRef.current) droneRightArmRef.current.style.transform = `rotate(0deg)`;
      }

      // --- CANVAS PHYSICS & RENDERING ---
      const dx = robotX - lastRobotPos.current.x;
      const dy = robotY - lastRobotPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (!isTerminalOpenRef.current && lastRobotPos.current.x !== 0 && speed > 0.5) {
         pathHistory.current.push({ x: robotX, y: robotY, life: 1 });
      }

      for (let i = 0; i < pathHistory.current.length; i++) {
         pathHistory.current[i].life -= 0.02;
      }
      pathHistory.current = pathHistory.current.filter(p => p.life > 0);

      if (!isTerminalOpenRef.current && lastRobotPos.current.x !== 0 && speed > 0.5) {
         const spawnCount = Math.max(1, Math.min(8, Math.floor(speed / 4)));
         for (let j = 0; j < spawnCount; j++) {
            const spawnX = lastRobotPos.current.x + dx * (j / spawnCount);
            const spawnY = lastRobotPos.current.y + dy * (j / spawnCount);
            const vx = (Math.random() - 0.5) * 1.5 - (dx * 0.03);
            const vy = (Math.random() - 0.5) * 1.5 - (dy * 0.03);
            particlesRef.current.push({
               x: spawnX, y: spawnY, vx, vy,
               size: Math.random() * 2 + 1,
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
          const midX = (prev.x + p.x) / 2;
          const midY = (prev.y + p.y) / 2;
          
          if (isMobile) {
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.quadraticCurveTo(midX, midY, p.x, p.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
            ctx.lineWidth = 6 * opacity;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.quadraticCurveTo(midX, midY, p.x, p.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            ctx.lineWidth = 2 * opacity;
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.quadraticCurveTo(midX, midY, p.x, p.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.4})`;
            ctx.lineWidth = 18 * opacity;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#2563EB';
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.quadraticCurveTo(midX, midY, p.x, p.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
            ctx.lineWidth = 6 * opacity;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00F2FE';
            ctx.stroke();
            
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
        if (isMobile) { ctx.shadowBlur = 0; } else { ctx.shadowBlur = p.size * 3; ctx.shadowColor = `rgba(${p.color}, ${p.life})`; }
        ctx.fill();
      }
      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);
    return () => { window.removeEventListener('resize', setSize); cancelAnimationFrame(requestRef.current); };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />
      
      <div 
        ref={orb1Ref}
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[180px] opacity-40 will-change-transform"
        style={{ background: `radial-gradient(circle, #00F2FE 0%, transparent 70%)` }}
      />
      
      <div 
        ref={orb2Ref}
        className="absolute right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[100px] md:blur-[150px] opacity-30 will-change-transform"
        style={{ background: `radial-gradient(circle, #8B5CF6 0%, transparent 70%)` }}
      />
      
      <div 
        ref={orb3Ref}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] md:blur-[160px] opacity-20 will-change-transform"
        style={{ background: `radial-gradient(circle, #FF6B6B 0%, transparent 70%)` }}
      />

      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-[0.02] will-change-transform"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Inline Robot Drone (for manual DOM manipulation) */}
      <div 
        ref={droneRootRef}
        className={`absolute w-24 h-24 md:w-32 md:h-32 z-10 ease-out will-change-transform drop-shadow-[0_0_15px_rgba(0,242,254,0.4)] ${isTerminalOpen ? 'transition-all duration-700' : ''}`}
        style={{ left: 0, top: 0 }}
      >
        <div 
          ref={droneNametagRef}
          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0B0F17] border border-[#00F2FE] rounded-md px-4 py-1.5 flex flex-col items-center justify-center whitespace-nowrap shadow-[0_0_10px_rgba(0,242,254,0.5)] z-20"
        >
          <span className="text-[#00F2FE] font-mono text-xs md:text-sm font-bold uppercase tracking-widest drop-shadow-[0_0_2px_#00F2FE]">
            {activeSection || 'HOME'}
          </span>
          <div className="absolute top-full left-1/2 w-[2px] h-8 border-l-2 border-dotted border-[#00F2FE] -translate-x-1/2 opacity-80"></div>
        </div>

        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
          <g ref={droneLeftArmRef} style={{ transformOrigin: '30px 65px' }}>
            <rect x="18" y="60" width="14" height="26" rx="7" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="22" y="62" width="6" height="15" rx="3" fill="#00F2FE" opacity="0.6" />
          </g>
          <g ref={droneRightArmRef} style={{ transformOrigin: '70px 65px' }}>
            <rect x="68" y="60" width="14" height="26" rx="7" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="72" y="62" width="6" height="15" rx="3" fill="#00F2FE" opacity="0.6" />
          </g>
          
          <path d="M 30 55 C 25 95 75 95 70 55 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M 38 55 Q 50 75 62 55 Z" fill="#00F2FE" />
          <circle cx="50" cy="72" r="1.5" fill="#0F172A" opacity="0.3" />
          
          <rect x="34" y="78" width="32" height="10" rx="3" fill="#1E293B" stroke="#00F2FE" strokeWidth="0.5" />
          <text x="50" y="85.5" fill="#00F2FE" fontSize="6" fontWeight="900" fontFamily="monospace" textAnchor="middle" letterSpacing="1">SYLPHY</text>
          
          <rect x="20" y="10" width="60" height="48" rx="24" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M 20 28 A 4 8 0 0 0 16 36 A 4 8 0 0 0 20 44 Z" fill="#CBD5E1" />
          <path d="M 80 28 A 4 8 0 0 1 84 36 A 4 8 0 0 1 80 44 Z" fill="#CBD5E1" />
          <rect x="26" y="16" width="48" height="35" rx="17.5" fill="#0B0F17" />
          
          <g ref={droneEyesRef}>
            <path d="M 33 34 Q 39 26 45 34" fill="none" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px #00F2FE)' }} />
            <path d="M 55 34 Q 61 26 67 34" fill="none" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px #00F2FE)' }} />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default ScrollBackground;
