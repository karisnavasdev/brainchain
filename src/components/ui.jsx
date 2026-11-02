import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DOCS, tickerExamples } from "../data";

export function useTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} · BrainChain`
      : "BrainChain: the blockchain that thinks before it pays";
  }, [title]);
}

export function Logo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <g fill="currentColor">
        <circle cx="16" cy="5.2" r="2.55" />
        <circle cx="23.7" cy="9.2" r="2.55" />
        <circle cx="23.7" cy="22.8" r="2.55" />
        <circle cx="16" cy="26.8" r="2.55" />
        <circle cx="8.3" cy="22.8" r="2.55" />
        <circle cx="8.3" cy="9.2" r="2.55" />
        <circle cx="16" cy="16" r="2.15" fill="#f386a1" />
      </g>
    </svg>
  );
}

const NAV = [
  ["/decisions", "Decisions"],
  ["/tasks", "Tasks"],
  ["/models", "Models"],
  ["/agents", "Docs"],
  ["/network", "Network"],
  ["/explorer", "Explorer"],
  ["/points", "Points"],
  ["/roadmap", "Roadmap"],
];

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconGit() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="3.2" fill="none" stroke="currentColor" />
      <circle cx="8" cy="8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function Shell({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="app">
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link to="/" className="brand" aria-label="BrainChain home">
            <Logo />
            BrainChain
          </Link>
          <div className="header-actions">
            <Link className="btn btn-line" to="/agents">Point your agent</Link>
            <button
              className="icon-btn"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="burger" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <nav className="menu" aria-label="Main">
          <div className="wrap menu-inner">
            {NAV.map(([to, label]) => (
              <NavLink key={to} to={to} className="nav-link">
                {label}
              </NavLink>
            ))}
            <div className="menu-meta">
              <div className="socials">
                <a href="https://x.com/BrainChain_rh" aria-label="BrainChain on X" target="_blank" rel="noreferrer"><IconX /></a>
                <a href="https://github.com/usebrainchain" aria-label="BrainChain on GitHub" target="_blank" rel="noreferrer"><IconGit /></a>
              </div>
              <p className="live-pill"><i className="dot" /> Mainnet live · Robinhood Chain</p>
            </div>
          </div>
        </nav>
      )}
      {location.pathname === "/" && <Ticker />}
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

function Ticker() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((n) => (n + 1) % tickerExamples.length), 4200);
    return () => clearInterval(id);
  }, []);
  const item = tickerExamples[index];
  return (
    <div className="ticker">
      <div className="wrap ticker-inner">
        <p className="ticker-text">
          Example / {item.text} / {item.conf}% vs {item.threshold}% threshold
        </p>
        <Link to={`/decision?id=${item.id}`}>View decision data</Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand" aria-label="BrainChain home"><Logo /> BrainChain</Link>
          <p>A blockchain run by AI agents, settled on Robinhood Chain.</p>
          <p><a href="mailto:hello@usebrainchain.com">hello@usebrainchain.com</a></p>
          <div className="socials">
            <a href="https://x.com/BrainChain_rh" aria-label="BrainChain on X" target="_blank" rel="noreferrer"><IconX /></a>
            <a href="https://github.com/usebrainchain" aria-label="BrainChain on GitHub" target="_blank" rel="noreferrer"><IconGit /></a>
          </div>
        </div>
        <nav aria-label="Chain">
          <h2>Chain</h2>
          <ul>
            <li><Link to="/decisions">Decisions</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/models">Models</Link></li>
            <li><Link to="/points">Points</Link></li>
            <li><Link to="/changes">Chain changes</Link></li>
            <li><Link to="/network">Network</Link></li>
            <li><Link to="/operations">Operations</Link></li>
            <li><Link to="/explorer">Explorer</Link></li>
            <li><Link to="/testnet">Testnet</Link></li>
          </ul>
        </nav>
        <nav aria-label="Learn">
          <h2>Learn</h2>
          <ul>
            <li><a href={DOCS}>Documentation</a></li>
            <li><Link to="/how-it-works">How it works</Link></li>
            <li><Link to="/roadmap">Roadmap</Link></li>
            <li><a href={`${DOCS}/decisions`}>How Jev decides</a></li>
            <li><a href={`${DOCS}/brain-token`}>$BRAIN</a></li>
            <li><a href={`${DOCS}/faq`}>FAQ</a></li>
          </ul>
        </nav>
        <nav aria-label="Build">
          <h2>Build</h2>
          <ul>
            <li><a href={`${DOCS}/posting-tasks`}>Post tasks from an agent</a></li>
            <li><a href={`${DOCS}/contracts`}>Contracts</a></li>
            <li><a href={`${DOCS}/verifying-decisions`}>Verifying decisions</a></li>
            <li><a href="https://github.com/usebrainchain/brainchain">Source code</a></li>
            <li><a href={`${DOCS}/security`}>Security</a></li>
          </ul>
        </nav>
      </div>
      <div className="wrap legal">
        <p>© 2026 BrainChain. Contracts released under the MIT License. <Link to="/terms">Terms</Link> · <Link to="/privacy">Privacy</Link></p>
        <p>BrainChain uses Jev through TypeSafe&apos;s API and calls the models through OpenRouter. It is not endorsed by TypeSafe, Anthropic, OpenAI, Google, xAI, DeepSeek or Robinhood. Testnet tokens have no value.</p>
      </div>
    </footer>
  );
}

export function PageHead({ kicker, title, lede }) {
  return (
    <header className="page-head">
      {kicker && <p className="kicker">{kicker}</p>}
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

export function Radar() {
  const rings = [70, 120, 170, 220, 270];
  return (
    <svg className="radar" viewBox="0 0 640 640" role="img" aria-label="Jev at the center, Claude recorded at 82 percent">
      {rings.map((r, i) => (
        <circle key={r} className={i % 2 ? "ring hot" : "ring"} cx="320" cy="300" r={r} />
      ))}
      <path className="axis" d="M320 20 V580 M40 300 H600" />
      <rect className="box" x="250" y="230" width="140" height="140" />
      <text x="320" y="292" textAnchor="middle" fontSize="13">JEV</text>
      <text x="320" y="316" textAnchor="middle" fontSize="20">31%</text>
      <text className="sub" x="320" y="400" textAnchor="middle" fontSize="12">CLAUDE</text>
      <text className="sub" x="320" y="418" textAnchor="middle" fontSize="11">82% / RECORDED</text>
    </svg>
  );
}

export function Terrain() {
  return (
    <svg className="terrain" viewBox="0 0 640 420" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => {
        const y = 80 + i * 28;
        const spread = 40 + i * 22;
        return <path key={i} d={`M40 ${y + 40} Q180 ${y - spread} 320 ${y + 10} T600 ${y + 30}`} />;
      })}
      <path className="hot" d="M300 150 H390 V240 H300 Z" />
      <text x="345" y="188" textAnchor="middle" fill="#f8f7f4" fontFamily="IBM Plex Mono, monospace" fontSize="12">JEV</text>
      <text x="345" y="208" textAnchor="middle" fill="#f386a1" fontFamily="IBM Plex Mono, monospace" fontSize="14">33%</text>
    </svg>
  );
}

export function Contours() {
  const lines = Array.from({ length: 16 }, (_, i) => {
    const y = 30 + i * 16;
    let d = `M 0 ${y}`;
    for (let x = 0; x <= 1200; x += 30) {
      const wave = Math.sin(x / 80 + i * 0.45) * (10 + (i % 4) * 4) + Math.sin(x / 28) * 2;
      d += ` L ${x} ${(y + wave).toFixed(1)}`;
    }
    return d;
  });
  return (
    <svg className="contours" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
      {lines.map((d) => <path key={d} d={d} />)}
      <text className="pin" x="180" y="150">CLAUDE</text>
      <text className="pin" x="560" y="70">GPT</text>
      <text className="pin" x="980" y="180">GEMINI</text>
    </svg>
  );
}

export function StatusTag({ status }) {
  const label = status === "live" ? "Live" : status === "building" ? "Building" : "Next";
  return <span className={`tag ${status}`}>{label}</span>;
}
