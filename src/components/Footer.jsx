import React from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const Footer = ({ visitorCount }) => {
  return (
    <footer className="border-t border-gray-800 bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="font-mono text-xl font-bold text-white tracking-tighter mb-2">
            <span className="text-accent">&lt;</span>sylphy-dev<span className="text-accent">/&gt;</span>
          </a>
          <p className="text-gray-500 text-sm">Building secure, scalable digital experiences.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/mikeymike25-lab" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/mike-angelo-salamat-2351063a6/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:mikesalamat72@gmail.com" className="text-gray-400 hover:text-accent transition-colors">
            <Mail size={20} />
          </a>
        </div>
        
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 text-center border-t border-gray-800/50 pt-8">
        <p className="text-gray-600 font-mono text-xs">
          &copy; {new Date().getFullYear()} Mike Angelo. All rights reserved.
        </p>
        <p className="text-gray-600 font-mono text-xs flex items-center justify-center gap-2 mt-2 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
          <span>
            {visitorCount !== null 
              ? `visitor_count: ${visitorCount.toLocaleString()}` 
              : 'loading_visitor_metrics...'}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;


