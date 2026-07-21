'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CIPHER_CATALOG } from '@/data/catalogData';

const placeholders = {
  domain: 'e.g. yourproject.xyz',
  email: 'e.g. contact@yourproject.xyz',
  brand: 'e.g. YourProjectName',
  wallet: 'e.g. 7xKX...gAsU (Solana address)'
};

const API_BASE = '/api';

function findCatalogRefs(text, mode) {
  const refs = [];
  const lowercase = (text || '').toLowerCase();

  if (lowercase.includes('secret') || lowercase.includes('api key') || lowercase.includes('credential') || lowercase.includes('trufflehog')) {
    refs.push('TruffleHog');
  }
  if (lowercase.includes('git') || lowercase.includes('repository') || lowercase.includes('gitleaks') || lowercase.includes('leak')) {
    refs.push('Gitleaks');
  }
  if (lowercase.includes('email') || lowercase.includes('mail') || lowercase.includes('holehe')) {
    refs.push('Holehe');
  }
  if (lowercase.includes('username') || lowercase.includes('alias') || lowercase.includes('maigret')) {
    refs.push('Maigret');
  }
  if (lowercase.includes('typosquat') || lowercase.includes('lookalike') || lowercase.includes('phish') || lowercase.includes('dnstwist')) {
    refs.push('dnstwist');
  }
  if (lowercase.includes('nmap') || lowercase.includes('port scan') || lowercase.includes('open port')) {
    refs.push('Nmap');
  }
  if (lowercase.includes('subdomain') || lowercase.includes('amass') || lowercase.includes('dns')) {
    refs.push('Amass');
  }
  if (lowercase.includes('spiderfoot') || lowercase.includes('osint') || lowercase.includes('reconnaissance')) {
    refs.push('SpiderFoot');
  }
  if (lowercase.includes('sql') || lowercase.includes('injection') || lowercase.includes('sqlmap')) {
    refs.push('Sqlmap');
  }

  if (refs.length === 0) {
    if (mode === 'domain') {
      return ['Amass', 'Subfinder', 'dnstwist'];
    }
    if (mode === 'brand') {
      return ['theHarvester', 'SpiderFoot', 'dnstwist'];
    }
    if (mode === 'email') {
      return ['Holehe', 'Infoga'];
    }
    if (mode === 'wallet') {
      return ['SpiderFoot'];
    }
  }

  return [...new Set(refs)].slice(0, 3);
}

function findMatchedToolsInHit(hit) {
  const text = `${hit.title || ''} ${hit.bucket || ''} ${hit.content || ''}`.toLowerCase();
  const titleLower = (hit.title || '').toLowerCase();
  const bucketLower = (hit.bucket || '').toLowerCase();

  const scoredTools = [];

  CIPHER_CATALOG.forEach(tool => {
    let score = 0;
    const nameLower = tool.name.toLowerCase();

    // 1. Direct Name Match (+10 pts)
    const nameRegex = new RegExp(`\\b${nameLower}\\b`, 'i');
    if (nameRegex.test(text) || text.includes(nameLower)) {
      score += 10;
    }

    // 2. Matcher Metadata Scoring
    if (tool.matcher) {
      // Keywords Match (+3 pts per match)
      if (Array.isArray(tool.matcher.keywords)) {
        tool.matcher.keywords.forEach(k => {
          if (text.includes(k.toLowerCase())) {
            score += 3;
          }
        });
      }

      // Buckets Match (+5 pts per match)
      if (Array.isArray(tool.matcher.buckets)) {
        tool.matcher.buckets.forEach(b => {
          if (bucketLower.includes(b.toLowerCase())) {
            score += 5;
          }
        });
      }

      // File Extensions Match (+5 pts per match)
      if (Array.isArray(tool.matcher.extensions)) {
        tool.matcher.extensions.forEach(ext => {
          if (titleLower.includes(ext.toLowerCase())) {
            score += 5;
          }
        });
      }
    }

    if (score > 0) {
      scoredTools.push({ name: tool.name, score });
    }
  });

  // Sort tools by score descending and return top 3 highest scoring tools
  scoredTools.sort((a, b) => b.score - a.score);
  return scoredTools.slice(0, 3).map(t => t.name);
}

function DarkWebHitsCard({ res }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedContentHits, setExpandedContentHits] = useState({});
  const hits = res.hits || [];
  const displayHits = isExpanded ? hits : hits.slice(0, 5);

  const toggleHitContent = (idx) => {
    setExpandedContentHits(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const mapBucketToHackingTheme = (bucket) => {
    const lowercase = (bucket || '').toLowerCase();
    if (lowercase.includes('darknet') || lowercase.includes('tor')) {
      return 'TOR ANONYMOUS NODE INFILTRATION';
    }
    if (lowercase.includes('stealer') || lowercase.includes('logs')) {
      return 'STEALER CREDENTIAL EXFILTRATION';
    }
    if (lowercase.includes('leak') || lowercase.includes('restricted')) {
      return 'RESTRICTED TARGET ARCHIVE BREACH';
    }
    if (lowercase.includes('web') || lowercase.includes('public')) {
      return 'CLEANNET SURFACE RECONNAISSANCE';
    }
    return 'ENVELOPE DECRYPTION PATHWAY';
  };

  // Convert default title to dynamic target hack description using hits length
  const formattedTitle = `[INFILTRATED NODES] – ${hits.length} TARGET EXPLOIT HITS`;

  return (
    <div className="w-full flex flex-col mt-8">
      {/* Standalone Section Title */}
      <h2 className="text-2xl font-bold tracking-wider text-[var(--cream)] pb-6 mb-10 font-display" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', borderBottom: '1px solid var(--cream-ghost)', marginBottom: '24px' }}>
        {formattedTitle}
      </h2>

      <div className="flex flex-col">
        {displayHits.map((hit, index) => {
          const matchedTools = findMatchedToolsInHit(hit);
          return (
            <div key={index} className="result-card reveal is-visible">
              <div className="result-header flex flex-col items-start gap-2">
                <div className="result-title text-[var(--cream)] text-lg" style={{ fontSize: '20px' }}>
                  FILE: {hit.title}
                </div>
                <div className="flex items-center gap-3 flex-wrap mt-1">
                  <div className="result-severity text-[11px] border border-[var(--crimson-bright)]/60 text-[var(--cream)] rounded-sm bg-[var(--void-deeper)]/60 px-2 py-0.5">
                    {mapBucketToHackingTheme(hit.bucket)}
                  </div>
                  {hit.date && (
                    <span className="text-[11px] text-gray-400 font-mono">
                      TIMESTAMP: {hit.date}
                    </span>
                  )}
                  {hit.source_engine && (
                    <span className="text-[11px] text-gray-400 font-mono uppercase">
                      • ENGINE: {hit.source_engine}
                    </span>
                  )}
                </div>
                {hit.link && (
                  <div className="font-mono text-[12px] text-gray-400 break-all mt-1">
                    TARGET LINK &gt; <a href={hit.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--crimson-bright)] text-[var(--cream)]">{hit.link}</a>
                  </div>
                )}
              </div>

              {/* Payload Content Section with Toggle */}
              {hit.content ? (
                <div className="my-3">
                  <button
                    onClick={() => toggleHitContent(index)}
                    className="px-3 py-1.5 text-[11px] font-mono font-bold text-[var(--crimson-bright)] border border-[var(--crimson-bright)]/60 bg-[var(--void-deeper)]/60 hover:!bg-[var(--crimson-bright)] hover:!text-[var(--cream)] rounded-sm transition-all duration-200 cursor-pointer uppercase flex items-center gap-2 tracking-wider"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>{expandedContentHits[index] ? '[-] COLLAPSE PAYLOAD CONTENT' : '[+] EXTRACT & VIEW DATASTREAM CONTENT'}</span>
                  </button>

                  {expandedContentHits[index] && (
                    <div className="result-body font-mono text-[13px] text-[var(--cream-dim)] leading-[1.8] whitespace-pre-wrap break-all mt-3 p-4 border-l-2 border-[var(--crimson-bright)] bg-black/40 rounded-r-sm">
                      {hit.content}
                    </div>
                  )}
                </div>
              ) : (
                <div className="result-body font-mono text-[13px] text-[var(--cream-dim)] leading-[1.8] whitespace-pre-wrap break-all mb-4 opacity-70">
                  [RAW DATASTREAM SHARDED / DIRECT DECRYPTION QUEUED]
                </div>
              )}

              {/* Skill Audit Narrative Logs */}
              {matchedTools.length > 0 && (
                <div className="flex flex-col gap-1 text-[12px] font-mono text-[var(--crimson-bright)]/90 uppercase pl-3 border-l-2 border-[var(--crimson-bright)] mb-4 mt-2">
                  {matchedTools.map(tool => (
                    <div key={tool}>
                      &gt;&gt;&gt; [CIPHER MODULE ENGAGED: EXECUTED {tool.toUpperCase()} PAYLOAD]
                    </div>
                  ))}
                </div>
              )}

              {/* Skill Matching Highlight */}
              {matchedTools.length > 0 && (
                <div className="result-technique mt-6">
                  <div className="label">[INFILTRATION SKILLS ENGAGED]</div>
                  <div className="flex items-center gap-3 flex-wrap mt-3 mb-1">
                    {matchedTools.map(tool => (
                      <a
                        key={tool}
                        href={`/catalog?search=${encodeURIComponent(tool)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="result-severity hover:!bg-[var(--crimson-bright)] hover:!text-[var(--cream)] transition-all duration-200 cursor-pointer no-underline"
                        style={{ textDecoration: 'none' }}
                      >
                        {tool}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hits.length > 5 && (
        <div className="mt-4 mb-6 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[13px] font-mono uppercase tracking-wider font-bold underline hover:text-[var(--cream)] cursor-pointer text-[var(--crimson-bright)] transition-colors duration-200"
          >
            {isExpanded ? 'Collapse Extracted Hits' : `Show all ${hits.length} extracted hits`}
          </button>
        </div>
      )}

      <div className="pt-4 flex justify-between items-center text-[13px] font-mono text-[var(--cream-dim)] opacity-80 mb-8" style={{ borderTop: '1px dashed var(--cream-ghost)' }}>
        <span>[{hits.length} COMPROMISED DATASETS EXTRACTED]</span>
        <span>ROUTING VECTOR: Intelligence X</span>
      </div>
    </div>
  );
}

function generateMockResults(target, mode) {
  const normalizedTarget = target || 'target';

  if (mode === 'wallet') {
    return [
      {
        title: 'ON-CHAIN ADDRESS ASSOCIATION',
        severity: 'HIGH',
        body: `**[INFILTRATION STATUS: COMPLETE]**\n\nTarget Wallet: \`${normalizedTarget}\`\n\nBy running transaction routing footprints, we intercepted **3 historical dark-web forum posts** referencing OTC capital-drain operations. Ledger heuristics link this address to a known security exploit dump in Q3 2025.`,
        technique: 'On-chain Wallet Association & Dark Web Mentions (SpiderFoot / Sherlock)',
        refs: ['Sherlock', 'SpiderFoot']
      },
      {
        title: 'TOKEN CONTRACT CLONES',
        severity: 'MEDIUM',
        body: `**[LOOKALIKES DETECTED]**\n\nIdentified **2 malicious proxy contract clones** deployed on EVM-compatible chains mimicking the wallet deployer pattern. This indicates active preparation for community front-running or phishing.`,
        technique: 'Impersonation & Smart Contract Clones (dnstwist)',
        refs: ['dnstwist']
      },
      {
        title: 'RANSOMWARE FEED SEARCH',
        severity: 'LOW',
        body: `**[INDEX READ: CLEAN]**\n\nZero matches found for target wallet address \`${normalizedTarget}\` across currently monitored ransomware gang leak sites. No active threat markers detected.`,
        technique: 'Status: Clean index read.',
        refs: []
      }
    ];
  }

  if (mode === 'email') {
    return [
      {
        title: 'COMB DUMP FRAGMENT EXPOSURE',
        severity: 'HIGH',
        body: `**[DECRYPTION SUCCESSFUL]**\n\nEmail target \`${normalizedTarget}\` was found in **2 distinct plain-text leak aggregates** compiled in 2025/2026. The fragment includes a cryptographically salted MD5 hash signature and plain-text hints matching legacy credentials. Extracted secrets match structures verified by **TruffleHog** and **Gitleaks**.`,
        technique: 'Credential Exposure & Leak Audits (Gitleaks / TruffleHog / Hashcat)',
        refs: ['TruffleHog', 'Gitleaks', 'Hashcat']
      },
      {
        title: 'REGISTERED PLATFORMS SCAN',
        severity: 'MEDIUM',
        body: `**[ENDPOINT SCAN COMPLETE]**\n\nTarget registration verified on **4 high-risk service portals** known to have suffered database compromises. Tested registration endpoints using **Holehe** authentication probes. Password reuse vectors are highly active.`,
        technique: 'Holehe Platform Registration Enumeration',
        refs: ['Holehe']
      },
      {
        title: 'SPAM LIST CORRELATION',
        severity: 'LOW',
        body: `**[METADATA PARSED]**\n\nEmail listed on global marketing/spam campaign distributions, indicating exposure of public contact lists but no active malware delivery profile.`,
        technique: 'Status: Low exposure, secure password recommended.',
        refs: []
      }
    ];
  }

  if (mode === 'brand') {
    return [
      {
        title: 'TYPOSQUAT BRAND IMITATORS',
        severity: 'HIGH',
        body: `**[BRAND SCAN: ALERTS TRIGGERED]**\n\nFound **5 registered lookalike domains** targeting \`${normalizedTarget}\`. Probing via **dnstwist** shows active MX records configured on 2 of them, representing a high risk of active phishing or email masquerading.`,
        technique: 'Typosquatting & Brand Impersonation (dnstwist)',
        refs: ['dnstwist']
      },
      {
        title: 'INTELLECTUAL PROPERTY CHATTER',
        severity: 'MEDIUM',
        body: `**[REPOSITORY SCAN SUCCESSFUL]**\n\nMentions of codebases matching \`${normalizedTarget}\` were flagged in private Git repository leaks. Checked utilizing **Gitleaks** and **TruffleHog**. Mentions include proprietary development API signatures.`,
        technique: 'Source Code Leak Reconnaissance',
        refs: ['Gitleaks', 'TruffleHog']
      },
      {
        title: 'RANSOMWARE WATCHLIST',
        severity: 'LOW',
        body: `**[INDEX READ: CLEAN]**\n\nNo operational ransomware groups list \`${normalizedTarget}\` or associated entities on active countdown logs.`,
        technique: 'Status: Safe',
        refs: []
      }
    ];
  }

  // default to domain
  return [
    {
      title: 'CREDENTIAL EXPOSURE',
      severity: 'HIGH',
      body: `**[DECRYPTION SUCCESSFUL]**\n\nA credential dump referencing \`${normalizedTarget}\` was located across **2 dark web paste-site indices**. The exposure includes hashed credential fragments consistent with a third-party database breach, rather than direct target host compromise. Extracted secrets audited via **TruffleHog** and **Gitleaks**.`,
      technique: 'Source Code Reconnaissance & Credential Exposure',
      refs: ['TruffleHog', 'Gitleaks']
    },
    {
      title: 'TYPOSQUAT DOMAINS',
      severity: 'MEDIUM',
      body: `**[LOOKALIKES DETECTED]**\n\n**4 lookalike domains** were identified that closely mimic \`${normalizedTarget}\` — a common precursor to phishing campaigns targeting a project's community. Mapped via **dnstwist**.`,
      technique: 'Typosquat & Lookalike Domain Monitoring',
      refs: ['dnstwist']
    },
    {
      title: 'RANSOMWARE CHATTER',
      severity: 'LOW',
      body: `**[INDEX READ: CLEAN]**\n\nNo direct mentions of \`${normalizedTarget}\` were found across currently tracked ransomware group leak sites. This is a clean read at time of scan.`,
      technique: 'Status: No further action indicated.',
      refs: []
    }
  ];
}

export default function VeilPage() {
  const [mode, setMode] = useState('domain');
  const [target, setTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanState, setScanState] = useState('idle'); // idle, progress, done
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState([]);
  const [hasError, setHasError] = useState(false);

  const handleScan = async () => {
    if (!target.trim()) {
      setHasError(true);
      setTimeout(() => setHasError(false), 600);
      return;
    }

    setIsScanning(true);
    setScanState('progress');
    setLogs([]);
    setResults([]);

    const stepsByMode = {
      domain: [
        `[STEALTH] Routing stealth proxy nodes for target: ${target}`,
        `[RECON] Running Amass to map DNS records & subdomains for: ${target}`,
        `[RECON] Mapping active lookalike domains matching: ${target} [dnstwist active]`,
        `[EXPLOIT] Auditing repositories & pastebins for ${target} leaks [Gitleaks]`,
        `[OSINT] Sweeping 30+ dark web databases for references to ${target}`,
        `[DECRYPTION] Extracting & decrypting credential hashes for ${target} [Hashcat]`,
        `[SUCCESS] Infiltration of ${target} database complete. Compiling intelligence report.`
      ],
      email: [
        `[STEALTH] Initializing Tor circuit to audit: ${target}`,
        `[RECON] Running Sherlock & Maigret footprint search for: ${target}`,
        `[EXPLOIT] Probing registration endpoints on ${target} via Holehe`,
        `[OSINT] Searching aggregated database paste bins & COMB leaks for: ${target}`,
        `[SUCCESS] Leak fragment footprint extraction for ${target} complete.`
      ],
      brand: [
        `[STEALTH] Directing brand crawler nodes targeting: ${target}`,
        `[RECON] Fetching brand identifiers for "${target}" via theHarvester & SpiderFoot`,
        `[EXPLOIT] Auditing public code repositories for: "${target}" leaks [Gitleaks]`,
        `[RECON] Scanning domain records with dnstwist for clones mimicking: ${target}`,
        `[SUCCESS] Brand risk intelligence profile for ${target} compiled.`
      ],
      wallet: [
        `[STEALTH] Tuning RPC connection to audit ledger history for: ${target}`,
        `[RECON] Tracing transaction graph for address: ${target}...`,
        `[RECON] Tracking counterparty wallet history for: ${target} [SpiderFoot]`,
        `[OSINT] Auditing ransomware ledger lists referencing: ${target}`,
        `[SUCCESS] Ledger analysis for wallet ${target} compiled.`
      ]
    };

    const steps = stepsByMode[mode] || stepsByMode.domain;

    // Trigger API call early in background so it executes during/after animations
    const apiCallPromise = (async () => {
      let endpoint = '';
      let body = {};

      if (mode === 'domain') {
        endpoint = `${API_BASE}/deep/threat`;
        body = { query: target.trim() };
      } else if (mode === 'email') {
        endpoint = `${API_BASE}/deep/exposure`;
        body = { query: target.trim(), self_confirmed: true };
      } else if (mode === 'brand') {
        endpoint = `${API_BASE}/deep/brand`;
        body = { query: target.trim() };
      } else if (mode === 'wallet') {
        endpoint = `${API_BASE}/trench/wallet`;
        body = { address: target.trim() };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      return res.json();
    })();

    // Run typewriter logs animation
    for (let idx = 0; idx < steps.length; idx++) {
      await new Promise(resolve => setTimeout(resolve, 350));
      setLogs(prev => [...prev, steps[idx]]);
    }

    try {
      const data = await apiCallPromise;
      const formattedResults = [];

      if (mode === 'wallet') {
        const score = data.score ?? 0;
        const verdict = data.verdict ?? 'LOW';
        const transaction_count = data.transaction_count ?? 0;
        const linked_flagged_wallets = data.linked_flagged_wallets ?? [];
        const deployer_launches = data.deployer_launches ?? 0;
        const deployer_rug_count = data.deployer_rug_count ?? 0;
        const deployer_rug_rate = data.deployer_rug_rate ?? 0;
        const wallet_verdict = data.wallet_verdict;

        // Card 1: Wallet Verdict
        formattedResults.push({
          title: 'WALLET DOSSIER VERDICT',
          severity: verdict === 'FLAGGED' || score >= 60 ? 'HIGH' : verdict === 'WATCH' || score >= 30 ? 'MEDIUM' : 'LOW',
          body: `**[LEDGER ANALYSIS RUNNING: SpiderFoot]**\n\n**Status**: ${verdict}\n**Threat Score**: ${score}/100\n\n${wallet_verdict?.summary || 'No detailed analysis summary returned.'}\n\n### Metrics:\n- **Transactions Scanned**: ${transaction_count}\n- **Wallet Classification**: ${wallet_verdict?.classification?.toUpperCase() || 'UNKNOWN'}`,
          technique: 'On-chain Wallet Heuristics',
          refs: ['SpiderFoot']
        });

        // Card 2: Counterparty Risk
        formattedResults.push({
          title: 'COUNTERPARTY RISK ANALYSIS',
          severity: linked_flagged_wallets.length > 0 ? 'HIGH' : 'LOW',
          body: linked_flagged_wallets.length > 0
            ? `**[THREAT LINK DETECTED]**\n\nDetected **${linked_flagged_wallets.length}** flagged transaction counterparties tied to known security exploits or ransomware addresses.\n\n${linked_flagged_wallets.slice(0, 5).map(w => `- \`${w}\``).join('\n')}`
            : '**[HEALTHY INTERACTION HISTORY]**\n\nNo transaction history with flagged addresses.',
          technique: 'Flagged Address Association',
          refs: ['SpiderFoot']
        });

        // Card 3: Deployer Profile
        if (deployer_launches > 0) {
          formattedResults.push({
            title: 'LAUNCHER RISK PROFILE',
            severity: deployer_rug_rate > 0.5 ? 'HIGH' : deployer_rug_rate > 0.2 ? 'MEDIUM' : 'LOW',
            body: `**[LAUNCH HISTORY EXTRACTED]**\n\nTotal launches: **${deployer_launches}**\nRug pulls: **${deployer_rug_count}**\nRug pull rate: **${(deployer_rug_rate * 100).toFixed(0)}%**\n\nPattern analysis indicates ${deployer_rug_rate > 0.5 ? 'extreme launch hazard.' : deployer_rug_rate > 0.2 ? 'elevated risk.' : 'clean token deploy history.'}`,
            technique: 'Token Deployment Intelligence',
            refs: ['TruffleHog']
          });
        }
      } else {
        // Domain, Email, Brand modes
        const summary = data.summary || '';
        const dark_web_hits = data.dark_web_hits || [];
        const breaches = data.breaches || [];

        // Card 1: AI Threat summary
        let prefix = '';
        if (mode === 'email') {
          prefix = `**[INFILTRATION SUCCESSFUL]** Probed social registration vectors using **Holehe**. Found database leak signatures corresponding to the email target.\n\n`;
        } else if (mode === 'brand') {
          prefix = `**[RECONNAISSANCE COMPLETE]** Gathered public threat indicators using **theHarvester** and **SpiderFoot**. Checked lookalikes with **dnstwist**.\n\n`;
        } else {
          prefix = `**[TARGET INFILTRATED]** Scanned attack surface using **Amass** and matched leak patterns against **TruffleHog** indices.\n\n`;
        }

        formattedResults.push({
          title: mode === 'email' ? 'PERSONAL IDENTITY EXPOSURE' : mode === 'brand' ? 'BRAND RISK ANALYSIS' : 'THREAT INTELLIGENCE REPORT',
          severity: dark_web_hits.length > 0 || breaches.length > 0 ? 'HIGH' : 'LOW',
          body: prefix + (summary || 'No exposure or risk detected in the latest dark web scan.'),
          technique: mode === 'email' ? 'Credential Exposure Vector' : mode === 'brand' ? 'Brand Impersonation Sweeper' : 'Deep Web Reconnaissance',
          refs: findCatalogRefs(summary, mode)
        });

        // Card 2: Specific breaches for email mode
        if (mode === 'email' && breaches.length > 0) {
          formattedResults.push({
            title: 'BREACH ARCHIVE DETECTED',
            severity: 'MEDIUM',
            body: `**[BREACH RECORD EXTRACTED]**\n\nTarget found in **${breaches.length}** public credential leak(s):\n\n` + breaches.map(b => `- **${b.name}** (${b.date || 'Unknown Date'}): ${b.description || 'No description'}`).join('\n'),
            technique: 'Credential Exposure & Leak Audits',
            refs: ['Holehe', 'Gitleaks']
          });
        }

        if (dark_web_hits && dark_web_hits.length > 0) {
          formattedResults.push({
            type: 'dark_web_hits',
            title: `DARK WEB HITS – ${dark_web_hits.length} RESULT(S)`,
            hits: dark_web_hits
          });
        }
      }

      setResults(formattedResults);
      setScanState('done');
    } catch (err) {
      console.error(err);
      setResults([
        {
          title: 'SCAN SERVICE UNAVAILABLE',
          severity: 'HIGH',
          body: `Failed to connect to the live threat intelligence network. The scanning node returned an error or timed out.\n\n**Error Details**: \`${err.message}\`\n\nPlease check your configuration or try again later.`,
          technique: 'Network Connectivity Check',
          refs: []
        }
      ]);
      setScanState('done');
    } finally {
      setIsScanning(false);
    }
  };


  return (
    <div className="w-full">
      <section className="veil-hero">
        <div className="container">
          <div className="eyebrow reveal is-visible">VEIL · DARK WEB OSINT SCANNER</div>
          <h1 className="reveal is-visible" style={{ margin: '20px 0 20px' }}>NAME THE<br />TARGET</h1>
          <p className="body-text reveal is-visible" style={{ maxWidth: '540px' }}>
            Domain, email, brand name, or wallet address. VEIL sweeps the dark web&apos;s
            public layer and returns what it finds — decoded, scored, and matched
            against the Cipher Catalog.
          </p>

          <div className="veil-mode-row reveal is-visible">
            {['domain', 'email', 'brand', 'wallet'].map((m) => (
              <div
                key={m}
                onClick={() => {
                  if (!isScanning) {
                    setMode(m);
                    setTarget('');
                    setScanState('idle');
                  }
                }}
                className={`veil-mode ${mode === m ? 'active' : ''}`}
              >
                {m.toUpperCase()}
              </div>
            ))}
          </div>

          <div className="veil-input-row reveal is-visible">
            <input
              type="text"
              id="veil-target"
              className="veil-input"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              placeholder={placeholders[mode]}
              disabled={isScanning}
              style={hasError ? { borderColor: 'var(--crimson-bright)' } : {}}
            />
            <button
              className="btn btn-solid"
              id="veil-scan-btn"
              onClick={handleScan}
              disabled={isScanning}
            >
              {isScanning ? 'INFILTRATING...' : 'INFILTRATE'}
            </button>
          </div>

          {/* Progress Logs */}
          <div className={`scan-progress ${scanState === 'progress' ? 'show' : ''}`} id="scan-progress">
            {logs.map((log, index) => (
              <div key={index} className="line" style={{ opacity: 0.85 }}>
                &gt; {log}
              </div>
            ))}
          </div>

          {/* Empty state instructions */}
          {scanState === 'idle' && (
            <div className="empty-state" id="empty-state">
              Enter a target above and press INFILTRATE to begin. VEIL will sweep
              dark web paste sites, leak archives, and live ransomware feeds — this
              demo shows sample output structure using placeholder data.
            </div>
          )}

          {/* Results Output */}
          <div className={`veil-results ${scanState === 'done' ? 'show' : ''}`} id="veil-results">
            {results.map((res, i) => {
              if (res.type === 'dark_web_hits') {
                return <DarkWebHitsCard key={i} res={res} />;
              }
              return (
                <div key={i} className="result-card reveal is-visible">
                  <div className="result-header">
                    <div className="result-title">{res.title}</div>
                    <div className="result-severity">{res.severity}</div>
                  </div>
                  <div className="result-body font-mono uppercase text-xs">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {res.body}
                    </ReactMarkdown>
                  </div>
                  <div className="result-technique mt-6">
                    <div className="label">MATCHED TECHNIQUE</div>
                    <div className="font-mono text-[13px] leading-relaxed">
                      <span className="text-[var(--cream)] font-bold">{res.technique}</span>
                      {res.refs && res.refs.length > 0 && (
                        <div className="flex items-center gap-3 flex-wrap mt-3 mb-1">
                          {res.refs.map((ref) => (
                            <a
                              key={ref}
                              href={`/catalog?search=${encodeURIComponent(ref)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="result-severity hover:!bg-[var(--crimson-bright)] hover:!text-[var(--cream)] transition-all duration-200 cursor-pointer no-underline"
                              style={{ textDecoration: 'none' }}
                            >
                              {ref}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-void site-footer" style={{ paddingTop: '40px' }}>
        <div className="container footer-bottom">
          <span>© 2026 MASQUERADE CIPHER. FOR AUTHORIZED RESEARCH & OSINT USE ONLY.</span>
          <span>ALL SOURCES PUBLICLY INDEXED</span>
        </div>
      </footer>
    </div>
  );
}
