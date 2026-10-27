'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTerminal, FaCopy, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cyberAudio } from '@/utils/cyberAudio';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    cyberAudio.playClick();
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cyberAudio.playClick();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div id="contact" className="container max-w-7xl mx-auto py-24 px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/40 rounded-full text-[#00ff41] text-xs font-mono tracking-widest uppercase">
          <FaTerminal /> Direct Neural Uplink
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-mono uppercase tracking-widest text-glow-cyan flex items-center justify-center gap-3">
          <FaTerminal className="text-[#00ff41]" /> Establish_Connection
        </h1>
        <p className="text-[#00f2fe] font-mono text-sm sm:text-base max-w-xl mx-auto">
          &gt; Ready to accept transmission packets for high-scale engineering roles & AI collaborations.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Contact Information */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="holo-card p-6 border-l-4 border-l-[#00f2fe]">
            <h2 className="text-xl font-bold mb-2 text-[#00f2fe] font-mono">&gt; System Status: Active</h2>
            <p className="text-gray-300 font-mono text-sm leading-relaxed">
              Open to discussing scalable backend systems, LLM reasoning pipelines, Agentic architectures, or production software engineering roles. Typical response latency: &lt; 24h.
            </p>
          </div>
          
          <div className="space-y-4">
            {/* Email Card */}
            <motion.div 
              whileHover={{ x: 6 }} 
              className="holo-card p-4 sm:p-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black border border-[#00f2fe] rounded-xl text-[#00f2fe]">
                  <FaEnvelope className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#00ff41] font-mono text-xs uppercase">&gt; Email_Port</h3>
                  <a href="mailto:mekalaabhilash01820@gmail.com" className="text-gray-200 hover:text-white transition-colors font-mono text-xs sm:text-sm break-all">
                    mekalaabhilash01820@gmail.com
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard('mekalaabhilash01820@gmail.com', 'email')}
                title="Copy Email"
                className="p-2.5 rounded-lg border border-gray-800 bg-black/60 hover:border-[#00f2fe] text-gray-400 hover:text-[#00f2fe] transition-all cursor-pointer shrink-0"
              >
                {copiedItem === 'email' ? <FaCheck className="text-[#00ff41] w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
              </button>
            </motion.div>
            
            {/* Phone Card */}
            <motion.div 
              whileHover={{ x: 6 }} 
              className="holo-card p-4 sm:p-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black border border-[#00ff41] rounded-xl text-[#00ff41]">
                  <FaPhone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#00ff41] font-mono text-xs uppercase">&gt; Commlink_Direct</h3>
                  <a href="tel:+917989430063" className="text-gray-200 hover:text-white transition-colors font-mono text-xs sm:text-sm">
                    +91 7989430063
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard('+917989430063', 'phone')}
                title="Copy Phone"
                className="p-2.5 rounded-lg border border-gray-800 bg-black/60 hover:border-[#00ff41] text-gray-400 hover:text-[#00ff41] transition-all cursor-pointer shrink-0"
              >
                {copiedItem === 'phone' ? <FaCheck className="text-[#00ff41] w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
              </button>
            </motion.div>
            
            {/* Location Card */}
            <motion.div 
              whileHover={{ x: 6 }} 
              className="holo-card p-4 sm:p-5 flex items-center gap-4"
            >
              <div className="p-3 bg-black border border-purple-500 rounded-xl text-purple-400">
                <FaMapMarkerAlt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#00ff41] font-mono text-xs uppercase">&gt; Coordinates_</h3>
                <p className="text-gray-300 font-mono text-xs sm:text-sm">Hyderabad, Telangana, India</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div 
          className="holo-card p-6 sm:p-8"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5 font-mono">
            <div>
              <label htmlFor="name" className="block text-xs font-bold mb-1.5 text-[#00f2fe] uppercase tracking-wider">
                &gt; Input.Sender_Name_
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ada Lovelace"
                required
                className="w-full px-4 py-3 bg-black/60 border border-[#00f2fe]/30 rounded-xl focus:outline-none focus:border-[#00ff41] text-white text-sm transition-all shadow-inner placeholder-gray-600"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-bold mb-1.5 text-[#00f2fe] uppercase tracking-wider">
                &gt; Input.Sender_Email_
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ada@domain.com"
                required
                className="w-full px-4 py-3 bg-black/60 border border-[#00f2fe]/30 rounded-xl focus:outline-none focus:border-[#00ff41] text-white text-sm transition-all shadow-inner placeholder-gray-600"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-xs font-bold mb-1.5 text-[#00f2fe] uppercase tracking-wider">
                &gt; Input.Payload_Message_
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="State project details, roles, or collaboration parameters..."
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/60 border border-[#00f2fe]/30 rounded-xl focus:outline-none focus:border-[#00ff41] text-white text-sm transition-all resize-none shadow-inner placeholder-gray-600"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 bg-[#00ff41]/20 hover:bg-[#00ff41]/40 border border-[#00ff41] text-[#00ff41] font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(0,255,65,0.3)] cursor-pointer"
            >
              {status === 'loading' ? 'Transmitting Data Packet...' : 'Transmit_Packet'}
            </button>
            
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-[#00ff41] text-center border border-[#00ff41] bg-[#00ff41]/10 py-3 rounded-xl text-xs font-bold"
              >
                [ SUCCESS ] Transmission delivered to Abhilash's terminal.
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-center border border-red-500 bg-red-500/10 py-3 rounded-xl text-xs font-bold"
              >
                [ ERROR ] Transmission failed. Please contact via direct email.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}