'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TrenchCanvas from '@/components/TrenchCanvas';

function ScrollReveal({ children, className = '', delay = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} reveal ${delay} ${visible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
}

function TerminalDemo() {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const script = [
      { type: 'prompt', text: '$ veil scan --target 0x7a3f...d21c' },
      { type: 'wait', ms: 400 },
      { type: 'output', text: 'resolving surface across dark web indices...' },
      { type: 'wait', ms: 500 },
      { type: 'output', text: 'sweeping 30+ hidden-service search engines' },
      { type: 'wait', ms: 650 },
      { type: 'output', text: '[✓] paste-site index checked' },
      { type: 'output', text: '[✓] leak-dump archives checked' },
      { type: 'output', text: '[✓] ransomware leak-feed cross-referenced' },
      { type: 'wait', ms: 400 },
      { type: 'output', text: '3 matches found across 2 sources' },
      { type: 'wait', ms: 300 },
      { type: 'output', text: 'cross-referencing CIPHER CATALOG...' },
      { type: 'wait', ms: 500 },
      { type: 'output', text: 'method match: credential exposure vector' },
      { type: 'wait', ms: 400 },
      { type: 'prompt', text: '$ _' },
    ];

    let active = true;
    let index = 0;

    const typeLine = (text, type, callback) => {
      let charIdx = 0;
      const speed = type === 'prompt' ? 28 : 10;
      const uniqueId = Math.random();

      setLines((prev) => [...prev, { id: uniqueId, text: '', type }]);

      const interval = setInterval(() => {
        if (!active) {
          clearInterval(interval);
          return;
        }

        if (charIdx <= text.length) {
          setLines((prev) =>
            prev.map((l) => (l.id === uniqueId ? { ...l, text: text.slice(0, charIdx) } : l))
          );
          charIdx++;
        } else {
          clearInterval(interval);
          callback();
        }
      }, speed);
    };

    const executeNext = () => {
      if (!active) return;
      if (index >= script.length) {
        setTimeout(() => {
          if (active) {
            setLines([]);
            index = 0;
            executeNext();
          }
        }, 2600);
        return;
      }

      const step = script[index];
      index++;

      if (step.type === 'wait') {
        setTimeout(executeNext, step.ms);
      } else {
        typeLine(step.text, step.type, executeNext);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        executeNext();
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div className="terminal-block reveal is-visible animate-fadeIn" ref={containerRef} id="terminal-demo">
      <div className="terminal-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="terminal-lines">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`terminal-line ${line.type === 'prompt' ? 'terminal-prompt' : 'terminal-output'}`}
          >
            {line.text}
            {line.text === '$ _' && <span className="terminal-cursor" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      {/* ============ HERO ============ */}
      <section className="hero relative">
        <TrenchCanvas />
        <div className="container hero-grid z-10">
          <div>
            <ScrollReveal className="eyebrow">
              DARK WEB INTELLIGENCE · CRYPTO-NATIVE OSINT
            </ScrollReveal>
            <ScrollReveal className="display" delay="reveal-delay-1">
              <h1 style={{ lineHeight: '0.96', margin: '26px 0 34px' }}>THE MASK<br />SEES WHAT<br />YOU CANNOT</h1>
            </ScrollReveal>
            <ScrollReveal delay="reveal-delay-2">
              <p className="body-text" style={{ maxWidth: '480px' }}>
                VEIL sweeps the hidden layer of the internet — leak dumps, paste sites,
                ransomware chatter — and decodes what it finds through a catalog of
                103 documented attack techniques.
              </p>
            </ScrollReveal>
            <ScrollReveal delay="reveal-delay-3">
              <div className="hero-cta-row">
                <Link href="/veil" className="btn btn-solid">ENTER VEIL</Link>
                <Link href="/catalog" className="btn btn-outline">BROWSE THE CATALOG</Link>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay="reveal-delay-2">
            <div className="hero-art parallax" data-speed="0.06">
              <img src="/assets/01_veil_hero.png" alt="Masked figure — Masquerade Cipher" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ STAT ROW ============ */}
      <section className="bg-crimson">
        <ScrollReveal className="container stat-row">
          <div>
            <div className="stat-num">103</div>
            <div className="stat-label">Catalogued Techniques</div>
          </div>
          <div>
            <div className="stat-num">17</div>
            <div className="stat-label">Security Disciplines</div>
          </div>
          <div>
            <div className="stat-num">30+</div>
            <div className="stat-label">Dark Web Sources Swept</div>
          </div>
          <div>
            <div className="stat-num">&lt;60s</div>
            <div className="stat-label">Avg. Scan Response</div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============ LIVE DEMO TERMINAL ============ */}
      <section className="bg-void feature-section">
        <div className="container">
          <ScrollReveal className="eyebrow">
            LIVE DEMONSTRATION
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-1">
            <h2 style={{ margin: '20px 0 46px' }}>WATCH THE<br />CIPHER WORK</h2>
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-2">
            <TerminalDemo />
          </ScrollReveal>
        </div>
      </section>

      {/* ============ "DARK WEB IS NOT UNTOUCHABLE" ============ */}
      <section className="wide-image-section parallax" data-speed="0.04">
        <img src="/assets/04_descend_staircase.png" alt="Descending into the dark web" />
        <div className="wide-image-overlay-text container">
          <ScrollReveal className="eyebrow">
            THE DEPTHS ARE NOT SEALED
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-1">
            <h2 style={{ maxWidth: '820px', margin: '18px 0 20px' }}>
              THE DARK WEB WAS NEVER MEANT TO BE ENTERED. WE ENTER IT ANYWAY.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-2">
            <p className="body-text" style={{ maxWidth: '560px' }}>
              Every leak dump, every ransomware leak site, every whispered forum thread —
              indexed, swept, and brought back into the light. What hides in the dark
              layer of the internet is no longer out of reach.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ FEATURE GRID ============ */}
      <section className="bg-cream feature-section" id="features">
        <div className="container">
          <div className="feature-tag-row">
            <div className="feature-tag">FEATURE</div>
            <div className="feature-tag">PREVIEW</div>
          </div>

          <div className="feature-grid">
            <ScrollReveal className="feature-card">
              <div className="eyebrow">#1 SWEEP</div>
              <h3>VEIL SCANS<br />THE DEPTHS</h3>
              <div className="feature-img"><img src="/assets/01_veil_hero.png" alt="VEIL scanning" /></div>
              <p className="body-text">Domain, email, brand, or wallet — VEIL sweeps 30+ dark web
              search layers, paste sites, and leak archives in a single pass.</p>
            </ScrollReveal>

            <ScrollReveal className="feature-card" delay="reveal-delay-1">
              <div className="eyebrow">#2 DECODE</div>
              <h3>EVERY FINDING<br />UNMASKED</h3>
              <div className="feature-img"><img src="/assets/03_decode_eye.png" alt="Decode output" /></div>
              <p className="body-text">Raw scan results are cross-referenced against the Cipher
              Catalog, surfacing the exact technique behind every match.</p>
            </ScrollReveal>

            <ScrollReveal className="feature-card" delay="reveal-delay-2">
              <div className="eyebrow">#3 ARCHIVE</div>
              <h3>THE GRIMOIRE<br />OF METHOD</h3>
              <div className="feature-img"><img src="/assets/02_catalog_codex.png" alt="Cipher Catalog" /></div>
              <p className="body-text">103 documented techniques across 17 disciplines —
              searchable, filterable, and open for study inside the Cipher Catalog.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="bg-crimson feature-section" id="how-it-works">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="md:grid-cols-1 grid-cols-2">
            <div>
              <ScrollReveal className="eyebrow">
                THE RITUAL
              </ScrollReveal>
              <ScrollReveal delay="reveal-delay-1">
                <h2 style={{ margin: '20px 0 50px' }}>HOW THE<br />CIPHER WORKS</h2>
              </ScrollReveal>

              <ScrollReveal className="step-row">
                <div className="step-num">01</div>
                <div className="step-content">
                  <h3>NAME THE TARGET</h3>
                  <p className="body-text">Enter a domain, email, brand, or wallet address into VEIL.</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal className="step-row" delay="reveal-delay-1">
                <div className="step-num">02</div>
                <div className="step-content">
                  <h3>THE SWEEP BEGINS</h3>
                  <p className="body-text">VEIL routes through Tor and sweeps 30+ dark web sources,
                  leak archives, and live ransomware feeds.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal className="step-row" delay="reveal-delay-2">
                <div className="step-num">03</div>
                <div className="step-content">
                  <h3>THE CIPHER DECODES</h3>
                  <p className="body-text">Findings are matched against the Catalog and returned as
                  a readable intelligence report — no dark web experience required.</p>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay="reveal-delay-2">
              <div className="parallax" data-speed="0.05">
                <img src="/assets/06_compass_ritual.png" alt="The Cipher ritual" style={{ border: '1px solid var(--cream-ghost)' }} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="wide-image-section parallax" data-speed="0.04">
        <img src="/assets/07_courtly_pair.png" alt="Enter the cipher" />
        <div className="wide-image-overlay-text container" style={{ alignItems: 'flex-start' }}>
          <ScrollReveal className="eyebrow">
            THE MASK IS WAITING
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-1">
            <h2 style={{ margin: '18px 0 34px' }}>STEP THROUGH<br />THE VEIL</h2>
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-2">
            <Link href="/veil" className="btn btn-solid">ENTER VEIL NOW</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-void site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <img src="/assets/05_seal_emblem.png" alt="" />
                MASQUERADE CIPHER
              </div>
              <p className="body-text" style={{ maxWidth: '340px', fontSize: '12px' }}>
                Dark web intelligence for those who need to see behind the mask.
              </p>
            </div>
            <div>
              <div className="footer-col-title">NAVIGATE</div>
              <div className="footer-links">
                <Link href="/veil">VEIL</Link>
                <Link href="/catalog">Cipher Catalog</Link>
                <Link href="/#how-it-works">How It Works</Link>
              </div>
            </div>
            <div>
              <div className="footer-col-title">CONNECT</div>
              <div className="footer-links">
                <a href="#">X / Twitter</a>
                <a href="#">Telegram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 MASQUERADE CIPHER. FOR AUTHORIZED RESEARCH & OSINT USE ONLY.</span>
            <span>ALL SOURCES PUBLICLY INDEXED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
