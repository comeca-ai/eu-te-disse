"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { NAV_GROUPS } from "./nav-config";

export function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <>
      <div className="drawer-bg" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer-head">
          <div className="brand">
            <div className="brand-mark">é</div>
            <span>eutedisse</span>
          </div>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar">
            <Icon name="close" size={18} />
          </button>
        </div>
        {NAV_GROUPS.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map((it) => (
              <Link
                key={it.id}
                href={it.href}
                className="nav-item"
                onClick={onClose}
              >
                <span className="nav-ico">
                  <Icon name={it.icon} size={16} />
                </span>
                <span>{it.label}</span>
                {it.count && <span className="nav-count">{it.count}</span>}
              </Link>
            ))}
          </div>
        ))}
      </aside>
    </>
  );
}
