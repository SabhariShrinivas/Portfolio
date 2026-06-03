import React, { useEffect, useState } from 'react';
import { Terminal, Gamepad2, Cpu, FileText, Send, User } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'deployments', 'skills', 'timeline', 'philosophy', 'contact'];
      let current = 'hero';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top handles viewport middle area, highlight it
          if (rect.top <= 160) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#111112]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
      {/* Brand logo details */}
      <div 
        onClick={() => scrollToSection('hero')} 
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded border border-primary/40 group-hover:border-secondary transition-all">
          <Cpu size={14} className="text-primary group-hover:text-secondary transition-all group-hover:rotate-45" />
          <div className="absolute inset-0 bg-primary/10 rounded filter blur-sm"></div>
        </div>

        <div>
          <h1 className="font-mono text-sm tracking-wider font-extrabold text-white text-[13px] uppercase">
            SABHARI_SHRINIVAS
          </h1>
          <span className="font-mono text-[9px] text-primary block mt-0.5 tracking-widest leading-none">
            [SYS_ARCHITECTURE_UNIT]
          </span>
        </div>
      </div>

      {/* Center Nav Link Items */}
      <nav className="hidden lg:flex items-center gap-1.5 font-mono text-[11px] font-bold">
        {[
          { id: 'deployments', label: 'DEPLOYMENTS' },
          { id: 'skills', label: 'SKILLS_MATRIX' },
          { id: 'timeline', label: 'PRODUCTION_LINE' },
          { id: 'philosophy', label: 'PHILOSOPHY' },
          { id: 'contact', label: 'CONNECTION_LINK' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-3.5 py-1.5 rounded uppercase tracking-wider transition-all duration-200 border ${
              activeSection === item.id
                ? 'bg-primary/10 border-primary text-primary shadow-[0_0_12px_rgba(173,198,255,0.15)] font-extrabold'
                : 'border-transparent text-on-surface-variant hover:text-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile/Right Actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => scrollToSection('contact')}
          className="p-2 px-4 font-mono text-[10px] font-bold tracking-widest uppercase rounded bg-secondary/15 border border-secondary/30 text-secondary hover:bg-secondary/25 transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(78,222,163,0.1)]"
        >
          <Send size={11} />
          CON_SYS
        </button>
      </div>
    </header>
  );
}
