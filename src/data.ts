import { Project, TimelineEvent, SkillCategory } from './types';

export const projectsData: Project[] = [
  {
    id: "digital-twin-builder",
    serial: "SYS_MOD_01",
    title: "Building a Real-Time Warehouse Digital Twin Platform",
    category: "Simulation",
    role: "Unity Developer (Early Career at Gaea)",
    problem: "Worked on the core platform used to create and configure warehouse digital twins. Contributed to the development of a highly customizable warehouse builder that allows users to construct warehouse layouts, place equipment, define workflows, and visualize operations in real time.",
    challenge: "Manual configurations of thousands of warehouse elements (racks, automated lifters, conveyor pathways) triggered extensive garbage collector spikes and render pipeline overhead.",
    solution: "Developed high-capacity placement editors and data-driven serialization engines using Unity's core APIs, coupled with custom scene optimization passes and robust asset config schemas.",
    tech: ["Unity", "C#", "Architecture", "Tool Development", "Backend Integration", "Scene Optimization", "Data-Driven Systems"],
    metrics: {
      label: "Editor Jitter Frame Latency",
      before: 45,
      after: 7.5,
      unit: "ms"
    },
    architecture: [
      "Asset Config Schema Loader",
      "Object Placement Engine",
      "Workspaces Data-Serialization",
      "UI Build State Controller"
    ],
    keyContributions: [
      "Developed tools for constructing large-scale warehouse environments.",
      "Built systems for placing and configuring warehouse assets.",
      "Created reusable and maintainable Unity architecture.",
      "Implemented data-driven workflows for warehouse configuration.",
      "Integrated backend services to load and save complex warehouse data.",
      "Optimized rendering and scene performance for large facilities.",
      "Collaborated closely with backend engineers and product teams."
    ],
    visualIdeas: [
      "Warehouse blueprint background.",
      "Digital twin visualization.",
      "Asset placement workflow diagrams.",
      "Technical architecture illustration."
    ]
  },
  {
    id: "warehouse-simulation-engine",
    serial: "SYS_MOD_02",
    title: "Architecting Large-Scale Warehouse Simulation Systems",
    category: "Simulation",
    role: "Senior Unity Developer",
    problem: "Currently leading development of advanced warehouse simulation systems capable of modeling real-world logistics operations. Responsible for designing scalable simulation architecture that powers planning, visualization, playback, and operational analysis.",
    challenge: "Real-time dynamic pathfinding, resource scheduling, and timeline scrub playbacks of 10,000 active agents concurrently bogged down single-threaded game loops, resulting in immediate freezing.",
    solution: "Designed custom high-density playback structures and decentralized movement solvers with snapshot-based state reconstruction, separating rendering updates from deterministic ticks.",
    tech: ["Unity", "C#", "Systems Architecture", "Simulation Engineering", "Pathfinding", "State Management", "Playback Systems", "Optimization", "Backend Integration"],
    metrics: {
      label: "Simulation State Reconstruction Latency",
      before: 54.0,
      after: 3.8,
      unit: "ms"
    },
    architecture: [
      "Snapshot State Reconstruction Solver",
      "Planner-Driven Agent Workflows",
      "Dynamic A* Voxel Pathfinding Solver",
      "Timeline Synchronization Controller"
    ],
    keyContributions: [
      "Designed and implemented large-scale resource simulation systems.",
      "Built simulation playback and replay architecture using snapshot-based state reconstruction.",
      "Developed planner-driven workflows for warehouse operations.",
      "Created systems for tracking resources, shipments, workers, and warehouse activity over time.",
      "Worked on pathfinding and movement systems for simulated warehouse agents.",
      "Developed state synchronization and timeline playback mechanisms.",
      "Optimized simulations handling large numbers of entities and operational events.",
      "Built reusable architecture focused on maintainability, scalability, and performance.",
      "Collaborated across engineering teams to solve complex logistics and operational challenges."
    ],
    visualIdeas: [
      "Animated warehouse simulation dashboard.",
      "Resource flow diagrams.",
      "Timeline playback visualization.",
      "Simulation architecture blueprint.",
      "Warehouse agents moving along paths.",
      "State snapshot visualization."
    ]
  },
  {
    id: "kitchen-chaos",
    serial: "SYS_MOD_03",
    title: "Kitchen Chaos: Decoupled Multi-State Simulation",
    category: "Games",
    problem: "Developing a highly interactive time-management simulation that models complex food preparation workflows with maximum code reusability and clean state flow.",
    challenge: "Configuring numerous unique workspaces (cooking ranges, cutting boards, ingredient slots) quickly led to code redundancy and tightly coupled script references.",
    solution: "Engineered a clean, polymorphism-driven workflow where specialized countertops inherit behavior from a core Base Counter interface. Stored recipe profiles in lightweight Unity ScriptableObjects, coordinating global systems via a deterministic Finite State Machine and Unity's New Input System.",
    tech: ["Unity Core", "C# OOP", "Polymorphism", "ScriptableObjects", "State Machines", "Input System"],
    url: "https://sabhari-shrinivas.itch.io/",
    metrics: {
      label: "Redundant Counter Boilerplate",
      before: 1200,
      after: 280,
      unit: "LOC"
    },
    architecture: [
      "Decoupled Polymorphic Base Counters",
      "Configuration-Driven Scriptable Recipes",
      "Deterministic State Machine Orchestrator",
      "New Input Action Map Receivers"
    ]
  },
  {
    id: "pedometer-hero",
    serial: "SYS_MOD_04",
    title: "Pedometer Hero: Procedural Gamified RPG",
    category: "Games",
    problem: "Architecting a highly gamified, feature-rich rogue-lite RPG that integrates active fitness pedometer triggers with character stat progression, dynamic spell cards, and reward loot boxes.",
    challenge: "Manually building and populating 100 unique levels and associated asset sheets led to high memory foot-prints and prolonged runtime load cycles.",
    solution: "Engineered an algorithmic procedural level generator utilizing localized data configs. Optimized mobile asset memory overhead by integrating Unity's Addressable Asset System for asynchronous, deferred texture and sound streaming. Developed dynamic equipment stat multiplier resolvers and premium chest opening animation curves.",
    tech: ["Unity Addressables", "Procedural Level Gen", "Stat Buff Engine", "UI Toolkit Grid", "Mobile Optimization"],
    metrics: {
      label: "Asynchronous Texture Memory Usage",
      before: 145,
      after: 18,
      unit: "MB"
    },
    architecture: [
      "Addressables-Backed Asset Streaming",
      "Algorithmic Grid Layout Generative Compiler",
      "Dynamic Equipment Modifiers Matrix",
      "Asynchronous Bundle Destructors"
    ]
  },
  {
    id: "space-impact",
    serial: "SYS_MOD_05",
    title: "Space Impact: High-Capacity Object Pooler",
    category: "Games",
    problem: "Managing a bullet-hell survival space shooter game with high-density projectile counts, meteor structures, and randomized spaceship spawns without triggering garbage collector frame stutters.",
    challenge: "Frequent instantiations and dereferencing of projectile colliders and active game instances resulted in continuous heap allocations and garbage collection stuttering.",
    solution: "Developed a custom high-performance generic Object Pool engine to recycle active bullets, obstacle asteroids, and enemy ship instances in memory pre-allocated pools. Engineered efficient custom spaceship seeking controllers, upgradable projectile behaviors, and an global cloud leaderboard integration.",
    tech: ["Object Pooling", "C# Generics", "Seeking AI", "Weapon Upgrades", "Cloud Leaderboard"],
    url: "https://sabhari-shrinivas.itch.io/",
    metrics: {
      label: "GC Main-Thread Allocation Spikes",
      before: 38,
      after: 0,
      unit: "allocs/sec"
    },
    architecture: [
      "Statically Allocated Object Pools",
      "Recycled Entity State Destructers",
      "AABB Vector Boundary Resolvers",
      "Lightweight Seeking Flight Steering"
    ]
  },
  {
    id: "zombie-hunter",
    serial: "SYS_MOD_06",
    title: "Zombie Hunter: Navmesh Pathfinding & Weapons AI",
    category: "Games",
    problem: "Delivering an immersive tactical FPS survival experience featuring intelligent adversary navigation, multi-weapon damage profiles, and strategic ammunition counts.",
    challenge: "Calculating continuous linear distance queries and immediate AI direction offsets for numerous tracking threat units caused severe CPU main thread execution freezes.",
    solution: "Engineered responsive hunt-and-chase sensory enemy AI using Unity's integrated NavMesh compilation pipeline for obstacle avoidance. Implemented high-velocity weapon physics using zero-allocation Raycast sweeps coupled with customized distance-based decay curves and sound impact profiles.",
    tech: ["Unity NavMesh AI", "Raycast Physics", "Sensory Detection AI", "Audio Mixers", "FPS Controller"],
    url: "https://sabhari-shrinivas.itch.io/",
    metrics: {
      label: "AI Track Path Computing Latency",
      before: 12.5,
      after: 2.1,
      unit: "ms"
    },
    architecture: [
      "NavMesh Agent Target Trajector Threading",
      "Zero-Allocation Raycast Firearm Colliders",
      "Sensory Tracking & Movement Chasers",
      "Dynamic Decoupled Sub-bus Audio Mixers"
    ]
  }
];

export const timelineData: TimelineEvent[] = [
  {
    period: "2025 - PRESENT",
    role: "Senior Unity Developer",
    company: "Gaea Global Technologies",
    description: "Promoted to lead the technical architecture of high-performance real-time simulation engines. Shifted focus from building the digital twin platform to developing the deterministic simulation systems that bring those digital twins to life, handling massive entity counts and synchronized timeline scrubbing.",
    tags: ["Simulation Engineering", "Systems Architecture", "Playback Systems", "State Management", "Pathfinding", "Optimization", "Backend Integration"],
    responsibilities: [
      "Designed and implemented large-scale warehouse simulation systems",
      "Built simulation playback and replay architecture using snapshot-based state reconstruction",
      "Developed resource movement and operational workflow simulations",
      "Created planner-driven systems for warehouse process visualization",
      "Built pathfinding and movement systems for simulated warehouse agents",
      "Designed state synchronization and timeline playback mechanisms",
      "Optimized simulations handling large numbers of entities and operational events",
      "Developed scalable, reusable architecture focused on maintainability and performance",
      "Collaborated across engineering teams to solve complex logistics and operational challenges"
    ],
    focusAreas: [
      "Simulation Engineering",
      "Systems Architecture",
      "Playback Systems",
      "State Management",
      "Pathfinding",
      "Optimization",
      "Backend Integration"
    ],
    keyTakeaway: "Architecting the systems that simulate real-world warehouse operations, transforming static digital twins into dynamic, data-driven operational models.",
    isPromotionHighlight: true,
    isSeniorHighlight: true
  },
  {
    period: "2023 - 2025",
    role: "Unity Developer",
    company: "Gaea Global Technologies",
    description: "Worked on the Gaea core platform used to create and configure large-scale warehouse digital twins. Engineered modular placement editors and asset management logic to represent complex material configurations seamlessly.",
    tags: ["Digital Twins", "Tool Development", "Scene Optimization", "Backend Integration", "Data-Driven Systems", "Unity Architecture"],
    responsibilities: [
      "Developed tools for constructing warehouse environments",
      "Built systems for configuring warehouse assets and operational workflows",
      "Created data-driven architecture for warehouse setup and customization",
      "Integrated backend systems for loading and saving large datasets",
      "Optimized large warehouse scenes for performance and scalability",
      "Built reusable Unity systems following clean architecture principles",
      "Collaborated closely with backend engineers and product teams"
    ],
    focusAreas: [
      "Digital Twins",
      "Tool Development",
      "Scene Optimization",
      "Backend Integration",
      "Data-Driven Systems",
      "Unity Architecture"
    ],
    keyTakeaway: "Helped build the foundation platform that allows real-world warehouses to be represented as interactive digital twins."
  },
  {
    period: "2022 - 2023",
    role: "Front-End Game Developer",
    company: "Small World Games",
    description: "Architected responsive high-fidelity player interfaces and player-facing frontend ecosystems in Roblox, refining user experience pipelines and interface layout flows.",
    tags: ["UI/UX Systems", "Motion Design", "Roblox UI", "Memory Optimization", "Asset Streaming"],
    responsibilities: [
      "Designed and implemented responsive UI systems",
      "Created polished interface animations and transitions",
      "Focused on memory-conscious UI implementation",
      "Applied principles of color theory, visual hierarchy, and player experience design",
      "Learned advanced animation techniques including easing, interpolation, lerping, and motion design"
    ],
    focusAreas: [
      "Responsive User Interfaces",
      "Player Experience Design",
      "Interface Animations",
      "Memory Optimization"
    ],
    keyTakeaway: "Developed a deep appreciation for user experience, game feel, and polished player-facing systems."
  },
  {
    period: "2020 - 2022",
    role: "Freelance Game Developer",
    description: "Successfully developed, programmed, and delivered a broad spectrum of 2D and 3D indie titles and mobile game titles, running the full developmental pipeline from code to asset configuration.",
    tags: ["C# Gameplay", "Animation Systems", "Cinematics", "Rapid Prototyping", "Level Design", "Playtesting"],
    responsibilities: [
      "Gameplay programming",
      "UI implementation",
      "Animation systems",
      "Cinematics",
      "Level design",
      "Prototyping",
      "Playtesting"
    ],
    keyTakeaway: "Built a strong foundation as a generalist game developer by wearing multiple hats across the game development pipeline."
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: "System Programming & Architecture",
    skills: [
      { name: "C# / .NET Optimization", level: 95, info: "Gc Alloc optimization, memory fragmentation prevention, unsafe C# buffer access." },
      { name: "Unity ECS / DOTS", level: 92, info: "Entity Command Buffers, SystemGroups, TypeManager alignment, component design." },
      { name: "Burst Compiler / C# Job System", level: 94, info: "Writing SIMD vector instructions, restricting scheduling dependency loops, direct native containers." },
      { name: "SOLID System Design", level: 90, info: "Strict separation of data and logic, clean interface modeling, loose-coupled subsystems." }
    ]
  },
  {
    title: "Gameplay & Engine Core Dynamics",
    skills: [
      { name: "Custom Locomotion & Physics", level: 90, info: "Non-character controller movement, kinematic custom raycast physics, local dynamic collision avoidance." },
      { name: "Dynamic Pathfinding Systems", level: 94, info: "Hierarchical A* search, flowfield crowd simulations, custom 3D grid voxelization." },
      { name: "Network Sync & Nettcode", level: 88, info: "Client-side prediction, rollback logic, snapshot buffer serialization, lag compensation triggers." }
    ]
  },
  {
    title: "Graphics & Rendering Pipeline",
    skills: [
      { name: "GPU Compute & Instancing", level: 84, info: "Direct ComputeShader kernels, StructuredBuffers, DrawMeshInstancedIndirect rendering." },
      { name: "VFX Graph & Shader Graph", level: 88, info: "Custom scriptable render node bindings, fluid/particle math simulations." },
      { name: "Render Pipeline Profiling", level: 90, info: "Frame Debugging, RenderDoc analyses, resolving overdraw/fill-rate bandwidth barriers." }
    ]
  }
];
