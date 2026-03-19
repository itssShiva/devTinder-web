import React from 'react';
import { Mail, Github, Twitter, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <div className="h-24 sm:h-28 lg:h-32"></div>

      <footer className="footer flex flex-col sm:flex-row sm:justify-between items-center bg-black/80 backdrop-blur-xl border-t border-red-500/10 text-slate-400 p-6 w-full fixed bottom-0 z-50 gap-4 sm:gap-0 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
        
        <aside className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/40 flex items-center justify-center border border-red-500/10">
            <Code2 className="w-6 h-6 text-red-500" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-200 leading-tight">DevTinder</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </aside>

        <nav className="flex items-center gap-6">
          <a href="#" className="hover:text-red-500 transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="hover:text-red-500 transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" className="hover:text-red-500 transition-colors"><Mail className="w-5 h-5" /></a>
        </nav>

      </footer>
    </>
  )
}

export default Footer;
