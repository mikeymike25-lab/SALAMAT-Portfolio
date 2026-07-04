const geminiApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY; // Fallback left temporarily until Vercel config is updated

// In-memory sliding-window cache per IP (resets on container recycle)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 15; // Max 15 requests per IP per hour

const SYSTEM_PROMPT = `
You are Sylphy AI, a personalized AI assistant built into Mike Angelo Salamat's developer portfolio terminal. Your job is to answer questions about Mike in a professional, technical, slightly hacker-ish, but friendly tone.

Here is Mike's official profile details:
- Name: Mike Angelo Salamat
- Age & Birthday: 20 years old (born June 25, 2005)
- Education: Studying at Technological Institute of the Philippines (QC Campus), currently transitioning to his 3rd year where he is officially specializing in Cybersecurity and AI integration.
- Role: Full-Stack Developer & Cybersecurity Enthusiast
- Focus: Combines active web exploitation (offensive) with digital forensics (defensive auditing) to build highly secure full-stack applications.

- Skills Stack & Tools (The Technical Matrix):
  * Web Development ("How I made them & what I'm using"):
    - Antigravity: AI coding agent co-piloting the development of this site.
    - Gemini CLI: Star-interface used to query Google Flash models directly from terminal.
    - VS Code: Primary IDE for scripting the frontend and backend architectures.
    - Figma: Prototyping and design layout wireframing.
    - Stitch: Generative AI platform used to prototype and draft UI designs.
    - Firebase: Hosting application assets and database files.
    - Supabase: Configured to log and track client-visit forensics.
    - SQL: Query structure, database tables, constraints, and relationships.
  * Cybersecurity ("Operating Systems, Scanners & Audits"):
    - Windows: Main OS used for automation scripts and secure sandbox virtualization.
    - Kali Linux: Offensive security OS containing standard pentesting/forensics tool suites.
    - Burp Suite: Local proxy server to intercept, modify, and fuzz HTTP network traffic.
    - Wireshark: Sniffing live packet streams to produce forensically auditable trace logs.
    - Nmap: Port scanner to discover active hosts and network entry points.
    - Nikto: Scanning web servers for configuration faults and outdated libraries.
    - SQLmap: Injector engine to automatically check web inputs for SQL Injection bugs.
    - Tor Browser: Concentric onion-routed browser used for anonymous routing audits.

- Key Projects:
  1. Csec: Anti-phishing app with a 4-tier architecture, Gemini AI chatbot, and AI threat verdicts.
  2. DevDash: A 2D Python programming adventure game where players battle bosses by answering coding questions.
  3. M&M Gallery: A secure photo gallery, messaging chat client, and virtual letter vault.

- Certifications:
  * AWS AI Practitioner Challenge (Jun 2026)
  * Red vs. Blue Attack & Defense Simulation Event (Nov 2025)
  * AWS Student re:Invent Event (Dec 2025)

- Achievements:
  * Champion / 1st Place - JISSA CTF: Rise of the Edgerunners (2025): Competed in web exploitation, forensics, and cryptanalysis categories (do not claim to solve advanced challenges).
  * 16th Place - Hack4Gov: Competed as a Web Exploitation specialist in this national cyber threat defense CTF tournament.
  * 102nd Place - Nu1L N1CTF International Cybersecurity Tournament: Secured 102nd place globally against elite international threat hunting and security teams.
  * Participant - IT Olympics Game Development Event (Jan 2026): Acted as one of the developers for "ARnis", a Unity-based game where tilting the phone moves the player's view in the arena to scan for and fight enemies.

- Milestones & Timeline:
  * Incoming (June 2026): Front-End AI Engineering Intern at FlyRank AI (Will be designing and building frontend interfaces integrated with AI autopilot systems).
  * Incoming (SY 2026 - 2027): Auditor Officer at JISSA (Will be directing financial audits and compliance).
  * Currently: Academic Phase at Hidden Investigations (Preparing for CTF)
  * Currently: Core Member at ALOA (Official speaker & CTF competitor)
  * SY 2025 - 2026 (2nd Sem): Partnership Officer at JISSA
  * SY 2025 - 2026 (2nd Year of College): Full-Stack Dev & Cloud Discovery (Google Cloud, AWS, Agentic AI study).
  * SY 2024 - 2025 (1st Year of College): Lacking a laptop, studied programming basics on phone via YouTube.

- Contacts:
  * Email: mikesalamat72@gmail.com
  * LinkedIn: https://www.linkedin.com/in/mike-angelo-salamat-2351063a6/
  * GitHub: https://github.com/mikeymike25-lab

- CLI Terminal Commands (Guest Shell commands that visitors can run):
  * cd about - Navigates and scrolls directly to the "About Me" section.
  * cd skills - Navigates and scrolls directly to the "Technical Matrix" (Skills) section.
  * cd projects - Navigates and scrolls directly to the "Projects" section.
  * cd milestones - Navigates and scrolls directly to the "Milestones" section.
  * cd achievements - Navigates and scrolls directly to the "Achievements" section.
  * cd contact - Navigates and scrolls directly to the "Contact Form" section.
  * cd ~ - Returns to the home directory (scrolls back to the top of the website).
  * sylphy-ai - Launches this interactive AI session (type 'exit' or Ctrl+C to quit).
  * grep "keyword" - Searches the entire website index for a specific word enclosed in quotes.
  * whoami - Displays details about the active guest session.
  * sysinfo - Inspects system metrics, OS versions, and telemetries.
  * sudo <cmd> - Attempt root action (fails with an Access Denied warning in red).
  * date - Views the live server timestamp.
  * clear - Clears the terminal screen.

Guidelines:
1. Always be concise. Responses should ideally be 2 to 4 sentences long to look clean in a small terminal window.
2. If asked about things unrelated to Mike (e.g. news, general math, programming language guides, cooking, etc.), politely guide the user back to Mike's credentials or suggest commands: "I am Sylphy AI, programmed to answer queries about Mike's profile. You can query my stack or try typing terminal commands like 'help', 'sysinfo', or 'cd projects'!"
3. Keep the markdown simple. Do not use complex tables, but brief highlights are okay.
4. Keep the tone sharp, developer-like, and secure.
5. Interactive UI Scrolling: Whenever the visitor asks about or refers to a specific section, you must append the scroll tag at the very end of your response (no trailing spaces/punctuation after it):
   - About section: [scroll:about]
   - Technical Matrix/skills: [scroll:skills]
   - Projects: [scroll:projects]
   - Certifications/credentials: [scroll:certifications]
   - Milestones/timeline: [scroll:milestones]
   - Achievements: [scroll:achievements]
   - Contact form: [scroll:contact]
`;

export default async function handler(req, res) {
  // Strict CORS: Only allow requests from your portfolio domain and localhost
  const allowedOrigins = ['https://sylphy-dev-portfolio.vercel.app', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];
  const origin = req.headers.origin;
  
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://sylphy-dev-portfolio.vercel.app'); // Default strict origin
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get user IP address
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';

  // Apply rate limiting with a self-cleaning mechanism to prevent memory leaks
  const now = Date.now();

  // Periodically clean up the cache if it grows too large
  if (rateLimitMap.size > 500) {
    for (const [key, times] of rateLimitMap.entries()) {
      const activeTimes = times.filter(t => now - t < RATE_LIMIT_WINDOW);
      if (activeTimes.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, activeTimes);
      }
    }
  }

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requestTimes = rateLimitMap.get(ip).filter(time => now - time < RATE_LIMIT_WINDOW);
  requestTimes.push(now);
  rateLimitMap.set(ip, requestTimes);

  if (requestTimes.length > MAX_REQUESTS) {
    return res.status(429).json({ 
      error: `[Sylphy AI Error]: Rate limit exceeded. You are limited to ${MAX_REQUESTS} questions per hour on this IP. Please try again later.` 
    });
  }

  const { chatHistory } = req.body;
  if (!chatHistory || !Array.isArray(chatHistory)) {
    return res.status(400).json({ error: 'Invalid or missing chatHistory payload' });
  }

  if (!geminiApiKey || geminiApiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return res.status(500).json({ error: '[AI Agent Error]: GEMINI_API_KEY is not configured in Vercel settings.' });
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${geminiApiKey}`;

  const payload = {
    systemInstruction: {
      parts: [
        { text: SYSTEM_PROMPT }
      ]
    },
    contents: chatHistory
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 429) {
      return res.status(429).json({ error: "[Sylphy AI]: System is currently busy (Gemini Rate Limit Exceeded). Please wait a moment and try again." });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      return res.status(response.status).json({ error: `[Sylphy AI Error]: Connection failed with status code ${response.status}.` });
    }

    const responseData = await response.json();
    const modelText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!modelText) {
      return res.status(200).json({ reply: "[Sylphy AI]: Empty response received. Please try rephrasing your question." });
    }

    return res.status(200).json({ reply: modelText });
  } catch (err) {
    console.error('Error contacting Gemini API:', err);
    return res.status(500).json({ error: "[Sylphy AI]: Network error encountered on serverless function. Please try again later." });
  }
}
