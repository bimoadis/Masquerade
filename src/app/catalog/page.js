'use client';

import React, { useState, useMemo } from 'react';
import { CIPHER_CATALOG, CATALOG_CATEGORIES } from '@/data/catalogData';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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
            <div key={tool.name} className="tool-card">
              <div className="tool-card-top">
                <div className="tool-tier">{tool.tier}</div>
              </div>
              <div className="tool-name">{tool.name}</div>
              <div className="tool-category">{tool.category}</div>
              <div className="tool-desc font-mono uppercase text-xs opacity-80 leading-relaxed">
                {tool.desc}
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-link"
              >
                VIEW SOURCE →
              </a>
            </div>
          ))}

          {filteredCatalog.length === 0 && (
            <div className="catalog-empty">
              NO TECHNIQUES MATCH YOUR QUERY. TRY A DIFFERENT SEARCH TERM.
            </div>
          )}
        </div>
      </div>

      <footer className="bg-void site-footer" style={{ paddingTop: '20px' }}>
        <div className="container footer-bottom">
          <span>© 2026 MASQUERADE CIPHER. FOR AUTHORIZED RESEARCH & OSINT USE ONLY.</span>
          <span>ALL SOURCES PUBLICLY INDEXED</span>
        </div>
      </footer>
    </div>
  );
}
