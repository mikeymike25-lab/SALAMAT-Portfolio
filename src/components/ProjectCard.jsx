import React, { useState } from 'react';
import { ExternalLink, Download } from 'lucide-react';
import { Github } from './Icons';

const ProjectCard = ({ title, description, tags, repoLink, demoLink, downloadLink, imageSrc, imagePlaceholder }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="flex flex-col h-full bg-surface rounded-xl overflow-hidden border border-gray-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group">
      <div className="h-24 sm:h-36 md:h-48 bg-gray-900 w-full relative overflow-hidden flex items-center justify-center flex-shrink-0">
        {imageSrc && !imageError ? (
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="font-mono text-gray-700 text-xs sm:text-sm">{imagePlaceholder || 'Project Image'}</span>
        )}
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      
      <div className="p-3 sm:p-4 md:p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm sm:text-base md:text-xl font-bold mb-1 md:mb-2 text-white truncate">{title}</h3>
          <p className="text-gray-400 mb-3 md:mb-4 text-[11px] sm:text-xs md:text-sm line-clamp-2 md:line-clamp-3 leading-relaxed">{description}</p>
          
          <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
            {tags.map((tag, idx) => (
              <span key={idx} className="px-1.5 py-0.5 text-[9px] md:text-xs font-mono bg-background border border-gray-800 rounded text-accent">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-4 mt-auto border-t border-gray-800/40 pt-3 md:pt-4">
          {repoLink && (
            <a href={repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] md:text-sm text-gray-400 hover:text-accent transition-colors">
              <Github size={14} /> Code
            </a>
          )}
          {demoLink && (
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] md:text-sm text-gray-400 hover:text-accent transition-colors">
              <ExternalLink size={14} /> Live
            </a>
          )}
          {downloadLink && (
            <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] md:text-sm text-gray-400 hover:text-accent transition-colors">
              <Download size={14} /> Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
