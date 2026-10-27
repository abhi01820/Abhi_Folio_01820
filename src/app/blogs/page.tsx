import { blogs } from '@/contents/blogs';
import Link from 'next/link';
import React from 'react';
import { FaCalendarAlt, FaClock, FaTerminal, FaBookOpen } from 'react-icons/fa';

const Blogs = () => {
  return (
    <div className="container max-w-7xl mx-auto py-16 px-4 relative z-10">
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f2fe]/10 border border-[#00f2fe]/40 rounded-full text-[#00f2fe] text-xs font-mono tracking-widest uppercase">
          <FaBookOpen /> Engineering Dispatches
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-mono uppercase tracking-widest text-glow-cyan flex items-center justify-center gap-3">
          <FaTerminal className="text-[#00ff41]" /> System.Logs & Blogs
        </h1>
        <p className="text-[#00ff41] font-mono text-sm max-w-xl mx-auto">
          &gt; Thoughts, architecture blueprints, and deep dives into Generative AI & modern full-stack development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <article 
            key={blog.slug} 
            className="holo-card p-6 flex flex-col justify-between group hover:border-[#00f2fe] transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-4 border-b border-gray-800 pb-2">
                <span className="text-[#00ff41] uppercase font-bold">[LOG_ENTRY]</span>
                <span className="text-[#00f2fe]">{blog.readTime} MIN READ</span>
              </div>

              <Link href={`/blogs`}>
                <h3 className="text-lg font-bold font-mono mb-3 text-white group-hover:text-[#00f2fe] transition-colors leading-snug">
                  {blog.title}
                </h3>
              </Link>

              <p className="text-gray-400 font-mono text-xs sm:text-sm mb-6 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono border-t border-gray-800/80 pt-3">
              <span className="flex items-center gap-2 text-gray-400">
                <FaCalendarAlt className="text-[#00f2fe]" />
                {new Date(blog.date).toLocaleDateString()}
              </span>
              <span className="text-[#00f2fe] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read_Log →
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogs;