import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = ({ onAskSylphy }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-background/80 border-b border-gray-800 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="font-mono text-xl font-bold text-white tracking-tighter">
              <span className="text-accent">&lt;</span>sylphy-dev<span className="text-accent">/&gt;</span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <nav className="flex items-center space-x-8">
              <a href="#about" className="text-sm font-mono text-gray-300 hover:text-accent transition-colors">
                About
              </a>
              <a href="#skills" className="text-sm font-mono text-gray-300 hover:text-accent transition-colors">
                Skills
              </a>
              <a href="#projects" className="text-sm font-mono text-gray-300 hover:text-accent transition-colors">
                Projects
              </a>
              
              {/* Experience Dropdown */}
              <div 
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 text-sm font-mono text-gray-300 hover:text-accent transition-colors focus:outline-none cursor-pointer py-2"
                >
                  Experience
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-accent' : ''}`} />
                </button>
                
                {/* Dropdown Menu Bridge Wrapper (fixes the gap-hover close issue) */}
                <div className={`absolute top-full right-0 pt-2 w-56 transition-all duration-300 origin-top-right z-50 ${isDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="rounded-lg bg-background/95 border border-gray-800 backdrop-blur-md shadow-2xl py-2 overflow-hidden">
                    <a 
                      href="#certifications" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-5 py-3 text-sm font-mono text-gray-400 hover:bg-accent/15 hover:text-accent transition-all duration-200"
                    >
                      Certifications
                    </a>
                    <a 
                      href="#milestones" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-5 py-3 text-sm font-mono text-gray-400 hover:bg-accent/15 hover:text-accent transition-all duration-200"
                    >
                      Milestones
                    </a>
                    <a 
                      href="#achievements" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-5 py-3 text-sm font-mono text-gray-400 hover:bg-accent/15 hover:text-accent transition-all duration-200"
                    >
                      Achievements
                    </a>
                  </div>
                </div>
              </div>

              <a href="#contact" className="text-sm font-mono text-gray-300 hover:text-accent transition-colors">
                Contact
              </a>
              
              <button 
                onClick={onAskSylphy} 
                className="px-5 py-2 text-sm font-mono text-background bg-accent rounded-md shadow-glow hover:shadow-glow-strong hover:-translate-y-0.5 transition-all duration-300 font-semibold cursor-pointer"
              >
                Ask Sylphy
              </button>
            </nav>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-accent cursor-pointer">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-gray-800 shadow-xl">
          <div className="px-6 py-6 space-y-5 flex flex-col">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-mono text-gray-300 hover:text-accent block">
              About
            </a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-sm font-mono text-gray-300 hover:text-accent block">
              Skills
            </a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-sm font-mono text-gray-300 hover:text-accent block">
              Projects
            </a>
            
            {/* Mobile Nested Group */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block border-b border-gray-800/40 pb-1">
                Experience
              </span>
              <div className="pl-4 space-y-3">
                <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="text-sm font-mono text-gray-400 hover:text-accent block">
                  Certifications
                </a>
                <a href="#milestones" onClick={() => setMobileMenuOpen(false)} className="text-sm font-mono text-gray-400 hover:text-accent block">
                  Milestones
                </a>
                <a href="#achievements" onClick={() => setMobileMenuOpen(false)} className="text-sm font-mono text-gray-400 hover:text-accent block">
                  Achievements
                </a>
              </div>
            </div>

            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-sm font-mono text-gray-300 hover:text-accent block">
              Contact
            </a>
            
            <button 
              onClick={(e) => {
                setMobileMenuOpen(false);
                onAskSylphy(e);
              }} 
              className="px-4 py-2.5 text-center text-sm font-mono text-background bg-accent rounded-md font-semibold mt-4 block w-full cursor-pointer"
            >
              Ask Sylphy
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

