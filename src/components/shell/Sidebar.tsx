"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { NAV_GROUPS } from "./nav-config";
import { useAuth } from "@/components/auth/AuthProvider";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const balance = 1247.5;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href.split("?")[0]);
  };

  return (
    <aside className="sidebar">
      {NAV_GROUPS.map((group) => (
        <div className="nav-group" key={group.label}>
          <div className="nav-label">{group.label}</div>
          {group.items.map((it) => (
            <Link key={it.id} href={it.href} className="nav-item" data-active={isActive(it.href)}>
              <span className="nav-ico">
                <Icon name={it.icon} size={16} />
              </span>
              <span>{it.label}</span>
              {it.count && <span className="nav-count">{it.count}</span>}
            </Link>
          ))}
        </div>
      ))}
      {user && (
        <div className="sidebar-foot">
          <div className="balance-card">
            <div className="balance-label">Saldo</div>
            <div className="balance-value">R$ {balance.toFixed(2)}</div>
            <div className="balance-pnl">+R$ 124,80 (+2,4%) hoje</div>
          </div>
          <Link href="/wallet?action=deposit" className="btn btn-primary btn-block">
            <Icon name="plus" size={14} /> Depositar
          </Link>
        </div>
      )}
    </aside>
  );
}
