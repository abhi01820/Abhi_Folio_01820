"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute, FaBars, FaTimes, FaTerminal } from "react-icons/fa";
import { cyberAudio } from "@/utils/cyberAudio";

const Navbar = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = cyberAudio.toggle();
    setAudioEnabled(newState);
  };

  const navLinks = [
    { name: "// PROJECTS", href: "#projects" },
    { name: "// ABOUT", href: "#about" },
    { name: "// METRICS", href: "#metrics" },
    { name: "// BLOGS", href: "/blogs" },
    { name: "// CONTACT", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl border transition-all duration-300 px-4 sm:px-6 h-16 flex items-center justify-between ${
          scrolled
            ? "bg-[#070b14]/90 border-[#00f2fe]/40 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,242,254,0.25)]"
            : "bg-[#070b14]/70 border-[#00f2fe]/20 backdrop-blur-md"
        }`}
      >
        {/* Logo with Cyber Glow */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => cyberAudio.playClick()}
            className="block relative w-32 sm:w-40 md:w-44 h-10 hover:scale-105 transition-transform"
          >
            <Image
              src="/logo.svg"
              alt="AbhiVerse"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 border border-[#00ff41]/40 text-[10px] font-mono text-[#00ff41]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-ping" />
            <span>SYS: ONLINE (12ms)</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => cyberAudio.playHover()}
              onClick={() => cyberAudio.playClick()}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold text-gray-300 hover:text-[#00f2fe] hover:bg-[#00f2fe]/10 transition-all border border-transparent hover:border-[#00f2fe]/30"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions: Sound Synth Toggle & Contact / Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cyber Audio FX Toggle */}
          <button
            onClick={toggleSound}
            title={audioEnabled ? "Disable Sci-Fi Audio FX" : "Enable Sci-Fi Audio FX"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              audioEnabled
                ? "bg-[#00ff41]/20 border-[#00ff41] text-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                : "bg-black/40 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
            }`}
          >
            {audioEnabled ? <FaVolumeUp className="w-3.5 h-3.5" /> : <FaVolumeMute className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[10px] font-bold">
              {audioEnabled ? "AUDIO ON" : "AUDIO OFF"}
            </span>
          </button>

          {/* Quick Ping CTA */}
          <Link
            href="#contact"
            onClick={() => cyberAudio.playClick()}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-[#00f2fe]/20 hover:bg-[#00f2fe]/30 border border-[#00f2fe] text-[#00f2fe] rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)]"
          >
            <FaTerminal className="w-3 h-3 text-[#00ff41]" />
            <span>Connect</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-[#00f2fe] rounded-lg border border-gray-800 bg-black/50"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#070b14]/95 border border-[#00f2fe]/40 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] font-mono text-sm space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => {
                cyberAudio.playClick();
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-2.5 rounded-xl text-gray-300 hover:text-[#00f2fe] hover:bg-[#00f2fe]/10 border border-transparent hover:border-[#00f2fe]/30"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
            <span>CORE STATUS</span>
            <span className="text-[#00ff41] font-bold">READY // ACTIVE</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
