import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ isOpen, cert, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const { title, issuer, date, type, link, imageSrc, description } = cert || {};

  // Reset error state when modal opens or active certificate changes
  useEffect(() => {
    if (isOpen) {
      setImageError(false);
    }
  }, [isOpen, cert]);

  // Listen for Escape key press to close the modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md transition-all duration-300">
      
      {/* Clickable Backdrop overlay */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-surface border border-gray-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-glow-strong animate-[scaleUp_0.3s_ease-out] z-10">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="font-mono text-lg font-bold text-white truncate max-w-xs sm:max-w-md md:max-w-3xl">{title || 'Credential Detail View'}</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-accent hover:border-accent/40 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Modal Body: Split layout */}
        <div className="p-6 bg-background/50 overflow-y-auto flex-grow flex flex-col md:grid md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Image Container (takes 7 columns on desktop) */}
          <div className="w-full md:col-span-7 flex items-center justify-center bg-gray-950/60 p-4 rounded-xl border border-gray-800/80 min-h-[300px] h-full">
            {imageSrc && !imageError ? (
              <img 
                src={imageSrc} 
                alt={title || 'Credential preview'} 
                className="max-h-[50vh] max-w-full object-contain rounded shadow-2xl" 
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-center p-8 space-y-4">
                <div className="inline-flex p-3 rounded-full bg-accent/10 text-accent font-mono font-bold text-xl">MAS</div>
                <p className="text-gray-400 font-mono text-sm">Credential Document Placeholder</p>
                <p className="text-xs text-gray-500 max-w-md mx-auto">This represents the high-resolution certificate for {title}. Ready to connect with secure AWS S3, Cloudinary, or PDF routing pipelines in staging.</p>
              </div>
            )}
          </div>

          {/* Right Column: Metadata info panel (takes 5 columns on desktop) */}
          <div className="w-full md:col-span-5 flex flex-col justify-between h-full space-y-6 text-left">
            <div className="space-y-6">
              <span className="px-3 py-1 text-xs font-mono bg-accent/10 border border-accent/30 rounded-full text-accent w-fit block capitalize">
                {type === 'formal' 
                  ? 'Official Certification' 
                  : type === 'achievement' 
                    ? 'Official Achievement' 
                    : 'Cyber & Cloud Event'}
              </span>

              <div className="space-y-1">
                <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider">
                  {type === 'achievement' ? 'Achievement Name' : 'Credential Name'}
                </h4>
                <p className="text-xl font-bold text-white leading-tight">{title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider">
                    {type === 'achievement' ? 'Organizer / Body' : 'Issuer'}
                  </h4>
                  <p className="text-white font-medium text-base">{issuer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider">Date</h4>
                  <p className="text-white font-medium text-base">{date}</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-800 pt-4">
                <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider">Overview / Focus</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{description || 'No overview provided.'}</p>
              </div>
            </div>

            {link && (
              <div className="border-t border-gray-800 pt-6">
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-3 px-4 bg-accent text-background font-bold font-mono rounded-lg shadow-glow hover:shadow-glow-strong hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-sm text-center"
                >
                  {type === 'achievement' ? 'Verify Standing & Results' : 'Verify Online Credentials'} &rarr;
                </a>
              </div>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Extra scale animation styling */}
      <style>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ImageModal;
