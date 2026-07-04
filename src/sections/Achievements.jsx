import React, { useState } from 'react';
import { Trophy, ShieldAlert, Users } from 'lucide-react';
import ImageModal from '../components/ImageModal';

const AchievementCard = ({ title, subtitle, icon: Icon, description, imageSrc, detailImageSrc, date, issuer, onViewImage }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-surface rounded-xl p-3 sm:p-4 md:p-5 border border-gray-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group text-left flex flex-col justify-between h-full">
      <div className="space-y-2.5 md:space-y-4">
        {/* Achievement Image Preview Thumbnail */}
        {imageSrc && !imageError ? (
          <div className="h-20 sm:h-28 md:h-36 w-full bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center relative">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="h-20 sm:h-28 md:h-36 w-full bg-gray-900/80 border border-gray-800/80 rounded-lg overflow-hidden flex items-center justify-center relative">
            <span className="font-mono text-[9px] md:text-xs text-gray-600">Achievement Badge</span>
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-1.5 md:p-2.5 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <Icon className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm md:text-lg font-bold text-white group-hover:text-accent transition-colors leading-tight truncate">{title}</h3>
            <h4 className="text-[9px] sm:text-[10px] md:text-xs font-mono text-gray-400 mt-0.5 truncate">{subtitle}</h4>
          </div>
        </div>

        <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm leading-relaxed pt-2 border-t border-gray-800/40 line-clamp-3 md:line-clamp-none">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3 items-center mt-3 md:mt-4 border-t border-gray-800/50 pt-3 md:pt-4">
        {onViewImage && (
          <button 
            onClick={() => onViewImage({ 
              title, 
              issuer: issuer || `${title} - ${subtitle}`, 
              date, 
              type: 'achievement', 
              imageSrc: detailImageSrc || imageSrc, 
              description 
            })}
            className="text-[10px] md:text-xs font-mono px-2 py-1 md:px-3 md:py-1.5 rounded bg-accent/10 hover:bg-accent/20 text-accent hover:text-white transition-all duration-300"
          >
            View Info
          </button>
        )}
      </div>
    </div>
  );
};

const Achievements = () => {
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewAchievement = (achievement) => {
    setActiveAchievement(achievement);
    setIsModalOpen(true);
  };

  const highlights = [
    {
      title: "JISSA CTF: Rise of the Edgerunners",
      subtitle: "Champion (1st Place)",
      icon: Trophy,
      description: "Placed 1st and crowned Champion in the JISSA Capture The Flag: Rise of the Edgerunners cybersecurity tournament, competing in web exploitation, forensics, and cryptanalysis categories.",
      imageSrc: "/assets/JISSA.png",
      detailImageSrc: "/assets/JissaCTF2.jpg",
      issuer: "JISSA",
      date: "Nov 2025"
    },
    {
      title: "Hack4Gov",
      subtitle: "16th Place",
      icon: ShieldAlert,
      description: "Competed as a Web Exploitation specialist in the Hack4Gov national cyber threat defense CTF tournament, placing 16th overall among top competing institutions.",
      imageSrc: "/assets/Hac4Gov1.jpg",
      detailImageSrc: "/assets/Hac4Gov.jpg",
      issuer: "DICT (Department of Info & Communications Tech)",
      date: "Oct 2025"
    },
    {
      title: "N1CTF",
      subtitle: "102nd Place",
      icon: Trophy,
      description: "Participated in the prestigious N1CTF international cybersecurity tournament, securing 102nd place globally against elite international security and threat analysis teams.",
      imageSrc: "/assets/N1CTF.png",
      issuer: "Nu1L CTF Organizers",
      date: "Nov 2025"
    },
    {
      title: "IT Olympics",
      subtitle: "Game Dev Participant",
      icon: Users,
      description: "Acted as one of the developers of 'ARnis', a Unity-based game created for the IT Olympics. The game utilizes phone tilt/gyro controls to dynamically move the player's view to find and fight enemies in the arena.",
      imageSrc: "/assets/ITOlympics1.jpg",
      detailImageSrc: "/assets/ITOlympics.jpg",
      issuer: "IT Olympics Executive Panel",
      date: "Jan 2026"
    }
  ];

  return (
    <section id="achievements" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
          <span className="text-accent font-mono text-2xl">06.</span> Highlighted Achievements
          <div className="h-px bg-gray-800 flex-grow ml-4 max-w-xs"></div>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
          {highlights.map((item, idx) => (
            <AchievementCard key={idx} {...item} onViewImage={handleViewAchievement} />
          ))}
        </div>
      </div>

      {/* Interactive modal for detail view */}
      <ImageModal 
        isOpen={isModalOpen}
        cert={activeAchievement}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Achievements;
