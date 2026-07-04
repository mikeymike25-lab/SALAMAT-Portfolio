import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Milestones from './sections/Milestones';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import FloatingTerminal from './components/FloatingTerminal';
import { trackVisit, supabase } from './supabaseClient';
import { askAI } from './aiService';

const INITIAL_HISTORY = [
  { type: 'output', text: '// Profile schema loaded successfully.' },
  { type: 'output', text: 'const profile = {' },
  { type: 'output', text: '  "developer": "Mike Angelo Salamat",' },
  { type: 'output', text: '  "role": "Full-Stack Developer & Cybersecurity Enthusiast",' },
  { type: 'output', text: '  "focus": ["Web Development", "Web Exploitation", "Forensics"],' },
  { type: 'output', text: '  "technologies": ["Antigravity", "Gemini CLI", "VS Code", "Figma", "Stitch", "Firebase", "Supabase", "SQL"]' },
  { type: 'output', text: '};' },
  { type: 'output', text: '' },
  { type: 'output', text: 'you can use "sylphy-ai" to chat with my AI assistant about my profile.' }
];

const indexableContent = [
  { section: 'About', text: 'Mike Angelo Salamat is a specialized developer working at the intersection of Modern Web Development and Cybersecurity.' },
  { section: 'About', text: 'I believe true security comes from understanding exactly how applications can be broken. By combining active web exploitation techniques with digital forensic auditing, I ensure full-stack web platforms are designed to resist attacks and trace anomalies.' },
  { section: 'Skills', text: 'Frontend Engineering: React, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5, Next.js, Vite.' },
  { section: 'Skills', text: 'Backend Architecture: Node.js, Express, Python, Java, RESTful APIs, GraphQL.' },
  { section: 'Skills', text: 'Database Systems: Supabase, Firebase, MySQL.' },
  { section: 'Skills', text: 'Tools & Security: Git/GitHub, Web Exploitation, Digital Forensics, Docker, Claude AI, Agentic AI Workflows, Gemini CLI / Antigravity, Linux (Kali).' },
  { section: 'Projects', text: 'Csec - An anti-phishing app with 4-tier architecture, Gemini AI chatbot integrations, and AI verdicts.' },
  { section: 'Projects', text: 'DevDash - A 2D Python learning adventure game where players collide with mobs to answer programming questions and defeat bosses.' },
  { section: 'Projects', text: 'M&M Gallery - A private web app for photo storage, virtual letters, and an integrated messenger chat interface.' },
  { section: 'Certifications', text: 'AWS AI Practitioner Challenge, Udacity formal certificate (Jun 2026).' },
  { section: 'Certifications', text: 'Red vs. Blue Attack & Defense Event, Cyber Defense Simulation workshop certificate (Nov 2025).' },
  { section: 'Certifications', text: 'AWS Student re:Invent Event, Amazon Web Services recap event certificate (Dec 2025).' },
  { section: 'Achievements', text: 'Incoming Front-End AI Engineering Intern - FlyRank AI: Will be designing and building high-performance frontend interfaces integrated with AI autopilot systems (Incoming June 2026).' },
  { section: 'Achievements', text: 'Incoming Auditor Officer - JISSA (Junior Information Systems Security Association) for SY 2026 - 2027.' },
  { section: 'Achievements', text: 'Academic Phase - Hidden Investigations: Currently studying advanced digital forensics, threat auditing, and web exploitation pathways in preparation to become an official CTF player for the team.' },
  { section: 'Achievements', text: 'Core Member - ALOA engineering and security team (Currently).' },
  { section: 'Achievements', text: 'Partnership Officer - JISSA corporate and tech workshop panels (SY 2025 - 2026 (2nd Sem)).' }
];

function App() {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [showFloatingIcon, setShowFloatingIcon] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const isNavigatingRef = useRef(false);
  const scrollEndTimerRef = useRef(null);
  const [visitorCount, setVisitorCount] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [cooldownEnd, setCooldownEnd] = useState(null);

  const [currentDir, setCurrentDir] = useState('~');
  const promptPrefix = activeSession === 'sylphy' ? 'sylphy-ai >' : `${currentDir} $`;
  const promptPlaceholder = activeSession === 'sylphy'
    ? "Ask Sylphy anything... (Type 'exit' to quit)"
    : "Type 'help', 'sylphy-ai' or commands...";

  useEffect(() => {
    let active = true;
    const fetchCount = async () => {
      const count = await trackVisit();
      if (active && count !== null) {
        setVisitorCount(count);
      }
    };
    fetchCount();
    return () => { active = false; };
  }, []);

  // Controlled visibility state for the top-level Hero terminal (enables the merging illusion)
  const [hideHeroTerminal, setHideHeroTerminal] = useState(false);

  // Monitor scroll height to show/hide the floating terminal icon
  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY <= 300;
      setShowFloatingIcon(!atTop);

      if (isNavigatingRef.current) {
        // Debounce: keep isNavigatingRef.current = true as long as scrolling events are active
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current);
        }
        scrollEndTimerRef.current = setTimeout(() => {
          isNavigatingRef.current = false;
        }, 150); // 150ms after the last scroll event, release the navigation lock
        return;
      }

      // If the recruiter scrolls back to the top of the page, close the floating terminal
      if (atTop && isTerminalOpen) {
        setIsTerminalOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [isTerminalOpen]);

  // Handle the merging/docking illusion transition timer
  useEffect(() => {
    if (isTerminalOpen) {
      // If the floating terminal overlay is open, hide the top-level Hero terminal completely
      setHideHeroTerminal(true);
    } else {
      // When closing, wait exactly 500ms (matching the flight transition duration)
      // to let the popup fly up and land on top of the original terminal container,
      // then make the top-level Hero terminal visible again
      const timer = setTimeout(() => {
        setHideHeroTerminal(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTerminalOpen]);

  const triggerNavigationScroll = (targetId, path) => {
    isNavigatingRef.current = true;
    setIsTerminalOpen(true);
    if (path) setCurrentDir(path);

    // Set a safety fallback timer of 3 seconds. If scroll doesn't happen or gets stuck, release lock.
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }
    scrollEndTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 3000);

    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const executeCommand = (cmdText) => {
    const command = cmdText.trim();
    let commandLower = command.toLowerCase();

    // AI Session interception
    if (activeSession === 'sylphy') {
      const isExit = commandLower === 'exit' || commandLower === 'quit' || commandLower === 'ctrl c' || commandLower === '__ctrl_c__';
      
      if (isExit) {
        setHistory((prev) => [
          ...prev,
          { type: 'input', text: `${promptPrefix} ${cmdText}` },
          { type: 'output', text: '^C' },
          { type: 'output', text: 'Exiting Sylphy AI session... returning to guest terminal.' }
        ]);
        setActiveSession(null);
        setChatHistory([]);
        return;
      }

      if (command === '') return;

      // Check if they are currently in cooldown
      if (cooldownEnd && Date.now() < cooldownEnd) {
        const secondsLeft = Math.ceil((cooldownEnd - Date.now()) / 1000);
        setHistory((prev) => [
          ...prev,
          { type: 'input', text: `${promptPrefix} ${cmdText}` },
          { type: 'error', text: `[Sylphy AI Error]: Rate limit exceeded. Please try again in ${secondsLeft} seconds.` }
        ]);
        return;
      }

      // If cooldown exists but has expired, reset it
      if (cooldownEnd && Date.now() >= cooldownEnd) {
        setCooldownEnd(null);
        setChatHistory([]);
      }

      const questionCount = chatHistory.filter(h => h.role === 'user').length;
      if (questionCount >= 10) {
        const expiry = Date.now() + 2 * 60 * 1000; // 2 minutes from now
        setCooldownEnd(expiry);
        setHistory((prev) => [
          ...prev,
          { type: 'input', text: `${promptPrefix} ${cmdText}` },
          { type: 'error', text: "[Sylphy AI Error]: Rate limit exceeded. Please try again in 120 seconds." }
        ]);
        return;
      }

      // Log input and thinking status
      setHistory((prev) => [
        ...prev,
        { type: 'input', text: `${promptPrefix} ${cmdText}` },
        { type: 'output', text: '[Sylphy AI]: Thinking...' }
      ]);

      const updatedChatHistory = [
        ...chatHistory,
        { role: 'user', parts: [{ text: command }] }
      ];

      askAI(updatedChatHistory).then((reply) => {
        let cleanReply = reply;
        let scrollTarget = null;

        // Parse scroll metadata tag from AI (e.g. [scroll:projects])
        const scrollMatch = reply.match(/\[scroll:([a-z]+)\]/i);
        if (scrollMatch) {
          scrollTarget = scrollMatch[1].toLowerCase();
          cleanReply = reply.replace(/\[scroll:[a-z]+\]/i, '').trim();
        }

        const replyLower = cleanReply.toLowerCase();
        const isErr = replyLower.includes('error') || replyLower.includes('rate limit') || replyLower.includes('failed');
        
        setHistory((prev) => {
          const newHist = [...prev];
          const index = newHist.findLastIndex(h => h.type === 'output' && h.text === '[Sylphy AI]: Thinking...');
          const lineType = isErr ? 'error' : 'output';
          const lineText = isErr ? cleanReply : `[Sylphy AI]: ${cleanReply}`;
          
          if (index !== -1) {
            newHist[index] = { type: lineType, text: lineText };
          } else {
            newHist.push({ type: lineType, text: lineText });
          }
          return newHist;
        });

        // Update chat history in a single batch with clean text
        setChatHistory((prev) => [
          ...prev,
          { role: 'user', parts: [{ text: command }] },
          { role: 'model', parts: [{ text: cleanReply }] }
        ]);

        // Trigger smooth scroll if a target section was specified
        if (scrollTarget) {
          const dirMap = {
            'about': '~/about',
            'skills': '~/skills',
            'projects': '~/projects',
            'certifications': '~/certifications',
            'milestones': '~/milestones',
            'achievements': '~/achievements',
            'contact': '~/contact'
          };
          triggerNavigationScroll(scrollTarget, dirMap[scrollTarget] || `~/${scrollTarget}`);
        }
      });
      return;
    }

    // Check if the command is a "cd" command and preprocess it
    let isCd = false;
    let cdTarget = '';

    if (commandLower.startsWith('cd')) {
      isCd = true;
      cdTarget = commandLower.substring(2).trim();

      // Clean up slashes
      if (cdTarget.startsWith('/')) {
        cdTarget = cdTarget.substring(1).trim();
      }

      // Map targets to base commands
      if (cdTarget === 'about') commandLower = 'about';
      else if (cdTarget === 'skills') commandLower = 'skills';
      else if (cdTarget === 'projects') commandLower = 'projects';
      else if (cdTarget === 'certifications' || cdTarget === 'events') commandLower = 'certifications';
      else if (cdTarget === 'timeline' || cdTarget === 'milestones') commandLower = 'milestones';
      else if (cdTarget === 'achievements') commandLower = 'achievements';
      else if (cdTarget === 'contact') commandLower = 'contact';
      else if (cdTarget === '' || cdTarget === '~' || cdTarget === '..') commandLower = 'home';
    }

    const newHistory = [...history, { type: 'input', text: `${promptPrefix} ${cmdText}` }];

    if (commandLower === 'help') {
      newHistory.push(
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">cd about</span>{"        - Change directory and scroll to About Me"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">cd skills</span>{"       - Change directory and scroll to Skills"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">cd projects</span>{"     - Change directory and scroll to Projects"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">cd milestones</span>{"   - Change directory and scroll to Milestones"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">cd achievements</span>{" - Change directory and scroll to Achievements"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">cd contact</span>{"      - Change directory and scroll to Contact Form"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">cd ~</span>{"            - Return to the top of the website (home)"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">sylphy-ai</span>{"     - Start interactive AI chat session (about Mike)"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">grep "word"</span>{"     - Search entire website for keyword in quotes"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">whoami</span>{"          - Display active guest session info"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">sysinfo</span>{"         - Inspect core system modules and metrics"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">visits</span>{"          - View recent website visitor logs"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">sudo {"<cmd>"}</span>{"       - Execute command with root privileges"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">date</span>{"           - View live server timestamp"}</span> },
        { type: 'output', text: <span>{"  "}<span className="text-accent font-bold">clear</span>{"          - Clear terminal console screen"}</span> }
      );
    } else if (commandLower === 'about') {
      newHistory.push(
        { type: 'output', text: 'Mike Angelo Salamat' },
        { type: 'output', text: 'Role: Full-Stack Developer & Cybersecurity Enthusiast' },
        { type: 'output', text: 'Specialties: Web Exploitation & Forensics' },
        { type: 'output', text: 'Status: Changing directory to /about...' }
      );
      triggerNavigationScroll('about', '~/about');
    } else if (commandLower === 'skills') {
      newHistory.push(
        { type: 'output', text: 'Frontend: React, TypeScript, Tailwind' },
        { type: 'output', text: 'Backend: Node.js, Express, APIs' },
        { type: 'output', text: 'Databases: Supabase, Firebase, MySQL' },
        { type: 'output', text: 'Cybersecurity: Web Exploitation, Forensics, Kali, OWASP' },
        { type: 'output', text: 'Status: Changing directory to /skills...' }
      );
      triggerNavigationScroll('skills', '~/skills');
    } else if (commandLower === 'projects') {
      newHistory.push(
        { type: 'output', text: '1. Csec - Anti-Phishing 4-Tier & Gemini AI App' },
        { type: 'output', text: '2. DevDash - 2D Python Educational Adventure Game' },
        { type: 'output', text: '3. M&M Gallery - Private Photobooth Storage & Chat App' },
        { type: 'output', text: 'Status: Changing directory to /projects...' }
      );
      triggerNavigationScroll('projects', '~/projects');
    } else if (commandLower === 'certifications' || commandLower === 'events') {
      newHistory.push(
        { type: 'output', text: 'Official Certifications:' },
        { type: 'output', text: '  - AWS AI Practitioner Challenge' },
        { type: 'output', text: 'Cyber & Cloud Events:' },
        { type: 'output', text: '  - Red vs. Blue Attack & Defense Event' },
        { type: 'output', text: '  - AWS Student re:Invent Event' },
        { type: 'output', text: 'Status: Changing directory to /certifications...' }
      );
      triggerNavigationScroll('certifications', '~/certifications');
    } else if (commandLower === 'timeline' || commandLower === 'milestones') {
      newHistory.push(
        { type: 'output', text: 'Academic & Professional Milestones:' },
        { type: 'output', text: '  Incoming (June 2026): Front-End AI Engineering Intern - FlyRank AI' },
        { type: 'output', text: '  Incoming (SY 2026-2027): Auditor Officer - JISSA' },
        { type: 'output', text: '  Currently: Academic Phase - Hidden Investigations' },
        { type: 'output', text: '  Currently: Core Member - ALOA' },
        { type: 'output', text: '  SY 2025-2026 (2nd Sem): Partnership Officer - JISSA' },
        { type: 'output', text: '  SY 2025-2026: Full-Stack Dev & Cloud Discovery (2nd Year)' },
        { type: 'output', text: '  SY 2024-2025: Foundational Study & Resilience (1st Year)' },
        { type: 'output', text: 'Status: Changing directory to /milestones...' }
      );
      triggerNavigationScroll('milestones', '~/milestones');
    } else if (commandLower === 'achievements') {
      newHistory.push(
        { type: 'output', text: 'Highlighted Achievements:' },
        { type: 'output', text: '  - Team Speaker (ALOA)' },
        { type: 'output', text: '  - CTF & Hackathon Competitor' },
        { type: 'output', text: '  - JISSA Executive Auditor' },
        { type: 'output', text: '  - Partnership Officer (JISSA)' },
        { type: 'output', text: 'Status: Changing directory to /achievements...' }
      );
      triggerNavigationScroll('achievements', '~/achievements');
    } else if (commandLower === 'contact') {
      newHistory.push(
        { type: 'output', text: 'Contact Information:' },
        { type: 'output', text: '  Email: mikesalamat72@gmail.com' },
        { type: 'output', text: '  LinkedIn: https://www.linkedin.com/in/mike-angelo-salamat-2351063a6/' },
        { type: 'output', text: '  GitHub: https://github.com/mikeymike25-lab' },
        { type: 'output', text: 'Status: Changing directory to /contact...' }
      );
      triggerNavigationScroll('contact', '~/contact');
    } else if (commandLower === 'home') {
      setCurrentDir('~');
      newHistory.push(
        { type: 'output', text: 'Status: Returning to home console (~)...' }
      );
      setIsTerminalOpen(false); // Explicitly close when returning home to trigger flight animation immediately
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    } else if (commandLower.startsWith('grep')) {
      const matchQuotes = command.match(/grep\s+["'](.+)["']/i);

      if (!matchQuotes) {
        newHistory.push({ type: 'error', text: 'Usage: grep "keyword" (e.g. grep "react" or grep "forensics")' });
      } else {
        const query = matchQuotes[1].toLowerCase().trim();
        const matches = indexableContent.filter(item => item.text.toLowerCase().includes(query));

        if (matches.length === 0) {
          newHistory.push({ type: 'error', text: `grep: no matches found for "${query}"` });
        } else {
          newHistory.push({ type: 'output', text: `Found ${matches.length} matching lines for "${query}":` });
          matches.forEach(match => {
            newHistory.push({
              type: 'output',
              text: `  [${match.section}] ${match.text}`
            });
          });
        }
      }
    } else if (commandLower === 'whoami') {
      newHistory.push(
        { type: 'output', text: 'guest@mike-portfolio-shell:~$' },
        { type: 'output', text: 'Role: Recruiter / Technical Guest' },
        { type: 'output', text: 'Privileges: Read-Only Authorization' },
        { type: 'output', text: `Session Count: You are secure visitor #${visitorCount !== null ? visitorCount.toLocaleString() : 'loading...'}` },
        { type: 'output', text: 'IP Status: Connected via secure WebSocket' }
      );
    } else if (commandLower === 'sysinfo') {
      newHistory.push(
        { type: 'output', text: 'OS: Antigravity Agentic OS v3.6' },
        { type: 'output', text: 'Uptime: 99.997%' },
        { type: 'output', text: 'Node: MikeAngeloSalamat-Core' },
        { type: 'output', text: 'Active Modules: [Web-Exploitation-Engine] [Forensics-Auditing-Stack]' },
        { type: 'output', text: `Visitor Stats: ${visitorCount !== null ? `${visitorCount.toLocaleString()} unique secure sessions` : 'fetching visitor telemetry...'}` },
        { type: 'output', text: 'Memory: Stable | Heap Size: 42.8 MB' }
      );
    } else if (commandLower.startsWith('sudo')) {
      newHistory.push(
        { type: 'error', text: 'Access Denied: Recruiter account is not in the sudoers file.' },
        { type: 'error', text: 'This incident has been logged in the portfolio forensic logs. 😉' }
      );
    } else if (commandLower === 'date') {
      newHistory.push({ type: 'output', text: `Live Server Time: ${new Date().toLocaleString()}` });
    } else if (commandLower === 'visits' || commandLower === 'logs') {
      newHistory.push({ type: 'output', text: 'Fetching recent visitor logs...' });
      setHistory(newHistory);

      const displayVisits = (visitsList) => {
        if (!visitsList || visitsList.length === 0) {
          setHistory(prev => [...prev, { type: 'output', text: 'No visitor logs recorded yet.' }]);
          return;
        }

        const lines = [
          { type: 'output', text: 'Recent Visitors (Newest First):' }
        ];

        visitsList.forEach((v, index) => {
          const dateObj = new Date(v.visited_at);
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });

          const dType = v.device_type || v.dev_type || 'Unknown';
          const dModel = v.device_model || v.dev_model || 'Unknown';

          lines.push({
            type: 'output',
            text: `  ${index + 1}. ${formattedDate} - ${dType} (${v.browser_name || 'Unknown'}) | OS: ${v.os_name || 'Unknown'} | Model: ${dModel}`
          });
        });

        setHistory(prev => [...prev, ...lines]);
      };

      if (!supabase) {
        // Mock fallback for local dev
        setTimeout(() => {
          displayVisits([
            { visited_at: new Date().toISOString(), dev_type: 'Mobile', browser_name: 'Brave', os_name: 'iOS', dev_model: 'iPhone' },
            { visited_at: new Date(Date.now() - 3600000).toISOString(), dev_type: 'Desktop', browser_name: 'Chrome', os_name: 'Windows', dev_model: 'PC' },
            { visited_at: new Date(Date.now() - 7200000).toISOString(), dev_type: 'Desktop', browser_name: 'Firefox', os_name: 'Linux', dev_model: 'Linux PC' }
          ]);
        }, 600);
      } else {
        // Fetch from RPC
        supabase.rpc('get_recent_visits', { limit_val: 10 }).then(({ data, error }) => {
          if (error) {
            // Fallback: direct table query
            supabase.from('visits').select('*').order('visited_at', { ascending: false }).limit(10).then(({ data: tableData, error: tableError }) => {
              if (tableError) {
                setHistory(prev => [
                  ...prev,
                  { type: 'error', text: `Failed to load logs: ${tableError.message}` },
                  { type: 'output', text: 'Tip: Create the public.get_recent_visits RPC function in your Supabase Editor to read safely.' }
                ]);
              } else {
                displayVisits(tableData);
              }
            });
          } else {
            displayVisits(data);
          }
        });
      }
      return;
    } else if (commandLower === 'sylphy ai' || commandLower === 'sylphy-ai') {
      newHistory.push(
        { type: 'output', text: 'Initializing Sylphy AI Session...' },
        { type: 'output', text: 'Connection established with Sylphy AI Core.' },
        { type: 'output', text: 'Sylphy is ready. Type your query or "exit" to quit.' }
      );
      setHistory(newHistory);
      setActiveSession('sylphy');
      setChatHistory([]);
      return;
    } else if (isCd) {
      newHistory.push({ type: 'error', text: `cd: no such file or directory: ${cdTarget}` });
    } else if (commandLower === 'clear') {
      setHistory(INITIAL_HISTORY);
      return;
    } else if (commandLower === '') {
      return;
    } else {
      newHistory.push({ type: 'error', text: `Command not found: "${cmdText}". Type "help" to see available options.` });
    }

    setHistory(newHistory);
  };

  const handleAskSylphyClick = (e) => {
    e.preventDefault();

    // 1. Determine if we are scrolled down
    const atTop = window.scrollY <= 300;
    if (atTop) {
      // Scroll to hero terminal smoothly
      document.getElementById('hero-terminal')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Open floating terminal
      setIsTerminalOpen(true);
    }

    // 2. Initialize the Sylphy AI session directly
    setHistory((prev) => [
      ...prev,
      { type: 'input', text: 'guest > ask-sylphy' },
      { type: 'output', text: 'Initializing Sylphy AI Session...' },
      { type: 'output', text: 'Connection established with Sylphy AI Neural Core.' },
      { type: 'output', text: 'Sylphy is ready. Ask me anything about Mike, or type "exit" to return to standard shell.' }
    ]);
    setActiveSession('sylphy');
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen bg-background text-gray-200">
      <Navbar onAskSylphy={handleAskSylphyClick} />

      <main>
        <Hero
          history={history}
          executeCommand={executeCommand}
          hideTerminal={hideHeroTerminal}
          visitorCount={visitorCount}
          promptPrefix={promptPrefix}
          placeholder={promptPlaceholder}
          currentDir={currentDir}
        />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Milestones />
        <Achievements />
        <Contact />
      </main>

      <Footer visitorCount={visitorCount} />

      {/* Floating terminal portal synced with top shell */}
      <FloatingTerminal
        history={history}
        executeCommand={executeCommand}
        showIcon={showFloatingIcon}
        isOpen={isTerminalOpen}
        setIsOpen={setIsTerminalOpen}
        promptPrefix={promptPrefix}
        placeholder={promptPlaceholder}
        currentDir={currentDir}
      />
    </div>
  );
}

export default App;
