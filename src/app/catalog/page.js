'use client';

import React, { useState, useMemo } from 'react';
import { CIPHER_CATALOG, CATALOG_CATEGORIES } from '@/data/catalogData';
import skillsData from '@/data/skills.json';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [copiedState, setCopiedState] = useState(false);

  const filteredCatalog = useMemo(() => {
    return CIPHER_CATALOG.filter((tool) => {
      const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.desc.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const richData = useMemo(() => {
    if (!selectedTool) return null;
    return skillsData.find(s => s.name.toLowerCase() === selectedTool.name.toLowerCase()) || null;
  }, [selectedTool]);

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 1500);
  };

  return (
    <div className="w-full">
      <section className="catalog-hero">
        <div className="container">
          <div className="eyebrow reveal is-visible">THE GRIMOIRE</div>
          <h1 className="reveal is-visible" style={{ margin: '20px 0 20px' }}>CIPHER<br />CATALOG</h1>
          <p className="body-text reveal is-visible" style={{ maxWidth: '600px' }}>
            103 documented security techniques across 17 disciplines — compiled
            from publicly maintained security research repositories. Reference
            material only. Every entry links to its original public source.
          </p>
        </div>
      </section>

      <div className="catalog-controls">
        <div className="container">
          <input
            type="text"
            className="catalog-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH THE CATALOG — E.G. 'NMAP', 'PHISHING', 'CLOUD'"
          />
          <div className="catalog-filter-row" id="filter-row">
            <div
              className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              ALL
            </div>
            {CATALOG_CATEGORIES.sort().map((cat) => (
              <div
                key={cat}
                className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.toUpperCase()}
              </div>
            ))}
          </div>
          <div className="catalog-meta-row">
            <span id="result-count">{filteredCatalog.length} technique{filteredCatalog.length !== 1 ? 's' : ''}</span>
            <span>SOURCE: PUBLIC SECURITY RESEARCH REPOSITORIES</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="catalog-grid" id="catalog-grid">
          {filteredCatalog.map((tool) => (
            <div 
              key={tool.name} 
              className="tool-card"
              onClick={() => {
                setSelectedTool(tool);
                setShowFullDetails(false);
              }}
            >
              <div className="tool-card-top">
                <div className="tool-tier">{tool.tier}</div>
              </div>
              <div className="tool-name">{tool.name}</div>
              <div className="tool-category">{tool.category}</div>
              <div className="tool-desc font-mono uppercase text-xs opacity-80 leading-relaxed">
                {tool.desc}
              </div>
              <div className="tool-link">
                VIEW DETAILS →
              </div>
            </div>
          ))}

          {filteredCatalog.length === 0 && (
            <div className="catalog-empty">
              NO TECHNIQUES MATCH YOUR QUERY. TRY A DIFFERENT SEARCH TERM.
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedTool && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedTool(null)}
        >
          <div 
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedTool(null)}
            >
              ✕
            </button>

            <div className="modal-header-section">
              <div className="modal-badges">
                <span className="modal-badge tier-badge">{selectedTool.tier}</span>
                {richData?.difficulty && (
                  <span className="modal-badge diff-badge">{richData.difficulty.toUpperCase()}</span>
                )}
                {richData?.status && (
                  <span className="modal-badge">{richData.status.toUpperCase()}</span>
                )}
              </div>
              <h2 className="modal-title">{selectedTool.name}</h2>
              <div className="modal-category">{selectedTool.category}</div>
            </div>

            <div className="modal-body-section">
              <div className="modal-desc-large font-mono">
                {selectedTool.desc}
              </div>

              {!showFullDetails ? (
                // Basic View
                <div className="details-grid">
                  <div className="details-column-main">
                    <div>
                      <div className="details-section-title">Compatible Platforms</div>
                      <div className="flex gap-2 flex-wrap">
                        {richData?.platform ? richData.platform.map(p => (
                          <span key={p} className="modal-badge">{p}</span>
                        )) : <span className="text-xs opacity-60">WINDOWS / LINUX / MACOS</span>}
                      </div>
                    </div>

                    {richData?.requirements && richData.requirements.length > 0 && (
                      <div>
                        <div className="details-section-title">Requirements</div>
                        <ul className="details-list font-mono text-xs uppercase">
                          {richData.requirements.map((req, index) => (
                            <li key={index} className="details-list-item">{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="details-column-sidebar">
                    {richData?.github?.language && (
                      <div className="p-4 border border-[var(--cream-ghost)] bg-[var(--cream-ghost)]">
                        <div className="details-section-title" style={{ marginBottom: '6px' }}>Language</div>
                        <div className="font-mono text-sm font-semibold">{richData.github.language}</div>
                      </div>
                    )}
                    {richData?.tags && richData.tags.length > 0 && (
                      <div>
                        <div className="details-section-title">Keywords</div>
                        <div className="sidebar-topics-row">
                          {richData.tags.map(t => (
                            <span key={t} className="topic-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Full Details View
                <div className="details-grid">
                  <div className="details-column-main">
                    {richData?.installation?.commands && (
                      <div>
                        <div className="details-section-title">Installation Guide</div>
                        <div className="terminal-code-block">
                          <div className="terminal-code-header">
                            <span>Method: {richData.installation.method || 'git'}</span>
                            <button 
                              className="terminal-copy-btn"
                              onClick={() => handleCopyText(richData.installation.commands.join('\n'))}
                            >
                              {copiedState ? 'COPIED ✓' : 'COPY COMMANDS'}
                            </button>
                          </div>
                          <div className="terminal-content">
                            {richData.installation.commands.join('\n')}
                          </div>
                        </div>
                      </div>
                    )}

                    {richData?.usage?.basic && (
                      <div>
                        <div className="details-section-title">Usage & Commands</div>
                        <div className="terminal-code-block">
                          <div className="terminal-code-header">
                            <span>CLI COMMANDS</span>
                            <button 
                              className="terminal-copy-btn"
                              onClick={() => handleCopyText(richData.usage.basic.join('\n'))}
                            >
                              {copiedState ? 'COPIED ✓' : 'COPY'}
                            </button>
                          </div>
                          <div className="terminal-content">
                            {richData.usage.basic.join('\n')}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="details-column-sidebar">
                    <div>
                      <div className="details-section-title">Technical Dossier</div>
                      <table className="sidebar-table">
                        <tbody>
                          <tr className="sidebar-row">
                            <th className="sidebar-cell-label">License</th>
                            <td className="sidebar-cell-value">{richData?.github?.license || 'Unknown'}</td>
                          </tr>
                          <tr className="sidebar-row">
                            <th className="sidebar-cell-label">Stars</th>
                            <td className="sidebar-cell-value">
                              {richData?.github?.stars ? (richData.github.stars >= 1000 
                                ? `${(richData.github.stars / 1000).toFixed(1)}K` 
                                : richData.github.stars) : '—'}
                            </td>
                          </tr>
                          <tr className="sidebar-row">
                            <th className="sidebar-cell-label">Forks</th>
                            <td className="sidebar-cell-value">
                              {richData?.github?.forks ? (richData.github.forks >= 1000 
                                ? `${(richData.github.forks / 1000).toFixed(1)}K` 
                                : richData.github.forks) : '—'}
                            </td>
                          </tr>
                          <tr className="sidebar-row">
                            <th className="sidebar-cell-label">Difficulty</th>
                            <td className="sidebar-cell-value">{richData?.difficulty || '—'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {richData?.github?.topics && richData.github.topics.length > 0 && (
                      <div>
                        <div className="details-section-title">Topics</div>
                        <div className="sidebar-topics-row">
                          {richData.github.topics.map(topic => (
                            <span key={topic} className="topic-tag">{topic}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer-section">
              <a 
                href={selectedTool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-source-link"
              >
                OPEN REPOSITORY →
              </a>

              <button 
                className="btn btn-outline"
                style={{ padding: '10px 24px', fontSize: '11px' }}
                onClick={() => setShowFullDetails(!showFullDetails)}
              >
                {showFullDetails ? '← BASIC INFO' : 'FULL DETAILS →'}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-void site-footer" style={{ paddingTop: '20px' }}>
        <div className="container footer-bottom">
          <span>© 2026 MASQUERADE CIPHER. FOR AUTHORIZED RESEARCH & OSINT USE ONLY.</span>
          <span>ALL SOURCES PUBLICLY INDEXED</span>
        </div>
      </footer>
    </div>
  );
}
