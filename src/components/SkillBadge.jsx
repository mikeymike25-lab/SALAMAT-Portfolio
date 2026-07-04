import React from 'react';

const SkillBadge = ({ skill, icon: Icon }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-surface/50 border border-gray-800 rounded-lg hover:border-accent hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      {Icon && <Icon size={18} className="text-accent" />}
      <span className="font-mono text-sm">{skill}</span>
    </div>
  );
};

export default SkillBadge;
