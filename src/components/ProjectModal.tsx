import React from 'react';
import { X, Cpu, Server, ShieldCheck, CheckCircle2, TrendingUp, BarChart4, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
      {/* Container Card */}
      <div className="relative w-full max-w-2xl bg-surface-container-low border border-primary/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(173,198,255,0.15)] flex flex-col max-h-[90vh]">
        {/* Ambient top indicator */}
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-outline-variant/30 bg-surface-container">
          <div>
            <span className="font-mono text-xs text-primary tracking-widest uppercase font-bold">
              PROJECT_INFO // {project.serial}
            </span>
            <h4 className="font-headline-md text-xl text-on-surface mt-1">{project.title}</h4>
            {project.role && (
              <span className="inline-block mt-2 font-mono text-[9px] text-[#4edea3] bg-[#4edea3]/10 border border-[#4edea3]/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Role: {project.role}
              </span>
            )}
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 rounded hover:bg-white/5 border border-outline-variant/30 text-on-surface-variant hover:text-on-surface transition-all"
            title="Close Dashboard"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body content with scroll limits */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main sections */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background/40 p-4 border border-outline-variant/20 rounded">
              <span className="text-primary text-xs uppercase font-bold font-mono tracking-wider block mb-1">
                // 01. TARGET_PROBLEM
              </span>
              <p className="text-on-surface text-sm leading-relaxed">{project.problem}</p>
            </div>
            
            <div className="bg-background/40 p-4 border border-outline-variant/20 rounded">
              <span className="text-primary text-xs uppercase font-bold font-mono tracking-wider block mb-1">
                // 02. BOTTLENECK_CHALLENGE
              </span>
              <p className="text-on-surface text-sm leading-relaxed">{project.challenge}</p>
            </div>
          </div>

          {/* External Itch.io Game Page Link */}
          {project.url && (
            <div className="p-4 border border-[#4edea3]/30 bg-[#4edea3]/5 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono">
              <div>
                <span className="text-[#4edea3] text-xs uppercase font-bold tracking-wider block mb-0.5">
                  // GAMEPLAY_PAYLOAD_AVAILABLE
                </span>
                <p className="text-on-surface-variant text-[11px]">
                  This simulation can be accessed and played directly on public game servers.
                </p>
              </div>
              <a 
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#4edea3] hover:bg-white text-black text-xs font-bold uppercase rounded tracking-wider transition-all shadow-[0_0_15px_rgba(78,222,163,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-[1.02] shrink-0"
              >
                <span>LAUNCH_ON_ITCH.IO</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}

          {/* Solution & Architecture */}
          <div className="p-5 border border-secondary/20 bg-secondary/5 rounded">
            <span className="text-secondary text-xs uppercase font-bold font-mono tracking-wider flex items-center gap-1.5 mb-2">
              <CheckCircle2 size={14} /> // 03. SOLUTION_INTEGRATION
            </span>
            <p className="text-on-surface-variant text-sm leading-relaxed">{project.solution}</p>
          </div>

          {/* Metrics comparison graph if it exists */}
          {project.metrics && (
            <div className="bg-background/60 p-5 border border-outline-variant/30 rounded">
              <span className="text-primary text-xs uppercase font-bold font-mono tracking-wider flex items-center gap-2 mb-4">
                <BarChart4 size={14} /> // SYSTEM_PERFORMANCE_METRICS
              </span>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant uppercase">{project.metrics.label}</span>
                  <span className="text-secondary font-bold">
                    -{Math.round(((project.metrics.before - project.metrics.after) / project.metrics.before) * 100)}% Improvement
                  </span>
                </div>

                {/* Graph Bars */}
                <div className="space-y-3">
                  {/* Before */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1 text-on-surface-variant">
                      <span>BEFORE OPTIMIZATION:</span>
                      <span>{project.metrics.before} {project.metrics.unit}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-error rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  {/* After */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1 text-secondary">
                      <span>
                        {project.category === "Simulation" 
                          ? "AFTER ARCHITECTURE OPTIMIZATION (DOTS/ECS):"
                          : "AFTER ENGINE OPTIMIZATION (Object Pooling, LOD, Mesh Combining):"}
                      </span>
                      <span>{project.metrics.after} {project.metrics.unit}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-secondary rounded-full shadow-[0_0_8px_rgba(78,222,163,0.5)]" 
                        style={{ width: `${(project.metrics.after / project.metrics.before) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Core System Architecture Nodes */}
          {project.architecture && (
            <div>
              <span className="text-primary text-xs uppercase font-bold font-mono tracking-wider block mb-3">
                // SYSTEM_ARCHITECTURE_LAYERS
              </span>
              <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono">
                {project.architecture.map((layer, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-surface p-2 rounded border border-white/5 pl-3">
                    <span className="text-secondary">●</span>
                    <span className="text-on-surface-variant text-[11px]">{layer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Contributions if available */}
          {project.keyContributions && (
            <div>
              <span className="text-primary text-xs uppercase font-bold font-mono tracking-wider block mb-3">
                // KEY_ENGINEERING_CONTRIBUTIONS
              </span>
              <ul className="space-y-2 text-xs font-mono text-on-surface-variant bg-surface/20 p-4 border border-outline-variant/10 rounded">
                {project.keyContributions.map((contrib, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-[#4edea3] select-none shrink-0 mt-0.5">►</span>
                    <span className="leading-relaxed">{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Visual Engineering Diagrams */}
          {project.visualIdeas && (
            <div>
              <span className="text-primary text-xs uppercase font-bold font-mono tracking-wider block mb-3">
                // SIMULATION_VISUALIZATION_FLOWS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                {project.visualIdeas.map((idea, idx) => (
                  <div key={idx} className="bg-surface/30 hover:bg-surface/60 py-2 px-3 rounded border border-outline-variant/10 text-on-surface-variant flex items-center gap-2 transition-all">
                    <span className="text-[#4edea3]">◰</span>
                    <span>{idea}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack used */}
          <div>
            <span className="text-primary text-xs uppercase font-bold font-mono tracking-wider block mb-2">
              // BUILD_STACK_DEPENDENCIES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase font-bold font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info lock */}
        <div className="p-4 px-6 bg-surface-container border-t border-outline-variant/30 flex items-center justify-between text-[10px] font-mono text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <Cpu size={11} className="text-secondary" />
            <span>
              Core: {project.category === "Simulation" 
                ? "Unity JobSystem & Bursted Assembly"
                : "Unity Engine & Optimized Memory Architecture"}
            </span>
          </span>
          <span className="text-primary tracking-wider">// INTEGRATION_SECURED</span>
        </div>
      </div>
    </div>
  );
}
