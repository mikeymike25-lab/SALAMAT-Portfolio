import React, { useState, useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const STAR_LAYERS = [
  { size: [0.2, 0.6], opacity: [0.3, 0.6], count: 90 },  // distant, tiny
  { size: [0.5, 1.0], opacity: [0.5, 0.85], count: 65 }, // mid
  { size: [0.8, 1.5], opacity: [0.7, 1.0], count: 25 },  // near, slightly bigger
];

function createStar(canvas, layer) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: randomBetween(layer.size[0], layer.size[1]),
    baseOpacity: randomBetween(layer.opacity[0], layer.opacity[1]),
    phase: Math.random() * Math.PI * 2,
    cyan: Math.random() > 0.82,
    vx: 0,
    vy: 0,
  };
}

function createShootingStar(canvas) {
  const x = randomBetween(canvas.width * 0.1, canvas.width * 0.9);
  const y = randomBetween(0, canvas.height * 0.35);
  const angle = randomBetween(25, 55) * (Math.PI / 180);
  const speed = randomBetween(9, 20);
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    len: randomBetween(90, 220),
    life: 1,
    decay: randomBetween(0.011, 0.020),
  };
}

const ScrollBackground = ({ isTerminalOpen }) => {
  const [activeSection, setActiveSection] = useState('home');
  const scrollProgressRef = useRef(0);
  const isTerminalOpenRef = useRef(isTerminalOpen);

  // Canvas + star state
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const frameRef = useRef(0);
  const lastShootFrameRef = useRef(0);
  const nextShootIntervalRef = useRef(randomBetween(200, 500));
  const mouseRef = useRef({ x: -9999, y: -9999 }); // off-screen by default

  // Drone refs
  const requestRef = useRef(null);
  const droneRootRef = useRef(null);
  const droneNametagRef = useRef(null);
  const droneLeftArmRef = useRef(null);
  const droneRightArmRef = useRef(null);
  const droneEyesRef = useRef(null);

  useEffect(() => {
    isTerminalOpenRef.current = isTerminalOpen;
  }, [isTerminalOpen]);

  // Scroll + section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollProgressRef.current = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id || 'home'); });
    }, { threshold: 0.3 });
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);

  // Main canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const REPULSE_RADIUS = 100;
    const REPULSE_STRENGTH = 5;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-seed stars to fill new dimensions
      starsRef.current = [];
      STAR_LAYERS.forEach(layer => {
        for (let i = 0; i < layer.count; i++) {
          starsRef.current.push(createStar(canvas, layer));
        }
      });
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      frameRef.current++;
      const progress = scrollProgressRef.current;
      const isMobile = canvas.width < 768;
      const t = frameRef.current * 0.013;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── STARS ─────────────────────────────────────────────────────────
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      starsRef.current.forEach(star => {
        // Physics: push velocity away from mouse
        const dx = star.x - mx;
        const dy = star.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSE_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSE_RADIUS) * REPULSE_STRENGTH;
          star.vx += (dx / dist) * force;
          star.vy += (dy / dist) * force;
        }

        // Apply friction (0.90 = decelerates smoothly, stops naturally)
        star.vx *= 0.90;
        star.vy *= 0.90;

        // Update real position
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around canvas edges so stars don't fly off screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.6 + star.phase);
        const alpha = star.baseOpacity * (0.45 + 0.55 * twinkle);
        const rgb = star.cyan ? '80, 220, 255' : '255, 255, 255';

        // Glow halo
        const haloR = star.size * 2.5;
        const grd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, haloR);
        grd.addColorStop(0, `rgba(${rgb}, ${alpha * 0.9})`);
        grd.addColorStop(0.4, `rgba(${rgb}, ${alpha * 0.3})`);
        grd.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, alpha * 1.4)})`;
        ctx.fill();

        // Cross-flare on biggest stars only
        if (star.size > 1.1) {
          const fLen = star.size * 4 * (0.5 + 0.5 * twinkle);
          ctx.save();
          ctx.strokeStyle = `rgba(${rgb}, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - fLen, star.y);
          ctx.lineTo(star.x + fLen, star.y);
          ctx.moveTo(star.x, star.y - fLen);
          ctx.lineTo(star.x, star.y + fLen);
          ctx.stroke();
          ctx.restore();
        }
      });

      // ── SHOOTING STARS ────────────────────────────────────────────────
      const sinceLastShoot = frameRef.current - lastShootFrameRef.current;
      if (sinceLastShoot >= nextShootIntervalRef.current) {
        lastShootFrameRef.current = frameRef.current;
        nextShootIntervalRef.current = randomBetween(180, 460);
        shootingStarsRef.current.push(createShootingStar(canvas));
      }

      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const s = shootingStarsRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0 || s.x > canvas.width + 100 || s.y > canvas.height + 100) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        // Tail: go backward from head along velocity
        const mag = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const tailX = s.x - (s.vx / mag) * s.len * s.life;
        const tailY = s.y - (s.vy / mag) * s.len * s.life;

        ctx.save();
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(180,230,255,${s.life * 0.5})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.life})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(200, 240, 255, 0.9)';
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.life})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = 'white';
        ctx.fill();
        ctx.restore();
      }

      // ── SYLPHY DRONE ──────────────────────────────────────────────────
      if (!isMobile) {
        if (!isTerminalOpenRef.current && droneRootRef.current) {
          const posX = 15 + Math.sin(progress * Math.PI) * 60;
          const posY = 15 + progress * 75;
          const tilt = Math.cos(progress * Math.PI * 2) * 15;
          const armSwing = Math.sin(progress * 80) * 25;
          const eyePosX = Math.sin(progress * Math.PI * 4) * 2;
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
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #0d1a2a 0%, #060c14 50%, #020408 100%)' }}
    >
      {/* Star + shooting star canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }} />

      {/* Subtle nebula blobs */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-[8%] left-[12%] w-[500px] h-[280px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-[45%] right-[8%] w-[380px] h-[380px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-[12%] left-[38%] w-[550px] h-[220px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', filter: 'blur(90px)' }} />
      </div>

      {/* Sylphy Drone */}
      <div
        ref={droneRootRef}
        className={`hidden md:block absolute w-24 h-24 md:w-32 md:h-32 z-10 ease-out will-change-transform drop-shadow-[0_0_15px_rgba(0,242,254,0.4)] ${isTerminalOpen ? 'transition-all duration-700' : ''}`}
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
