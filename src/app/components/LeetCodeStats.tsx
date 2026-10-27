"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaMedal, FaFire, FaTrophy, FaChartLine, FaTerminal, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { cyberAudio } from "@/utils/cyberAudio";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200 } }
};

export default function LeetCodeStats() {
  const totalSolved = 785;
  const totalProblems = 4096;
  const percentage = (totalSolved / totalProblems) * 100;

  return (
    <section id="metrics" className="container max-w-7xl mx-auto py-24 px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/40 rounded-full text-[#00ff41] text-xs font-mono tracking-widest uppercase">
          <FaTerminal /> LeetCode Profile Metrics
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-mono uppercase tracking-widest text-glow-cyan flex items-center justify-center gap-4">
          <FaCode className="text-[#00ff41]" /> LeetCode_Metrics
        </h2>
        <p className="text-[#00f2fe] font-mono text-sm sm:text-base">
          &gt; Rank: <b className="text-white">73,452</b> | Contest Rating: <b className="text-white">1,662</b> | Top <b className="text-white">17.36%</b>
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column: Solved Problems & Difficulties */}
        <motion.div 
          variants={itemVariants} 
          onMouseEnter={() => cyberAudio.playHover()}
          className="holo-card p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/10 to-[#00f2fe]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h3 className="text-lg font-bold font-mono text-white mb-6 z-10 flex items-center gap-2">
            <FaChartLine className="text-[#00f2fe]" /> Problems_Solved
          </h3>
          
          <div className="relative w-44 h-44 mb-6 z-10 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="88" cy="88" r="78"
                className="stroke-gray-800" strokeWidth="10" fill="none"
              />
              <motion.circle
                cx="88" cy="88" r="78"
                className="stroke-[#00ff41]" strokeWidth="10" fill="none" strokeLinecap="round"
                initial={{ strokeDasharray: "0 1000" }}
                whileInView={{ strokeDasharray: `${(percentage / 100) * (2 * Math.PI * 78)} 1000` }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="text-center">
              <span className="text-4xl font-extrabold text-white block text-glow-green">{totalSolved}</span>
              <span className="text-xs text-gray-400 font-mono">/ {totalProblems}</span>
            </div>
          </div>

          <div className="w-full space-y-3 z-10 font-mono text-xs">
            <div className="flex justify-between items-center bg-black/60 p-2.5 rounded-xl border-l-4 border-[#00ff41]">
              <span className="text-gray-300">Easy</span>
              <span className="text-[#00ff41] font-bold">258 / 974</span>
            </div>
            <div className="flex justify-between items-center bg-black/60 p-2.5 rounded-xl border-l-4 border-yellow-400">
              <span className="text-gray-300">Medium</span>
              <span className="text-yellow-400 font-bold">452 / 2136</span>
            </div>
            <div className="flex justify-between items-center bg-black/60 p-2.5 rounded-xl border-l-4 border-red-500">
              <span className="text-gray-300">Hard</span>
              <span className="text-red-500 font-bold">75 / 986</span>
            </div>
          </div>
        </motion.div>

        {/* Middle Column: Consistency & Submissions */}
        <motion.div 
          variants={itemVariants}
          onMouseEnter={() => cyberAudio.playHover()} 
          className="holo-card p-6 sm:p-8 flex flex-col justify-between group space-y-6"
        >
          <div>
            <h3 className="text-lg font-bold font-mono text-white mb-6 flex items-center gap-2">
              <FaFire className="text-orange-500" /> Consistency_Engine
            </h3>
            
            <div className="space-y-4 font-mono">
              <div className="bg-black/60 p-5 rounded-xl border border-gray-800 hover:border-[#00ff41]/50 transition-colors">
                <div className="text-xs text-gray-400 mb-1">Submissions in the past year</div>
                <div className="text-3xl font-extrabold text-[#00ff41] text-glow-green">1,704</div>
                <div className="text-[11px] text-gray-400 mt-2 flex justify-between">
                  <span>Total active days: <b className="text-white">359</b></span>
                  <span>Max streak: <b className="text-[#00ff41]">182</b></span>
                </div>
              </div>

              <div className="bg-black/60 p-5 rounded-xl border border-gray-800 hover:border-[#00f2fe]/50 transition-colors">
                <div className="text-xs text-gray-400 mb-1">Contest Rating</div>
                <div className="text-3xl font-extrabold text-[#00f2fe] text-glow-cyan">1,662</div>
                <div className="text-[11px] text-gray-400 mt-2 flex justify-between">
                  <span>Global Ranking: <b className="text-white">152,014</b></span>
                  <span>Attended: <b className="text-white">17</b></span>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="https://leetcode.com/u/abhi_01820/"
            target="_blank"
            onClick={() => cyberAudio.playClick()}
            className="w-full py-3 bg-black/80 border border-[#00f2fe] text-[#00f2fe] hover:bg-[#00f2fe]/20 rounded-xl font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,242,254,0.25)]"
          >
            <span>View LeetCode Profile</span>
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Right Column: Badges & Languages */}
        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          {/* Badges Box */}
          <div 
            onMouseEnter={() => cyberAudio.playHover()}
            className="holo-card p-6 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-2 right-2 p-2 opacity-10 group-hover:opacity-25 transition-opacity">
              <FaTrophy className="text-6xl text-yellow-500" />
            </div>
            <h3 className="text-lg font-bold font-mono text-white mb-3 flex items-center gap-2 relative z-10">
              <FaMedal className="text-yellow-400" /> Badges
            </h3>
            <div className="relative z-10 font-mono">
              <div className="text-3xl font-extrabold text-yellow-400 mb-1">16 Badges</div>
              <p className="text-gray-400 text-xs">Most Recent Badge:</p>
              <p className="text-white font-bold text-xs mt-1 inline-block border-b border-yellow-400/50 pb-0.5">
                500 Days Badge
              </p>
            </div>
          </div>

          {/* Languages Solved */}
          <div 
            onMouseEnter={() => cyberAudio.playHover()}
            className="holo-card p-6 flex flex-col justify-center group space-y-3 font-mono"
          >
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <FaTerminal className="text-[#00f2fe]" /> Languages
            </h3>
            
            <div className="flex items-center gap-4 bg-black/60 p-3 rounded-xl border border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-[#00599C]/20 flex items-center justify-center border border-[#00599C]">
                <span className="text-[#00f2fe] font-bold text-sm">C++</span>
              </div>
              <div>
                <div className="text-lg font-bold text-white">733</div>
                <div className="text-[10px] text-gray-400">problems solved</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-black/60 p-3 rounded-xl border border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-[#4479A1]/20 flex items-center justify-center border border-[#4479A1]">
                <span className="text-[#4479A1] font-bold text-xs">MySQL</span>
              </div>
              <div>
                <div className="text-lg font-bold text-white">51</div>
                <div className="text-[10px] text-gray-400">problems solved</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
