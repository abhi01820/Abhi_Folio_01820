"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFileDownload,
  FaTimes,
  FaTerminal,
  FaArrowDown,
  FaCode,
  FaRobot,
  FaCheckCircle
} from "react-icons/fa";
import { cyberAudio } from "@/utils/cyberAudio";

// Animated Cyber Circuit Background
function CyberCircuitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Central Glowing Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#00f2fe]/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[#00ff41]/10 rounded-full blur-[90px]" />

      {/* SVG Circuits */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="circuit-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#00ff41" />
          </linearGradient>
          <filter id="glow-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        
        {/* Core Chip Area */}
        <rect x="350" y="350" width="300" height="300" fill="none" stroke="url(#circuit-glow)" strokeWidth="1" opacity="0.3" rx="10" />
        <rect x="400" y="400" width="200" height="200" fill="none" stroke="#00ff41" strokeWidth="2" rx="5" filter="url(#glow-blur)" />
        
        {/* Data Traces */}
        <g stroke="url(#circuit-glow)" strokeWidth="2" fill="none">
          <path d="M 450 400 L 450 250 L 200 250 L 0 250" />
          <path d="M 550 400 L 550 200 L 800 200 L 1000 200" />
          <path d="M 450 600 L 450 750 L 200 750 L 0 750" />
          <path d="M 550 600 L 550 800 L 800 800 L 1000 800" />
          <path d="M 400 450 L 250 450 L 250 100 L 0 100" />
          <path d="M 600 550 L 750 550 L 750 900 L 1000 900" />
        </g>
        
        {/* Nodes */}
        <g fill="#00ff41">
          <circle cx="200" cy="250" r="4" filter="url(#glow-blur)" />
          <circle cx="800" cy="200" r="4" filter="url(#glow-blur)" />
          <circle cx="200" cy="750" r="4" filter="url(#glow-blur)" />
          <circle cx="800" cy="800" r="4" filter="url(#glow-blur)" />
          <circle cx="250" cy="100" r="4" filter="url(#glow-blur)" />
          <circle cx="750" cy="900" r="4" filter="url(#glow-blur)" />
        </g>
      </svg>
    </div>
  );
}

// Download Form Modal Component
type DownloadForm = {
  name: string;
  email: string;
  company: string;
  purpose: string;
};

const DownloadModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DownloadForm) => void;
}) => {
  const [formData, setFormData] = useState<DownloadForm>({
    name: '',
    email: '',
    company: '',
    purpose: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    cyberAudio.playClick();

    try {
      // Send user details to backend
      await fetch('/api/download-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Automatically open the resume CV
      window.open('/Mekala Abhilash_CV.pdf', '_blank');
      setDownloadSuccess(true);
      onSubmit(formData);
    } catch {
      // Open CV even if tracking endpoint errors
      window.open('/Mekala Abhilash_CV.pdf', '_blank');
      setDownloadSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="cyber-chip p-6 sm:p-8 w-full max-w-md relative border-2 border-[#00f2fe] shadow-[0_0_40px_rgba(0,242,254,0.3)]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#00f2fe] hover:text-[#00ff41] transition-colors border border-gray-800 rounded-lg bg-black"
            >
              <FaTimes />
            </button>

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mb-2 flex items-center gap-2">
                <FaTerminal className="text-[#00ff41]" /> System.Access
              </h3>
              <p className="text-gray-400 font-mono text-xs sm:text-sm">
                &gt; Enter your details to view and download resume...
              </p>
            </div>

            {downloadSuccess ? (
              <div className="p-6 text-center space-y-4 font-mono">
                <FaCheckCircle className="w-12 h-12 text-[#00ff41] mx-auto animate-bounce" />
                <p className="text-[#00ff41] font-bold text-base">PROTOCOL_EXECUTED: ACCESS GRANTED</p>
                <p className="text-gray-300 text-xs">
                  Your credentials were accepted. The CV was dispatched.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="/Mekala Abhilash_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Mekala_Abhilash_CV.pdf"
                    className="px-6 py-2.5 bg-[#00ff41]/20 hover:bg-[#00ff41]/40 border border-[#00ff41] text-[#00ff41] rounded-xl text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                  >
                    <FaFileDownload /> Direct Download PDF
                  </a>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white text-xs mt-2"
                  >
                    [Close Window]
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[#00f2fe] mb-1 font-bold">&gt; Name_</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g., Ada Lovelace"
                    className="w-full px-3 py-2 bg-black/60 border border-[#00f2fe]/30 rounded-lg focus:outline-none focus:border-[#00ff41] text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#00f2fe] mb-1 font-bold">&gt; Email_</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="recruiter@enterprise.com"
                    className="w-full px-3 py-2 bg-black/60 border border-[#00f2fe]/30 rounded-lg focus:outline-none focus:border-[#00ff41] text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#00f2fe] mb-1 font-bold">&gt; Organization_</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Tech Corp / VC"
                    className="w-full px-3 py-2 bg-black/60 border border-[#00f2fe]/30 rounded-lg focus:outline-none focus:border-[#00ff41] text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#00f2fe] mb-1 font-bold">&gt; Intent_</label>
                  <select
                    name="purpose"
                    required
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-black/60 border border-[#00f2fe]/30 rounded-lg focus:outline-none focus:border-[#00ff41] text-white"
                  >
                    <option value="" className="bg-gray-900">Select intent...</option>
                    <option value="job-opportunity" className="bg-gray-900">Direct Hiring / Recruitment</option>
                    <option value="collaboration" className="bg-gray-900">AI / Tech Collaboration</option>
                    <option value="freelance" className="bg-gray-900">Contracting / Consulting</option>
                    <option value="other" className="bg-gray-900">General Review</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#00ff41]/20 hover:bg-[#00ff41]/40 border border-[#00ff41] text-[#00ff41] font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(0,255,65,0.3)] cursor-pointer"
                  >
                    {isSubmitting ? (
                      'Authenticating...'
                    ) : (
                      <>
                        <FaFileDownload /> Submit & Unlock Resume
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleDownloadSubmit = (data: DownloadForm) => {
    console.log('Download request from:', data);
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/abhi01820", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/abhilash-mekala-b2a903355/", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://x.com/abhilash_01820", label: "Twitter" },
    { icon: SiLeetcode, href: "https://leetcode.com/u/abhi_01820/", label: "LeetCode" },
    { icon: SiGeeksforgeeks, href: "https://www.geeksforgeeks.org/profile/johnab04hg?tab=activity", label: "GFG" }
  ];

  return (
    <section className="relative pt-12 pb-20 container max-w-7xl mx-auto px-4 overflow-hidden min-h-[88vh] flex flex-col justify-center">
      <CyberCircuitBackground />

      {/* High-Visibility Big Screen Background Portrait (oneWomanMan.png) */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/4 md:w-3/5 lg:w-[52%] xl:w-[48%] pointer-events-none select-none z-0 flex items-end justify-end overflow-hidden">
        {/* Ambient colored lighting behind the photo */}
        <div className="absolute right-10 top-1/3 w-[450px] h-[450px] bg-[#00f2fe]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute right-20 bottom-10 w-[400px] h-[400px] bg-[#a855f7]/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative w-full h-[88%] sm:h-[92%] lg:h-[96%] xl:h-full opacity-40 sm:opacity-55 lg:opacity-85 xl:opacity-90 transition-all duration-700">
          <Image
            src="/oneWomanMan.png"
            alt="Abhilash Portrait"
            fill
            className="object-contain object-right-bottom"
            priority
          />
          {/* Subtle gradient fades so edges blend into dark background */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-[#030712] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#030712]/60 to-transparent" />
        </div>
      </div>

      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 w-full my-auto">
        {/* Left: Cyber Profile Image with Orbiting Badges */}
        <motion.div 
          className="flex-shrink-0 relative"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-88 md:h-88 mx-auto group">
            {/* Holographic Radar Rings */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-[#00f2fe]/60 border-dashed"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -inset-4 rounded-full border border-[#00ff41]/50 border-dotted"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -inset-8 rounded-full border border-purple-500/20"
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Orbiting Tech Badges */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -left-2 sm:-left-4 z-20 bg-black/90 border border-[#00ff41] text-[#00ff41] px-3 py-1 rounded-xl text-[11px] font-mono font-bold shadow-[0_0_15px_rgba(0,255,65,0.4)] flex items-center gap-1.5"
            >
              <FaCode className="text-xs" /> 785 LeetCode
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -right-2 sm:-right-4 z-20 bg-black/90 border border-[#00f2fe] text-[#00f2fe] px-3 py-1 rounded-xl text-[11px] font-mono font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)] flex items-center gap-1.5"
            >
              <FaRobot className="text-xs" /> Agentic AI & RAG
            </motion.div>

            {/* Profile Avatar Frame */}
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,242,254,0.35)] bg-black p-1.5 border-2 border-[#00f2fe]/60 group-hover:border-[#00ff41] transition-colors duration-500">
              <Image
                src="/profile.png"
                alt="Abhilash Profile"
                width={360}
                height={360}
                className="object-cover w-full h-full rounded-full grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[#00f2fe]/10 group-hover:bg-transparent transition-colors duration-500 rounded-full pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Right: Info Content */}
        <motion.div 
          className="text-center lg:text-left max-w-2xl w-full space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-[#00ff41]/50 text-xs font-mono text-[#00ff41]">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
            <span>AVAILABLE FOR PRODUCTION ROLES & COLLABS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-mono uppercase tracking-tight">
            Hi, I'm <span className="text-glow-cyan text-[#00f2fe]">Abhilash</span>
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl text-[#00ff41] font-mono min-h-[36px] font-bold flex justify-center lg:justify-start">
            <Typewriter
              words={[
                "> Full Stack Architect_",
                "> AI Systems Engineer_",
                "> Generative AI & RAG_",
                "> Real-Time WebRTC Dev_"
              ]}
              loop={true}
              cursor
              cursorStyle="█"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1600}
            />
          </div>

          {/* Social Links Bar */}
          <div className="flex justify-center lg:justify-start items-center gap-3 pt-2">
            {socialLinks.map((social, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={social.href}
                  target="_blank"
                  title={social.label}
                  onClick={() => cyberAudio.playClick()}
                >
                  <div className="w-11 h-11 rounded-xl border border-[#00f2fe]/40 bg-black/60 flex items-center justify-center transition-all hover:border-[#00f2fe] hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] hover:text-[#00f2fe] text-gray-300">
                    <social.icon className="text-lg" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 font-mono text-xs uppercase tracking-widest pt-2">
            <Link
              href="#projects"
              onClick={() => cyberAudio.playClick()}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#00f2fe] text-black font-extrabold rounded-xl text-center flex items-center justify-center gap-2 hover:bg-[#00f2fe]/90 transition-all shadow-[0_0_25px_rgba(0,242,254,0.5)] cursor-pointer"
            >
              <span>Explore Projects</span>
              <FaArrowDown className="text-xs animate-bounce" />
            </Link>

            <button
              onClick={() => {
                cyberAudio.playModal();
                setShowDownloadModal(true);
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-black/60 border border-[#00ff41] hover:bg-[#00ff41]/20 text-[#00ff41] font-bold rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,255,65,0.3)] cursor-pointer"
            >
              <FaFileDownload className="text-sm" />
              <span>Extract_Resume</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Verified Stats Bar */}
      <motion.div 
        className="relative z-20 mt-14 p-4 rounded-2xl bg-[#070b14]/90 border border-gray-800 backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center font-mono shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="p-3 border-b sm:border-b-0 sm:border-r border-gray-800/80">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#00f2fe] text-glow-cyan">785</div>
          <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">LeetCode Solved</div>
        </div>
        <div className="p-3 border-b sm:border-b-0 md:border-r border-gray-800/80">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#00ff41] text-glow-green">1,662</div>
          <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Contest Rating</div>
        </div>
        <div className="p-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-yellow-400">16</div>
          <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">LeetCode Badges</div>
        </div>
      </motion.div>

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        onSubmit={handleDownloadSubmit}
      />
    </section>
  );
};

export default Hero;
