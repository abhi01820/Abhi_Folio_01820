"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTerminal, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { cyberAudio } from "@/utils/cyberAudio";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    cyberAudio.playClick();
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3500);
  };

  return (
    <section className="py-20 container max-w-7xl mx-auto px-4 relative z-10">
      <motion.div 
        className="holo-card p-8 md:p-12 border-2 border-[#00f2fe]/40 shadow-[0_0_35px_rgba(0,242,254,0.2)]"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f2fe]/10 border border-[#00f2fe]/40 rounded-full text-[#00f2fe] text-xs font-mono tracking-widest uppercase mb-3">
              <FaTerminal /> Broadcast Protocol
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 font-mono text-white text-glow-cyan">&gt; Subscribe_To_Network</h2>
            <p className="text-[#00ff41] font-mono text-sm leading-relaxed">
              Receive real-time telemetry updates on my latest full-stack deployments, agentic AI research, and engineering logs.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 bg-[#00ff41]/10 border border-[#00ff41] rounded-xl text-[#00ff41] font-mono text-sm animate-fadeIn">
                <FaCheckCircle className="w-5 h-5 shrink-0" />
                <span>HANDSHAKE_ESTABLISHED: Terminal uplink registered successfully.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="flex-1 px-4 py-3.5 bg-black/70 border border-[#00f2fe]/40 focus:outline-none focus:border-[#00ff41] text-white font-mono text-sm rounded-xl transition-all shadow-inner placeholder-gray-500"
                  required
                />
                <button
                  type="submit"
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="cursor-pointer bg-[#00f2fe]/20 hover:bg-[#00f2fe]/40 border border-[#00f2fe] text-[#00f2fe] font-mono uppercase tracking-widest text-xs font-bold px-7 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Execute</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}