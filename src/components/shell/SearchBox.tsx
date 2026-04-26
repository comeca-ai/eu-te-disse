"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { MARKETS } from "@/lib/markets-data";

export function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.blur();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const filtered = q.trim()
    ? MARKETS.filter((m) => m.title.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : MARKETS.slice(0, 5);
  const trending = MARKETS.filter((m) => m.featured).slice(0, 3);

  const go = (id: string) => {
    router.push(`/market/${id}`);
    setOpen(false);
    setQ("");
  };

  return (
    <div className="search">
      <span className="search-icon">
        <Icon name="search" size={16} />
      </span>
      <input
        ref={ref}
        className="search-input"
        placeholder="Buscar mercados, eventos, candidatos..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 180)}
      />
      <span className="search-kbd">⌘K</span>
      {open && (
        <div className="search-pop">
          {!q && (
            <>
              <div className="search-section">Em alta agora</div>
              {trending.map((m) => (
                <div key={m.id} className="search-row" onMouseDown={() => go(m.id)}>
                  <div className="thumb">{m.emoji}</div>
                  <div className="title">{m.title}</div>
                  <div className="meta">
                    {m.type === "binary" ? `${m.prob}%` : `${m.options.length} opções`}
                  </div>
                </div>
              ))}
              <div className="search-section">Atalhos</div>
              <Link href="/trending" className="search-row" onMouseDown={() => setOpen(false)}>
                <div className="thumb">🔥</div>
                <div className="title">Ver todos os mercados em alta</div>
              </Link>
              <Link href="/wallet" className="search-row" onMouseDown={() => setOpen(false)}>
                <div className="thumb">👛</div>
                <div className="title">Minha carteira</div>
              </Link>
            </>
          )}
          {q && (
            <>
              <div className="search-section">{filtered.length} resultados</div>
              {filtered.map((m) => (
                <div key={m.id} className="search-row" onMouseDown={() => go(m.id)}>
                  <div className="thumb">{m.emoji}</div>
                  <div className="title">{m.title}</div>
                  <div className="meta">
                    {m.type === "binary" ? `${m.prob}%` : `${m.options.length} opções`}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="search-row">
                  <div className="title muted">Nenhum mercado encontrado</div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
