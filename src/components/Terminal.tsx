import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ShieldAlert, Cpu, Database, ChevronRight, X, Play } from 'lucide-react';

interface LogLine {
  text: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'input';
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<LogLine[]>([
    { text: 'SABHARI SYSTEM SYSTEMS V4.1.0-COMPILED', type: 'info' },
    { text: 'REGISTERED ALL CORE MONOBEHAVIOR AND DOTS PIPELINES.', type: 'success' },
    { text: 'Type "help" to list available diagnostic instructions.', type: 'info' }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto Scroll down to latest command response
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: LogLine[] = [...history, { text: `> ${inputVal}`, type: 'input' }];

    switch (cmd) {
      case 'help':
        newLogs.push(
          { text: 'Available commands:', type: 'info' },
          { text: '  - help: Run structural analysis.', type: 'info' },
          { text: '  - skills: Retrieve developer skill metrics.', type: 'info' },
          { text: '  - projects: List active production deployments.', type: 'info' },
          { text: '  - optimize: Execute memory/allocation diagnostics.', type: 'warning' },
          { text: '  - clear: Purge screen diagnostics buffer.', type: 'info' }
        );
        break;
      case 'skills':
        newLogs.push(
          { text: 'CRITICAL CAPABILITIES PILLARS:', type: 'success' },
          { text: '  [SYSTEMS] Unity ECS & DOTS Architecture', type: 'info' },
          { text: '  [LANGUAGES] C# Optimization', type: 'info' },
          { text: '  [DYNAMICS] Custom Physics & Locomotion Engines', type: 'info' },
          { text: '  [GRAPHICS] SRP custom VFX / Shader Graph pipelines', type: 'info' }
        );
        break;
      case 'projects':
        newLogs.push(
          { text: 'ACTIVE DEPLOYMENT REPOSITORIES:', type: 'success' },
          { text: '  - SYS_MOD_01: Warehouse Digital Twin (ECS DOTS & Job System)', type: 'info' },
          { text: '  - SYS_MOD_02: Autonomous Spatial Grid (Procedural Pathfinding)', type: 'info' },
          { text: '  - SYS_MOD_03: Kitchen Chaos (Polymorphic State Simulator)', type: 'info' },
          { text: '  - SYS_MOD_04: Pedometer Hero (Mobile RPG & Addressables)', type: 'info' },
          { text: '  - SYS_MOD_05: Space Impact (Zero-Alloc Object Pooler)', type: 'info' },
          { text: '  - SYS_MOD_06: Zombie Hunter (NavMesh Tactics & Raycasters)', type: 'info' }
        );
        break;
      case 'optimize':
        newLogs.push(
          { text: 'INITIATING RE-ALLOCATION CLEANUP PROTOCOL...', type: 'warning' },
          { text: 'Scanning heap allocations...', type: 'info' },
          { text: 'GC Allocations detected in MainThread (14.2% threshold).', type: 'warning' },
          { text: 'Optimizing and caching structs using Burst-optimized NativeArrays...', type: 'info' },
          { text: 'SYSTEM BUFFER CONSOLIDATED. MainThread GC Alloc normalized to 0.00ms!', type: 'success' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        newLogs.push({ text: `ERR: Directive "${cmd}" not recognized by processor. Type "help"`, type: 'error' });
    }

    setHistory(newLogs);
    setInputVal('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40" id="terminal-interface">
      {/* Mini state button when minimized */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-slate-900 border border-primary/40 hover:border-secondary text-primary hover:text-secondary p-3 px-4 rounded-lg shadow-lg font-mono text-xs transition-all uppercase tracking-wider"
        >
          <TerminalIcon size={14} className="animate-pulse" />
          <span>DIAGNOSTICS_PORT</span>
        </button>
      )}

      {/* Actual terminal sliding window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-96 bg-background/95 border border-primary/50 rounded-lg flex flex-col overflow-hidden shadow-[0_0_40px_rgba(173,198,255,0.2)]">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 bg-slate-900/80 border-b border-primary/20 text-[11px] font-mono text-on-surface-variant font-bold">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <span>TERMINAL_SESSION // INTR_MUSE_SYS</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-on-surface-variant hover:text-error transition"
            >
              <X size={14} />
            </button>
          </div>

          {/* Console Area */}
          <div className="flex-grow p-4 overflow-y-auto font-mono text-xs space-y-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {history.map((log, idx) => (
              <div
                key={idx}
                className={`leading-relaxed break-words ${
                  log.type === 'success'
                    ? 'text-secondary'
                    : log.type === 'warning'
                    ? 'text-primary'
                    : log.type === 'error'
                    ? 'text-error font-semibold'
                    : log.type === 'input'
                    ? 'text-white'
                    : 'text-on-surface-variant'
                }`}
              >
                {log.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleCommand} className="flex border-t border-primary/20 bg-slate-950 p-2">
            <span className="text-secondary font-mono text-xs mr-2 self-center font-bold">{`>`}</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Command (help, optimize, skills, projects)..."
              className="flex-grow font-mono text-xs text-white bg-transparent outline-none border-none py-1 focus:ring-0"
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
}
