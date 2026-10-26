// All page content lives here. Edit this file to change what the site says.

export const links = {
  email: 'mailto:sabhari.thirumurugan@gmail.com?subject=Hello%20Sabhari',
  emailAddress: 'sabhari.thirumurugan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sabharishrinivas',
  github: 'https://github.com/SabhariShrinivas',
  itch: 'https://sabhari-shrinivas.itch.io/',
  upwork: 'https://www.upwork.com/freelancers/~01300409d38318f5b7',
  resume: '/Sabhari_Shrinivas_Resume.pdf',
  // Filename the visitor's browser saves the resume as.
  resumeDownloadName: 'Sabhari_Shrinivas_Senior_Unity_Developer_AI.pdf',
  photo: 'https://avatars.githubusercontent.com/u/81565016?s=160&v=4',
};

export type Media =
  // start: seconds to begin at; zoom/origin crop editor chrome out of raw captures on the stage.
  | {kind: 'video'; src: string; start?: number; zoom?: number; origin?: string}
  | {kind: 'image'; src: string; alt: string}
  | {kind: 'youtube'; id: string};

export interface Project {
  id: string;
  name: string;
  /** Shown under the monitor and on the timeline. */
  years: string;
  /** One line: who it was for and what I was. */
  context: string;
  summary: string;
  /** Optional line set as a statement, e.g. the game's own tagline. */
  statement?: string;
  built: string[];
  /** What the monitor shows while this project is read. */
  media: Media;
  actions: {label: string; href: string}[];
}

// Newest first: scrolling down the page rewinds the timeline.
export const projects: Project[] = [
  {
    id: 'five-deaths',
    name: 'Five Deaths',
    years: '2026',
    context: 'Solo, Unity 6 · playable prototype on itch.io',
    summary:
      'A short first-person horror game about coming home too late. Follow your sister’s riddles through the old house, return what your family left behind, and stay quiet: something walks the halls and it hears running.',
    statement: 'Your sister’s letters told you to stay away. The last one told you to come home.',
    built: [
      'First-person controller with sprint, crouch and hiding spots.',
      'A stalker that reacts to the noise you make, so sprinting gives you away.',
      'Notes, riddles, inventory and an objective prompt that carry the story.',
      'The first three of five nights, built solo and published to test whether the game is worth finishing.',
    ],
    media: {kind: 'video', src: '/media/five-deaths.mp4', start: 0},
    actions: [{label: 'Play in browser', href: 'https://sabhari-shrinivas.itch.io/five-deaths'}],
  },
  {
    id: 'death-ball',
    name: 'Death Ball',
    years: '2026',
    context: 'Small World Games, Roblox · Senior Front-End Developer, July to October 2026',
    summary:
      'A Roblox battlegrounds game where players deflect a speeding ball until one is left standing. I owned gameplay and UI for its LiveOps layer: the events and updates that ship to the live game every week.',
    built: [
      'Gameplay and UI for weekly LiveOps events and updates on a live title with 1.6B+ visits and about 10K players online on an average day.',
      'Shipped inside an agentic Claude workflow that took the team from 2 to 4–5 features and updates a week.',
      'Wrote shared CLAUDE.md context and do/don’t guardrail files so agents kept to the codebase’s conventions.',
      'Used a custom Roblox MCP server every day to let agents work directly in the engine.',
    ],
    media: {kind: 'youtube', id: 'gKUiAi1FQsw'},
    actions: [{label: 'Play on Roblox', href: 'https://www.roblox.com/games/15002061926/Death-Ball'}],
  },
  {
    id: 'synkrato',
    name: 'Synkrato',
    years: '2023–26',
    context: 'Gaea Global Technologies, Unity · Simulation lead, 2023 to 2026',
    summary:
      'Synkrato is a warehouse digital twin: managers test layout, labour and workflow changes in 3D before they reach the floor. I led the simulation piece, the engine that makes the twin move.',
    built: [
      'A snapshot-based state reconstruction engine, so a simulated or recorded day can be scrubbed back and forth.',
      'Pathfinding and NavMesh data for sites over 1M sq ft, with memory cut by 40%.',
      'Agent movement, resource flow and task allocation for simulated warehouse operations.',
      'Live sync from REST and WebSocket streams into the twin.',
      'Before the simulation: the Digital Twin Builder for laying out warehouses, and Unity Editor tools for asset placement and BIM metadata.',
    ],
    // Synkrato's own product video, from synkrato.com/simulation-optimization.
    media: {kind: 'video', src: '/media/synkrato.mp4', start: 0},
    actions: [{label: 'See Synkrato Simulation', href: 'https://synkrato.com/simulation-optimization/'}],
  },
  {
    id: 'kitchen-chaos',
    name: 'Kitchen Chaos',
    years: '2023',
    context: 'Personal project, Unity · the one to read if you want to judge my code',
    summary:
      'A time-management cooking game: work a roofless restaurant kitchen, cut, cook and plate what the customers ask for before the clock runs out.',
    built: [
      'Counters share a base class; cutting, cooking, storage and delivery each add only their own behaviour.',
      'Ingredients and recipes are ScriptableObjects, so new dishes need no code.',
      'A small state machine runs the game flow: countdown, playing, game over.',
      'Input through Unity’s new Input System.',
    ],
    media: {kind: 'video', src: '/media/kitchen-chaos.mp4', start: 12, zoom: 1.18, origin: '50% 30%'},
    actions: [
      {label: 'Play in browser', href: 'https://sabhari-shrinivas.itch.io/kitchen-chaos'},
      {label: 'Source code', href: 'https://github.com/SabhariShrinivas/KitchenChaos'},
    ],
  },
  {
    id: 'pedometer-hero',
    name: 'Pedometer Hero',
    years: '2021–22',
    context: 'Freelance client game, Unity · hired for the levels, kept on for the whole game',
    summary:
      'A fitness app wrapped in a rogue-lite RPG, where walking powers your hero. I was hired to design 100 levels; the client then asked me to build the rest of the game.',
    built: [
      '100 levels generated in code, with controlled randomness so each one looks different.',
      'Addressables for asynchronous loading to keep memory and load times down.',
      'Player progression, spells, equipment buffs and Clash Royale-style chests with opening animations.',
      'The game’s UI, including the scrolling level select and equipment grids, and ads.',
    ],
    media: {kind: 'video', src: '/media/pedometer-hero.mp4', start: 4, zoom: 1.3, origin: '50% 50%'},
    actions: [],
  },
  {
    id: 'space-impact',
    name: 'Space Impact',
    years: '2021',
    context: 'Brackeys Game Jam, Unity · theme “Let there be chaos”',
    summary: 'A survival shooter: waves of enemy ships spawn at random and you clear them while upgrading your guns.',
    built: [
      'Spaceship controller and enemy ship AI.',
      'Object pooling for enemies, meteors and projectiles, so heavy waves don’t stutter.',
      'Upgradable player projectiles and an online leaderboard.',
    ],
    media: {kind: 'video', src: '/media/space-impact.mp4', start: 5, zoom: 1.06, origin: '50% 60%'},
    actions: [
      {label: 'Get it on itch.io', href: 'https://sabhari-shrinivas.itch.io/space-impact'},
      {label: 'Source code', href: 'https://github.com/SabhariShrinivas/Space-Impact'},
    ],
  },
  {
    id: 'zombie-hunter',
    name: 'Zombie Hunter',
    years: '2021',
    context: 'Personal project, Unity · first-person shooter',
    summary: 'An FPS survival game in a zombie-overrun military base. Ammo is limited, so every fight is a decision.',
    built: [
      'Zombie AI on Unity’s NavMesh that notices the player nearby and gives chase.',
      'Raycast weapons, each with its own damage, ammo and sound.',
    ],
    media: {kind: 'video', src: '/media/zombie-hunter.mp4', start: 8, zoom: 1.05, origin: '50% 55%'},
    actions: [
      {label: 'Get it on itch.io', href: 'https://sabhari-shrinivas.itch.io/zombie-hunter'},
      {label: 'Source code', href: 'https://github.com/SabhariShrinivas/zombie-hunter'},
    ],
  },
];

// Brandon's full review, as written on Upwork. It is about Pedometer Hero.
export const letter = {
  opening: 'Sabhari worked with me for a long time by designing 100 beautiful 3D levels and also developed and designed the rest of the Unity game.',
  body: [
    'He’s one of the best people who I ever worked with! He did a fantastic job adding in all of the elements of the game, was great with researching different parts of the game, is very friendly to work with, great with teamwork, is very intelligent, and knows how to quickly develop high-quality Unity games with rich features.',
    'I will definitely ask him to help out on future projects!',
  ],
  name: 'Brandon Podell',
  role: 'Client, Pedometer Hero, via Upwork',
};

export const shortReviews = [
  {quote: 'Great communications skills, organized and delivers everything on time.', name: 'Victor Pereira', role: 'Client, via Upwork'},
  {quote: 'Job completed successfully. Thanks for your helpful submission! I would recommend him!', name: 'Kao', role: 'Client, via Upwork'},
];

export const about = [
  'I’m Sabhari, a game developer in Bangalore. I’ve spent six years making games and the systems under them, in Unity and in Roblox.',
  'I started freelancing in 2020: small 2D and 3D games for clients and for jams, doing every part myself, from code to levels to UI. Pedometer Hero began as a job to design 100 levels and ended with me building the whole game.',
  'At Gaea I moved into systems. I built tools for laying out warehouse digital twins, then led the simulation that brings them to life, including a replay engine that scrubs a whole warehouse day back and forth.',
  'At Small World Games I came back to games people play every day, owning gameplay and UI for Death Ball’s LiveOps, and learned to ship faster with Claude agents.',
  'Now I’m looking for my next team, and making my own small games for Steam in the evenings.',
];

export const experience = [
  {years: '2026', role: 'Senior Front-End Developer', company: 'Small World Games'},
  {years: '2025–26', role: 'Senior Unity Developer', company: 'Gaea Global Technologies'},
  {years: '2023–25', role: 'Unity Developer', company: 'Gaea Global Technologies'},
  {years: '2022–23', role: 'Front-End Game Developer', company: 'Small World Games'},
  {years: '2020–22', role: 'Freelance Game Developer', company: 'Upwork and indie clients'},
];

export const skills =
  'C#, Unity (DOTS/ECS, Jobs, Burst, Addressables, URP, Profiler), Roblox (Luau), NavMesh and A*, state machines, simulation and replay systems, editor tooling, agentic workflows with Claude and MCP. B.Sc. Computer Science, Sethu Institute of Technology.';
