'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaTwitter, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { cyberAudio } from '@/utils/cyberAudio';

export default function Footer() {
  const scrollToTop = () => {
    cyberAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-gray-800/80 relative z-10 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Link 
              href="/" 
              onClick={() => cyberAudio.playClick()}
              className="block relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#00f2fe] hover:shadow-[0_0_15px_rgba(0,242,254,0.6)] transition-all shrink-0"
            >
              <Image 
                src="/Abhi Rowdy Pic.png" 
                alt="Abhilash" 
                fill 
                className="object-cover"
              />
            </Link>
            <div>
              <p className="text-xs sm:text-sm text-gray-300 font-mono">
                AbhiFolio © 2024 Mekala Abhilash • Built with Next.js
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/abhi01820"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="w-9 h-9 rounded-xl bg-black border border-gray-800 hover:border-[#00f2fe] text-gray-400 hover:text-[#00f2fe] flex items-center justify-center transition-all"
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/abhilash_01820"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="w-9 h-9 rounded-xl bg-black border border-gray-800 hover:border-[#00f2fe] text-gray-400 hover:text-[#00f2fe] flex items-center justify-center transition-all"
            >
              <FaTwitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhilash-mekala-b2a903355/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="w-9 h-9 rounded-xl bg-black border border-gray-800 hover:border-[#00f2fe] text-gray-400 hover:text-[#00f2fe] flex items-center justify-center transition-all"
            >
              <FaLinkedin className="h-4 w-4" />
            </a>
            <button
              onClick={scrollToTop}
              title="Return to top"
              className="w-9 h-9 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 hover:border-[#00f2fe] text-[#00f2fe] flex items-center justify-center transition-all cursor-pointer shadow-[0_0_10px_rgba(0,242,254,0.2)]"
            >
              <FaArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}