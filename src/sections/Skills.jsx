import React, { useState, useEffect, useRef } from 'react';
import { Code2, Shield, Cpu, MousePointerClick } from 'lucide-react';

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

// Unified Skills Array
const allSkills = [
  // Languages & Frameworks
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "HTML5 / CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  // Cyber Security
  { name: "Kali Linux", customLogo: KaliLogo },
  { name: "Burp Suite", customLogo: BurpSuiteLogo },
  { name: "Wireshark", customLogo: WiresharkLogo },
  { name: "Nmap", customLogo: NmapLogo },
  { name: "Nikto", customLogo: NiktoLogo },
  { name: "SQLmap", customLogo: SQLmapLogo },
  { name: "Tor Browser", customLogo: TorLogo },
  { name: "Windows VM", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg" },
  // Infrastructure & AI
  { name: "Antigravity", customLogo: AntigravityLogo },
  { name: "Gemini CLI", customLogo: GeminiLogo },
  { name: "Stitch AI", customLogo: StitchLogo },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { name: "Claude AI", customLogo: ClaudeLogo },
  { name: "SQL Databases", customLogo: SQLLogo },
  { name: "Vite / Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" }
];

const IconSphere = ({ skills }) => {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  const particlesRef = useRef([]);
  const ambientParticlesRef = useRef([]);
  const requestRef = useRef();
  
  const [mode, setModeState] = useState('sphere'); // 'sphere', 'explode', 'layers'
  const modeRef = useRef(mode);
  const setMode = (newMode) => {
    modeRef.current = newMode;
    setModeState(newMode);
  };

  const isDraggingRef = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  
  // Camera rotation for sphere mode
  const currentRotation = useRef({ x: 0, y: 0 });
  const [radius, setRadius] = useState(200);

  const sphereSkills = [...skills, ...skills];
  const count = sphereSkills.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setRadius(140);
      } else if (window.innerWidth < 768) {
        setRadius(170);
      } else {
        setRadius(200);
      }
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute targets
  const { itemsData, linesData, particlesData, ambientParticlesData } = React.useMemo(() => {
    // 1. Sphere targets
    const sphere = sphereSkills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });

    // 2. Explode targets
    const explode = sphere.map((pos) => {
      // Uniform expansion for a cleaner, "shockwave" style explosion
      const mult = 5.0; 
      return {
        x: pos.x * mult,
        y: pos.y * mult,
        z: pos.z * mult,
      };
    });

    // 3. Layers targets
    const layers = [];
    const layersCount = 3;
    const itemsPerLayer = Math.ceil(count / layersCount);
    
    for (let l = 0; l < layersCount; l++) {
      const zPlane = (l - 1) * 200; // -200, 0, 200
      const layerItemsCount = Math.min(itemsPerLayer, count - l * itemsPerLayer);
      
      const cols = Math.ceil(Math.sqrt(layerItemsCount));
      const rows = Math.ceil(layerItemsCount / cols);
      
      const spacingX = radius * 2.5 / cols;
      const spacingY = radius * 2.5 / rows;
      
      for (let i = 0; i < layerItemsCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        layers.push({
          x: (col - (cols - 1) / 2) * spacingX,
          y: (row - (rows - 1) / 2) * spacingY,
          z: zPlane,
        });
      }
    }

    const items = sphereSkills.map((skill, i) => ({
      ...skill,
      id: i,
      current: { x: sphere[i].x, y: sphere[i].y, z: sphere[i].z }, // initial positions
      targets: {
        sphere: sphere[i],
        explode: explode[i],
        layers: layers[i],
      }
    }));

    // Setup lines based on sphere initial closest pairs
    const computedLines = [];
    for (let i = 0; i < items.length; i++) {
      const distances = items.map((item, j) => ({
        j,
        d: Math.hypot(item.targets.sphere.x - items[i].targets.sphere.x, 
                      item.targets.sphere.y - items[i].targets.sphere.y, 
                      item.targets.sphere.z - items[i].targets.sphere.z)
      }));
      distances.sort((a, b) => a.d - b.d);
      for (let k = 1; k <= 3; k++) {
        const j = distances[k].j;
        if (i < j) {
          computedLines.push({ i, j });
        }
      }
    }

    // Generate Ambient Floating Particles
    const ambientParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      baseX: (Math.random() - 0.5) * 800,
      baseY: (Math.random() - 0.5) * 800,
      baseZ: (Math.random() - 0.5) * 800,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      phaseZ: Math.random() * Math.PI * 2,
      speed: 0.001 + Math.random() * 0.002
    }));

    // Generate Particles
    const particles = Array.from({ length: 60 }).map((_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 10 + Math.random() * 25;
      return {
        id: i,
        current: { x: 0, y: 0, z: 0 },
        velocity: { 
          x: Math.cos(theta) * Math.sin(phi) * speed, 
          y: Math.sin(theta) * Math.sin(phi) * speed, 
          z: Math.cos(phi) * speed 
        },
        life: 0,
        active: false
      };
    });

    return { itemsData: items, linesData: computedLines, particlesData: particles, ambientParticlesData: ambientParticles };
  }, [sphereSkills, radius, count]);

  // Animation Loop
  const dataRef = useRef(itemsData);
  useEffect(() => {
    dataRef.current = itemsData;
  }, [itemsData]);

  useEffect(() => {
    const animate = () => {
      const items = dataRef.current;
      const currentMode = modeRef.current;

      // 1. Camera Rotation
      if (currentMode === 'sphere') {
        if (!isDraggingRef.current) {
          currentRotation.current.x -= 0.002;
          currentRotation.current.y += 0.004;
        }
      } else if (currentMode === 'layers') {
        // Snappy rotation reset for layers
        currentRotation.current.x += (0 - currentRotation.current.x) * 0.15;
        currentRotation.current.y += (0 - currentRotation.current.y) * 0.15;
      }
      
      const rotX = currentRotation.current.x;
      const rotY = currentRotation.current.y;

      // 2. Interpolate node positions
      // Balanced speed: not too slow, not too snappy
      const lerpFactor = currentMode === 'explode' ? 0.15 : 0.1;
      
      for (let i = 0; i < items.length; i++) {
        const node = items[i];
        const target = node.targets[currentMode];
        
        node.current.x += (target.x - node.current.x) * lerpFactor;
        node.current.y += (target.y - node.current.y) * lerpFactor;
        node.current.z += (target.z - node.current.z) * lerpFactor;

        if (nodesRef.current[i]) {
          nodesRef.current[i].style.transform = `translate3d(${node.current.x}px, ${node.current.y}px, ${node.current.z}px) rotateY(${-rotY}rad) rotateX(${-rotX}rad)`;
        }
      }

      // 3. Update lines
      for (let k = 0; k < linesData.length; k++) {
        const { i, j } = linesData[k];
        const p1 = items[i].current;
        const p2 = items[j].current;
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const dist = Math.hypot(dx, dy, dz);
        
        const cx = (p1.x + p2.x) / 2;
        const cy = (p1.y + p2.y) / 2;
        const cz = (p1.z + p2.z) / 2;
        
        const rotZ = Math.asin(dy / (dist || 1));
        const rotYLine = Math.atan2(-dz, dx);

        if (linesRef.current[k]) {
          linesRef.current[k].style.width = `${dist}px`;
          linesRef.current[k].style.transform = `translate(-50%, -50%) translate3d(${cx}px, ${cy}px, ${cz}px) rotateY(${rotYLine}rad) rotateZ(${rotZ}rad)`;
          linesRef.current[k].style.opacity = currentMode === 'sphere' ? '1' : '0';
        }
      }

      // 4. Update particles (independent of mode so they don't vanish)
      for (let i = 0; i < particlesData.length; i++) {
        const p = particlesData[i];
        
        // Trigger particles when explode starts
        if (currentMode === 'explode' && !p.active) {
          p.active = true;
          p.current = { x: 0, y: 0, z: 0 };
          p.life = 1.0;
        }

        if (p.life > 0) {
          p.current.x += p.velocity.x;
          p.current.y += p.velocity.y;
          p.current.z += p.velocity.z;
          p.life -= 0.015; // Slower fade out
          
          if (particlesRef.current[i]) {
            particlesRef.current[i].style.opacity = Math.max(0, p.life);
            particlesRef.current[i].style.transform = `translate3d(${p.current.x}px, ${p.current.y}px, ${p.current.z}px) rotateY(${-rotY}rad) rotateX(${-rotX}rad)`;
          }
        } else {
          p.active = false; // Reset so they can trigger again next time
          if (particlesRef.current[i]) {
            particlesRef.current[i].style.opacity = '0';
          }
        }
      }

      // 5. Update ambient floating particles
      const time = Date.now();
      for (let i = 0; i < ambientParticlesData.length; i++) {
        const p = ambientParticlesData[i];
        const px = p.baseX + Math.sin(time * p.speed + p.phaseX) * 50;
        const py = p.baseY + Math.cos(time * p.speed + p.phaseY) * 50;
        const pz = p.baseZ + Math.sin(time * p.speed + p.phaseZ) * 50;
        
        if (ambientParticlesRef.current[i]) {
          ambientParticlesRef.current[i].style.transform = `translate3d(${px}px, ${py}px, ${pz}px) rotateY(${-rotY}rad) rotateX(${-rotX}rad)`;
          const targetOpacity = currentMode === 'layers' ? 0.6 : 0;
          const currentOpacity = parseFloat(ambientParticlesRef.current[i].style.opacity || 0);
          ambientParticlesRef.current[i].style.opacity = currentOpacity + (targetOpacity - currentOpacity) * 0.05;
        }
      }

      // 6. Update container perspective rotation
      if (containerRef.current) {
         containerRef.current.style.transform = `translateZ(-${radius}px) rotateX(${rotX}rad) rotateY(${rotY}rad)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [linesData, radius]);

  // Handlers
  const toggleMode = () => {
    if (modeRef.current === 'sphere') {
      setMode('explode');
      
      // Balanced transition timing to allow the explosion to be visible
      setTimeout(() => {
        if (modeRef.current === 'explode') {
          setMode('layers');
        }
      }, 450);
    } else {
      setMode('sphere');
    }
  };

  const handlePointerDown = (e) => {
    if (modeRef.current === 'sphere') {
      isDraggingRef.current = true;
      previousMouse.current = { x: e.clientX || e.touches?.[0]?.clientX, y: e.clientY || e.touches?.[0]?.clientY };
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    
    const deltaX = clientX - previousMouse.current.x;
    const deltaY = clientY - previousMouse.current.y;
    
    currentRotation.current.y += deltaX * 0.005;
    currentRotation.current.x -= deltaY * 0.005;
    
    previousMouse.current = { x: clientX, y: clientY };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <div 
        className={`relative w-full h-[500px] flex items-center justify-center overflow-visible select-none ${mode === 'sphere' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onMouseMove={handlePointerMove}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
        onTouchCancel={handlePointerUp}
        onTouchMove={handlePointerMove}
        onClick={toggleMode}
        style={{ perspective: '1200px' }}
      >
        <div 
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center pointer-events-none will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Draw network lines between nodes */}
          {linesData.map((_, idx) => (
            <div 
              key={`line-${idx}`} 
              ref={(el) => (linesRef.current[idx] = el)}
              className="absolute left-1/2 top-1/2 bg-accent/40 transition-opacity duration-300 will-change-transform"
              style={{
                height: '1px',
                transformOrigin: 'center center',
              }}
            />
          ))}

          {/* Draw explosion particles */}
          {particlesData.map((_, idx) => (
            <div 
              key={`particle-${idx}`} 
              ref={(el) => (particlesRef.current[idx] = el)}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-accent rounded-full will-change-transform pointer-events-none opacity-0 shadow-[0_0_10px_#00F2FE]"
              style={{ transformStyle: 'preserve-3d' }}
            />
          ))}

          {/* Draw ambient floating particles */}
          {ambientParticlesData.map((_, idx) => (
            <div 
              key={`ambient-${idx}`} 
              ref={(el) => (ambientParticlesRef.current[idx] = el)}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-accent rounded-full will-change-transform pointer-events-none opacity-0 shadow-[0_0_10px_#00F2FE]"
              style={{ transformStyle: 'preserve-3d' }}
            />
          ))}

          {/* Draw skill icons */}
          {itemsData.map((item, idx) => {
            const CustomLogo = item.customLogo;
            return (
              <div
                key={`node-${idx}`}
                ref={(el) => (nodesRef.current[idx] = el)}
                className="absolute group pointer-events-auto hover:z-50 will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Icon Container */}
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-900/90 rounded-xl border border-gray-700/60 p-2 md:p-2.5 transition-all duration-300 group-hover:scale-125 group-hover:border-accent shadow-xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {item.logo ? (
                    <img src={item.logo} alt={item.name} className="w-full h-full object-contain pointer-events-none" draggable="false" />
                  ) : (
                    <div className="w-full h-full text-white pointer-events-none">
                      <CustomLogo />
                    </div>
                  )}
                </div>
                
                {/* Tooltip */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -top-10 md:-top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/95 text-accent text-xs md:text-sm font-mono font-bold py-1 px-2 md:py-1.5 md:px-3 rounded-lg border border-accent/50 z-50">
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Instructions */}
      <div 
        className="mt-4 px-4 py-2 bg-gray-900/60 backdrop-blur border border-gray-700 rounded-full flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors z-10" 
        onClick={toggleMode}
      >
        <MousePointerClick className="w-4 h-4 text-accent" />
        <span className="text-gray-300 text-xs font-medium tracking-wide">
          {mode === 'sphere' ? 'Click to explode & align' : 'Click to reform sphere'}
        </span>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
          <span className="text-accent font-mono text-2xl">02.</span> Technical Matrix
          <div className="h-px bg-gray-800 flex-grow ml-4 max-w-xs"></div>
        </h2>

        {/* 3D Sphere Container */}
        <div className="w-full max-w-3xl mx-auto aspect-square md:aspect-video rounded-3xl bg-surface/20 border border-gray-800/80 p-4 md:p-8 backdrop-blur-md relative shadow-2xl">
           <div className="absolute top-4 left-6 text-gray-500 font-mono text-xs flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
             Interactive Global Grid
           </div>
           
           <IconSphere skills={allSkills} />
        </div>
      </div>
    </section>
  );
};

export default Skills;

