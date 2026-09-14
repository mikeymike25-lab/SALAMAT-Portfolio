import os

code = """import React, { useState, useEffect, useRef } from 'react';
import { useScroll, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollBackground from '../components/ScrollBackground';
import Footer from '../components/Footer';

// A horizontal timeline flow chart with bold hexagon badges
const HorizontalFlowChart = ({ activeIndex, items, colors }) => {
  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl flex justify-between items-center">
        
        {/* Background Track */}
        <div className="absolute top-1/2 left-8 right-8 h-2 -translate-y-1/2 bg-gray-800 rounded-full z-0 overflow-hidden">
           <motion.div 
             className="h-full bg-white opacity-80"
             initial={{ width: '0%' }}
             animate={{ width: \`\${(activeIndex / (items.length - 1)) * 100}%\` }}
             transition={{ duration: 0.5, ease: 'easeInOut' }}
           />
        </div>

        {/* Nodes */}
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const colorClass = colors[index % colors.length];
          
          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              {/* Badge */}
              <motion.div 
                className={\`w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center hexagon shadow-xl transition-colors duration-500 \${isActive || isPast ? colorClass.bg : 'bg-gray-800'}\`}
                animate={{ 
                  scale: isActive ? 1.2 : 1,
                  y: isActive ? -10 : 0
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className={\`text-xl sm:text-2xl font-bold font-mono \${isActive || isPast ? 'text-white' : 'text-gray-500'}\`}>
                  {index + 1}
                </span>
                {/* Active Highlight Ring (Not neon, just a crisp white border highlight) */}
                {isActive && (
                  <motion.div 
                    layoutId="activeRing"
                    className="absolute inset-0 border-4 border-white opacity-80 hexagon-border"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
              
              {/* Label */}
              <motion.div 
                className="absolute top-full mt-6 text-center w-32"
                animate={{ 
                  opacity: isActive ? 1 : 0.5,
                  y: isActive ? 5 : 0,
                  scale: isActive ? 1.1 : 1
                }}
              >
                <span className={\`text-xs sm:text-sm font-bold uppercase tracking-wider \${isActive ? 'text-white' : 'text-gray-500'}\`}>
                  {item.label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: \`
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .hexagon-border {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          box-sizing: border-box;
        }
      \`}} />
    </div>
  );
};


// Flat bold colors inspired by the SDLC wheel image
const SDLC_COLORS = [
  { bg: 'bg-[#C62828]', name: 'Red' },       // Planning
  { bg: 'bg-[#283593]', name: 'Navy' },      // Analysis
  { bg: 'bg-[#0277BD]', name: 'Blue' },      // Design
  { bg: 'bg-[#00897B]', name: 'Teal' },      // Implementation
  { bg: 'bg-[#F9A825]', name: 'Gold' },      // Testing
  { bg: 'bg-[#E65100]', name: 'Orange' },    // Maintenance
];

const PTES_COLORS = [
  { bg: 'bg-[#37474F]', name: 'Slate' },     // Recon
  { bg: 'bg-[#B71C1C]', name: 'Crimson' },   // Exploit
  { bg: 'bg-[#2E7D32]', name: 'Green' },     // Remediate
];

const WEB_STEPS = [
  { label: 'Planning', title: 'Requirements & Scope', body: 'Defining project goals, technical constraints, and establishing a clear roadmap before writing a single line of code.' },
  { label: 'Analysis', title: 'System Architecture', body: 'Mapping out data models, API contracts, and user flows to ensure scalable and maintainable foundations.' },
  { label: 'Design', title: 'UX/UI & Prototyping', body: 'Creating wireframes and high-fidelity mockups focusing on accessibility, responsiveness, and user experience.' },
  { label: 'Code', title: 'Component-Driven Dev', body: 'Building modular, testable React components and robust backend services with modern best practices.' },
  { label: 'Testing', title: 'QA & Integration', body: 'Running automated tests, linting, and manual QA to ensure security and zero-downtime deployment.' },
  { label: 'Deploy', title: 'Monitoring & Scaling', body: 'Post-launch monitoring, performance tuning, and iterative updates based on user feedback.' }
];

const PEN_STEPS = [
  { label: 'Recon', title: 'OSINT & Surface Mapping', body: 'Mapping the target attack surface through active and passive intelligence gathering — identifying exposed endpoints and open ports.' },
  { label: 'Exploitation', title: 'Vulnerability Exploitation', body: 'Probing for misconfigurations and injection flaws, then ethically weaponizing them to validate business risk.' },
  { label: 'Remediation', title: 'Forensic Reporting & Patch', body: 'Producing detailed forensic write-ups with root cause analysis and prioritized steps to harden the application surface.' }
];

const ScrollytellingFlow = ({ steps, colors }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const stepSize = 1 / Math.max(1, (steps.length - 1));
      let newIndex = Math.round(latest / stepSize);
      if (newIndex >= steps.length) newIndex = steps.length - 1;
      if (newIndex < 0) newIndex = 0;
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress, steps.length]);

  return (
    <div ref={containerRef} style={{ height: \`\${(steps.length * 60)}vh\` }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center bg-transparent pt-20">
        
        {/* Top half: The horizontal chart */}
        <div className="h-[40vh] w-full flex items-center justify-center mb-8 mt-10">
          <HorizontalFlowChart activeIndex={activeIndex} items={steps} colors={colors} />
        </div>

        {/* Bottom half: The text description */}
        <div className="h-[40vh] w-full flex items-start justify-center px-6">
          <div className="max-w-2xl text-center relative w-full h-full">
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 left-0 right-0 mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0, 
                    y: isActive ? 0 : (i < activeIndex ? -20 : 20),
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-bold tracking-widest text-white bg-gray-800 rounded-full border border-gray-700">
                    STEP 0{i + 1} // {step.label}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
                    {step.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};


const MethodologyPage = () => {
  const [activeTab, setActiveTab] = useState("build");

  // Reset scroll when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-transparent text-gray-200 relative flex flex-col">
      <ScrollBackground isTerminalOpen={false} />
      <Navbar onAskSylphy={() => {}} />

      <main className="flex-grow flex flex-col relative z-10 pt-32 pb-20">
        <div className="text-center px-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Process &amp; Methodology
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A deep dive into how I approach engineering architecture and offensive security, structured step-by-step.
          </p>
        </div>

        <div className="flex justify-center mb-8 px-6 relative z-20">
          <div className="flex space-x-2 bg-gray-900/50 p-1 rounded-xl backdrop-blur-sm border border-gray-800">
            <button
              onClick={() => setActiveTab("build")}
              className={\`px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition-all \${
                activeTab === "build" 
                  ? 'bg-white text-gray-900 shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }\`}
            >
              How I Build (SDLC)
            </button>
            <button
              onClick={() => setActiveTab("pentest")}
              className={\`px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition-all \${
                activeTab === "pentest" 
                  ? 'bg-white text-gray-900 shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }\`}
            >
              How I Pen Test (PTES)
            </button>
          </div>
        </div>

        {activeTab === "build" ? (
          <ScrollytellingFlow key="flow-build" steps={WEB_STEPS} colors={SDLC_COLORS} />
        ) : (
          <ScrollytellingFlow key="flow-pentest" steps={PEN_STEPS} colors={PTES_COLORS} />
        )}
      </main>

      <Footer visitorCount={0} />
    </div>
  );
};

export default MethodologyPage;
"""

os.makedirs('src/pages', exist_ok=True)
with open('src/pages/MethodologyPage.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
