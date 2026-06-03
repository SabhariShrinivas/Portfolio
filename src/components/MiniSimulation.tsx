import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RefreshCw, Layers, Shield, Zap, ChevronRight, Sliders, CheckCircle2 } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
}

interface PhysicBlock {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  mass: number;
  type: 'gc_allocation' | 'spaghetti_stack' | 'thread_mutex' | 'bug_core';
  health: number;
  maxHealth: number;
  color: string;
  label: string;
}

interface Probe {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  active: boolean;
  launched: boolean;
}

export default function MiniSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [activeLevel, setActiveLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [launchesCount, setLaunchesCount] = useState(0);
  const [bugsRemaining, setBugsRemaining] = useState(0);
  const [fps, setFps] = useState(60);
  const [physicsGravity, setPhysicsGravity] = useState(0.24);
  const [launchDamping, setLaunchDamping] = useState(0.12); // Speed multiplier
  const [isLevelCleared, setIsLevelCleared] = useState(false);

  // Slingshot / Launch controls state
  const slingshotPos = { x: 90, y: 260 };
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Physics simulation refs
  const blocksRef = useRef<PhysicBlock[]>([]);
  const probeRef = useRef<Probe>({ x: slingshotPos.x, y: slingshotPos.y, vx: 0, vy: 0, radius: 8, active: true, launched: false });
  const particlesRef = useRef<Particle[]>([]);
  const canvasSizeRef = useRef({ width: 600, height: 380 });
  const animationFrameRef = useRef<number | null>(null);

  // Stats
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);
  const fpsIntervalRef = useRef<number>(0);

  // Level configuration
  const levels = [
    {
      name: "HEAP_ALLOCATION_MONOLITH",
      description: "Tear down the GC memory stack holding the bug cores",
      setup: (w: number, h: number): PhysicBlock[] => {
        const blocks: PhysicBlock[] = [];
        const baseLineY = h - 22;
        const startX = w * 0.65;

        // Level 1: Pyramid of GC blocks
        // Ground rows
        for (let i = 0; i < 3; i++) {
          const bw = 35;
          const bh = 45;
          blocks.push({
            id: `b_1_1_${i}`,
            x: startX + i * 42,
            y: baseLineY - bh,
            width: bw,
            height: bh,
            vx: 0,
            vy: 0,
            mass: 1.5,
            type: 'gc_allocation',
            health: 120,
            maxHealth: 120,
            color: '#adc6ff',
            label: 'GC_ALLOC'
          });
        }

        // Bridge board
        blocks.push({
          id: `b_1_bridge`,
          x: startX - 5,
          y: baseLineY - 90,
          width: 130,
          height: 12,
          vx: 0,
          vy: 0,
          mass: 2.0,
          type: 'spaghetti_stack',
          health: 150,
          maxHealth: 150,
          color: '#c0c1ff',
          label: 'MEM_BUFFER_STACK'
        });

        // Bug cores resting on top
        blocks.push({
          id: `bug_1_1`,
          x: startX + 20,
          y: baseLineY - 115,
          width: 20,
          height: 20,
          vx: 0,
          vy: 0,
          mass: 0.8,
          type: 'bug_core',
          health: 20,
          maxHealth: 20,
          color: '#ffb4ab',
          label: '#ERR'
        });

        blocks.push({
          id: `bug_1_2`,
          x: startX + 80,
          y: baseLineY - 115,
          width: 20,
          height: 20,
          vx: 0,
          vy: 0,
          mass: 0.8,
          type: 'bug_core',
          health: 20,
          maxHealth: 20,
          color: '#ffb4ab',
          label: '#ERR'
        });

        return blocks;
      }
    },
    {
      name: "SPAGHETTI_THREAD_BLOCK",
      description: "Crack the rigid Mutex towers shielding nested bug structures",
      setup: (w: number, h: number): PhysicBlock[] => {
        const blocks: PhysicBlock[] = [];
        const baseLineY = h - 22;
        const startX = w * 0.62;

        // Custom High vertical pillars
        blocks.push({
          id: `b_2_pil_1`,
          x: startX,
          y: baseLineY - 90,
          width: 20,
          height: 90,
          vx: 0,
          vy: 0,
          mass: 3.0,
          type: 'thread_mutex',
          health: 180,
          maxHealth: 180,
          color: '#4edea3',
          label: 'MUTEX_LOCK'
        });

        blocks.push({
          id: `b_2_pil_2`,
          x: startX + 100,
          y: baseLineY - 90,
          width: 20,
          height: 90,
          vx: 0,
          vy: 0,
          mass: 3.0,
          type: 'thread_mutex',
          health: 180,
          maxHealth: 180,
          color: '#4edea3',
          label: 'MUTEX_LOCK'
        });

        // Top shield board
        blocks.push({
          id: `b_2_roof`,
          x: startX - 10,
          y: baseLineY - 105,
          width: 140,
          height: 15,
          vx: 0,
          vy: 0,
          mass: 2.5,
          type: 'spaghetti_stack',
          health: 120,
          maxHealth: 120,
          color: '#c0c1ff',
          label: 'SPAGHETTI'
        });

        // Bug core in the middle slot
        blocks.push({
          id: `bug_2_nested`,
          x: startX + 45,
          y: baseLineY - 30,
          width: 24,
          height: 24,
          vx: 0,
          vy: 0,
          mass: 1.0,
          type: 'bug_core',
          health: 30,
          maxHealth: 30,
          color: '#ffb4ab',
          label: '#ERR'
        });

        // Bug core on the roof
        blocks.push({
          id: `bug_2_top`,
          x: startX + 45,
          y: baseLineY - 135,
          width: 24,
          height: 24,
          vx: 0,
          vy: 0,
          mass: 1.0,
          type: 'bug_core',
          health: 30,
          maxHealth: 30,
          color: '#ffb4ab',
          label: '#ERR'
        });

        return blocks;
      }
    },
    {
      name: "COMPUTE_SHIFTER_MUTEX",
      description: "Shatter the double decker grid with high impact vectors",
      setup: (w: number, h: number): PhysicBlock[] => {
        const blocks: PhysicBlock[] = [];
        const baseLineY = h - 22;
        const startX = w * 0.6;

        // Triple pillars, nested boards
        for (let col = 0; col < 3; col++) {
          const px = startX + col * 55;
          blocks.push({
            id: `b_3_pillar_${col}`,
            x: px,
            y: baseLineY - 60,
            width: 16,
            height: 60,
            vx: 0,
            vy: 0,
            mass: 2.0,
            type: 'gc_allocation',
            health: 100,
            maxHealth: 100,
            color: '#adc6ff',
            label: 'GC_ALLOC'
          });
        }

        // Bridge board level 1
        blocks.push({
          id: `b_3_board_1`,
          x: startX - 5,
          y: baseLineY - 72,
          width: 130,
          height: 12,
          vx: 0,
          vy: 0,
          mass: 2.0,
          type: 'spaghetti_stack',
          health: 100,
          maxHealth: 100,
          color: '#c0c1ff',
          label: 'BUFFER_SYS'
        });

        // Pillar level 2
        blocks.push({
          id: `b_3_pillar2_1`,
          x: startX + 25,
          y: baseLineY - 132,
          width: 16,
          height: 60,
          vx: 0,
          vy: 0,
          mass: 1.5,
          type: 'thread_mutex',
          health: 120,
          maxHealth: 120,
          color: '#4edea3',
          label: 'MUTEX_L2'
        });

        blocks.push({
          id: `b_3_pillar2_2`,
          x: startX + 75,
          y: baseLineY - 132,
          width: 16,
          height: 60,
          vx: 0,
          vy: 0,
          mass: 1.5,
          type: 'thread_mutex',
          health: 120,
          maxHealth: 120,
          color: '#4edea3',
          label: 'MUTEX_L2'
        });

        // Top roof
        blocks.push({
          id: `b_3_roof`,
          x: startX + 10,
          y: baseLineY - 144,
          width: 90,
          height: 12,
          vx: 0,
          vy: 0,
          mass: 1.0,
          type: 'spaghetti_stack',
          health: 80,
          maxHealth: 80,
          color: '#c0c1ff',
          label: 'HEAP_CEIL'
        });

        // Bug core level 1 slots
        blocks.push({
          id: `bug_3_1`,
          x: startX + 22,
          y: baseLineY - 30,
          width: 20,
          height: 20,
          vx: 0,
          vy: 0,
          mass: 0.8,
          type: 'bug_core',
          health: 20,
          maxHealth: 20,
          color: '#ffb4ab',
          label: '#ERR'
        });

        blocks.push({
          id: `bug_3_2`,
          x: startX + 78,
          y: baseLineY - 30,
          width: 20,
          height: 20,
          vx: 0,
          vy: 0,
          mass: 0.8,
          type: 'bug_core',
          health: 20,
          maxHealth: 20,
          color: '#ffb4ab',
          label: '#ERR'
        });

        // Ultimate bug core sitting on roof
        blocks.push({
          id: `bug_3_top`,
          x: startX + 45,
          y: baseLineY - 170,
          width: 25,
          height: 25,
          vx: 0,
          vy: 0,
          mass: 1.2,
          type: 'bug_core',
          health: 40,
          maxHealth: 40,
          color: '#ffb4ab',
          label: '#FATAL'
        });

        return blocks;
      }
    }
  ];

  // Initialize level
  const initLevel = (levelIdx: number, width: number, height: number) => {
    const validLevel = levelIdx % levels.length;
    blocksRef.current = levels[validLevel].setup(width, height);
    
    // Core Reset
    probeRef.current = {
      x: slingshotPos.x,
      y: slingshotPos.y,
      vx: 0,
      vy: 0,
      radius: 9,
      active: true,
      launched: false
    };
    particlesRef.current = [];
    setIsLevelCleared(false);

    // Count initial bug cores
    const count = blocksRef.current.filter(b => b.type === 'bug_core').length;
    setBugsRemaining(count);
  };

  // Resize canvas safely
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const finalW = Math.max(width, 320);
        const finalH = Math.max(height, 280);
        
        canvas.width = finalW;
        canvas.height = finalH;
        canvasSizeRef.current = { width: finalW, height: finalH };

        initLevel(activeLevel, finalW, finalH);
      }
    });

    resizeObserver.observe(containerRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [activeLevel]);

  // Spawn visual vector spark particles
  const spawnExplosion = (x: number, y: number, color: string, count: number = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 1.5 + Math.random() * 2.5,
        alpha: 1,
        life: 1.0
      });
    }
  };

  // Drag listeners
  const getMouseCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleStartDrag = (coords: { x: number; y: number }) => {
    if (probeRef.current.launched) return; // Wait for core reset

    // Check if clicked closely to probe/slingshot
    const dx = coords.x - slingshotPos.x;
    const dy = coords.y - slingshotPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 35) {
      setDragStart(slingshotPos);
      setDragCurrent(coords);
      setIsDragging(true);

      // Lock probe to drag position
      probeRef.current.x = coords.x;
      probeRef.current.y = coords.y;
    }
  };

  const handleMoveDrag = (coords: { x: number; y: number }) => {
    if (!isDragging) return;

    // Clamp drag radius to protect elastic spring physics
    const dx = coords.x - slingshotPos.x;
    const dy = coords.y - slingshotPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDragDist = 65;

    if (dist > maxDragDist) {
      const angle = Math.atan2(dy, dx);
      probeRef.current.x = slingshotPos.x + Math.cos(angle) * maxDragDist;
      probeRef.current.y = slingshotPos.y + Math.sin(angle) * maxDragDist;
    } else {
      probeRef.current.x = coords.x;
      probeRef.current.y = coords.y;
    }

    setDragCurrent({ x: probeRef.current.x, y: probeRef.current.y });
  };

  const handleEndDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Calculate dynamic release velocity projection vector
    const dx = slingshotPos.x - probeRef.current.x;
    const dy = slingshotPos.y - probeRef.current.y;

    // Direct elastic coefficient application
    probeRef.current.vx = dx * launchDamping;
    probeRef.current.vy = dy * launchDamping;
    probeRef.current.launched = true;
    setLaunchesCount(prev => prev + 1);

    setDragStart(null);
    setDragCurrent(null);
  };

  // Main game logic loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      frameCountRef.current++;

      // Update FPS metrics
      fpsIntervalRef.current += delta;
      if (fpsIntervalRef.current >= 500) {
        setFps(Math.round((frameCountRef.current * 1000) / fpsIntervalRef.current));
        frameCountRef.current = 0;
        fpsIntervalRef.current = 0;
      }
      lastTimeRef.current = now;

      const { width, height } = canvasSizeRef.current;

      // Draw premium neon overlay background
      ctx.fillStyle = '#0d0d0f';
      ctx.fillRect(0, 0, width, height);

      // Draw vector blueprints background
      ctx.strokeStyle = 'rgba(173, 198, 255, 0.035)';
      ctx.lineWidth = 1;
      const spacing = 18;
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Ground outline
      ctx.strokeStyle = '#2b2a2d';
      ctx.fillStyle = '#121113';
      ctx.lineWidth = 2;
      ctx.fillRect(0, height - 20, width, 20);
      ctx.beginPath();
      ctx.moveTo(0, height - 20);
      ctx.lineTo(width, height - 20);
      ctx.stroke();

      // Slingshot / Launch-Pad graphics
      ctx.strokeStyle = 'rgba(173, 198, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(slingshotPos.x, height - 20);
      ctx.lineTo(slingshotPos.x, slingshotPos.y + 10);
      ctx.stroke();

      // Slingshot Fork
      ctx.beginPath();
      ctx.arc(slingshotPos.x, slingshotPos.y, 16, Math.PI, 0, false);
      ctx.stroke();

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Spark gravity
        p.alpha -= 0.022;
        p.life -= 0.022;

        if (p.alpha <= 0) return false;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      ctx.globalAlpha = 1.0; // Reset alpha

      // Trajectory visual line pre-launch
      if (isDragging && dragCurrent) {
        ctx.strokeStyle = 'rgba(78, 222, 163, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        
        const projDx = slingshotPos.x - dragCurrent.x;
        const projDy = slingshotPos.y - dragCurrent.y;
        let simX = slingshotPos.x;
        let simY = slingshotPos.y;
        let simVx = projDx * launchDamping;
        let simVy = projDy * launchDamping;

        ctx.beginPath();
        ctx.moveTo(simX, simY);

        for (let t = 0; t < 28; t++) {
          simVy += physicsGravity;
          simX += simVx;
          simY += simVy;
          if (simY > height - 20) break;
          ctx.lineTo(simX, simY);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Slingshot elastic bands
      if (isDragging && dragCurrent) {
        ctx.strokeStyle = '#4edea3';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(slingshotPos.x - 12, slingshotPos.y - 2);
        ctx.lineTo(dragCurrent.x, dragCurrent.y);
        ctx.moveTo(slingshotPos.x + 12, slingshotPos.y - 2);
        ctx.lineTo(dragCurrent.x, dragCurrent.y);
        ctx.stroke();
      }

      // Update & Draw blocks
      const groundY = height - 20;
      const blocks = blocksRef.current;

      // 1. Resolve Gravity & movement for dynamic blocks
      blocks.forEach((b) => {
        b.vy += physicsGravity; // Gravity pull

        b.x += b.vx;
        b.y += b.vy;

        // Ground constraint
        if (b.y + b.height >= groundY) {
          b.y = groundY - b.height;
          b.vy = -b.vy * 0.15; // Soft bouncy stack
          b.vx *= 0.55; // Friction slide
          if (Math.abs(b.vx) < 0.05) b.vx = 0;
        }

        // Side borders clamp
        if (b.x < 0) {
          b.x = 0;
          b.vx = -b.vx * 0.3;
        } else if (b.x + b.width > width) {
          b.x = width - b.width;
          b.vx = -b.vx * 0.3;
        }
      });

      // 2. Resolve pairwise block-to-block collisions safely
      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const b1 = blocks[i];
          const b2 = blocks[j];

          // AABB overlap check
          if (
            b1.x < b2.x + b2.width &&
            b1.x + b1.width > b2.x &&
            b1.y < b2.y + b2.height &&
            b1.y + b1.height > b2.y
          ) {
            // Overlap depth calculation
            const overlapX = Math.min(b1.x + b1.width, b2.x + b2.width) - Math.max(b1.x, b2.x);
            const overlapY = Math.min(b1.y + b1.height, b2.y + b2.height) - Math.max(b1.y, b2.y);

            if (overlapX < overlapY) {
              // Push lateral
              const b1IsLeft = b1.x + b1.width / 2 < b2.x + b2.width / 2;
              const push = overlapX / 2;

              b1.x += b1IsLeft ? -push : push;
              b2.x += b1IsLeft ? push : -push;

              // Exchange velocity vectors
              const tempVx = b1.vx;
              b1.vx = b2.vx * 0.5;
              b2.vx = tempVx * 0.5;
            } else {
              // Push vertical
              const b1IsTop = b1.y + b1.height / 2 < b2.y + b2.height / 2;
              const push = overlapY / 2;

              b1.y += b1IsTop ? -push : push;
              b2.y += b1IsTop ? push : -push;

              // Elastic impulse
              const tempVy = b1.vy;
              b1.vy = b2.vy * 0.35;
              b2.vy = tempVy * 0.35;
            }
          }
        }
      }

      // 3. Update active launched probes
      const probe = probeRef.current;
      if (probe.launched && probe.active) {
        probe.vy += physicsGravity;
        probe.x += probe.vx;
        probe.y += probe.vy;

        // Ground constraint for probe
        if (probe.y + probe.radius >= groundY) {
          probe.y = groundY - probe.radius;
          probe.vy = -probe.vy * 0.25; // bounce
          probe.vx *= 0.65; // slide-friction
          
          if (Math.abs(probe.vx) < 0.2 && Math.abs(probe.vy) < 0.2) {
            // Respawn trigger timer
            probe.active = false;
            setTimeout(() => {
              probeRef.current = {
                x: slingshotPos.x,
                y: slingshotPos.y,
                vx: 0,
                vy: 0,
                radius: 9,
                active: true,
                launched: false
              };
            }, 800);
          }
        }

        // Check bounds boundary to trigger reload
        if (probe.x > width + 100 || probe.x < -100) {
          probe.active = false;
          probeRef.current = {
            x: slingshotPos.x,
            y: slingshotPos.y,
            vx: 0,
            vy: 0,
            radius: 9,
            active: true,
            launched: false
          };
        }

        // 4. Resolve Probe-to-Block dynamics and structural collapse
        blocks.forEach((b) => {
          // Find closest point on AABB to probe center
          const closestX = Math.max(b.x, Math.min(probe.x, b.x + b.width));
          const closestY = Math.max(b.y, Math.min(probe.y, b.y + b.height));

          const dx = probe.x - closestX;
          const dy = probe.y - closestY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < probe.radius) {
            // Colliding intersection!
            const normalX = dist > 0 ? dx / dist : 1;
            const normalY = dist > 0 ? dy / dist : 0;

            // Push probe outside box bounds
            probe.x = closestX + normalX * probe.radius;
            probe.y = closestY + normalY * probe.radius;

            // Compute relative speed impact force
            const relVx = probe.vx - b.vx;
            const relVy = probe.vy - b.vy;
            const impactForce = Math.sqrt(relVx * relVx + relVy * relVy);

            // Deflect core projectile
            probe.vx = -probe.vx * 0.42;
            probe.vy = -probe.vy * 0.42;

            // Transfer momentum to block
            b.vx += relVx * 0.42;
            b.vy += relVy * 0.42;

            // Apply block depletion
            b.health -= Math.floor(impactForce * 4);

            // Visual collision telemetry spark lines
            spawnExplosion(closestX, closestY, b.color, 4);
          }
        });
      }

      // 5. Render clean system blocks
      blocksRef.current = blocksRef.current.filter((b) => {
        // Fall/depletion check
        if (b.health <= 0) {
          // Core bug defeated scoring
          if (b.type === 'bug_core') {
            setScore(prev => prev + 100);
            spawnExplosion(b.x + b.width / 2, b.y + b.height / 2, '#ffb4ab', 16);
            setBugsRemaining(prev => Math.max(0, prev - 1));
          } else {
            setScore(prev => prev + 30);
            spawnExplosion(b.x + b.width / 2, b.y + b.height / 2, b.color, 10);
          }
          return false;
        }

        // Draw block
        ctx.fillStyle = b.color;
        
        // Glow effect for Bug Cores
        if (b.type === 'bug_core') {
          ctx.shadowColor = '#ffb4ab';
          ctx.shadowBlur = Math.abs(Math.sin(Date.now() / 150)) * 10 + 4;
        }

        ctx.fillRect(b.x, b.y, b.width, b.height);
        
        // Dynamic outline warning if block is taking hits
        const healthPct = b.health / b.maxHealth;
        if (healthPct < 0.75) {
          ctx.strokeStyle = 'rgba(255, 180, 171, 0.5)';
          ctx.strokeRect(b.x + 1, b.y + 1, b.width - 2, b.height - 2);
        }

        ctx.shadowBlur = 0; // Reset shadows promptly

        // Tiny technical label centering
        ctx.fillStyle = '#111012';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(b.label, b.x + b.width / 2, b.y + b.height / 2 + 3);

        return true;
      });

      // 6. Draw probe launcher projectile
      if (probe.active) {
        ctx.fillStyle = '#4edea3';
        ctx.shadowColor = '#4edea3';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(probe.x, probe.y, probe.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Clear level state triggers
      const remainingBugs = blocksRef.current.filter(b => b.type === 'bug_core').length;
      if (remainingBugs === 0 && !isLevelCleared) {
        setIsLevelCleared(true);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [physicsGravity, launchDamping, isDragging, dragCurrent, activeLevel, isLevelCleared]);

  const handleNextLevel = () => {
    const nextLvl = (activeLevel + 1) % levels.length;
    setActiveLevel(nextLvl);
    initLevel(nextLvl, canvasSizeRef.current.width, canvasSizeRef.current.height);
  };

  const handleReset = () => {
    initLevel(activeLevel, canvasSizeRef.current.width, canvasSizeRef.current.height);
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-low rounded-lg border border-outline-variant/30 overflow-hidden" id="simulation-panel">
      {/* Simulation Header / HUD Controls */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 bg-[#111112] border-b border-outline-variant/30 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4edea3]"></span>
          </span>
          <span className="font-technical-heading text-xs uppercase tracking-wider text-on-surface font-mono">
            PHYSICS_VECTOR_GAME: LVL_{activeLevel + 1}
          </span>
        </div>
        
        {/* Buttons */}
        <div className="flex items-center gap-1.5 font-mono">
          <button 
            onClick={handleReset} 
            className="p-1 px-2 text-xs uppercase text-on-surface-variant hover:text-primary hover:bg-white/5 border border-outline-variant/30 rounded flex items-center gap-1 transition-all"
            title="Rebuild structural levels"
          >
            <RefreshCw size={11} />
            RESET
          </button>

          <button 
            onClick={handleNextLevel} 
            className="p-1 px-2 text-xs uppercase text-[#4edea3] hover:bg-[#4edea3]/10 border border-[#4edea3]/30 rounded flex items-center gap-1 transition-all"
            title="Next stack challenge"
          >
            NEXT_LEVEL
            <ChevronRight size={11} />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div ref={containerRef} className="relative flex-grow min-h-[300px] h-[340px] bg-[#0d0d0f] overflow-hidden leading-none select-none">
        <canvas 
          ref={canvasRef} 
          onMouseDown={(e) => handleStartDrag(getMouseCoords(e))}
          onMouseMove={(e) => handleMoveDrag(getMouseCoords(e))}
          onMouseUp={handleEndDrag}
          onMouseLeave={handleEndDrag}
          onTouchStart={(e) => handleStartDrag(getMouseCoords(e))}
          onTouchMove={(e) => handleMoveDrag(getMouseCoords(e))}
          onTouchEnd={handleEndDrag}
          className="absolute inset-0 block cursor-crosshair" 
        />
        
        {/* Transparent Corner Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary/40 pointer-events-none"></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary/40 pointer-events-none"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary/40 pointer-events-none"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary/40 pointer-events-none"></div>

        {/* Level cleared panel overlay */}
        {isLevelCleared && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
            <CheckCircle2 size={44} className="text-[#4edea3] mb-3 animate-bounce" />
            <h4 className="font-mono text-base font-black text-white tracking-widest uppercase mb-1">// SYSTEM_OPTIMIZED_SUCCESS</h4>
            <p className="font-mono text-[11px] text-on-surface-variant max-w-xs mb-4">
              Garbage Collection nodes demolished and Bug cores fully cleared in {launchesCount} vectors!
            </p>
            <button
              onClick={handleNextLevel}
              className="px-4 py-2 bg-[#4edea3] text-black font-mono text-[10px] font-bold tracking-widest uppercase rounded hover:bg-white transition-all flex items-center gap-1.5"
            >
              COMPACT_NEXT_HEAP
              <ChevronRight size={12} />
            </button>
          </div>
        )}

        {/* Level setup description subhud */}
        <div className="absolute top-3 right-4 flex flex-col items-end gap-0.5 bg-background/80 backdrop-blur-md p-2 rounded border border-white/5 text-[9px] font-mono pointer-events-none">
          <div className="text-primary font-bold">{levels[activeLevel].name}</div>
          <p className="text-on-surface-variant/80 text-[8px] text-right">{levels[activeLevel].description}</p>
        </div>

        {/* Real-time telemetry values overlay */}
        <div className="absolute top-3 left-4 flex flex-col gap-0.5 bg-background/85 backdrop-blur-md p-2 rounded border border-white/5 text-[10px] font-mono select-none pointer-events-none">
          <div className="text-primary tracking-wider uppercase font-bold">// REAL_TIME_VECTOR_HUD</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-on-surface-variant">SCORE:</span>
            <span className="text-[#4edea3] font-bold">{score} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant">BUGS_LEFT:</span>
            <span className={bugsRemaining > 0 ? "text-error font-bold" : "text-[#4edea3] font-bold"}>
              {bugsRemaining} Cores
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant">VECTORS_SHOT:</span>
            <span className="text-on-surface font-bold">{launchesCount}</span>
          </div>
        </div>

        {/* Slingshot Instructions tip */}
        {!probeRef.current.launched && (
          <div className="absolute bottom-7 left-4 hover:opacity-10 opacity-70 bg-black/60 backdrop-blur-sm p-1.5 px-3 rounded border border-white/5 text-[9px] text-[#4edea3] font-bold font-mono tracking-wider pointer-events-none animate-pulse">
            {"<<< DRAG & RELEASE PROBE CORE TO SOLVE STRUCTURE"}
          </div>
        )}
      </div>

      {/* Physics Control panel in footer dashboard */}
      <div className="p-3.5 px-5 bg-[#111112] border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-on-surface-variant">
        
        {/* Sliders to make simulation dynamic */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {/* Gravity slider */}
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant font-bold">THREAD_GRAVITY:</span>
            <input 
              type="range"
              min="0.08"
              max="0.45"
              step="0.02"
              value={physicsGravity}
              onChange={(e) => setPhysicsGravity(parseFloat(e.target.value))}
              className="w-18 accent-[#adc6ff] cursor-pointer bg-white/10 h-1 rounded-full outline-none"
            />
            <span className="text-primary font-bold">{physicsGravity.toFixed(2)}G</span>
          </div>

          {/* Elastic power adjuster */}
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant font-bold">ELASTIC_AMP:</span>
            <input 
              type="range"
              min="0.05"
              max="0.22"
              step="0.01"
              value={launchDamping}
              onChange={(e) => setLaunchDamping(parseFloat(e.target.value))}
              className="w-18 accent-[#4edea3] cursor-pointer bg-white/10 h-1 rounded-full outline-none"
            />
            <span className="text-[#4edea3] font-bold">{(launchDamping * 100).toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-primary">
          <Sliders size={11} className="animate-spin-slow" />
          <span>FPS: {fps} HERTZ_RT</span>
        </div>
      </div>
    </div>
  );
}
