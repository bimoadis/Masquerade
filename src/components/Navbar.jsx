'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <Link href="/" className="brand">
        <img src="/assets/logo-masquerade.png" alt="" />
        MASQUERADE CIPHER
      </Link>
      <nav>
        <Link href="/veil" style={pathname === '/veil' ? { opacity: 1 } : {}}>
          VEIL
        </Link>
        <Link href="/catalog" style={pathname === '/catalog' ? { opacity: 1 } : {}}>
          CIPHER CATALOG
        </Link>
        <Link href="/#how-it-works">
          HOW IT WORKS
        </Link>
        <a href="https://x.com/masqcipher" target="_blank" rel="noopener noreferrer">
          X
        </a>
      </nav>
    </header>
  );
}
