import React, { useState } from 'react';
import { Cpu, CircleDot, Info, BookOpen, Layers } from 'lucide-react';
import { skillsData } from '../data';

export default function SkillMatrices() {
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; info: string } | null>(null);

  return (
    <section id="skills" className="py-20 border-b border-white/5 relative bg-[#0c0b0c]">
      {/* Decorative Blueprint Corner Accent */}
      <div className="absolute top-0 right-10 w-[300px] h-[300px] bg-primary/2 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            <span className="font-mono text-[10px] tracking-widest text-primary uppercase font-bold">
              CAPABILITY_MATRICES // TOTAL_ALIGNMENT
            </span>
          </div>
          <h3 className="font-mono text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            ENGINEERING_SKILL_PILLARS
          </h3>
          <p className="font-mono text-xs text-on-surface-variant max-w-xl mt-2 leading-relaxed">
            Highly optimized skill sets verified via frame-time analyzers, assembly profiling, and stress tested workloads. Hover over any node to query performance details.
          </p>
        </div>

        {/* Dynamic Skill Detail Popover Panel if hovered */}
        <div className="min-h-[50px] mb-8 p-3 bg-surface-container/60 border border-primary/20 rounded flex items-center gap-3 transition-all duration-300">
          <Info size={16} className="text-primary shrink-0" />
          <div className="font-mono text-xs">
            {hoveredSkill ? (
              <div>
                <span className="text-secondary font-bold uppercase">{hoveredSkill.name}: </span>
                <span className="text-on-surface">{hoveredSkill.info}</span>
              </div>
            ) : (
              <span className="text-on-surface-variant italic">Hover or tap on any capability tag below to load system diagnostics...</span>
            )}
          </div>
        </div>

        {/* Matrix Grids */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillsData.map((category, catIdx) => (
            <div 
              key={catIdx} 
              className="bg-surface-container-low border border-white/5 hover:border-primary/20 rounded-lg p-5 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Category Title */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-4">
                  {catIdx === 0 && <Cpu size={14} className="text-primary" />}
                  {catIdx === 1 && <Layers size={14} className="text-secondary" />}
                  {catIdx === 2 && <BookOpen size={14} className="text-tertiary" />}
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {category.title}
                  </h4>
                </div>

                {/* Skill List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div 
                      key={skillIdx}
                      onMouseEnter={() => setHoveredSkill({ name: skill.name, info: skill.info })}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => setHoveredSkill({ name: skill.name, info: skill.info })}
                      className="group cursor-pointer p-2.5 rounded hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all"
                    >
                      <div className="flex items-center">
                        <span className="font-mono text-xs text-on-surface group-hover:text-primary transition-colors flex items-center gap-1.5">
                          <CircleDot size={8} className={`${
                            catIdx === 0 ? 'text-primary/70' : catIdx === 1 ? 'text-secondary/70' : 'text-tertiary/70'
                          } shrink-0`} />
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box Footer metadata */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-on-surface-variant">
                <span>SECTOR_0{catIdx + 1}_READY</span>
                <span className="text-primary">CORE_ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
