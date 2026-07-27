import React, { useState } from 'react';
import { Code, Database, Shield } from 'lucide-react';

const About = () => {
  const [imageError, setImageError] = useState(false);
  return (
    <section id="about" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="text-accent font-mono text-2xl">01.</span> About Me
            <div className="h-px bg-gray-800 flex-grow ml-4 max-w-xs"></div>
          </h2>
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Biography & Image Column */}
            <div className="lg:col-span-7 flex flex-col md:flex-row gap-8 items-center md:items-start text-gray-400 text-lg leading-relaxed">

              {/* Profile Image with Sci-Fi Square Outer Frame */}
              <div className="flex-shrink-0 relative group/img">
                {/* Outer Wrapper for Corner Brackets (No overflow-hidden) */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">

                  {/* Inner Image Container (handles clipping and border) */}
                  <div className="w-full h-full rounded-xl border border-gray-800 bg-surface/50 shadow-[0_0_20px_rgba(0,242,254,0.15)] overflow-hidden relative flex items-center justify-center group-hover/img:border-accent/40 transition-colors duration-300">
                    {imageError ? (
                      <span className="text-accent font-mono font-bold text-3xl">MAS</span>
                    ) : (
                      <img
                        src="/assets/me.jpg"
                        alt="Mike Angelo Salamat"
                        className="w-full h-full object-cover filter saturate-105 contrast-102 hover:scale-105 transition-transform duration-500"
                        onError={() => setImageError(true)}
                      />
                    )}
                    {/* Subtle scan grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2fe03_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe03_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none opacity-40"></div>
                  </div>

                  {/* Sci-fi Corner Brackets (Positioned outside the image border) */}
                  <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-accent/80 pointer-events-none group-hover/img:scale-110 group-hover/img:-translate-x-0.5 group-hover/img:-translate-y-0.5 transition-all duration-300"></div>
                  <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-accent/80 pointer-events-none group-hover/img:scale-110 group-hover/img:translate-x-0.5 group-hover/img:-translate-y-0.5 transition-all duration-300"></div>
                  <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-accent/80 pointer-events-none group-hover/img:scale-110 group-hover/img:-translate-x-0.5 group-hover/img:translate-y-0.5 transition-all duration-300"></div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-accent/80 pointer-events-none group-hover/img:scale-110 group-hover/img:translate-x-0.5 group-hover/img:translate-y-0.5 transition-all duration-300"></div>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  Hello! I'm <strong className="text-white">Mike Angelo Salamat</strong>, a developer working at the intersection of <strong className="text-accent font-mono">Modern Web Development</strong> and <strong className="text-accent font-mono">Cybersecurity</strong>. Currently transitioning to my 3rd year, I am officially specializing in Cybersecurity with a keen interest in integrating AI threat intelligence into application design and defensive operations.
                </p>
                <p>
                  I believe that true security comes from understanding exactly how applications can be broken. By combining active web exploitation techniques with digital forensic auditing, I ensure full-stack web platforms are designed to resist attacks and trace anomalies seamlessly.
                </p>
              </div>
            </div>

            {/* Focus Card Column */}
            <div className="lg:col-span-5 bg-surface rounded-xl p-8 border border-gray-800">
              <h3 className="text-white text-xl font-bold mb-6 font-mono">Core Focus Pillars</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="p-2 rounded bg-accent/10 text-accent mt-1">
                    <Code size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Secure Web Development</h4>
                    <p className="text-sm text-gray-400 mt-1">Creating responsive client interfaces and performant API layers using React, Node.js, and cloud ecosystems like Supabase and Firebase.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 rounded bg-accent/10 text-accent mt-1">
                    <Database size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Defensive DevSecOps</h4>
                    <p className="text-sm text-gray-400 mt-1">Orchestrating containerized systems and cloud setups (AWS, Docker) with automated compliance and deployment guardrails.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 rounded bg-accent/10 text-accent mt-1">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Web Exploitation & Forensics</h4>
                    <p className="text-sm text-gray-400 mt-1">Identifying critical application flaws through active penetration testing, combined with deep digital forensics to investigate traffic anomalies and audit security breaches.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
