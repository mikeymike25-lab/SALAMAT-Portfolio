import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Projects = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  const projectData = [
    {
      title: "Csec",
      description: "An anti-phishing application utilizing a 4-tier architecture integrated with a Gemini chatbot. Uses Gemini AI models for threat intelligence and AI verdicts.",
      tags: ["Gemini AI", "4-Tier Architecture", "Anti-Phishing", "Cybersecurity"],
      repoLink: "https://github.com/mikeymike25-lab",
      demoLink: "https://example.com",
      imageSrc: "/assets/Csec.png",
      imagePlaceholder: "Csec App"
    },
    {
      title: "SylphySched",
      description: "An intelligent academic study planner featuring automated schedule parsing, timeline tracking, course note vaults, Spotify playback controls, and an integrated Gemini AI study assistant.",
      tags: ["React", "Tailwind CSS", "Firebase", "Gemini AI", "Spotify API"],
      repoLink: "https://github.com/mikeymike25-lab",
      demoLink: "https://sylphysched.vercel.app/",
      imageSrc: "/assets/SylphySched.png",
      imagePlaceholder: "SylphySched App"
    },
    {
      title: "DevDash",
      description: "A 2D Python learning adventure game. Players collide with mobs to solve programming questions, defeat bosses, and master Python basics.",
      tags: ["Python", "2D Game", "Game Dev", "Educational"],
      repoLink: "https://github.com/mikeymike25-lab",
      downloadLink: "https://drive.google.com/drive/folders/15h4vMVfFW_62UoWyTAa4BuoUxvE15rEL",
      imageSrc: "/assets/DevDash.png",
      imagePlaceholder: "DevDash Game"
    },
    {
      title: "M&M Gallery",
      description: "A private interactive web application featuring a digital photobooth storage gallery, virtual letters, and an integrated messenger chat interface.",
      tags: ["React", "Firebase", "Web App", "Tailwind CSS"],
      repoLink: "https://github.com/mikeymike25-lab",
      demoLink: "https://example.com",
      imageSrc: "/assets/MandMGallery.jpg",
      imagePlaceholder: "M&M Gallery"
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-accent font-mono text-2xl">03.</span> Featured Work
          <div className="h-px bg-gray-800 flex-grow ml-4 max-w-xs"></div>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
          {projectData.map((project, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
