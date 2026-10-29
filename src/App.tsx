import {useEffect, useRef, useState, type PointerEvent as ReactPointerEvent} from 'react';
import {about, experience, letter, links, projects, shortReviews, skills, type Media, type Project} from './data';

const HERO = 'hero';
const reelIds = projects.filter((p) => p.media.kind === 'video' && p.id !== 'synkrato').map((p) => p.id);
// The track runs oldest to newest, left to right; the page runs newest first.
const track = [...projects].reverse();

function useIsPhone() {
  const query = '(max-width: 860px)';
  const [phone, setPhone] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setPhone(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return phone;
}

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal elements marked [data-reveal] once as they scroll into view.
function useReveal(phone: boolean) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      {rootMargin: '0px 0px -8% 0px'},
    );
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    document.documentElement.classList.add('js-reveal');
    return () => io.disconnect();
  }, [phone]);
}

// Which scene is under the middle of the viewport, and how far through it we are.
function useScene(phone: boolean) {
  const [scene, setScene] = useState(HERO);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
    let frame = 0;
    const measure = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          setScene(s.dataset.scene!);
          setProgress(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
          return;
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [phone]);
  return {scene, progress};
}

interface ClipProps {
  src: string;
  label: string;
  playing: boolean;
  controls?: boolean;
  start?: number;
  zoom?: number;
  origin?: string;
}

function Clip({src, label, playing, controls = false, start = 1, zoom, origin}: ClipProps) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing && !reduceMotion()) v.play().catch(() => {});
    else v.pause();
  }, [playing]);
  return (
    <video
      ref={ref}
      className="fill"
      src={`${src}#t=${start}`}
      style={zoom ? {transform: `scale(${zoom})`, transformOrigin: origin} : undefined}
      muted
      loop
      playsInline
      preload={playing ? 'auto' : 'metadata'}
      controls={controls}
      aria-label={label}
    />
  );
}

// Plays only while it is on screen (used for inline media on phones).
function OnScreenClip({src, label, start}: {src: string; label: string; start?: number}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {threshold: 0.3});
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="fill-box">
      <Clip src={src} label={label} playing={visible} start={start} controls />
    </div>
  );
}

function MediaView({media, project, playing, inline = false}: {media: Media; project: Project; playing: boolean; inline?: boolean}) {
  switch (media.kind) {
    case 'video':
      return inline ? (
        <OnScreenClip src={media.src} label={`${project.name} video`} start={media.start} />
      ) : (
        <Clip
          src={media.src}
          label={`${project.name} video`}
          playing={playing}
          start={media.start}
          zoom={media.zoom}
          origin={media.origin}
        />
      );
    case 'image':
      return <img className="fill" src={media.src} alt={media.alt} loading="lazy" />;
    case 'youtube': {
      // On the monitor the trailer runs muted like the other clips; inline it waits for a tap.
      const auto = !inline && !reduceMotion() ? `?autoplay=1&mute=1&loop=1&playlist=${media.id}&playsinline=1&rel=0` : '?rel=0';
      return (
        <iframe
          className="fill"
          src={`https://www.youtube-nocookie.com/embed/${media.id}${auto}`}
          title={`${project.name} trailer`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }
}

// While the hero is in view the monitor cycles through the gameplay clips.
function useReel(active: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active || reduceMotion()) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % reelIds.length), 6500);
    return () => window.clearInterval(id);
  }, [active]);
  return reelIds[i];
}

function jumpTo(id: string, smooth: boolean) {
  document.getElementById(id)?.scrollIntoView({behavior: smooth && !reduceMotion() ? 'smooth' : 'auto', block: 'start'});
}

function Stage({scene, progress, phone}: {scene: string; progress: number; phone: boolean}) {
  const inHero = scene === HERO || phone;
  const reelClip = useReel(inHero);
  const shown = inHero ? reelClip : scene;
  const current = projects.find((p) => p.id === shown)!;
  const activeIndex = track.findIndex((p) => p.id === shown);
  const dragging = useRef(false);

  // Scrubbing: drag along the track and the page jumps clip to clip.
  const indexAt = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return Math.min(track.length - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * track.length)));
  };
  const onDown = (e: ReactPointerEvent<HTMLOListElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<HTMLOListElement>) => {
    if (!dragging.current || phone) return;
    const id = track[indexAt(e)].id;
    if (id !== scene) jumpTo(id, false);
  };
  const onUp = () => {
    dragging.current = false;
  };

  // Rewinding: reading further down a project moves the playhead back in time.
  const segment = 100 / track.length;
  const playheadLeft = inHero ? (activeIndex + 0.5) * segment : (activeIndex + (1 - progress)) * segment;

  return (
    <aside className="stage" aria-label="Showreel">
      <div className="stage__group">
        <div className="stage__monitor">
          {projects.map((p) => (
            <div key={p.id} className={p.id === shown ? 'stage__layer is-active' : 'stage__layer'} aria-hidden={p.id !== shown}>
              {(p.id === shown || p.media.kind === 'video' || p.media.kind === 'image') && (
                <MediaView media={p.media} project={p} playing={p.id === shown} />
              )}
            </div>
          ))}
        </div>
        <p className="stage__caption" aria-live="polite">
          <span className="stage__name">{current.name}</span>
          <span className="stage__years">{inHero ? `Showreel · ${current.years}` : current.years}</span>
        </p>
        <div className="track">
          <ol className="track__clips" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
            {track.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={p.id === shown ? 'track__clip is-active' : 'track__clip'}
                  onClick={() => jumpTo(p.id, true)}
                  aria-label={`${p.name}, ${p.years}`}
                />
              </li>
            ))}
          </ol>
          <span className="track__head" style={{left: `${playheadLeft}%`}} aria-hidden="true" />
          <p className="track__ends" aria-hidden="true">
            <span>2021</span>
            <span>2026</span>
          </p>
        </div>
      </div>
    </aside>
  );
}

function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <a href={`#${projects[0].id}`}>Work</a>
      <span aria-hidden="true">·</span>
      <a href="#about">About</a>
      <span aria-hidden="true">·</span>
      <a href={links.resume} download={links.resumeDownloadName}>
        Resume
      </a>
    </nav>
  );
}

function Hero({phone}: {phone: boolean}) {
  return (
    <header className="hero" data-scene={HERO}>
      {!phone && <Nav />}
      <div className="hero__body">
        <h1 className="wordmark">Sabhari Shrinivas</h1>
        <p className="hero__lede">
          Hellooo, thanks for stopping by. I make video games and software, mostly in Unity and the Roblox engine. I care
          about clean code, solid system architecture and staying inside the performance budget, so the systems I build stay
          easy to read and easy to extend.
        </p>
        <p className="hero__lede">
          Lately I’ve been going deep on AI tooling: building custom MCP tools, writing guardrails, and managing tokens and
          context so I get more done for less money. AI multiplies what you can build, as long as you can design the
          system and understand what your agent is doing, and designing systems is what I’ve done for years.
        </p>
        <p className="hero__lede hero__open">
          I’m open to game developer and Unity engineer roles, and to AI engineering roles around agents and tooling.
        </p>
      </div>
    </header>
  );
}

// Context lines cycle through the three accents, as in the Stitch design.
const accentFor = (i: number) => (i === 0 ? 'secondary' : i % 2 === 1 ? 'primary' : 'tertiary');

function ProjectText({project, index, phone}: {project: Project; index: number; phone: boolean}) {
  return (
    <article className="work" id={project.id} data-scene={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="work__head" data-reveal>
        <h2 className="work__title" id={`${project.id}-title`}>
          {project.name}
        </h2>
        {phone && <span className="work__years">{project.years}</span>}
      </div>
      {phone && (
        <div className="work__media">
          <MediaView media={project.media} project={project} playing inline />
        </div>
      )}
      <p className={`work__context work__context--${accentFor(index)}`} data-reveal>
        {project.context}
      </p>
      <p className="work__summary" data-reveal>
        {project.summary}
      </p>
      {project.statement && (
        <blockquote className="work__statement" data-reveal>
          {project.statement}
        </blockquote>
      )}
      <h3 className="work__sub" data-reveal>
        What I built
      </h3>
      <ul className="work__built" data-reveal>
        {project.built.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {(project.actions.length > 0 || project.soon) && (
        <p className="work__actions" data-reveal>
          {project.actions.map((a, i) => (
            <a key={a.href} className={i === 0 ? 'btn' : 'btn btn--quiet'} href={a.href} target="_blank" rel="noreferrer">
              {a.label}
            </a>
          ))}
          {project.soon && <span className="btn btn--soon">{project.soon}</span>}
        </p>
      )}
    </article>
  );
}

function Letter() {
  return (
    <section className="letter" aria-label="A client’s review">
      <div className="letter__inner">
        <p className="letter__opening" data-reveal>
          {letter.opening}
        </p>
        {letter.body.map((p) => (
          <p key={p} className="letter__body" data-reveal>
            {p}
          </p>
        ))}
        <p className="letter__sign" data-reveal>
          {letter.name} / {letter.role}
        </p>
        <div className="letter__more">
          {shortReviews.map((r) => (
            <blockquote key={r.name} data-reveal>
              {r.quote} — {r.name}, {r.role}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__inner">
        <div className="about__letter">
          <img className="about__photo" src={links.photo} alt="Sabhari Shrinivas" width={64} height={64} loading="lazy" />
          <h2 className="visually-hidden" id="about-title">
            About me
          </h2>
          {about.map((p) => (
            <p key={p} data-reveal>
              {p}
            </p>
          ))}
          <p className="about__sign" data-reveal>
            Signed: Sabhari
          </p>
        </div>
        <div className="about__record">
          <ol className="record" aria-label="Work history" data-reveal>
            {experience.map((e) => (
              <li key={e.years + e.role}>
                <span className="record__years">{e.years}</span>
                <span className="record__role">{e.role}</span>
                <span className="record__company">{e.company}</span>
              </li>
            ))}
          </ol>
          <p className="about__skills" data-reveal>
            Skills: {skills}
          </p>
          <p className="about__links" id="contact" data-reveal>
            <a href={links.email}>{links.emailAddress}</a>
            <span aria-hidden="true">·</span>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a href={links.itch} target="_blank" rel="noreferrer">
              itch.io
            </a>
            <span aria-hidden="true">·</span>
            <a href={links.upwork} target="_blank" rel="noreferrer">
              Upwork
            </a>
            <span aria-hidden="true">·</span>
            <a href={links.resume} download={links.resumeDownloadName}>
              Resume (PDF)
            </a>
          </p>
          <footer className="about__legal">
            © 2026 Sabhari Shrinivas, Bangalore. Death Ball belongs to Small World Games, Synkrato to Gaea Global Technologies.
          </footer>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const phone = useIsPhone();
  useReveal(phone);
  const {scene, progress} = useScene(phone);
  return (
    <>
      {phone && <Nav />}
      {phone && <Hero phone />}
      <div className="split">
        <Stage scene={scene} progress={progress} phone={phone} />
        <main className="column">
          {!phone && <Hero phone={false} />}
          {projects.map((p, i) => (
            <ProjectText key={p.id} project={p} index={i} phone={phone} />
          ))}
        </main>
      </div>
      <Letter />
      <About />
    </>
  );
}
