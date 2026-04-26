"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/Icon";

const items: { id: string; label: string; icon: IconName; href: string }[] = [
  { id: "home", label: "Início", icon: "home", href: "/" },
  { id: "trending", label: "Em alta", icon: "flame", href: "/trending" },
  { id: "search", label: "Buscar", icon: "search", href: "/?search=1" },
  { id: "watchlist", label: "Salvos", icon: "bookmark", href: "/watchlist" },
  { id: "wallet", label: "Carteira", icon: "wallet", href: "/wallet" }
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="tabbar">
      {items.map((it) => {
        const base = it.href.split("?")[0];
        const active = base === "/" ? pathname === "/" : pathname?.startsWith(base);
        return (
          <Link key={it.id} href={it.href} className="tab-item" data-active={active}>
            <span className="tab-ico">
              <Icon name={it.icon} size={20} />
            </span>
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
