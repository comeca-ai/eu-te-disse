"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/markets-data";

export function CategoryRail({ active }: { active?: string }) {
  return (
    <div className="cat-rail">
      <Link href="/" className="cat-chip" data-active={!active || active === "todos"}>
        <span className="cat-emoji">✨</span> Todos
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.id}
          href={c.id === "trending" ? "/trending" : `/category/${c.id}`}
          className="cat-chip"
          data-active={active === c.id}
        >
          <span className="cat-emoji">{c.emoji}</span> {c.label}
        </Link>
      ))}
    </div>
  );
}
