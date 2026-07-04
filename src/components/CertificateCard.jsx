import React, { useState } from 'react';
import { Award, Calendar, ShieldCheck } from 'lucide-react';

const CertificateCard = ({ title, issuer, date, type, link, imageSrc, description, onViewImage }) => {
  const [imageError, setImageError] = useState(false);
  const isFormal = type === 'formal';
  
  return (
    <div className={`p-3 sm:p-4 md:p-6 rounded-xl border ${isFormal ? 'bg-surface border-accent/30 shadow-glow' : 'bg-surface/50 border-gray-800 hover:border-gray-600'} transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between h-full`}>
      <div>
        {isFormal && <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 blur-2xl rounded-full"></div>}
        
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className={`p-2 md:p-3 rounded-lg ${isFormal ? 'bg-accent/10 text-accent' : 'bg-gray-800 text-gray-400'}`}>
            {isFormal ? <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" /> : <Award className="w-5 h-5 md:w-6 md:h-6" />}
          </div>
          <span className="font-mono text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
            <Calendar size={10} className="md:w-3 md:h-3" /> {date}
          </span>
        </div>
        
        {/* Certificate/Event Image Preview Thumbnail */}
        {imageSrc && !imageError && (
          <div className="mb-3 md:mb-4 rounded-lg overflow-hidden border border-gray-800/80 relative bg-gray-900/40">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        <h4 className="text-xs sm:text-sm md:text-lg font-bold text-white mb-0.5 md:mb-1 line-clamp-2">{title}</h4>
        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-3 md:mb-4">{issuer}</p>
      </div>
      
      <div className="flex flex-wrap gap-2 md:gap-3 items-center mt-auto border-t border-gray-800/50 pt-3 md:pt-4">
        {onViewImage && (
          <button 
            onClick={() => onViewImage({ title, issuer, date, type, link, imageSrc, description })}
            className="text-[10px] md:text-xs font-mono px-2 py-1 md:px-3 md:py-1.5 rounded bg-accent/10 hover:bg-accent/20 text-accent hover:text-white transition-all duration-300"
          >
            View Credential
          </button>
        )}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className={`text-[10px] md:text-xs font-mono flex items-center gap-1 w-max ${isFormal ? 'text-accent hover:text-white' : 'text-gray-400 hover:text-gray-200'} transition-colors`}>
            Verify &rarr;
          </a>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;
