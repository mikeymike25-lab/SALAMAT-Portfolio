import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    try {
      // We are using Web3Forms, a free static form handler. 
      // You can get a free Access Key instantly by entering your email at: https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "5a00a0d7-85fb-4f7d-9b7a-42a261b19ca9", // <-- REPLACE THIS WITH YOUR FREE KEY
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: "Portfolio Site",
          ...formData
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-4 mb-4">
            <span className="text-accent font-mono text-2xl">07.</span> Get In Touch
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Currently looking for new opportunities in full-stack engineering and security. My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-12 items-start">

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4 md:space-y-8">
            <div className="p-4 md:p-6 bg-surface border border-gray-800 rounded-xl hover:border-accent transition-colors duration-300">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 font-mono">Connect</h3>
              <div className="grid grid-cols-1 gap-2 md:space-y-4">
                <a href="mailto:mikesalamat72@gmail.com" className="flex items-center gap-2.5 p-2 md:p-3 bg-background/50 border border-gray-800 rounded-lg text-xs md:text-sm text-gray-400 hover:text-accent transition-colors">
                  <div className="p-2 bg-surface rounded-md border border-gray-800"><Mail size={16} /></div>
                  mikesalamat72@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/mike-angelo-salamat-2351063a6/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-2 md:p-3 bg-background/50 border border-gray-800 rounded-lg text-xs md:text-sm text-gray-400 hover:text-accent transition-colors">
                  <div className="p-2 bg-surface rounded-md border border-gray-800"><Linkedin size={16} /></div>
                  LinkedIn Profile
                </a>
                <a href="https://github.com/mikeymike25-lab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-2 md:p-3 bg-background/50 border border-gray-800 rounded-lg text-xs md:text-sm text-gray-400 hover:text-accent transition-colors">
                  <div className="p-2 bg-surface rounded-md border border-gray-800"><Github size={16} /></div>
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="name" className="text-xs md:text-sm font-mono text-gray-400">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className="w-full bg-surface border border-gray-800 rounded-lg px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="email" className="text-xs md:text-sm font-mono text-gray-400">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className="w-full bg-surface border border-gray-800 rounded-lg px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="message" className="text-xs md:text-sm font-mono text-gray-400">Message</label>
                <textarea
                  id="message"
                  rows="3"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full bg-surface border border-gray-800 rounded-lg px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none disabled:opacity-50"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              {/* Feedback banners */}
              {status === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg flex items-center gap-3 animate-pulse">
                  <CheckCircle2 size={20} className="flex-shrink-0" />
                  <span className="text-sm font-mono">Message sent successfully! I'll get back to you soon. 🚀</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg flex items-center gap-3">
                  <AlertTriangle size={20} className="flex-shrink-0" />
                  <span className="text-sm font-mono">Failed to send message. Please copy my email and reach out directly!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-8 py-3 w-full sm:w-auto bg-accent text-background font-bold rounded-lg shadow-glow hover:shadow-glow-strong hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:-translate-y-0 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    Sending... <Loader2 size={18} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
