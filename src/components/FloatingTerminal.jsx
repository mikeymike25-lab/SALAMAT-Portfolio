import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X } from 'lucide-react';

const FloatingTerminal = ({ history, executeCommand, showIcon, isOpen, setIsOpen, promptPrefix, placeholder, currentDir }) => {
  const [inputVal, setInputVal] = useState('');
  const historyContainerRef = useRef(null);
  
  // Real-time calculated transform coordinates to dock exactly into the Hero terminal card
  const [closedTransform, setClosedTransform] = useState({ x: -250, y: -550, scale: 0.1 });

  // Auto-scroll the popup history internally on changes
  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Dynamically calculate the precise X/Y offset and scale factor relative to the Hero terminal on screen
  useEffect(() => {
    const calculateOffset = () => {
      const heroTerminal = document.getElementById('hero-terminal');
      if (heroTerminal) {
        const rect = heroTerminal.getBoundingClientRect();
        
        // Window measurements
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        
        // Popup resting parameters (bottom-6 right-6 -> 24px)
        const floatRight = winWidth - 24;
        const floatBottom = winHeight - 24;
        
        // Floating terminal width and height
        const floatWidth = 384; // sm:w-96 is 384px
        const floatHeight = 420; // 420px
        
        // Handle responsive mobile width
        const isMobile = winWidth < 640;
        const activeWidth = isMobile ? 320 : floatWidth;
        
        // Floating terminal center resting position
        const floatX = floatRight - activeWidth;
        const floatY = floatBottom - floatHeight;
        
        const floatCenterX = floatX + activeWidth / 2;
        const floatCenterY = floatY + floatHeight / 2;
        
        // Hero terminal center target position
        const heroCenterX = rect.left + rect.width / 2;
        const heroCenterY = rect.top + rect.height / 2;
        
        // Offset difference
        const dx = heroCenterX - floatCenterX;
        const dy = heroCenterY - floatCenterY;
        
        // Scale difference
        const scale = rect.width / activeWidth;
        
        setClosedTransform({ x: dx, y: dy, scale: scale });
      }
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    window.addEventListener('scroll', calculateOffset);
    
    // Background polling interval to capture lazy layout adjustments
    const interval = setInterval(calculateOffset, 500);

    return () => {
      window.removeEventListener('resize', calculateOffset);
      window.removeEventListener('scroll', calculateOffset);
      clearInterval(interval);
    };
  }, [isOpen, showIcon]);

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      executeCommand('__CTRL_C__');
      setInputVal('');
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <>
      {/* Floating launcher trigger icon in lower right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 p-4 bg-accent text-background rounded-full shadow-glow hover:shadow-glow-strong hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer ${
          showIcon && !isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
        }`}
        aria-label="Open developer terminal"
      >
        <Terminal size={24} className="animate-pulse" />
      </button>

      {/* Terminal Popup Window Overlay */}
      <div 
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 h-[420px] bg-[#0A0D14] border border-gray-800 rounded-xl shadow-glow-strong overflow-hidden flex flex-col transition-all duration-500 ease-in-out origin-center pointer-events-none ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0'
        }`}
        style={{
          transform: isOpen 
            ? 'translate(0px, 0px) scale(1)' 
            : `translate(${closedTransform.x}px, ${closedTransform.y}px) scale(${closedTransform.scale})`
        }}
      >
        {/* Header bar */}
        <div className="bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsOpen(false)}></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 font-mono text-xs select-none">
            <Terminal size={12} /> mike@dev-env: {currentDir || '~'}
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-400 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* History Area */}
        <div 
          ref={historyContainerRef}
          className="flex-grow p-4 font-mono text-xs h-[300px] overflow-y-auto flex flex-col gap-1 select-text scroll-smooth"
        >
          {history.map((line, idx) => {
            let colorClass = 'text-gray-300';
            if (line.type === 'input') colorClass = 'text-accent';
            else if (line.type === 'error') colorClass = 'text-red-500 font-semibold';

            return (
              <div 
                key={idx} 
                className={`${colorClass} whitespace-pre-wrap`}
              >
                {line.text}
              </div>
            );
          })}
        </div>

        {/* Input Console */}
        <div className="p-3 bg-background border-t border-gray-800 flex items-start gap-2">
          <span className="text-accent font-mono font-bold text-xs select-none whitespace-nowrap flex-shrink-0 pt-0.5">{promptPrefix || '$'}</span>
          <textarea 
            rows={Math.min(4, inputVal.split('\n').length || 1)}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none border-none p-0 focus:ring-0 resize-none h-auto min-h-[1.25rem] leading-normal scrollbar-none"
            placeholder={placeholder || "Type 'help' or commands..."}
          />
        </div>
      </div>
    </>
  );
};

export default FloatingTerminal;
