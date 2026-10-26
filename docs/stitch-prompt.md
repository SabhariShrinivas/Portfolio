Redesign the visual style of my one-page game developer portfolio. This is a reskin only.

RULES
- Use the copy below word for word. Do not add, remove or rewrite any text: no taglines, no section labels, no "About me" or "Featured work" headings, no stats, no badges, no buttons beyond the ones listed.
- Keep the sections, their order and the layout mechanics described below. Change only the visual design: typography, colour, spacing, proportions, surfaces, how media is framed, and hover/active states.
- Use plain placeholder blocks for every video and image, labelled with the project name (for example "VIDEO: Kitchen Chaos gameplay, 16:9"). Do not invent screenshots.
- Avoid the usual developer-portfolio clichés: fake terminal or code styling, monospace labels, neon, glassmorphism, gradients, glowing shadows, emoji, icon cards.
- Design both a desktop screen (1440 wide) and a mobile screen (390 wide).

LAYOUT MECHANICS (keep these)
1. Desktop is a split page. The left ~47% is a "monitor" panel that stays fixed while the right column scrolls. The monitor shows the media of whichever project is being read on the right, a caption under it (project name on the left, years on the right), and under that a "career track": 7 equal clip segments in a row, oldest on the left (Zombie Hunter, Space Impact, Pedometer Hero, Kitchen Chaos, Five Deaths, Synkrato, Death Ball). The active project's segment is highlighted and a thin playhead marker sits on it. Small "2021" and "2026" labels sit under the two ends of the track.
2. On the first screen the monitor plays a showreel; its caption reads "Kitchen Chaos" and "Showreel · 2023".
3. After the seven projects the split ends and the remaining sections run full width.
4. Mobile: the monitor becomes a normal block at the top of the page (media, caption, track), and each project shows its own media placeholder under its title.

CONTENT, IN ORDER

Top navigation (right column, top right): Work · About · Resume · Email me

First screen (right column)
- Wordmark, very large, lowercase: sabhari
- Sentence: Sabhari Shrinivas. I make games in Unity and Roblox, most recently LiveOps on Death Ball.
- Button: Email me

Each project block (right column) has: title, one context line, a summary paragraph, the subheading "What I built", a bullet list, and its buttons. The monitor on the left shows the project's media while it is read.

1. Death Ball (monitor: VIDEO, YouTube trailer, 16:9; years 2026)
Context: Small World Games, Roblox · Senior Front-End Developer, July to October 2026
Summary: A Roblox battlegrounds game where players deflect a speeding ball until one is left standing. I owned gameplay and UI for its LiveOps layer: the events and updates that ship to the live game every week.
What I built:
- Gameplay and UI for weekly LiveOps events and updates on a live title with 1.6B+ visits and about 10K players online on an average day.
- Shipped inside an agentic Claude workflow that took the team from 2 to 4–5 features and updates a week.
- Wrote shared CLAUDE.md context and do/don’t guardrail files so agents kept to the codebase’s conventions.
- Used a custom Roblox MCP server every day to let agents work directly in the engine.
Button: Play on Roblox

2. Synkrato (monitor: VIDEO, product video of a 3D warehouse digital twin, 16:9; years 2023–26)
Context: Gaea Global Technologies, Unity · Simulation lead, 2023 to 2026
Summary: Synkrato is a warehouse digital twin: managers test layout, labour and workflow changes in 3D before they reach the floor. I led the simulation piece, the engine that makes the twin move.
What I built:
- A snapshot-based state reconstruction engine, so a simulated or recorded day can be scrubbed back and forth.
- Pathfinding and NavMesh data for sites over 1M sq ft, with memory cut by 40%.
- Agent movement, resource flow and task allocation for simulated warehouse operations.
- Live sync from REST and WebSocket streams into the twin.
- Before the simulation: the Digital Twin Builder for laying out warehouses, and Unity Editor tools for asset placement and BIM metadata.
Button: See Synkrato Simulation

3. Five Deaths (monitor: IMAGE, game cover art, dark horror; years 2026)
Context: Solo, Unity 6 · playable prototype on itch.io
Summary: A short first-person horror game about coming home too late. Follow your sister’s riddles through the old house, return what your family left behind, and stay quiet: something walks the halls and it hears running.
Pull quote (set apart from the summary): Your sister’s letters told you to stay away. The last one told you to come home.
What I built:
- First-person controller with sprint, crouch and hiding spots.
- A stalker that reacts to the noise you make, so sprinting gives you away.
- Notes, riddles, inventory and an objective prompt that carry the story.
- The first three of five nights, built solo and published to test whether the game is worth finishing.
Button: Play in browser

4. Kitchen Chaos (monitor: VIDEO, gameplay; years 2023)
Context: Personal project, Unity · the one to read if you want to judge my code
Summary: A time-management cooking game: work a roofless restaurant kitchen, cut, cook and plate what the customers ask for before the clock runs out.
What I built:
- Counters share a base class; cutting, cooking, storage and delivery each add only their own behaviour.
- Ingredients and recipes are ScriptableObjects, so new dishes need no code.
- A small state machine runs the game flow: countdown, playing, game over.
- Input through Unity’s new Input System.
Buttons: Play in browser · Source code

5. Pedometer Hero (monitor: VIDEO, portrait mobile game inside a wider frame; years 2021–22)
Context: Freelance client game, Unity · hired for the levels, kept on for the whole game
Summary: A fitness app wrapped in a rogue-lite RPG, where walking powers your hero. I was hired to design 100 levels; the client then asked me to build the rest of the game.
What I built:
- 100 levels generated in code, with controlled randomness so each one looks different.
- Addressables for asynchronous loading to keep memory and load times down.
- Player progression, spells, equipment buffs and Clash Royale-style chests with opening animations.
- The game’s UI, including the scrolling level select and equipment grids, and ads.
(No buttons.)

6. Space Impact (monitor: VIDEO, dark space shooter; years 2021)
Context: Brackeys Game Jam, Unity · theme “Let there be chaos”
Summary: A survival shooter: waves of enemy ships spawn at random and you clear them while upgrading your guns.
What I built:
- Spaceship controller and enemy ship AI.
- Object pooling for enemies, meteors and projectiles, so heavy waves don’t stutter.
- Upgradable player projectiles and an online leaderboard.
Buttons: Get it on itch.io · Source code

7. Zombie Hunter (monitor: VIDEO, dark first-person shooter; years 2021)
Context: Personal project, Unity · first-person shooter
Summary: An FPS survival game in a zombie-overrun military base. Ammo is limited, so every fight is a decision.
What I built:
- Zombie AI on Unity’s NavMesh that notices the player nearby and gives chase.
- Raycast weapons, each with its own damage, ammo and sound.
Buttons: Get it on itch.io · Source code

Client review (full width, set like a letter, no quotation marks on the main one)
Opening line: Sabhari worked with me for a long time by designing 100 beautiful 3D levels and also developed and designed the rest of the Unity game.
Body: He’s one of the best people who I ever worked with! He did a fantastic job adding in all of the elements of the game, was great with researching different parts of the game, is very friendly to work with, great with teamwork, is very intelligent, and knows how to quickly develop high-quality Unity games with rich features.
Body: I will definitely ask him to help out on future projects!
Sign-off: Brandon Podell / Client, Pedometer Hero, via Upwork
Two short reviews:
- Great communications skills, organized and delivers everything on time. — Victor Pereira, Client, via Upwork
- Job completed successfully. Thanks for your helpful submission! I would recommend him! — Kao, Client, via Upwork

About (full width, two columns: a short first-person letter on the left; work history, skills and links on the right). Small round portrait placeholder above the letter.
Letter:
I’m Sabhari, a game developer in Bangalore. I’ve spent six years making games and the systems under them, in Unity and in Roblox.
I started freelancing in 2020: small 2D and 3D games for clients and for jams, doing every part myself, from code to levels to UI. Pedometer Hero began as a job to design 100 levels and ended with me building the whole game.
At Gaea I moved into systems. I built tools for laying out warehouse digital twins, then led the simulation that brings them to life, including a replay engine that scrubs a whole warehouse day back and forth.
At Small World Games I came back to games people play every day, owning gameplay and UI for Death Ball’s LiveOps, and learned to ship faster with Claude agents.
Now I’m looking for my next team, and making my own small games for Steam in the evenings.
Signed: Sabhari
Work history (a simple table):
2026 · Senior Front-End Developer · Small World Games
2025–26 · Senior Unity Developer · Gaea Global Technologies
2023–25 · Unity Developer · Gaea Global Technologies
2022–23 · Front-End Game Developer · Small World Games
2020–22 · Freelance Game Developer · Upwork and indie clients
Skills: C#, Unity (DOTS/ECS, Jobs, Burst, Addressables, URP, Profiler), Roblox (Luau), NavMesh and A*, state machines, simulation and replay systems, editor tooling, agentic workflows with Claude and MCP. B.Sc. Computer Science, Sethu Institute of Technology.
Links (one row, these are the only contact links on the page): sabhari.thirumurugan@gmail.com · LinkedIn · GitHub · itch.io · Upwork · Resume (PDF)
Last line, small: © 2026 Sabhari Shrinivas, Bangalore. Death Ball belongs to Small World Games, Synkrato to Gaea Global Technologies.

There is no separate contact section and no footer after this.
