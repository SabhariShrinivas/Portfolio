import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  Gamepad2, 
  Plane, 
  Settings, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Sliders, 
  Code2, 
  Target, 
  Activity, 
  ArrowRight, 
  Sparkles,
  Download,
  Mail,
  User,
  ExternalLink,
  Cpu,
  RefreshCw,
  Workflow,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import Navbar from './components/Navbar';
import MiniSimulation from './components/MiniSimulation';
import SkillMatrices from './components/SkillMatrices';
import ProjectModal from './components/ProjectModal';
import Terminal from './components/Terminal';
import Testimonials from './components/Testimonials';
import { projectsData, timelineData } from './data';
import { Project } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { generateResumePDF } from './utils/pdfGenerator';

export default function App() {
  // Navigation & state
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Simulation' | 'Games'>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [expandedTimeline, setExpandedTimeline] = useState<Record<number, boolean>>({ 0: true }); // Pre-expand the Senior role by default!
  
  // Real-time HUD system status state triggers
  const [sysTime, setSysTime] = useState('');
  const [sysCoords, setSysCoords] = useState({ x: 42.13, y: -71.06 });
  const [perfPulse, setPerfPulse] = useState(true);

  // Load diagnostic dynamic values
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSysTime(now.toISOString().replace('T', ' ').substring(0, 19));
      
      // Mimic slight hover tracking coordinate variances
      setSysCoords({
        x: Number((42.10 + Math.random() * 0.1).toFixed(4)),
        y: Number((-71.10 + Math.random() * 0.1).toFixed(4))
      });

      // Toggle pulse indicator
      setPerfPulse(prev => !prev);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0c0b0c] text-on-surface flex flex-col selection:bg-primary/30 selection:text-white relative font-sans antialiased overflow-x-hidden scanline">
      {/* Sticky Top Header Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center border-b border-white/5 py-12 md:py-20 overflow-hidden">
        {/* Animated Moving background grid line layers */}
        <div className="blueprint-bg-fine"></div>
        <div className="blueprint-bg"></div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Ticking HUD Header stats */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-on-surface-variant/80 border-b border-white/5 pb-4">
              <span className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full bg-secondary ${perfPulse ? 'opacity-40' : 'opacity-100'}`} />
                SYSTEM_OK
              </span>
              <span className="hidden sm:inline">||</span>
              <span>LOC_COORDS: [{sysCoords.x}, {sysCoords.y}]</span>
              <span className="hidden sm:inline">||</span>
              <span className="text-primary font-bold">{sysTime || 'SYS_CLOCK_BOOTING'} UTC</span>
            </div>

            {/* Overtitle */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary inline-block"></span>
              <h2 className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
                SENIOR_GAMEPLAY_AND_SYSTEM_ENGINEER
              </h2>
            </div>

            {/* Main Statement Title */}
            <h1 className="font-mono text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
              Building Games, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#c0c1ff] to-secondary">
                Simulations
              </span> <br className="hidden sm:inline" />
              and Complex Systems with Unity.
            </h1>

            {/* Micro Statement */}
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-lg">
              Specialized in high-density simulation pipelines, frame-budget physics optimization, clean SOLID system architecture, and low-latency C# execution loops using ECS/DOTS.
            </p>

            {/* Status output log */}
            <div className="font-mono text-xs bg-surface-container/60 border border-white/5 p-3 rounded flex items-center gap-2.5">
              <Code2 size={14} className="text-secondary animate-pulse" />
              <span className="text-on-surface-variant font-semibold">
                // ACTIVE_METHOD_DISPATCHER: 
                <span className="text-white ml-1">MONOBEHAVIOR_TO_DOTS_COMPRESSION_ACTIVE</span>
                <span className="cursor-blink ml-0.5 font-bold">|</span>
              </span>
            </div>

            {/* Navigation CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => {
                  const el = document.getElementById('deployments');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-6 py-3 bg-primary text-[#0c0b0c] font-mono text-xs font-black tracking-widest uppercase rounded hover:bg-white transition-all duration-200 flex items-center gap-2 shadow-[0_4px_20px_rgba(173,198,255,0.25)]"
              >
                <span>QUERY_DEPLOYMENTS</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-surface-container border border-outline-variant hover:border-primary text-white font-mono text-xs font-bold tracking-widest uppercase rounded hover:bg-white/[0.05] transition-all"
              >
                ESTABLISH_CONNECTION
              </button>
            </div>
          </div>

          {/* Right Hero Interactive Simulator Cockpit */}
          <div className="lg:col-span-6 w-full flex flex-col justify-center">
            {/* Telemetry border housing wrapper */}
            <div className="relative p-1 bg-gradient-to-b from-primary/20 to-transparent rounded-lg">
              <MiniSimulation />
            </div>
          </div>

        </div>
      </section>

      {/* About Section with centered alignment without portrait */}
      <section id="about" className="py-20 border-b border-white/5 relative bg-[#111012]/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center space-y-6 flex flex-col items-center">
          
          <div className="flex items-center gap-2 justify-center">
            <span className="h-1 text-primary">■</span>
            <span className="font-mono text-[10px] tracking-widest text-[#4edea3] uppercase font-bold">
              DIAGNOSIS_LOG_01 // CORE_BIOGRAPHY
            </span>
          </div>

          <h3 className="font-mono text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Systems Engineering Methodology
          </h3>

          <div className="space-y-4 text-on-surface-variant text-sm leading-relaxed max-w-2xl">
            <p>
              As a systems-oriented game programmer, I approach real-time simulation development through the lens of extreme computation budget discipline. I focus on optimizing CPU cache efficiency, designing data layout transformations matching modern hardware layouts, and guaranteeing consistent framerate ceilings even when handling massive object payloads.
            </p>
            <p>
              My design framework involves strict separation of logic and state data structure (ECS design paradigm), allowing compilers to vectorize calculations using SIMD instructions. This approach reduces standard update/physics overhead, providing massive performance increases suitable for complex 3D digital simulation twins and high-tier competitive gameplay ecosystems.
            </p>
          </div>

          {/* Visual Micro Achievements row centered */}
          <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-6 font-mono w-full max-w-xl">
            <div className="bg-surface/50 p-3 rounded border border-white/5 text-center">
              <div className="text-xl font-bold text-primary">10K+</div>
              <div className="text-[9px] text-on-surface-variant uppercase mt-1">Concur. entities simulated</div>
            </div>
            <div className="bg-surface/50 p-3 rounded border border-white/5 text-center">
              <div className="text-xl font-bold text-secondary">400%</div>
              <div className="text-[9px] text-on-surface-variant uppercase mt-1">Throughput optimization gain</div>
            </div>
            <div className="bg-surface/50 p-3 rounded border border-white/5 text-center">
              <div className="text-xl font-bold text-tertiary">0.0ms</div>
              <div className="text-[9px] text-on-surface-variant uppercase mt-1">MainThread GC Alloc profile</div>
            </div>
          </div>

        </div>
      </section>

      {/* Technical Deployments Section (Projects) */}
      <section id="deployments" className="py-20 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                <span className="font-mono text-[10px] tracking-widest text-secondary uppercase font-bold">
                  PRODUCTION_LOGS // REPOS_LAUNCHED
                </span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                PRODUCTION_DEPLOYMENTS
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-surface-container/60 p-1 rounded-lg border border-white/5 font-mono text-[10px] font-bold">
              {(['All', 'Simulation', 'Games'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded transition-all uppercase ${
                    selectedCategory === cat
                      ? 'bg-primary text-[#0c0b0c] font-black'
                      : 'text-on-surface-variant hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid Layout */}
          {selectedCategory === 'Simulation' ? (
            <div className="space-y-8 w-full" id="projects-grid">
              {/* Progression Callout Banner */}
              <div className="p-6 rounded-lg bg-surface-container/30 border border-[#4edea3]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#4edea3] font-bold uppercase tracking-widest block">// PROFESSIONAL_EXPANSION_INDEX</span>
                  <h4 className="font-mono text-sm font-bold text-white uppercase">CAREER METAMORPHOSIS</h4>
                  <p className="text-on-surface-variant text-xs max-w-2xl leading-relaxed">
                    Started by building the digital twin platform. Progressed into architecting the simulation systems that bring those digital twins to life.
                  </p>
                </div>
                <div className="font-mono text-[10px] text-right text-on-surface-variant/70 border-l md:border-l border-white/5 pl-4 shrink-0">
                  <span className="text-[#4edea3] font-bold block">GAEA SYSTEMS ➔ PRESENT</span>
                  <span>SYS_EVOLUTION: LEVEL_UP</span>
                </div>
              </div>

              {/* The Interactive Dual-Card Progression Map */}
              <div className="grid md:grid-cols-12 gap-6 items-stretch relative">
                
                {/* CARD 1: Early Career - Digital Twin Builder */}
                <div 
                  onClick={() => {
                    const dtProject = projectsData.find(pr => pr.id === 'digital-twin-builder');
                    if (dtProject) setActiveProject(dtProject);
                  }}
                  className="md:col-span-5 group cursor-pointer bg-surface-container-low border border-white/5 hover:border-primary/20 hover:bg-surface/30 rounded-lg p-6 flex flex-col justify-between transition-all relative overflow-hidden h-[460px] shadow-lg"
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[9px] text-primary bg-primary/10 border border-primary/25 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                        SYS_MOD_01 // EARLY CAREER
                      </span>
                      <span className="font-mono text-[9px] text-on-surface-variant uppercase">
                        GAEA PLATFORM
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#a0a3ff] tracking-widest uppercase block mb-1">
                      UNITY DEVELOPER
                    </span>
                    <h4 className="font-mono text-base font-black text-white uppercase group-hover:text-primary transition-colors leading-tight">
                      Digital Twin Builder Platform
                    </h4>

                    {/* Blueprint style Visual Grid representing early career construction layout */}
                    <div className="my-4 h-32 bg-background/50 border border-white/5 rounded relative overflow-hidden flex flex-col justify-center items-center">
                      {/* Absolute layout grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(173,198,255,0.05),transparent_70%)] pointer-events-none" />
                      <div className="relative font-mono text-[9px] text-on-surface-variant/80 text-center space-y-1 select-none pointer-events-none">
                        <div className="text-primary font-bold">[BLUEPRINT_LOAD_OK]</div>
                        <div>+ BUILDER_GRID: 250m x 250m</div>
                        <div>+ LAYOUT: [STATIC_RACKS, CONVEYORS]</div>
                        <div className="text-[8px] text-on-surface-variant/40">SERIALIZER_V1.0 // DATA_LOADED</div>
                      </div>
                      {/* Asset placement outline */}
                      <div className="absolute bottom-2 right-2 border border-primary/20 bg-primary/5 rounded px-1 py-0.5 font-mono text-[8px] text-primary">
                        PLACEMENT_FLOW
                      </div>
                    </div>

                    <p className="text-on-surface-variant text-xs mt-2 line-clamp-3 leading-relaxed">
                      Worked on the core platform used to create and configure warehouse digital twins. Contributed to the development of a highly customizable warehouse builder that allows users to construct warehouse layouts, place equipment, define workflows, and visualize operations in real time.
                    </p>
                  </div>

                  <div>
                    {/* Tech highlighted */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {["Unity", "C#", "Tool Dev", "Serialization"].map((t, idx) => (
                        <span key={idx} className="text-[8px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[#a0a3ff] uppercase font-bold">
                          #{t.replace(' ', '')}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[9px] font-mono text-[#a0a3ff] font-bold">STABLE LOAD STAGE</span>
                      <span className="text-xs font-mono text-primary group-hover:text-secondary font-bold flex items-center gap-1 transition-colors uppercase text-[10px]">
                        VIEW_CASE_STUDY
                        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* CONNECTOR TIMELINE PIPELINE */}
                <div className="md:col-span-2 flex flex-col justify-center items-center relative py-4 sm:py-0 select-none">
                  {/* Vertical dotted connector logic */}
                  <div className="hidden md:flex flex-col items-center h-full w-full justify-between py-12 relative">
                    <div className="absolute inset-y-0 left-1/2 -ml-[1px] border-l-2 border-dashed border-white/10 w-0"></div>
                    
                    <div className="bg-[#0c0b0c] z-10 px-2 py-1 border border-[#4edea3]/20 bg-[#4edea3]/5 rounded text-[#4edea3] font-mono text-[8px] font-black tracking-widest uppercase">
                      PROGRESSED
                    </div>
                    
                    {/* Neon animated status block details */}
                    <div className="bg-[#0c0b0c] z-10 p-2.5 border border-white/5 rounded-lg text-center space-y-1 max-w-[124px] shadow-lg">
                      <span className="text-[#a0a3ff] font-mono text-[8px] font-bold block">// SHIFT</span>
                      <p className="font-sans text-[10px] text-on-surface-variant leading-tight font-medium">
                        Moving from static layout editors to large-scale dynamic solvers
                      </p>
                    </div>

                    <div className="bg-[#0c0b0c] z-10 px-2 py-1 border border-white/10 rounded font-mono text-[9px] text-on-surface-variant uppercase font-bold">
                      ROLE_UPGRADED
                    </div>
                  </div>

                  {/* Mobile representation (Horizontal line or compact chevron container) */}
                  <div className="flex md:hidden items-center justify-center gap-4 py-2 w-full my-1 relative">
                    <div className="absolute inset-x-0 top-1/2 -mt-[1px] border-t-2 border-dashed border-white/10 h-0"></div>
                    <span className="bg-[#0c0b0c] z-10 px-2.5 py-0.5 border border-[#4edea3]/35 bg-[#4edea3]/5 rounded text-[#4edea3] font-mono text-[8px] font-bold">
                      CAREER ROADMAP SHIFT ➔
                    </span>
                  </div>
                </div>

                {/* CARD 2: Current/Senior - Real-Time Simulation Engine */}
                <div 
                  onClick={() => {
                    const simProject = projectsData.find(pr => pr.id === 'warehouse-simulation-engine');
                    if (simProject) setActiveProject(simProject);
                  }}
                  className="md:col-span-5 group cursor-pointer bg-[#0e0f0e] border border-[#4edea3]/30 hover:border-[#4edea3]/70 hover:bg-[#121612]/30 rounded-lg p-6 flex flex-col justify-between transition-all relative overflow-hidden h-[460px] shadow-[0_0_25px_rgba(78,222,163,0.06)] hover:shadow-[0_0_35px_rgba(78,222,163,0.15)] ring-1 ring-[#4edea3]/10"
                >
                  {/* Neon top highlight pulse indicator */}
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-[#4edea3] opacity-80 group-hover:opacity-100 transition-all"></div>
                  <div className="absolute top-1 right-2 font-mono text-[7px] text-[#4edea3] tracking-widest animate-pulse font-extrabold">// ACTIVE_HERO_SYSTEM</div>
                  
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[9px] text-[#4edea3] bg-[#4edea3]/10 border border-[#4edea3]/20 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                        SYS_MOD_02 // SYSTEM_ARCHITECT
                      </span>
                      <span className="font-mono text-[9px] text-[#4edea3] font-bold uppercase">
                        CURRENT // ACTIVE
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#4edea3] tracking-widest uppercase block mb-1">
                      SENIOR UNITY DEVELOPER
                    </span>
                    <h4 className="font-mono text-base font-black text-white uppercase group-hover:text-[#4edea3] transition-colors leading-tight">
                      Real-Time Simulation Engine
                    </h4>

                    {/* Active Simulation Dashboard diagram */}
                    <div className="my-4 h-32 bg-background/80 border border-[#4edea3]/20 rounded relative overflow-hidden flex flex-col justify-center items-center">
                      {/* Absolute layout grid */}
                      <div className="absolute inset-0 bg-[#0e0f0e] bg-[linear-gradient(to_right,rgba(78,222,163,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(78,222,163,0.04)_1px,transparent_1px)] bg-[size:8px_8px]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(78,222,163,0.08),transparent_70%)] pointer-events-none" />
                      
                      {/* Simulated timeline & live agents graphics */}
                      <div className="absolute top-2 left-2 flex items-center gap-1 font-mono text-[7px] text-[#4edea3]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4edea3] animate-ping" />
                        <span>LIVE_SIM_TICK: 4210ms</span>
                      </div>

                      <div className="relative font-mono text-[9px] text-[#4edea3] text-center space-y-1 px-4 select-none pointer-events-none">
                        <div className="font-black tracking-widest uppercase">// SNAPSHOT_ENGINE_ACTIVE</div>
                        <div className="text-[8px] text-white/80 font-medium">10,000+ AGENT_THREADS SYNCHRONIZED</div>
                        {/* Draw animated progress line representing timeline player scrubbing */}
                        <div className="mt-2 w-36 h-1 w-full bg-white/10 rounded overflow-hidden">
                          <div className="h-full bg-[#4edea3] w-[75%] shadow-[0_0_8px_#4edea3]" />
                        </div>
                        <div className="text-[7px] text-on-surface-variant flex justify-between gap-2 mt-0.5 font-bold">
                          <span>00:00:00</span>
                          <span>SCRUBBING_PLAYBACK</span>
                          <span>23:59:59</span>
                        </div>
                      </div>

                      {/* Pathfinding vector tag overlay */}
                      <div className="absolute bottom-2 left-2 border border-[#4edea3]/30 bg-[#4edea3]/5 rounded px-1 py-0.5 font-mono text-[7px] text-[#4edea3]">
                        A* PATH_SOLVER_OK
                      </div>
                    </div>

                    <p className="text-on-surface-variant text-xs mt-2 line-clamp-3 leading-relaxed">
                      Currently leading development of advanced warehouse simulation systems capable of modeling real-world logistics operations. Responsible for designing scalable simulation architecture that powers planning, visualization, playback, and operational analysis.
                    </p>
                  </div>

                  <div>
                    {/* Tech highlighted */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {["Systems Arch", "State Playback", "Dynamic Pathfinding", "Snapshot-Sync"].map((t, idx) => (
                        <span key={idx} className="text-[8px] font-mono bg-[#4edea3]/10 border border-[#4edea3]/20 px-1.5 py-0.5 rounded text-[#4edea3] uppercase font-bold">
                          #{t.replace(' ', '')}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[9px] font-mono text-[#4edea3] font-bold">EXPERIENCE IMPACT STAGE</span>
                      <span className="text-xs font-mono text-[#4edea3] group-hover:text-white font-bold flex items-center gap-1 transition-colors uppercase text-[10px]">
                        DIAGNOSE_SIMULATOR
                        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6" id="projects-grid">
              {filteredProjects.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  className="group cursor-pointer bg-surface-container-low border border-white/5 hover:border-primary/20 hover:bg-surface/40 rounded-lg p-6 flex flex-col justify-between transition-all relative overflow-hidden h-[240px]"
                >
                  {/* Visual top indicator highlighting active card on hover */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>

                  <div>
                    {/* Serial and Category */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[9px] text-primary bg-primary/10 border border-primary/25 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                        {p.serial}
                      </span>
                      <span className="font-mono text-[10px] text-on-surface-variant text-[10px] uppercase">
                        {p.category} // AGENT_COMPILED
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-mono text-base font-bold text-white uppercase group-hover:text-primary transition-colors">
                      {p.title}
                    </h4>

                    {/* Brief Description */}
                    <p className="text-on-surface-variant text-xs mt-2 line-clamp-3 leading-relaxed">
                      {p.problem}
                    </p>
                  </div>

                  {/* Card footer detail launch trigger */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <div className="flex gap-1.5">
                      {p.tech.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[9px] font-mono text-on-surface-variant uppercase">
                          #{t.replace(' ', '')}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-primary group-hover:text-secondary font-bold flex items-center gap-1 transition-colors uppercase text-[10px]">
                      DIAGNOSE_SYSTEM_CORE
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Skills Matrix Section */}
      <SkillMatrices />

      {/* Production Line Timeline Section */}
      <section id="timeline" className="py-20 border-b border-white/5 relative bg-[#111012]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary"></span>
              <span className="font-mono text-[10px] tracking-widest text-tertiary uppercase font-bold">
                TIMELINE_HISTORY // CHRONO_LOG
              </span>
            </div>
            <h3 className="font-mono text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              PRODUCTION_HISTORY_STREAM
            </h3>
          </div>

          {/* Timeline Node Chain */}
          <div className="relative border-l border-white/5 pl-6 sm:pl-8 space-y-12 ml-4">
            {timelineData.map((node, idx) => {
              const isExpanded = !!expandedTimeline[idx];
              const isSenior = node.isSeniorHighlight;
              const isPromoted = node.isPromotionHighlight;

              // Stages logic representing progression story
              const stageLabels = [
                "STAGE_04 // SIMULATION_ARCHITECTURE_ENGINEERING",
                "STAGE_03 // PLATFORM_ENGINEERING_TOOL_FOUNDATION",
                "STAGE_02 // USER_EXPERIENCE_FRONTEND_DYNAMICS",
                "STAGE_01 // GENERALIST_GAMEPLAY_DEVELOPMENT"
              ];
              const stageLabel = stageLabels[idx] || "";

              return (
                <div key={idx} className="relative group">
                  
                  {/* Dot link anchor */}
                  {isSenior ? (
                    <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex items-center justify-center">
                      <span className="absolute h-5 w-5 rounded-full bg-[#4edea3]/20 animate-ping" />
                      <span className="relative h-4 w-4 rounded-full bg-[#0c0b0c] border-[3px] border-[#4edea3] z-10" />
                    </div>
                  ) : (
                    <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3 w-3 rounded-full bg-slate-900 border-2 border-primary group-hover:border-[#a0a3ff] transition-colors" />
                  )}

                  {/* Timeline info body check */}
                  <div 
                    className={`rounded-lg p-5 sm:p-6 transition-all border relative overflow-hidden cursor-pointer ${
                      isSenior 
                        ? 'bg-[#0e0f0e] border-[#4edea3]/30 hover:border-[#4edea3]/60 shadow-[0_0_20px_rgba(78,222,163,0.05)] shadow-inner ring-1 ring-[#4edea3]/10' 
                        : 'bg-surface-container-low border-white/5 hover:border-primary/20 hover:bg-surface/30'
                    }`}
                    onClick={() => {
                      setExpandedTimeline(prev => ({
                        ...prev,
                        [idx]: !prev[idx]
                      }));
                    }}
                  >
                    
                    {/* Stage Index Accent */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-mono text-[8px] text-on-surface-variant/60 tracking-widest uppercase">
                        {stageLabel}
                      </div>
                      {isSenior && (
                        <span className="font-mono text-[7px] text-[#4edea3] font-bold bg-[#4edea3]/10 px-1.5 py-0.5 rounded tracking-wide border border-[#4edea3]/20">
                          // STAR_ACHIEVEMENT_HIGHEST_IMPACT
                        </span>
                      )}
                    </div>

                    {/* Timeline Header Info */}
                    <div className="flex flex-wrap items-start justify-between gap-2.5 pb-2 border-b border-white/5 mb-3.5">
                      <div>
                        {node.company && (
                          <span className={`font-mono text-[10px] uppercase font-bold block ${isSenior ? 'text-[#4edea3]' : 'text-primary'}`}>
                            {node.company}
                          </span>
                        )}
                        <h4 className="font-mono text-sm sm:text-base font-black text-white uppercase mt-1 flex flex-wrap items-center gap-2">
                          {node.role}
                          {isPromoted && (
                            <span className="text-[9px] font-mono font-bold text-white bg-gradient-to-r from-primary to-[#4edea3] px-2 py-0.5 rounded border border-[#4edea3]/30 uppercase tracking-widest animate-pulse">
                              ➔ PROMOTION_ELEVATION
                            </span>
                          )}
                        </h4>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded font-mono text-[9px] font-bold ${
                        isSenior 
                          ? 'bg-[#4edea3]/10 border border-[#4edea3]/20 text-[#4edea3]' 
                          : 'bg-white/5 border border-white/10 text-on-surface-variant'
                      }`}>
                        {node.period}
                      </span>
                    </div>

                    {/* Career Transition Narrative Accent */}
                    {isPromoted && (
                      <div className="mb-4 bg-gradient-to-r from-[#4edea3]/5 to-transparent border-l-2 border-[#4edea3] p-2.5 rounded-r">
                        <span className="font-mono text-[8px] text-[#4edea3] font-black uppercase tracking-widest block">
                          // DIRECT ROADMAP TRANSITION
                        </span>
                        <p className="font-sans text-[11px] text-on-surface-variant italic leading-relaxed">
                          Elevated internally within Gaea Global Technologies; transitioned from engineering layout editors to designing deterministic simulation runtimes.
                        </p>
                      </div>
                    )}

                    <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-4">
                      {node.description}
                    </p>

                    {/* Expandable Indicator Button */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-on-surface-variant/40">
                        {isExpanded ? 'SPECS: EXPANDED' : 'SPECS: CLAMPED'}
                      </span>
                      <button 
                        className={`font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1 rounded transition-all ${
                          isSenior ? 'text-[#4edea3] hover:border-[#4edea3]/30' : 'text-primary'
                        }`}
                      >
                        {isExpanded ? (
                          <>
                            COLLAPSE SPECS <ChevronUp size={11} />
                          </>
                        ) : (
                          <>
                            DECRYPT_TECHNICAL_SPECS <ChevronDown size={11} />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Collapsible details wrapper */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                        
                        {/* Key achievements & contributions */}
                        {node.responsibilities && node.responsibilities.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-on-surface-variant/80 text-[10px] uppercase font-bold font-mono tracking-wider block">
                              // KEY_CONTRIBUTIONS_AND_IMPACT
                            </span>
                            <ul className="space-y-1.5 text-xs text-on-surface-variant font-mono">
                              {node.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx} className="flex gap-2 items-start leading-relaxed">
                                  <span className={`shrink-0 mt-0.5 select-none ${isSenior ? 'text-[#4edea3]' : 'text-primary'}`}>➔</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Focus Areas list */}
                        {node.focusAreas && (
                          <div className="space-y-1.5">
                            <span className="text-on-surface-variant/80 text-[10px] uppercase font-bold font-mono tracking-wider block">
                              // SPECIALIZED_FOCUS_AERAS
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {node.focusAreas.map((area, aIdx) => (
                                <span 
                                  key={aIdx} 
                                  className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${
                                    isSenior 
                                      ? 'bg-[#4edea3]/5 border border-[#4edea3]/10 text-[#55eaab]' 
                                      : 'bg-primary/5 border border-primary/10 text-primary'
                                  }`}
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Interactive Key Takeaway quote */}
                        {node.keyTakeaway && (
                          <div className={`mt-3 border-l-2 p-3 font-mono text-[11px] text-on-surface-variant italic rounded-r ${
                            isSenior 
                              ? 'border-[#4edea3]/40 bg-[#4edea3]/5' 
                              : 'border-primary/35 bg-primary/5'
                          }`}>
                            <span className="font-sans font-bold not-italic block text-[9px] uppercase tracking-widest text-on-surface/40 mb-1">
                              // EVOLUTIONARY TAKEAWAY:
                            </span>
                            "{node.keyTakeaway}"
                          </div>
                        )}

                      </div>
                    )}

                    {/* Default visual Tags on foot */}
                    {!isExpanded && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                        {node.tags.map((tag, tagIdx) => (
                          <span 
                            key={tagIdx} 
                            className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase ${
                              isSenior 
                                ? 'bg-[#4edea3]/5 border border-[#4edea3]/15 text-[#4edea3]' 
                                : 'bg-primary/5 border border-primary/10 text-primary'
                            }`}
                          >
                            #{tag.replace(' ', '')}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Engineering Philosophy Cards Section */}
      <section id="philosophy" className="py-20 border-b border-white/5 relative bg-[#0c0b0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span className="font-mono text-[10px] tracking-widest text-primary uppercase font-bold">
                PHILOSOPHY // STRICT_ALGORITHMIC_RULES
              </span>
            </div>
            <h3 className="font-mono text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              ENGINEERING_POLICIES
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface-container-low border border-white/5 rounded-lg">
              <div className="bg-primary/10 text-primary w-8 h-8 rounded flex items-center justify-center mb-4 border border-primary/20">
                <Sliders size={16} />
              </div>
              <h4 className="font-mono text-sm font-bold text-white uppercase mb-2">// DATA_ORIENTED_COMPACTION</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Prioritize flat data layout arrays. Maintain spatial linearity inside native lists to minimize CPU cache line misses and bypass garbage collection allocation cycles entirely.
              </p>
            </div>

            <div className="p-6 bg-surface-container-low border border-white/5 rounded-lg">
              <div className="bg-secondary/10 text-secondary w-8 h-8 rounded flex items-center justify-center mb-4 border border-secondary/20">
                <Workflow size={16} />
              </div>
              <h4 className="font-mono text-sm font-bold text-white uppercase mb-2">// STRICT_SEPARATION</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Adhere to strict decoupled logic models where data containers inherit zero state computation patterns, preventing interdependency spaghetti networks in large scale systems.
              </p>
            </div>

            <div className="p-6 bg-surface-container-low border border-white/5 rounded-lg">
              <div className="bg-tertiary/10 text-tertiary w-8 h-8 rounded flex items-center justify-center mb-4 border border-tertiary/20">
                <Target size={16} />
              </div>
              <h4 className="font-mono text-sm font-bold text-white uppercase mb-2">// RUTHLESS_METRIC_PROFILING</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Every code deployment is evaluated relative to systemic execution milliseconds. Optimize until frames render smoothly on basic platforms and allocations measure exactly zero.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Segment */}
      <Testimonials />

      {/* Establish Connection Section (Contact Form) */}
      <section id="contact" className="py-20 bg-[#111012]/60 relative">
        <div className="max-w-xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col items-center text-center space-y-6">
          
          <div className="flex flex-col items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-mono text-[10px] tracking-widest text-[#4edea3] uppercase font-bold">
              SPEC_SHEET // ACCESS
            </span>
          </div>
          
          <h3 className="font-mono text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            RETRIEVE SPECIFICATION SHEET
          </h3>

          <p className="text-on-surface-variant text-xs leading-relaxed max-w-md">
            Download the complete interactive technical experience summary including detailed architectural structures and performance evaluations.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 font-mono text-xs text-on-surface-variant pb-2">
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-primary" />
              <span>sabhari.thirumurugan@gmail.com</span>
            </div>
            <span className="hidden sm:inline text-white/10">|</span>
            <div className="flex items-center gap-2">
              <Activity size={13} className="text-secondary" />
              <span>System status: AVAILABLE_FOR_HIRE</span>
            </div>
          </div>

          {/* Resume mock receipt block */}
          <div className="w-full p-6 bg-surface-container border border-primary/20 rounded-lg text-left max-w-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[9px] text-[#adc6ff] font-extrabold uppercase tracking-wider">// SPEC_SHEET_RECEIPT</span>
              <span className="text-[8px] font-mono text-on-surface-variant">v2.4 (C#)</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-tight mb-4">
              Click the button below to generate and retrieve the high-fidelity professional resume PDF specifying key competency matrices.
            </p>
            
            <button 
              onClick={generateResumePDF}
              className="w-full py-2.5 bg-primary/10 border border-primary text-primary hover:bg-primary text-[10px] hover:text-[#0c0b0c] font-bold font-mono tracking-widest uppercase rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Download size={11} />
              RETRIEVE_SPEC_SHEET
            </button>
          </div>

        </div>
      </section>

      {/* Footer copyright stats */}
      <footer className="py-8 bg-black/80 border-t border-white/5 font-mono text-[10px] text-on-surface-variant/70 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-1">
          <p>© 2026 SABHARI_SHRINIVAS Systems Group. Built with zero heap allocations.</p>
          <p className="opacity-40">Compiled target: WebAssembly & Mono C# VM pipeline modules. Handshaked securely.</p>
        </div>
      </footer>

      {/* Floating collapsible/interactive developer diagnostics console Terminal */}
      <Terminal />

      {/* Full diagnostic specs detailed modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ProjectModal 
              project={activeProject} 
              onClose={() => setActiveProject(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
