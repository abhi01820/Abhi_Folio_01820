'use client';

import { projects } from '@/contents/project';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaTimes, 
  FaTerminal, 
  FaSearch, 
  FaBolt, 
  FaLayerGroup,
  FaCogs,
  FaExpandAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types';
import { cyberAudio } from '@/utils/cyberAudio';

// Individual Crazy 3D Holographic Project Card
interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 9;
    const rotY = ((x - centerX) / centerX) * 9;

    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlightPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cyberAudio.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const statusColor = 
    project.status === 'DEPLOYED' ? '#00ff41' :
    project.status === 'PRODUCTION' ? '#00f2fe' :
    project.status === 'ONLINE' ? '#38bdf8' : '#a855f7';

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="perspective-1000 h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          cyberAudio.playModal();
          onSelect(project);
        }}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative group cursor-pointer h-full rounded-2xl bg-[#070b14]/90 border border-[#00f2fe]/20 hover:border-[#00f2fe] backdrop-blur-xl transition-all duration-300 p-5 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(0,242,254,0.3)]"
      >
        {/* Dynamic Cursor Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 242, 254, 0.15), rgba(168, 85, 247, 0.05) 50%, transparent 80%)`,
          }}
        />

        {/* Cyber Holographic Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f2fe] rounded-tl-lg pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f2fe] rounded-tr-lg pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00f2fe] rounded-bl-lg pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f2fe] rounded-br-lg pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Top HUD Telemetry Bar */}
        <div className="flex items-center justify-between text-xs font-mono mb-3 text-gray-400 border-b border-gray-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: statusColor }} />
            <span className="font-bold uppercase tracking-wider text-white" style={{ color: statusColor }}>
              {project.status || 'DEPLOYED'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="bg-[#00f2fe]/10 border border-[#00f2fe]/50 text-[#00f2fe] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <FaBolt className="text-[#00ff41]" /> Featured
              </span>
            )}
            <span className="text-[#00f2fe]/70 font-mono text-[11px]">
              NODE-{String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Image Preview Container with Holographic Scanlines */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black/80 border border-[#00f2fe]/30 group-hover:border-[#00ff41] transition-colors mb-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Animated Cyber Scanline Beam */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2fe]/20 to-transparent h-16 w-full -translate-y-full group-hover:translate-y-[400%] transition-transform duration-1000 ease-linear pointer-events-none" />

          {/* CRT Scanline Overlay Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.35)_50%),linear-gradient(90deg,rgba(0,242,254,0.04),rgba(0,255,65,0.02),rgba(168,85,247,0.04))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-60" />

          {/* Category Tag Overlay */}
          {project.category && (
            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md border border-[#00f2fe]/60 px-2.5 py-1 rounded-md text-[11px] font-mono text-[#00f2fe] font-bold tracking-wider uppercase">
              {project.category}
            </div>
          )}

          {/* Hover Telemetry Button */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
            <span className="flex items-center gap-2 border border-[#00ff41] bg-black/80 text-[#00ff41] px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,65,0.4)]">
              <FaExpandAlt className="w-3 h-3" /> Telemetry Log
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-white font-mono group-hover:text-[#00f2fe] transition-colors line-clamp-1">
            {project.title}
          </h3>

          {project.highlight && (
            <div className="mb-3 flex items-center gap-2 text-xs font-mono text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 px-2.5 py-1 rounded">
              <span className="text-[#00f2fe]">&gt;</span>
              <span className="truncate">{project.highlight}</span>
            </div>
          )}

          <p className="text-gray-400 font-mono text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies Chips */}
          <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 bg-black/60 border border-gray-800 text-gray-300 rounded text-[11px] font-mono group-hover:border-[#00f2fe]/40 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30 rounded text-[10px] font-mono font-bold">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Button Links */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-800/80 font-mono text-xs uppercase tracking-wider">
          {project.githubLink && (
            <div onClick={(e) => e.stopPropagation()} className="flex-1">
              <Link
                href={project.githubLink}
                target="_blank"
                onClick={() => cyberAudio.playClick()}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-black/60 border border-[#00f2fe]/40 hover:border-[#00f2fe] hover:bg-[#00f2fe]/10 text-[#00f2fe] rounded-lg transition-all w-full text-center"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>Code</span>
              </Link>
            </div>
          )}

          {project.demoLink ? (
            <div onClick={(e) => e.stopPropagation()} className="flex-1">
              <Link
                href={project.demoLink}
                target="_blank"
                onClick={() => cyberAudio.playClick()}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#00ff41]/15 border border-[#00ff41] hover:bg-[#00ff41]/30 text-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] rounded-lg transition-all w-full text-center font-bold"
              >
                <FaExternalLinkAlt className="w-3 h-3" />
                <span>Launch</span>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                cyberAudio.playModal();
                onSelect(project);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/40 hover:border-purple-400 text-purple-300 rounded-lg transition-all"
            >
              <FaCogs className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// Main Projects Section
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'architecture'>('overview');

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = activeCategory === 'ALL' || project.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesTitle = project.title.toLowerCase().includes(query);
      const matchesDesc = project.description.toLowerCase().includes(query);
      const matchesTech = project.technologies.some(t => t.toLowerCase().includes(query));

      return matchesCategory && (matchesTitle || matchesDesc || matchesTech);
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 container max-w-7xl mx-auto px-4 relative z-10">
      {/* Section Header */}
      <div className="mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center max-w-6xl mx-auto">
          {/* Futuristic animated bot visual */}
          <motion.div 
            className="lg:col-span-1 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[#00f2fe]/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative p-2 rounded-2xl border border-[#00f2fe]/30 bg-black/60 shadow-[0_0_25px_rgba(0,242,254,0.3)]">
              <img
                src="/projects/bot-animation.gif"
                alt="AI Terminal Bot"
                className="w-40 h-40 md:w-52 md:h-52 object-contain mix-blend-screen"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black border border-[#00ff41] px-3 py-0.5 rounded-full text-[10px] font-mono text-[#00ff41] font-bold tracking-widest uppercase">
                AI_UNIT.READY
              </div>
            </div>
          </motion.div>

          {/* Section Titles */}
          <motion.div 
            className="lg:col-span-3 text-center lg:text-left space-y-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f2fe]/10 border border-[#00f2fe]/40 rounded-full text-[#00f2fe] text-xs font-mono tracking-widest uppercase mb-1">
              <FaLayerGroup /> Neural Projects Matrix
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-mono tracking-tight text-glow-cyan uppercase">
              System.Deployments
            </h2>

            <p className="text-base md:text-lg text-[#00ff41] font-mono max-w-2xl">
              &gt; Handcrafted full-stack architectures, generative AI agents, WebRTC ecosystems, and real-time voice intelligence.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 font-mono text-xs text-gray-300 bg-black/60 px-3 py-1.5 rounded-lg border border-gray-800">
                <FaCheckCircle className="text-[#00ff41]" />
                <span>{projects.length} Verified Systems Active</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-gray-300 bg-black/60 px-3 py-1.5 rounded-lg border border-gray-800">
                <FaBolt className="text-[#00f2fe]" />
                <span>Interactive 3D Mouse Parallax Deck</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Control Bar: Categories & Search Engine */}
      <motion.div 
        className="mb-10 p-4 rounded-2xl bg-[#070b14]/90 border border-[#00f2fe]/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-4 items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  cyberAudio.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00f2fe] text-black shadow-[0_0_20px_rgba(0,242,254,0.6)]"
                    : "bg-black/50 text-gray-400 hover:text-white border border-gray-800 hover:border-[#00f2fe]/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Search Engine */}
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-3.5 h-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack, title, RAG..."
            className="w-full pl-10 pr-4 py-2 bg-black/60 border border-gray-800 focus:border-[#00f2fe] rounded-xl text-xs font-mono text-white placeholder-gray-500 focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs font-mono"
            >
              ✕
            </button>
          )}
        </div>
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-16 text-center border border-dashed border-[#00f2fe]/30 rounded-2xl bg-black/40 font-mono">
          <p className="text-[#00f2fe] text-lg mb-2">&gt; NO MATCHING NODES FOUND</p>
          <p className="text-gray-400 text-sm mb-4">Try clearing your search query or switching categories.</p>
          <button
            onClick={() => {
              setActiveCategory('ALL');
              setSearchQuery('');
            }}
            className="px-6 py-2 bg-[#00f2fe]/20 border border-[#00f2fe] text-[#00f2fe] rounded-lg text-xs uppercase tracking-widest hover:bg-[#00f2fe]/30"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      )}

      {/* Crazy Extended Datapad Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090d16] border-2 border-[#00f2fe] shadow-[0_0_50px_rgba(0,242,254,0.4)] p-6 md:p-8 font-mono text-white"
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-5 right-5 w-10 h-10 bg-black/80 border border-[#00f2fe] hover:border-[#00ff41] hover:text-[#00ff41] rounded-xl flex items-center justify-center text-[#00f2fe] transition-all z-20"
                onClick={() => setSelectedProject(null)}
              >
                <FaTimes className="w-5 h-5" />
              </button>

              {/* Holographic Header Bar */}
              <div className="flex items-center gap-3 text-xs text-gray-400 border-b border-gray-800 pb-4 mb-6">
                <span className="w-3 h-3 rounded-full bg-[#00ff41] animate-ping" />
                <span className="text-[#00ff41] font-bold uppercase tracking-widest">
                  [TELEMETRY_LOG]
                </span>
                <span className="text-gray-500">|</span>
                <span className="text-[#00f2fe] truncate max-w-md">{selectedProject.title}</span>
              </div>

              {/* Split Content: Thumbnail on LEFT, Matter on RIGHT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Side: Thumbnail & Launch CTAs */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-black border-2 border-[#00f2fe]/50 shadow-[0_0_25px_rgba(0,242,254,0.25)]">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 480px"
                      priority
                    />
                    {/* Scanline CRT overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.35)_50%),linear-gradient(90deg,rgba(0,242,254,0.06),rgba(0,255,65,0.03),rgba(168,85,247,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

                    {/* Category & Status Overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {selectedProject.category && (
                        <span className="px-2.5 py-1 bg-black/85 backdrop-blur border border-[#00f2fe] rounded-md text-[11px] font-bold text-[#00f2fe] uppercase tracking-wider">
                          {selectedProject.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Left Column Quick Launch CTAs */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 font-mono text-xs uppercase tracking-widest font-bold">
                    {selectedProject.demoLink && (
                      <Link
                        href={selectedProject.demoLink}
                        target="_blank"
                        onClick={() => cyberAudio.playClick()}
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-[#00ff41]/20 border border-[#00ff41] hover:bg-[#00ff41]/40 text-[#00ff41] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,65,0.3)] w-full text-center"
                      >
                        <FaExternalLinkAlt className="w-3.5 h-3.5" />
                        <span>Launch Live System</span>
                      </Link>
                    )}
                    {selectedProject.githubLink && (
                      <Link
                        href={selectedProject.githubLink}
                        target="_blank"
                        onClick={() => cyberAudio.playClick()}
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-black border border-[#00f2fe] hover:bg-[#00f2fe]/20 text-[#00f2fe] rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,254,0.25)] w-full text-center"
                      >
                        <FaGithub className="w-4 h-4" />
                        <span>Inspect Repository</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right Side: The Matter (Details, Tabs, Description, Tech Matrix) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-glow-cyan tracking-tight">
                    {selectedProject.title}
                  </h2>

                  {/* Highlight Banner */}
                  {selectedProject.highlight && (
                    <div className="p-3.5 rounded-xl bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] text-xs sm:text-sm">
                      <b className="text-white">&gt; Highlight:</b> {selectedProject.highlight}
                    </div>
                  )}

                  {/* Modal Tabs */}
                  <div className="flex items-center gap-2 border-b border-gray-800 pb-2 text-xs uppercase tracking-wider">
                    <button
                      onClick={() => {
                        cyberAudio.playClick();
                        setActiveTab('overview');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        activeTab === 'overview'
                          ? "bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      &gt; Overview
                    </button>
                    <button
                      onClick={() => {
                        cyberAudio.playClick();
                        setActiveTab('tech');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        activeTab === 'tech'
                          ? "bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      &gt; Tech Matrix
                    </button>
                    {selectedProject.architecture && selectedProject.architecture.length > 0 && (
                      <button
                        onClick={() => {
                          cyberAudio.playClick();
                          setActiveTab('architecture');
                        }}
                        className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          activeTab === 'architecture'
                            ? "bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        &gt; Architecture
                      </button>
                    )}
                  </div>

                  {/* Tab Contents */}
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed bg-[#050811] p-4 sm:p-5 rounded-xl border border-gray-800/80 max-h-[320px] overflow-y-auto">
                        {selectedProject.description}
                      </p>
                    </div>
                  )}

                  {activeTab === 'tech' && (
                    <div>
                      <h4 className="text-xs uppercase text-[#00ff41] font-bold mb-3 tracking-widest">
                        &gt; Verified Stack Dependencies
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                        {selectedProject.technologies.map((tech) => (
                          <div
                            key={tech}
                            className="p-2.5 bg-black/60 border border-[#00f2fe]/30 rounded-xl text-center text-[#00f2fe] text-xs font-bold shadow-[0_0_10px_rgba(0,242,254,0.1)] flex items-center justify-center"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'architecture' && selectedProject.architecture && (
                    <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                      <h4 className="text-xs uppercase text-[#00ff41] font-bold mb-2 tracking-widest">
                        &gt; System Architectural Components
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedProject.architecture.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-black/60 border border-purple-500/30 rounded-xl text-gray-200 text-xs flex items-center gap-3"
                          >
                            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
